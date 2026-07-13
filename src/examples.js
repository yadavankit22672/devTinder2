const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);
// app.use("/user", userAuth);
// app.use(
//   "/user",
//   (req, res, next) => {
//     res.send({ message: "This is the user route 1" });
//     next();
//   },
//   (req, res, next) => {
//     res.send({ message: "This is the user route 2" });
//     next();
//   },
//   (req, res, next) => {
//     res.send({ message: "This is the user route 3" });
//     next();
//   },
// );

//Handle Auth Middleware for all the GET, POST, PUT, DELETE request for /admin route
// app.use("/admin", (req, res, next) => {
//   console.log("Admin route accessed");
//   const token = "xyz";
//   const isAdminAuthorized = token === "xyz";
//   if (!isAdminAuthorized) {
//     return res.status(403).send({ message: "Unauthorized access" });
//   } else {
//     next();
//   }
// });

app.get("/getUserData", (req, res) => {
  // logic of DB call to get user data
  // try {  } catch (error) {}
  throw new Error("Database connection failed");
  res.send({ message: "User data sent" });
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/user/getUserData", userAuth, (req, res) => {
  res.send({ message: "User data sent" });
});

app.get("/admin/getAllData", (req, res) => {
  res.send({ message: "All data sent" });
});

app.put("/admin/updateData", (req, res) => {
  res.send({ message: "Data updated successfully" });
});
app.delete("/admin/deleteData", (req, res) => {
  res.send({ message: "Data deleted successfully" });
});

app.use("/admin", (req, res, next) => {
  console.log("Admin route accessed");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    return res.status(403).send({ message: "Unauthorized access" });
  }
  next();
});

app.use("/admin/getAllData", (req, res) => {
  res.send({ message: "All data sent" });
});

app.use("/admin/updateData", (req, res) => {
  res.send({ message: "Data updated successfully" });
});
app.use("/admin/deleteData", (req, res) => {
  res.send({ message: "Data deleted successfully" });
});

app.use(
  "/user",
  (req, res) => {
    res.send({ message: "This is the user route 1" });
  },
  (req, res) => {
    res.send({ message: "This is the user route 2" });
  },
  (req, res) => {
    res.send({ message: "This is the user route 3" });
  },
);
app.use(
  "/user",
  (req, res, next) => {
    res.send({ message: "This is the user route 1" });
    next();
  },
  (req, res, next) => {
    res.send({ message: "This is the user route 2" });
    next();
  },
  (req, res, next) => {
    res.send({ message: "This is the user route 3" });
    next();
  },
);

app.use("/user", (req, res, next) => {
  res.send({ message: "This is the user route 1" });
  next();
});

app.use("/user", (req, res, next) => {
  res.send({ message: "This is the user route 2" });
  next();
});

app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "John", lastName: "Doe" });
});

app.post("/user", (req, res) => {
  res.send("Data successfully saved to the database");
});

app.delete("/user", (req, res) => {
  res.send("Data successfully deleted from the database");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
