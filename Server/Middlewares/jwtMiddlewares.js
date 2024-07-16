const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log("Inside JWT Middleware!!!");

    // Check if the authorization header exists
    if (req.headers.authorization) {
        // Get the token
        const token = req.headers.authorization.split(" ")[1];
        
        // Verify the token
        if (token) {
            try {
                const jwtResponse = jwt.verify(token, process.env.JWT_SECRET);
                console.log(jwtResponse);
                req.payload = jwtResponse.userId;
                next();
            } catch (err) {
                res.status(401).json("Authorization failed... Please login!!!");
            }
        } else {
            res.status(406).json("Please provide a valid token");
        }
    } else {
        res.status(406).json("Please provide the authorization header");
    }
};

module.exports = jwtMiddleware;
