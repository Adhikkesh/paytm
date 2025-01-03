import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://adhikkesh:1234@cluster0.lazkv.mongodb.net/Users"
);

const schema = mongoose.Schema;
const myschema = new schema({
  username: {type: String,required: true,trim: true,unique: true,minlength: 4, maxlength: 30},
  firstname: { type: String, required: true,trim: true,minlength: 2, maxlength: 50},
  lastname: { type: String, required: true,trim: true,minlength: 2, maxlength: 50},
  password: { type: String, required: true,trim: true,minlength: 2, maxlength: 12},
});

export const User = mongoose.model("User", myschema);


