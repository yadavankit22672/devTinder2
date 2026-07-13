const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    // console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // console.log(loggedInUser);
    // loggedInUser.firstName = req.body.firstName
    // loggedInUser.lastName = req.body.lastName
    // loggedInUser.emailId = req.body.emailId
    // loggedInUser.photoUrl = req.body.photoUrl
    // loggedInUser.about = req.body.about
    // loggedInUser.gender = req.body.gender
    // loggedInUser.age = req.body.age
    // loggedInUser.skills = req.body.skills
    await loggedInUser.save();
    res.send({message: `${loggedInUser.firstName}, your profile was updated successfully`,data:loggedInUser});
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = profileRouter;
