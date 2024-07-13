import express from "express";
import { login, createUser } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.route("/")
    .post(createUser);

userRoutes.route("/login")
    .post(login);

export default userRoutes;
