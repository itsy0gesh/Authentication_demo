import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const data = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please tell ur name"],
    },
    email: {  
      type: String,
      lowercase: true,
      required: [true, "please tell ur email"],
      unique: [true, "user already exist"],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "please provide password"],
      select: false,
    },
    role: {
      type: String,
      enum: ["visitor", "user", "admin"],
    },
  },
  { timestamps: true }
);


data.pre('save',async function(next){
  if (!this.isModified('password'))return next();
  this.password = await bcrypt.hash(this.password,11);
  next();
})

const userModel = mongoose.model("AUTHUSERS", data);

export default userModel;
