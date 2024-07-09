const express = require('express');
const router = express.Router();
//import menu model
const Menu = require('./../models/menu');


//post method for menu
router.post('/', async (req, res) => {
    try {
      //assuming the req body contains the data
      const menuData = req.body;
  
      //create a new menu document using the model
      const newMenu = new Menu(menuData);
  
      //save the new person to data base
      const response = await newMenu.save();
      console.log('data saved');
      res.status(200).json(response);
      
    } 
    catch (err) {
          console.log(err);
          res.status(500).json({error: 'Internal server error'});
    }
  
  
  })
  
  
  //get method to get the data
  router.get('/', async (req, res) => {
    try{
  
      const menuData = await Menu.find();
      console.log('data fetched');
      res.status(200).json(menuData);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  })

  module.exports = router;