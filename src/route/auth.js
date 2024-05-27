const express = require("express");
const router = express.Router();
const User = require('../Models/UserSchema')
const dbconnection = require('../database/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')







router.post("/register", async (req,res) => {
    
    const { fname, email, lname, phone, password, cpassword } = req.body;

    if(!fname || !email || !lname || !phone || !password || !cpassword ){
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

        // const salt = bcrypt.genSaltSync(saltRound);
        // const hash = bcrypt.hashSync(password, salt);

        const result = new User({
            fname : fname,
            email : email,
            lname : lname,
            phone : phone,
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


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log("body",req.body)

    if (!email || !password) {
        return res.status(401).send({
            message: "Email or password required"
        });
    }

    try {
        const userLogin = await User.findOne({ email: email });
        console.log("Ulogin",userLogin)

        if (!userLogin) {
            return res.status(401).send({
                message: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, userLogin.password);
        console.log("isMatch",isMatch)
    
        if (isMatch) {

            let token = jwt.sign(
                {
                    name: isMatch.name,
                    email: userLogin.email
                },
                process.env.SECRET_TOKEN
            );
            console.log('tOKEN', token);


            return res.status(200).send({
                message: 'Login successful',
                email: userLogin.email,
                token: token
            });
        } else {
            return res.status(401).send({
                message: 'Invalid email or password'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

module.exports = router;
