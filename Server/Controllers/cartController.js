const users = require('../Models/userModel');
const foods = require('../Models/foodModel')
/// Add items to cart
exports.addToCart = async (req, res) => {
    console.log("Inside AddtoCart");

    try {
        console.log('userId from JWT:', req.payload);

        // Check if the itemId is provided in the request body
        if (!req.body.itemId) {
            return res.json({ success: false, message: "Item ID is required" });
        }

        // Find the user by userId
        const userData = await users.findOne({ _id: req.payload });

        console.log('userData:', userData);

        // If user is not found, return an error message
        if (!userData) {
            console.log('User not found');
            return res.json({ success: false, message: "User not found" });
        }

        // If user is found, update the cart data
        let cartData = userData.cartData || {}; // Initialize cartData if it's null

        // Assign the userId to cartData
        cartData.userId = req.payload;

        // Check if items object exists in cartData, if not, initialize it
        if (!cartData.items) {
            cartData.items = {};
        }

        // Get the item details from the database based on the itemId
        const itemDetails = await foods.findById(req.body.itemId);

        // Increment the quantity of the item in the cart
        if (!cartData.items[req.body.itemId]) {
            // Set the name and price of the item in cart
            cartData.items[req.body.itemId] = { 
                name: itemDetails.name,
                price: itemDetails.price,
                quantity: 1 
            };
        } else {
            cartData.items[req.body.itemId].quantity += 1;
        }

        // Update the user document with the modified cartData
        await users.findByIdAndUpdate(req.payload, { cartData });

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};


// remove items from cart
exports.removeFromCart = async (req, res) => {
    try {
        // Find the user by userId
        let userData = await users.findById(req.payload);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Get the cart data from user
        let cartData = userData.cartData || {};

        // Check if the item exists in the cart
        if (cartData.items && cartData.items[req.body.itemId] > 0) {
            cartData.items[req.body.itemId] -= 1;

            // Update the user document with the modified cartData
            await users.findByIdAndUpdate(req.payload, { cartData });

            return res.json({ success: true, message: "Removed" });
        } else {
            return res.json({ success: false, message: "Item not found in the cart" });
        }
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Error" });
    }
}


// fetchuser cart data

exports.getCart = async(req,res)=>{
    console.log("Inside fetchuser");
try {
    let userData = await users.findById(req.payload)
    let cartData = await userData.cartData
    res.json({success:true,cartData})
} catch (err) {
    console.log(err);
    res.json({success:false,message:"ërror"})
}
}
