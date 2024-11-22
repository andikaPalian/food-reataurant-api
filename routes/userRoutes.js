const express = require("express");
const {getUserAccount, updateUserAccount, updateUserPassword, resetUserPassword, deleteAccount} = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// GET USER || GET
router.get("/getUser", authMiddleware, getUserAccount);

// UPDATE USER || PUT
router.put("/updateUser", authMiddleware, updateUserAccount);

// UPDATE PASSWORD || POST
router.post("/updatePassword", authMiddleware, updateUserPassword);

// RESET PASSWORD || POST
router.post("/resetPassword", authMiddleware, resetUserPassword);

// DELETE ACCOUNT || DELETE
router.delete("/deleteUser/:id", authMiddleware, deleteAccount);

module.exports = router;