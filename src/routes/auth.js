const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  // console.log(req.body);

  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // req.body.password = hashedPassword
    // console.log(hashedPassword);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

   const savedUser =  await user.save();
    const token = await savedUser.getJWT();
      // console.log(token);

      res.cookie("token", token,{
        expires: new Date(Date.now() + 8*3600000  )
      });

    return res.status(201).json({ message: "User created successfully" ,data:savedUser});
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: error.message });
  }

  // const userObj = {
  //   firstName: "Virat",
  //   lastName: "Kohli",
  //   emailId: "viratkohli@gmail.com",
  //   password: "virat123"
  // }
  // //creating a new instace of the user model;
  // const user = new User(userObj)
  // try{
  //   await user.save()
  //   return res.status(201).json({message:"User created successfully"})
  // } catch(error){
  //   // console.log(error)
  //   return res.status(500).json({message:"User creation failed"})
  // }
});

authRouter.post("/login", async (req, res) => {
  // console.log(req.body)
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({
      emailId: emailId,
    });

    if (!user) {
      throw new Error("Invalid Credentials.");
    }
    const isPasswordValid = await user.validatePassword(password)
    if (isPasswordValid) {

      const token = await user.getJWT();
      // console.log(token);

      res.cookie("token", token,{
        expires: new Date(Date.now() + 8*3600000  )
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credentials.");
    }
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token",null,{
        expires: new Date(Date.now())
    });
    res.send("Logout successfull !!");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = authRouter;