const User = require("../models/userModel");

const admin = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        if (!user) {
            res.status(404).json({message: "User not found"});
            return;
        }
        if (user.userType !== "admin") {
            res.status(401).json({message: "Only Admin Access"});
            return;
        };
        next();
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Un-authorized access"});
    };
};

module.exports = admin;