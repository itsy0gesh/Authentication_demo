import express from "express";
import { authenticateUser, createUser } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.route("/")
    .post(createUser);

userRoutes.route("/login")
    .post(authenticateUser);

export default userRoutes;
