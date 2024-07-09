const mongoose = require('mongoose');
require('dotenv').config();

//define the mongoDB connection URL
const mongoURL = process.env.MONGODB_URL;  //hotels-> db name

//set up MongoDB connection
mongoose.connect(mongoURL);

//mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection;


//define event listners for database connection
db.on('connected', () => {
    console.log('connected successful');
});

db.on('error', (err) => {
    console.log('connection error',err);
});

db.on('disconnected', () => {
    console.log('disconnected mongodb');
});

//exports the db connection
module.exports = db;