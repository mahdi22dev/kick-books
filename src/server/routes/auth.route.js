import express from "express";
import { logout, signin, signup } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/signup", signup);
authRoute.post("/signin", signin);
authRoute.get("/logout", logout);
export default authRoute;
