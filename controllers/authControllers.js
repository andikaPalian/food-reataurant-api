const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
const registerAccount = async (req, res) => {
    try {
    const {userName, email, password, phone, address, answer} = req.body;
    // VALIDATION
    if (!userName || !email || !password || !phone || !address || !answer) {
        return res.status(500).json({message: "Please fill all the fields"});
    };
    // CHECK USER
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        return res.status(500).json({message: "User already exists"});
    };
    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    // CREATE USER
    const user = await User.create({
        userName,
        email,
        password: hashedPassword,
        address,
        phone,
        answer,
    });
    if (user) {
        return res.status(201).json({_id: user.id, email: user.email});
    } else {
        return res.status(500).json({message:"User data is not valid!" });
    };
} catch(error) {
    console.log(error);
    res.status(500).json({message: "Error in register API", error});
};
};

// LOGIN
const loginAccount = async (req, res) => {
    try {
    const {email, password} = req.body;
    // VALIDATION
    if (!email || !password) {
        return res.status(500).json({message: "Please fill all the fields"});
    };
    // CHECK USER
    const user = await User.findOne({email});
    if (!user) {
        return res.status(404).json({message: "User not found"});
    };
    // CHECK USER PASSWORD || COMPARE PASSWORD
    if (user && (await bcrypt.compare(password, user.password))) {
        // TOKEN
        const token = jwt.sign({
            id: user.id,
        }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        // HIDE PASSWORD
        user.password = undefined;
        res.status(200).json({message: "Login Successfully", user, token});
    } else {
        return res.status(401).json({message: "email or password is not valid"});
    };
} catch(error) {
    console.log(error);
    res.status(500).json({message: "Error in login API", error});
}
}

module.exports = {registerAccount, loginAccount};