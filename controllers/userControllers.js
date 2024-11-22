const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// GET USER INFO
const getUserAccount = async (req, res) => {
    try {
        // FIND USER
        const user = await User.findById({_id: req.body.id});
        // VALIDATION
        if (!user) {
            return res.status(404).json({message: "User Not Found"});
        };
        // HIDE PASSWORD
        user.password = undefined;
        res.status(200).json({message: "User Found", user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Erro in get user API", error});
    };
};

// UPDATE USER
const updateUserAccount = async (req, res) => {
    try {
        // FIND USER
        const user = await User.findById({_id: req.body.id});
        // VALIDATION
        if (!user) {
            return res.status(404).json({message: "User Not Found"});
        };
        // UPDATE
        const {userName, address, phone} = req.body;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        // SAVE UPDATE
        await user.save();
        res.status(200).json({message: "User Update Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in update user API". error});
    };
};

// UPDATE USER PASSWORD
const updateUserPassword = async (req, res) => {
    try {
        // FIND USER
        const user = await User.findById({_id: req.body.id});
        // VALIDATION
        if (!user) {
            return res.status(404).json({message: "User Not Found"});
        }
        // GET DATA FROM USER
        const {oldPassword, newPassword} = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).json({message: "Please input old or new Password"});
        };
        // CHECK USER PASSWORD || COMPARE PASSWORD
        const isMacth = await bcrypt.compare(oldPassword, user.password);
        if (!isMacth) {
            return res.status(500).json({message: "Old password is not valid"});
        };
        // HASHING PASSWORD
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({message: "Password Update Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in update password API", error});
    };
};

// RESET PASSWORD;
const resetUserPassword = async (req, res) => {
    try {
        const {email, newPassword, answer} = req.body;
        // VALIDATION
        if (!email || !newPassword || !answer) {
            return res.status(500).json({message: "Please fill all the fields"});
        };
        const user = await User.findOne({email, answer});
        if (!user) {
            return res.status(404).json({message: "User Not Found or Answer is not valid"});
        };
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        restart.status(200).json({message: "Password Reset Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in password reset API", error});
    };
};

// DELETE PROFILE ACCOUNT
const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete({_id: req.body.id});
        return res.status(200).json({message: "Account Deleted Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in delete account API", error});
    };
};

module.exports = {getUserAccount, updateUserAccount, updateUserPassword, resetUserPassword, deleteAccount}