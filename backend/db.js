import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://adhikkesh:1234@cluster0.lazkv.mongodb.net/Users"
);

const schema = mongoose.Schema;
const myschema = new schema({
  username: {type: String,required: true,trim: true,unique: true},
  firstname: { type: String, required: true,trim: true},
  lastname: { type: String,trim: true},
  password: { type: String, required: true,trim: true},
});

export const User = mongoose.model("User", myschema);


