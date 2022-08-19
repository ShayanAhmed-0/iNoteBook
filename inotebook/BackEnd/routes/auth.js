const express=require('express')
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'helloShayan';
//creating user
router.post('/createuser',[
body('name').isLength({ min: 5 }),
body('email').isEmail(),
body('password').isLength({ min: 5 })],
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user = await User.findOne({ email: req.body.email });
    if(user){
        return res.status(400).json({error:"already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    user=await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })

    const data={
        user:{
            id:user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

        
    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    //     res.json({error: 'Please enter a unique value for email', message: err.message})})
    // },
    // console.log(req.body)
    // const user = User(req.body);
    // user.save()
    // res.send(req.body)


    res.json({authtoken})
}catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured")
}
})

//authtoken if correct creds
router.post('/login',[
body('email').isEmail(),
body('password').isLength({ min: 5 })],
    async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {email,password}=req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error: "Please try to login with correct credentials"});
            }
            const passComp = await bcrypt.compare(password,user.password);
            if(!passComp){
                return res.status(400).json({error: "Please try to login with correct credentials"});
            }

            const data={
                user:{
                    id:user.id
                }
            }

            const authtoken = jwt.sign(data,JWT_SECRET);
            res.json({authtoken})

        } catch (error) {
              console.error(error.message);
              res.status(500).send("Internal Server Error");
        }
})

//route for login 
router.post('/getuser',fetchuser,
        async (req,res)=>{
            try {
                userId=req.user.id
                const user = await User.findById(userId).select("-password")
                res.send(user)
            } catch (error) {
              console.error(error.message);
              res.status(500).send("Internal Server Error");
            }
        })



module.exports= router