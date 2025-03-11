const jwt = require('jsonwebtoken');
const config = process.env;

const verifayToken = (req,res,next)=>{
    let token = req.body.token || req.query.token || req.headers['authorization'];

    if(!token) {
        return res.status(403).send('token is needed for authentication');
    }

    try{
        token = token.replace(/^Bearer\s+/,"");
        const decode = jwt.verify(token,config.TOKEN_KEY);
        req.user = decode;
    }catch(err){
        res.status(401).send('Invalid token');
    }

    return next();
}

module.exports = verifayToken