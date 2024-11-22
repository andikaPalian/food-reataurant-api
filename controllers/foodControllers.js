const Food = require("../models/foodModel");
const Order = require("../models/orderModel");

// CREATE FOOD;
const createFood = async (req, res) => {
    try {
        const {
            title, 
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        } = req.body;
        if (!title || !description || !price || !restaurant) {
            return res.status(500).json({message: "Please fill all the fields"});
        };
        const newFood = new Food({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        });
        await newFood.save();
        res.status(201).json({message: "New Food is created", newFood});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in create food API", error});
    };
};

// GET ALL FOODS
const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find({});
        if (!foods) {
            return res.status(404).json({message: "Food Not Found"});
        };
        res.status(200).json({foods: foods.length, foods});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in get all food API", error});
    };
};

// GET SINGLE FOOD
const getSingleFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).json({message: "Please fill all the fieldd"});
        };
        const food = await Food.findById({_id: foodId});
        if (!food) {
            return res.status(404).json({message: "Food Not Found"});
        };
        res.status(200).json({food});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in get single food API", error});
    };
};

// GET FOOD BY RESTAURANT
const getFoodByRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).json({message: "Please fill all the fields"});
        };
        const food = await Food.find({restaurant: restaurantId});
        if (!food) {
            return res.status(404).json({message: "Food Not Found"});
        };
        res.status(200).json({message: "Food base on Restaurant", food});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in get food by restaurant API", error});
    };
};

// UPDATE FOOD
const updateFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).json({message: "Food Not Found"});
        };
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            categeory,
            code,
            isAvailable,
            restaurant,
            rating,
        } = req.body;
        const updateFood = await Food.findByIdAndUpdate(foodId, {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            categeory,
            code,
            isAvailable,
            restaurant,
            rating,
        }, {new: true});
        res.status(200).json({message: "Food item was update", updateFood});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in Update Food API", error});
    };
};

// DELETE FOOD
const deleteFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).json({message: "Please fill all the fields"});
        };
        const food = await Food.findByI(foodId);
        if (!food) {
            return res.status(404).json({message: "Food Not Found"});
        };
        await Food.findByIdAndDelete(foodId);
        res.status(200).json({message: "Food Deleted Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in delete food API", error});
    };
};

// PLACE ORDER
const placeOrder = async (req, res) => {
    try {
        const {cart} = req.body;
        if (!cart) {
            return res.status(404).json({message: "Please fill all the fields"});
        };
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        const newOrder = new Order({
            food: cart,
            payment: total,
            buyer: req.body.id,
        });
        await newOrder.save();
        res.status(200).json({message: "Order Placed Successfully", newOrder});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in place order API", error});
    };
};

// CHANGE ORDER STATUS
const orderStatus = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).json({message: "Please fill all the fields"});
        };
        const {status} = req.body;
        const order = await Order.findByIdAndUpdate(
            foodId,
            {status},
            {new: true},
        );
        res.status(200).json({message: "Order status updated successfully", order});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in order status API", error});
    };
};

module.exports = {createFood, getAllFoods, getSingleFood, getFoodByRestaurant, updateFood, deleteFood, placeOrder, orderStatus};