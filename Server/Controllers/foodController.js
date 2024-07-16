
const foods = require('../Models/foodModel')


 exports.addFood = async (req, res) => {
    console.log("Inside Add request");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.file);

    let image_filename = `${req.file.filename}`;

    const { name, description, price, category } = req.body;

    const newfoods = new foods({
        name,
        description,
        price,
        image: image_filename,
        category
    });

    try {
        await newfoods.save();
        res.json({ success: true, message: "Food Added" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "ERROR" });
    }
};

// all food list

exports.listFood = async (req, res) => {
    console.log("Inside food list");
    try {
        const foodsList = await foods.find({});
        res.json({ success: true, data: foodsList });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" });
    }
}

// remove food item

exports.removeFood = async (req,res)=>{
    console.log("Inside remove food");
    const {pid} = req.params
    try {
        const foodDetails = await foods.findByIdAndDelete({_id:pid})
        res.status(200).json(foodDetails)
    } catch (err) {
       res.status(401).json(err) 
    }
}

