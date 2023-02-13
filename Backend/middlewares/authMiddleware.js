const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.send({
                message: "Authentication Failed",
                success: false
            })
        }
        const matchedToken = jwt.verify(token, process.env.JWT_TOKEN);
        req.body.userId = matchedToken.userId;
        next();
    }catch(error) {
        return res.send({
            message: "Authentication Failed",
            success: false
        })
    }
}

 