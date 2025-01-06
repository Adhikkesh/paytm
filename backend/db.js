import mongoose from "mongoose";
import "dotenv/config"

mongoose.connect(process.env.DB_URL);

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const myschema = new schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstname: { type: String, required: true, trim: true, maxLength: 50 },
  lastname: { type: String, required: true, trim: true, maxLength: 50 },
  password: { type: String, required: true, trim: true, minLength: 4 },
});

const bankSchema = new schema({
  userId: { type: ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
});

export const User = mongoose.model("User", myschema);
export const Account = mongoose.model("Account", bankSchema);
