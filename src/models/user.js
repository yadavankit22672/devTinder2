const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true ,
    minlength:4,
    maxlength:50
  },
  lastName: {
    type: String,
   
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email")
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter a strong password: " + value)
      }
    }
  },
  age:{
     type: Number
  },
  gender: {
    type: String,
    enum: {
      values:["male" , "female" , "other"],
      message: "{VALUE} is invalid gender"
    }

  },
  photoUrl:{
    type : String,
    default: "https://www.svgrepo.com/show/43426/profile.svg",
    validate(value){
       if(!validator.isURL(value)){
        throw new Error("Invalid URL")
       } 
    }
  },
  about:{
    type: String,
    default: "This is a default about user"
  },
  skills: {
    type: [String]
  }

},{timestamps:true})

userSchema.methods.getJWT = async function(){
  const user = this
  const token = jwt.sign({ _id: this._id }, "DEV@Tinder$798",{
        expiresIn: "1d"
      });
      return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  
  return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  userSchema
}


// module.exports = User 