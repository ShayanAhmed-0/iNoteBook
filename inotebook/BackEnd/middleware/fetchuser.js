var jwt = require('jsonwebtoken');
const JWT_SECRET = 'helloShayan';

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        req.status(400).send({error:"error authtoken error"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next()
        
    } catch (error) {
        req.status(400).send({error:"error fetching user"})
    }
}
module.exports = fetchuser;
