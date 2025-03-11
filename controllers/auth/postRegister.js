const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const postRegister = async (req,res)=>{
    try{

        const { username,password,mail }=req.body;

        //chalke if user existe;
        const userExist = await User.exists({mail:mail.toLowerCase()});

        if(userExist){
            return res.status(409).send('Email is alrady exist');//status code 409 is for conflicting between resource

        }
        
        //encrypting the password

        const encryptedPassword = await bcrypt.hash(password,10);

        //creating user document

        const user = await User.create({
            username,
            mail:mail.toLowerCase(),
            password:encryptedPassword,
        })

        //create JWT token

        const token = jwt.sign(
            {
                userId:user._id,
                mail
            },
            process.env.TOKEN_KEY,
            {
                expiresIn:'24h'
            }

        );

        res.status(201).json({
            userDetail:{
                mail:user.mail,
                token:token,
                username:user.username,
                _id:user._id
            }
        })

    }catch(err){
        return res.status(500).send('error occure');
    }
}

module.exports = postRegister;