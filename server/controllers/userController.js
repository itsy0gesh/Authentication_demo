import userModel from "../model/userModel.js";
import catchAsync from "../catchAsync.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const createUser = catchAsync(async (req, res, next) => {
  console.log("usercreated");
    const { email } = req.body;
    const name = email.substring(0, email.indexOf('@'));
    const newUser = await userModel.create({
    username: name,
    email: email,
    password: req.body.password,
  });
  const jwtToken = signToken(newUser._id);

  res.status(201).json({
    staus: "success",
    jwtToken,
    data: {
      User: newUser,
    },
  });
});

export const authenticateUser = catchAsync(async (req,res,next)=>{
  
  next();
});
