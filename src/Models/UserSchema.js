const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    fname: String,
    email: String,
    password: String,
    cpassword: String,
    lname: String,
    phone: String,
});


UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

const User = mongoose.model("SIGNUP", UserSchema);


module.exports = User;

