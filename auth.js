//for authentication through username and password
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(new localStrategy(async (username, password, done) => {
    //authentication logic
    try{
      //console.log('Received Credentials:', username, password);
      const user = await Person.findOne({username});
      if(!user){
  
        return done(null, false, {Message: 'Incorrect username'});
      }
      const isPasswordMatch = await user.comparePassword(password);
      if(isPasswordMatch){
            return done(null, user);
      }else{
            return done(null, false, {message: 'Incorrect Password'});
      }
    }catch(err){
  
        return done(err);
    }
  }));


  module.exports = passport;