const express = require('express');
const app = express();
//import db connection
const db = require('./db');


//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

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



app.listen(3000, () => {
  console.log('listened at 3000');
});


