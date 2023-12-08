import express from "express";
import { EditUsername } from "../controllers/user.controller.js";
const userRoute = express.Router();

// userRoute.get("/dashboard", (req, res, next) => {
//   next();
// });

userRoute.get("/settings", (req, res, next) => {
  next();
});

userRoute.post("/edit", EditUsername);

export default userRoute;
