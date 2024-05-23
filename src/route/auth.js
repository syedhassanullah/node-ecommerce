const express = require("express");
const router = express.Router();
const User = require('../Models/UserSchema')
const dbconnection = require('../database/db')






router.post("/register", async (req,res) => {
    
    const { name, email, DOB, gender, password, cpassword } = req.body;

    if(!name || !email || !DOB || !gender || !password || !cpassword ){
        return res.status(422).send({
            message:"field is required"
        });
    }

    try{
        const userExist = await User.findOne({email : email});


        if (userExist){
            return res.status(422).send({
                error:"user is already exist"
            });
        }



        const result = new User({
            name : name,
            email : email,
            DOB : DOB,
            gender : gender,
            password : password,
            cpassword : cpassword
        });
        // bycipt password here from schema 
        const userregister = await result.save();

        if (userregister){
            res.send({
                status:200,
                message: "signup successfully",
            });
        }

    } catch (error){
        console.log(error)
    }


    // let User = new UserSchema(req.body)
    // let result = await User.save();
    // res.send(result) ;
});


router.post('/signin',(req,res) => {
    const { email , password} = req.body

    if(!email || !password){
        res.status(401).send({
            message:"email or password required "
        });
    }

    const userLogin = User.findOne({email:email})
    if (userLogin){
        res.send({
            status:404,
            message:"sgin in successfully"
        });
    }
});


module.exports = router;
