import express from "express";
const userRoute = express.Router();

// userRoute.get("/dashboard", (req, res, next) => {
//   next();
// });

userRoute.get("/settings", (req, res, next) => {
  next();
});
export default userRoute;
