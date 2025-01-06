import express from "express";
import { User, Account } from "../db.js";
import { z } from "zod";
import { JWT_SECRETKEY } from "../config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middleware.js";

const router = express.Router();
const SECRETKEY = JWT_SECRETKEY;
const saltrounds = 10;

const hashPassword = async (plaintext) => {
  try {
    const hash = await bcrypt.hash(plaintext, saltrounds);
    return hash;
  } catch (err) {
    throw err;
  }
};

router.get("/", authMiddleware, (req, res) => {
  res.status(201).json({
    Message: "Successful",
  });
});

const signupSchema = z.object({
  username: z.string().email("Invalid email"),
  firstname: z
    .string()
    .nonempty("First name required")
    .min(2, "Firstname must be atleast 2 letters"),
  lastname: z.string().optional(),
  password: z
    .string()
    .nonempty("Password is Required")
    .min(2, "Lastname must be atleast 2 letters"),
});

router.post("/signup", async (req, res) => {
  const validation = signupSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      error: validation.error.errors,
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

    const newAccount = new Account({
      userId: newUser._id,
      balance: Math.floor(Math.random() * 10000) + 1,
    });
    await newAccount.save();

    const token = jwt.sign({ id: newUser._id }, SECRETKEY, { expiresIn: "1h" });

    res.status(201).json({
      message: "User successfully registered",
      token: token,
      user: newUser,
      Account: newAccount,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error occured" + err,
    });
  }
});

const signinSchema = z.object({
  username: z.string().email("Invalid email"),
  password: z.string().nonempty("Invalid Password"),
});

router.post("/signin", async (req, res) => {
  const validation = signinSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(411).json({
      err: validation.error.errors,
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

    const result = await bcrypt.compare(req.body.password, exist.password);
    if (result) {
      const token = jwt.sign({ id: exist._id }, SECRETKEY, { expiresIn: "1h" });
      return res.status(200).json({
        message: "Token Generated, you have logged in",
        token: token,
        user: {
          username: exist.username,
          firstname: exist.firstname,
          lastname: exist.lastname,
          password: result,
        },
      });
    } else {
      return res.status(500).json({
        error: "Incorrect Password",
      });
    }
  } catch (err) {
    return res.status(500).json({
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

    await User.updateOne(
      { _id: id },
      {
        $set: {
          firstname: firstname,
          lastname: lastname,
          password: password,
        },
      }
    );

    return res.status(201).json({
      message: "Updated Successfully",
    });
  } catch (err) {
    return res.status(411).json({
      message: "Error Occured " + err,
    });
  }
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const user = await User.find(
      {
        $or: [
          { firstname: { $regex: filter } },
          { lastname: { $regex: filter } },
        ],
      },
      { id: true, username: true, firstname: true, lastname: true }
    );
    return res.status(200).json({
      users: user,
    });
  } catch (err) {
    return res.status(411).json({
      message: "Error occurred " + err,
    });
  }
});

router.post("/getuser",authMiddleware,async (req,res) => {
  const userId = req.id;
  try{
    const user = await User.findOne({_id: userId});
    const account = await Account.findOne({userId: userId});
    return res.status(201).json({
      name: user.firstname,
      balance: account.balance,
      username: user.username
    })
  }catch(err){
    return res.status(411).json({
      error: "Error Occured"
    })
  }
})

export default router;
