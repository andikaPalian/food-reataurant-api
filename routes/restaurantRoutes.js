const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {createRestaurant, getAllRestaurants, getRestaurantById, deleteRestaurant} = require("../controllers/restaurantControllers");
const router = express.Router();

// CREATE RESTAURANT || POST
router.post("/create", authMiddleware, createRestaurant);

// GET ALL RESTAURANTS || GET
router.get("/getAll", getAllRestaurants);

// GET RESTAURANT BY ID  || GET
router.get("/get/:id", getRestaurantById);

// DELETE RESTAURANT || DELETE
router.delete("/delete/:id", authMiddleware, deleteRestaurant);

module.exports = router;