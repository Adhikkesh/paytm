import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
  "mongodb+srv://adhikkesh:1234@cluster0.lazkv.mongodb.net/Users"
);

const schema = mongoose.Schema;
const myschema = new schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", myschema);

app.post("/signup", async (req, res) => {
  const { firstname, lastname, password } = req.body;
  //   const firstname = res.body.firstname;
  //   const lastname = res.body.lastname;
  //   const password = res.body.password;

  const alreadyExist = await User.findOne({ firstname, lastname });

  if (alreadyExist) {
    console.log("User Already Exist");
  } else {
    const newUser = new User({
      firstname,
      lastname,
      password,
    });
    newUser.save();
    console.log("Successfully registered");
  }
});

app.post("/login", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;

  const exist = User.findOne({
    firstname: firstname,
    lastname: lastname,
    password: password,
  });
  if (exist) {
    console.log("Access Granted");
  } else {
    console.log("Incorrect Username and Password");
  }
});

app.patch("/update",(req,res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;



  const user = {
    firstname: firstname ? firstname : "",
    lastname: lastname ? lastname : "",
    password: password ? password : ""
  };

  



})

app.listen(3000, () => {});
