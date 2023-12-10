import jwt from "jsonwebtoken";
import { AuthErrorHandler } from "../ErrorHandler.js";

export const JWTCheck = (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;
    if (!token) {
      return res.redirect("/sign-in");
    }
    const user = jwt.verify(
      token,
      process.env.MY_SECRET || "efwfwfwt5t65464yregweffwr45wfwefwef"
    );
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    res.clearCookie("access_token");
    AuthErrorHandler(req, res, error);
  }
};

export const JWTTokenAuthPages = (req, res, next) => {
  const token = req?.cookies?.access_token;
  if (token) {
    return res.redirect("/user/dashboard");
  } else {
    next();
  }
};
