const validator = require("validator")

const validateSignUpData = (req) =>{
     
    const {firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName || !emailId || !password){
        throw new Error("All fields are required")
    }
    else if (!firstName || !lastName) {
        throw new Error("Name is not valid !")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Invalid Password")
    }    
};

const validateEditProfileData = (req) =>{
    const allowedEditFields = ["firstName","lastName","emailId","photoUrl","about","gender","age","skills"]

    const isEditFieldAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field))
    if(!isEditFieldAllowed){
        throw new Error("You can't update this field!")
    }
    return isEditFieldAllowed

}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}