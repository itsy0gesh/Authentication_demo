import userModel from "../model/userModel.js";
import catchAsync from "../catchAsync.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const signToken = (id, username, email, role) => {
  return jwt.sign(
    { id: id.toString(), username: username, email: email, role: role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

export const createUser = catchAsync(async (req, res, next) => {
  const { email, password, confirmpassword } = req.body;

  if (!email || !password || !confirmpassword)
    return res.status(400).send("provide info");

  const existingUser = await userModel.findOne({ email });
  if (existingUser) return res.status(401).send("already a user");

  if (password !== confirmpassword)
    return res.status(402).send("password mismatch");

  const name = email.substring(0, email.indexOf("@"));
  const newUser = await userModel.create({
    username: name,
    email: email,
    password: password,
  });

  const jwtToken = signToken(
    newUser._id,
    newUser.username,
    newUser.email,
    newUser.role
  );
  res.cookie("authToken", jwtToken, { secure: true });

  res.status(201).json({
    status: "success",
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send("provide info");

  const user = await userModel.findOne({ email }).select("+password");

  if (!user || (await bcrypt.compare(user.password, password))) {
    return next(res.status(401).send("invalid user"));
  }

  const jwtToken = signToken(user._id, user.username, user.email, user.role);
  res.cookie("authToken", jwtToken, { secure: true });

  res.status(201).json({
    status: "success",
    username: user.username,
    email: user.email,
  });
  next();
});

// export const jwtData = catchAsync(async ()=>{
//   const token="jwtToken";
//   const decodedJwt = await jwt.verify(token,process.env.JWT_SECRET);
//   console.log(decodedJwt.email);
//   res.
//   next();
// });
