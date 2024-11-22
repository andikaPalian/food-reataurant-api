const jwt = require("jsonwebtoken");

const token = async (req, res, next) => {
    try {
        let token;
        const autHeader = req.headers.Authorization || req.headers.authorization;
        if (autHeader && autHeader.startsWith("Bearer")) {
            token = autHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({message: "Un-authorized User"});
                    return;
                };
                req.body.id = decoded.id;
                next();
            });
        };
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Token is missing"});
    };
};

module.exports = token;