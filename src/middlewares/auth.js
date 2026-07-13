const jwt = require("jsonwebtoken");
const { User } = require("../models/user")

const userAuth =  async(req,res,next) => {

  // read the token from the req cookies

  try{
    const {token} = req.cookies;
    if(!token){
      return res.status(401).send('Please Login')
    }

  const decodedObj = await jwt.verify(token,"DEV@Tinder$798")

  const {_id} = decodedObj;
  const user = await User.findById(_id);

  if(!user){
    throw new Error("User not found")
  }
  req.user = user;
  next()
  } catch(error){
    res.status(400).send("ERROR: " + error.message)
  }

  // validate the token 
  // find the username

}

// const adminAuth = (req, res, next) => {
//   console.log("Admin route accessed");
//   const token = "xyz";
//   const isAdminAuthorized = token === "xyz";
//   if (!isAdminAuthorized) {
//     return res.status(403).send({ message: "Unauthorized access" });
//   } else {
//     next();
//   }
// };
// const userAuth = (req, res, next) => {
//   console.log("User route accessed");
//   const token = "xyzsdcf";
//   const isUserAuthorized = token === "xyzsdcf";
//   if (!isUserAuthorized) {
//     return res.status(403).send({ message: "Unauthorized access" });
//   } else {
//     next();
//   }
// };

module.exports = { userAuth };
