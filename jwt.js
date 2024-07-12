const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res) => {

    //extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});
    try{
        //verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //attach user info to the request object
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error: 'Invalid token'});
    }
}

//function to generate JWT token
const generateToken = (userData) => {
    //generate a new jwt token by user data
    return jwt.sign(userData, process.env.JWT_SECRET);
}


module.exports = {jwtAuthMiddleware, generateToken};