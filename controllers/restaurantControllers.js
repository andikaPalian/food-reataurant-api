const Restaurant = require("../models/restaurantModel");

// CREATE RESTAURANT
const createRestaurant = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;
        // VALIDATION
        if (!title || !coords) {
            return res.status(500).send({message: "Please fill all the fields"});
        };
        const newRestaurant = new Restaurant({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });
        await newRestaurant.save();
        res.status(200).json({message: "New restaurant created successfully", newRestaurant});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in create restaurant API", error});
    };
};

// GET ALL RESTAURANTS
const getAllRestaurants = async (req, res) => {
    try {
        const restaurant = await Restaurant.find({});
        if (!restaurant) {
            return res.status(404).json({message: "Restaurant Not Found"});
        };
        res.status(200).json({restaurant: restaurant.length, restaurant});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in get all restaurant API", error});
    };
};

// GET RESTAURANT BY ID
const getRestaurantById = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).json({message: "Please fill all the fields"});
        };
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({message: "Restaurant Not Found"});
        };
        res.status(200).json({restaurant});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in get restaurant by id API", error});
    };
};

// DELETE RESTAURANT
const deleteRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).json({message: "Please fill all the fields or not retaurant found"});
        };
        await Restaurant.findByIdAndDelete(restaurantId);
        res.status(200).json({message: "Restaurant Deleted Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in delete restaurant API", error});
    };
};

module.exports = {createRestaurant, getAllRestaurants, getRestaurantById, deleteRestaurant};