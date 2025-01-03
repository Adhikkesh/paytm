import express from "express";
import { User } from "../db.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, firstname, lastname, password } = req.body;

  const alreadyExist = await User.findOne({ username });
  console.log(alreadyExist);
  if (alreadyExist) {
    console.log("User Already Exist");
  } else {
    const newUser = new User({
      username,
      firstname,
      lastname,
      password,
    });
    newUser.save();
    console.log("Successfully registered");
  }
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
