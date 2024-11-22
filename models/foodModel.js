const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: [true, "food title is required"],
    },
    description: {
        type: String,
        required: [true, "food description is required"],
    },
    price: {
        type: Number,
        required: [true, "food price is required"],
    },
    imageUrl: {
        type: String,
        deafult: "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    foodTags: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    code: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    rating: {
        type: Number,
        default: 0,
        min: 1,
        max: 5,
    },
    ratingCount: {
        type: String,
    },
}, {timestamps: true});

module.exports = mongoose.model("Food", foodSchema);