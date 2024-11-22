const express = require("express");
const {createFood, getAllFoods, getSingleFood, getFoodByRestaurant, updateFood, deleteFood, placeOrder, orderStatus} = require("../controllers/foodControllers");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

// CREATE FOOD || POST
router.post("/create", authMiddleware, createFood);

// GET ALL FOOD || GET
router.get("/getAll", getAllFoods);

// GET SINGLE FOOD || GET
router.get("/get/:id", getSingleFood);

// GET FOOD BY RESTAURANT || GET
router.get("/getByRestaurant/:id", getFoodByRestaurant);

// UPDATE FOOD || PUT
router.put("/update/:id", authMiddleware, updateFood);

// DELETE FOOD || DELETE
router.delete("/delete/:id", authMiddleware, deleteFood);

// PLACE ORDER || POST
router.post("/placeOrder", authMiddleware, placeOrder);

// ORDER STATUS || POST
router.post("/orderStatus/:id", authMiddleware, adminMiddleware, orderStatus);

module.exports = router;