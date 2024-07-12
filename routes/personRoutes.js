const express = require('express');
const router = express.Router();
//import person model
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');


//post method call to add a person
router.post('/signup', async (req, res) => {
    try {
      //assuming the req body contains the data
      const data = req.body;
  
      //create a new Person document using the model
      const newPerson = new Person(data);
  
      //save the new person to data base
      const response = await newPerson.save();
      console.log('data saved');

      const payload = {
          id: response.id,
          username: response.username
      }

      const token = generateToken(payload);
      console.log('Token is: ', token);

      res.status(200).json({response: response, token: token});
      
    } 
    catch (err) {
          console.log(err);
          res.status(500).json({error: 'Internal server error'});
    }
  
  
  });

  //login route
  router.post('/login', async (req, res) => {

      try{
          //extract username and password from request body
          const {username, password} = req.body;

          //find the user by username
          const user = await Person.findOne({username: username});

          //if user doesnot exist or password doesnot match, return error
          if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
          }

          //generate token
          const payload = {
            id: user.id,
            username: user.username
          }

          const token = generateToken(payload);
          //return token as response
          res.json({token});


      }catch(err){
          console.error(err);
          res.status(500).json({error: 'Internal server error'});
      }
  });


//get method to get the data
router.get('/', async (req, res) => {
    try{
  
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  });


//parameterized url
router.get('/:work', async (req, res) => {

    try{
  
        //extract the work from the url parameter
        const work = req.params.work;
        if(work == 'chef' || work == 'manager' || work == 'waiter'){
  
          const response = await Person.find({work: work});
          console.log('response fetched');
          res.status(200).json(response);
          
        }else {
          res.status(404).json({error: 'Invalid work type'});
        }
  
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  });

  //update data
  router.put('/:id', async (req, res) => {

    try{

      //extract the id from url
      const personId = req.params.id;
      //updated data for the person
      const updatedPersonData = req.body;

      const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
           new: true,   //return the updated document
           runValidators: true  //run the mongoose validation
      });

      if(!response){
        return res.status(404).json({error: 'Person not found'});
      }

      console.log('data updated');
      res.status(200).json(response);


    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  });


  //delete data
  router.delete('/:id', async (req, res) => {
      try{

          //extract the id from url
          const personId = req.params.id;
          const response = await Person.findByIdAndDelete(personId);
          if(!response){
            return res.status(404).json({error: 'Person not found'});
          }

          console.log('data deleted');
          res.status(200).json({message: 'person deleted successfully'});

      }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
      }
  })

  //git commited testing

  module.exports = router;