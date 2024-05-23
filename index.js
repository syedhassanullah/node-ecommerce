const express = require('express');
const dbconnection = require('./src/database/db')
const User = require('./src/Models/UserSchema') 
const bodyparser = require('body-parser')
const Authroute = require("./src/route/auth")
require("dotenv").config();

const app = express();

let PORT = process.env.PORT || 8000;

// app.use(require('./src/route/auth'));

dbconnection.on('connected' , ()=>{
    console.log('now is connected finaly')
})

// app.get("/" , (req,res)=>{
//     res.send('app is working.......')
// });
app.use(bodyparser.json());
app.use("/", Authroute);


// app.post("/register", async (req,res) => {
//     const { name, email, DOB, gender, password, cpassword } = req.body;

//     if(!name || !email || !DOB || !gender || !password || !cpassword ){
//         return res.status(422).send({
//             message:"field is required"
//         });
//     }

//     try{
//         const userExist = await User.findOne({email : email});
//         if (userExist){
//             return res.status(422).send({
//                 message:"user is already exist"
//             });
//         }



//         const result = new User({
//             name : name,
//             email : email,
//             DOB : DOB,
//             gender : gender,
//             password : password,
//             cpassword : cpassword
//         });
        
//         const userregister = await result.save();

//         if (userregister){
//             res.send({
//                 status:200,
//                 message: "signup successfully",
//             });
//         }

//     } catch (error){
//         console.log(error)
//     }


//     // let User = new UserSchema(req.body)
//     // let result = await User.save();
//     // res.send(result) ;
// });


// app.post('/signin',(req,res) => {
//     const { email , password} = req.body

//     if(!email || !password){
//         res.status(401).send({
//             message:"email or password required "
//         });
//     }

//     const userLogin = User.findOne({email:email})
//     if (userLogin){
//         res.send({
//             status:404,
//             message:"sgin in successfully"
//         });
//     }
// });




// const EcomDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://myfirstdb:myfirstdb.123@myfirstdbcluster.fbfenmk.mongodb.net/Ecommerce');
        

//         const signupSchema = new mongoose.Schema({
//             email: String,
//             name: String,
//         });
//         const userModel = mongoose.model('signups', signupSchema);
//         const data = await userModel.find();
//         console.log(data);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };
// EcomDB();

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
