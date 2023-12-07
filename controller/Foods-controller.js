import Food from "../modals/Foods.js";
import cloudinary from "cloudinary"

export const FoodController = async (req, res) => {
     console.log("img details", req.body.image)
    try {
        const file = req.body.image;
        const myCloud = await cloudinary.v2.uploader.upload(file, {
            folder: "riz-food-image",
            resource_type: "auto",
        })
        let { image, title, category, price } = req.body

        const food = await Food.create({
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,

            }, title, category, price
        })
        return res.status(201).json({
            success: true,
            food
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "error in creating food" });
    }
}

export const updateFoodController = async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(200).json({
            success: true,
            message: "Food updated successfully",
            updatedFood
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "error in updating Item" });
    }
}

export const deleteFoodController = async (req, res) => {
    try {
        let food_Id = await Food.findById(req.params.id)
        // retrieve current image id...
        let imgId = food_Id.image.public_id;
        await cloudinary.v2.uploader.destroy(imgId)
        await Food.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success: true,
            message: "Food deleted successfully",

        })
    } catch (err) {
        console.log(err)
        return res.status(501).json({ message: "error in deleting  Food" });
    }
}

// get all food
export const foodGetController = async (req, res) => {
    // req.body.user = req.user.id;
    try {
        const foodCount = await Food.countDocuments()
        const food = await Food.find({}).sort({ createdAt: -1 })
        res.status(201).json({
            success: true,
            food,
            foodCount
        })
    } catch (err) {
        res.status(500).json({ message: "error in getting all Foods" });
    }
}