import express from "express";
import { authMiddleware } from "../middleware.js";
import { Account } from "../db.js";
import {z} from "zod";
import mongoose from "mongoose";

const router = express.Router();

const {ObjectId} = mongoose.Schema.Types;

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const id = req.id;
    const account = await Account.findOne({ userId: id }, { balance: true });
    return res.status(200).json({
      balance: account.balance,
    });
  } catch (err) {
    return res.status(411).json({
      error: "Error occured " + err,
    });
  }
});

const transferSchema = z.object({
    to: z.string(),
    amount: z.string()
});

router.post("/transfer",authMiddleware,async (req,res) => {
    const {success} = transferSchema.safeParse(req.body);
    console.log(req.body);
    if(!success){
        return res.status(411).json({
            message: "Invalid body"
        });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const fromId = req.id;
        const to = req.body.to;
        const amount = Number(req.body.amount);
        const toId = new mongoose.Types.ObjectId(to);

        const b = await Account.findOne({userId: fromId},{balance: true});
        if(b.balance < amount){
            throw new Error("Not Sufficient balance");
        }

        const e = await Account.findOne({userId: toId});
        if(!e){
            throw new Error("To user is not there");
        }

        await Account.updateOne({userId: fromId},{$inc: {balance: -amount}},{session});
        await Account.updateOne({userId: toId},{$inc: {balance: amount}},{session});
        await session.commitTransaction();

        return res.status(201).json({
            message: "Transaction Sucessfull"
        })
    }
    catch(err){
        session.abortTransaction();
        return res.status(411).json({
            error: "Error Occured " + err
        })
    }
})

export default router;
