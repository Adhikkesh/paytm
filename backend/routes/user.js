import express from "express";
import { User } from "../db.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { username, firstname, lastname, password } = req.body;

  // Validate that all required fields are present
  if (!username || !firstname || !lastname || !password) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  const alreadyExist = await User.findOne({ username: username });
  if (alreadyExist) {
    return res.status(409).json({
      error: "Username already exists",
    });
  }
  const newUser = new User({
    username,
    firstname,
    lastname,
    password,
  });
  await newUser.save();

  res.status(201).json({
    message: "User successfully registered",
    user: {
      username,
      firstname,
      lastname,
    },
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const exist = User.findOne({
    username: username,
    password: password,
  });
  if (exist) {
    console.log("Access Granted");
  } else {
    console.log("Incorrect Username and Password");
  }
});

router.patch("/update", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;

  const user = {
    firstname: firstname ? firstname : "",
    lastname: lastname ? lastname : "",
    password: password ? password : "",
  };
});

export default router;
