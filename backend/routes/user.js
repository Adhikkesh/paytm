import express from "express";
import { User } from "../db.js";
import { z } from "zod";
import { JWT_SECRETKEY } from "../config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware } from "../../middleware.js";

const app = express();
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

router.get("/", authMiddleware, (req, res) => {
  res.status(201).json({
    Message: "Successfull",
  });
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

const updateSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  password: z.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error in Input Data",
    });
  }

  try {
    const id = req.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(411).json({
        message: "token is verified but id is not present in the database",
      });
    }

    const firstname = req.body.firstname || user.firstname;
    const lastname = req.body.lastname || user.lastname;
    let password = req.body.password || user.password;
    if (req.body.password) {
      const hashedPassword = await hashPassword(req.body.password);
      password = hashedPassword;
    }

    await User.updateOne({
      firstname: firstname,
      lastname: lastname,
      password: password,
    });

    return res.status(201).json({
      message: "Updated Successfully",
    });
  } catch (err) {
    return res.status(411).json({
      message: "Error Occured " + err,
    });
  }
});

const bulkSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

router.get("/bulk", (req, res) => {
  const { success } = bulkSchema.safeParse(req.body);
  if (!success) {
    
  }
});

export default router;
