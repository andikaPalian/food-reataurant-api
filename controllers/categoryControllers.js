const Category = require("../models/categoryModel");

// CREATE CATEGORY
const createCategory = async (req, res) => {
    try {
        const {title, imageUrl} = req.body;
        if (!title || !imageUrl) {
            return res.status(500).json({message: "Please fill all the fields"});
        };
        const newCategory = new Category({title, imageUrl});
        await newCategory.save();
        res.status(200).json({message: "Category created successfully", newCategory});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in create category API", error});
    };
};

// GET ALL CATEGORIES
const getAllCategories = async (req, res) => {
    try {
        const category = await Category.find({});
        if (!category) {
            return res.status(404).json({message: "Category Not Found"});
        };
        res.status(200).json({category: category.length, category});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in get all category API", error});
    };
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(404).json({message: "Category Not Founds"});
        };
        const {title, imageUrl} = req.body;
        const updateCategory = await Category.findByIdAndUpdate(
            categoryId,
            {title, imageUrl},
            {new: true},
        );
        res.status(200).json(updateCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in update category API", error});
    };
};

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(500).json({message: "PLease fill all the fields"});
        };
        await Category.findByIdAndDelete(categoryId);
        res.status(200).json({message: "Category deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in delete category API", error});
    }
}

module.exports = {createCategory, getAllCategories, updateCategory, deleteCategory};