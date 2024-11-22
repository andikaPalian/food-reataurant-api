const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {createCategory, getAllCategories, updateCategory, deleteCategory} = require("../controllers/categoryControllers");
const router = express.Router();

// CREATE CATEGORY || POST
router.post("/create", authMiddleware, createCategory);

// GET ALL CATEGORIES || GET
router.get("/getAll", getAllCategories);

// UPDATE CATEGORY || PUT
router.put("/update/:id", authMiddleware, updateCategory);

// DELETE CATEGORY || DELETE
router.delete("/delete/:id", authMiddleware, deleteCategory);

module.exports = router;