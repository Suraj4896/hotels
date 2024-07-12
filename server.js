const express = require('express');
const app = express();
//import db connection
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');



//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//middleware function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();  //move on to the next phase
}

app.use(logRequest);






//initialize the passport
app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session: false});

app.get('/', function (req, res) {
  res.send('Hello World...i am suraj');
});




//import the router files
const personRoutes = require('./routes/personRoutes');
//use the routers
app.use('/person', personRoutes);

//import the router files
const menuRoutes = require('./routes/menuRoutes');
//use the routers
app.use('/menu', menuRoutes);





app.listen(PORT, () => {
  console.log('listened at 3000');
});


