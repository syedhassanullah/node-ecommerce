const mongoose = require('mongoose');
require("dotenv").config();
const DB_URI = process.env.DATABASE

mongoose.connect(DB_URI);

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useCreateIndex: true });

module.exports = mongoose.connection;
