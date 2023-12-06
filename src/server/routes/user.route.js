import express from "express";
import { dashboard, settings } from "../controllers/user.controller.js";
const userRoute = express.Router();

userRoute.get("/dashboard", dashboard);
userRoute.get("/settings", settings);
export default userRoute;
