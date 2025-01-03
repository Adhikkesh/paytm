import express from "express";
import { User } from "../db.js";
import { z } from "zod";
import { JWT_SECRETKEY } from "../config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
const SECRETKEY = JWT_SECRETKEY;
const saltrounds = 10;


const hashPassword = (plaintext) => {
  try {
    const hash = bcrypt.hash(plaintext, saltrounds);
    return hash;
  } catch (err) {
    throw err;
  }
};

const signupSchema = z.object({
  username: z.string().nonempty("Username required"),
  firstname: z.string().nonempty("First name required"),
  lastname: z.string().optional("lastname is optional"),
  password: z.string().nonempty("Password is Required"),
});


router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      error: "Incorrect Inputs",
    });
  }

  try {
    const alreadyExist = await User.findOne({ username: req.body.username });
    if (alreadyExist) {
      return res.status(409).json({
        error: "Username already exists",
      });
    }

    const hashedPassword = await hashPassword(req.body.password);
    const newUser = new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, SECRETKEY, { expiresIn: "1h" });

    res.status(201).json({
      message: "User successfully registered",
      token: token,
    });
  } catch (err) {
    res.status(411).json({
      error: "Error occured" + err,
    });
  }
});


const signinSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is Required"),
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      err: "Enter the Username and password both",
    });
  }

  try {
    const exist = await User.findOne({
      username: req.body.username,
    });
    if (!exist) {
      return res.status(411).json({
        message: "User not found",
      });
    }

    const result = bcrypt.compare(req.body.password, exist.password);
    if (result) {
      const token = jwt.sign({ id: exist._id }, SECRETKEY, { expiresIn: "1h" });
      res.status(200).json({
        message: "Token Generated, you have logged in",
        token: token,
        user: {
          username: exist.username,
          firstname: exist.firstname,
          lastname: exist.lastname,
        },
      });
    } else {
      res.status(411).json({
        message: "Error while Logging in",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Error during login",
    });
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
