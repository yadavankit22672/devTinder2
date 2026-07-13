const express = require("express");
const connectDB = require("./config/database");
const { User } = require("./models/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;



const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")


app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/",userRouter)

// app.get("/user",userAuth, async (req, res) => {
//   const userEmail = req.body.emailId;

//   try {
//     const user = await User.find({ emailId: userEmail });
//     if (user.length === 0) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     return res.status(200).json({ message: "User fetched successfully", user });
//   } catch (error) {
//     return res.status(500).json({ message: "User fetch failed" });
//   }
// });

// app.get("/feed",userAuth, async (req, res) => {
//   try {
//     const user = await User.find({});
//     return res.status(200).json({ message: "User fetched successfully", user });
//   } catch (error) {
//     return res.status(500).json({ message: "User fetch failed" });
//   }
// });

// app.delete("/user",userAuth, async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     //  const user = await User.findByIdAndDelete({_id:userId})
//     const user = await User.findByIdAndDelete(userId);
//     if (!user) {
//       return res.status(400).send("User not found");
//     }
//     res.status(200).send("User deleted successfully");
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// app.patch("/user/:userId",userAuth, async (req, res) => {
//   const userId = req.params?.userId;
//   console.log(userId);
//   //  console.log(_id)
//   const data = req.body;
//   //  console.log(data)

//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

//     const isUpdateAllowed = Object.keys(data).every((key) =>
//       ALLOWED_UPDATES.includes(key),
//     );

//     console.log(isUpdateAllowed);

//     if (!isUpdateAllowed) {
//       throw new Error("Invalid updates");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("Update not allowed");
//     }

//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocumentL: "after",
//       runValidators: true,
//     });
//     // console.log(user)
//     return res.status(200).send("User updated successfully");
//   } catch (error) {
//     return res.status(400).send("UPDATE FAILED " + error);
//   }
// });

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:");
    console.error(err);
  });
