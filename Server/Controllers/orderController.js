const jwt = require('jsonwebtoken');
const orders = require('../Models/orderModel');
const users = require('../Models/userModel');
const Stripe = require('stripe');
const foods = require('../Models/foodModel');


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// PLACING USER ORDER WITH STRIPE PAYMENT
exports.placeOrder = async (req, res) => {
    console.log("Inside placeOrder");

    const frontend_url = "http://localhost:5174";

    try {
        console.log('userId from JWT:', req.payload);

        // Validate required fields
        const requiredFields = ['items', 'totalAmount', 'deliveryInfo'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        if (missingFields.length > 0) {
            return res.status(400).json({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        const userId = req.payload;

        // Save order
        const { items, totalAmount, deliveryInfo } = req.body;
        const newOrder = new orders({ userId, items, amount: totalAmount, address: deliveryInfo });
        await newOrder.save();
        console.log("Inside req.body");
        console.log(req.body);

        // Fetch food details for each item
const lineItems = await Promise.all(items.map(async (item) => {
  try {
      const foodItem = await foods.findById(item._id);
      if (!foodItem) {
          throw new Error(`Food item with ID ${item._id} not found`);
      }

      // Convert price to cents
      const unitAmount = Math.round(foodItem.price * 100);

      // Ensure quantity is at least 1
      const quantity = Math.max(item.quantity, 1);

      return {
          price_data: {
              currency: "inr",
              product_data: {
                  name: foodItem.name,
              },
              unit_amount: unitAmount,
          },
          quantity: quantity,
      };
  } catch (error) {
      console.error(`Error fetching food details for item with ID ${item._id}:`, error);
      throw error;
  }
}));


        // Add delivery charge
        lineItems.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 20000, // Assuming delivery charge is 200 INR
            },
            quantity: 1, // Assuming only one delivery charge
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        // Return session URL and total amount to client
        res.json({ success: true, message: "Order placed successfully", session_url: session.url, totalAmount: totalAmount });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
};


exports.verifyOrder = async (req, res) => {
  const { orderId, success } = req.body
  try {
    if (success == "true") {
      await orders.findByIdAndUpdate(orderId, { payment: true })
      res.json({ success: true, message: "Paid" })
    } else {
      await orders.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" })
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" })
  }
};


// userorder for frontend

exports.userOrders = async (req, res) => {
  try {
      console.log("Request body:", req.body)
      const userId = req.payload

      if (!userId) {
          return res.status(400).json({ success: false, message: "User ID is missing in the request body" });
      }

      const userOrders = await orders.find({ userId }); // Use orders instead of Order

      console.log("Orders found:", userOrders);

      if (!userOrders || userOrders.length === 0) {
          return res.json({ success: true, data: [] }); // Return empty array if no orders found
      }

      // Populate food details for each item in the orders
      const populatedOrders = await Promise.all(userOrders.map(async (order) => {
          const populatedItems = await Promise.all(order.items.map(async (item) => {
              const foodItem = await foods.findById(item._id);
              if (foodItem) {
                  return {
                      _id: foodItem._id,
                      name: foodItem.name,
                      price: foodItem.price,
                      quantity: item.quantity
                  };
              } else {
                  return {
                      _id: item._id,
                      name: "Unknown",
                      price: 0,
                      quantity: item.quantity
                  };
              }
          }));
          return {
              ...order.toObject(),
              items: populatedItems
          };
      }));

      res.json({ success: true, data: populatedOrders });
  } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ success: false, message: "Error fetching user orders" });
  }
};

// Listing orders for admin panel

exports.listOrders = async (req, res) => {
  try {
      const Order = await orders.find({}); // Assuming Order is your model for orders

      // Populate food details for each item in the orders
      const populatedOrders = await Promise.all(Order.map(async (order) => {
          const populatedItems = await Promise.all(order.items.map(async (item) => {
              try {
                  const foodItem = await foods.findById(item._id); // Assuming Food is your model for food items
                  if (foodItem) {
                      return {
                          _id: foodItem._id,
                          name: foodItem.name,
                          price: foodItem.price,
                          quantity: item.quantity
                      };
                  } else {
                      return {
                          _id: item._id,
                          name: "Unknown",
                          price: 0,
                          quantity: item.quantity
                      };
                  }
              } catch (error) {
                  console.error("Error fetching food item:", error);
                  return {
                      _id: item._id,
                      name: "Unknown",
                      price: 0,
                      quantity: item.quantity
                  };
              }
          }));
          return {
              ...order.toObject(), // This line may cause issues, remove if unnecessary
              items: populatedItems
          };
      }));

      res.json({ success: true, data: populatedOrders });
  } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ success: false, message: "Error fetching orders" });
  }
}

// updating status

exports.updateStatus = async (req,res) =>{
  try {
    await orders.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})

    
  }
}
