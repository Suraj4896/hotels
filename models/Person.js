const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    adress: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});


personSchema.pre('save', async function(next){
    const person = this;

    //hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next(); 
    try{
        //hash password generate
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        
        //override the plain password with the hashed password
        person.password = hashedPassword;

        next();
    }catch(err){

        return next(err);

    }
})


personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

//explanation:
//lets take a password "suraj"
//first the bycript makes an random hashed password with salt
//suraj -------> kejfhifibfisbphfehbibwidbw8736487hcjh
//when we login, this compare function extract the salt from the encrypted password
//then salt + login.password ---->hash ----> dohofoefiofof
//then check if it is same as that of previous or not 



//create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;