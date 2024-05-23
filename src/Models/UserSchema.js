const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cpassword: String,
    DOB: String,
    gender: String,
});

const User = mongoose.model("SIGNUP", UserSchema);

module.exports = User;

UserSchema.pre('save', async (next)=>{
    if(this.ismodified('password')){
        this.password = bycript.hash(this.password, 2);
        this.cpassword = bycript.hash(this.cpassword ,2);
    }
    next();
})