import jwt from "jsonwebtoken";
export const JwtAuthCheck = (req, res, next) => {
  try {
    console.log("auth route check");
    const token = req?.cookies?.access_token;
    const user = jwt.verify(
      token,
      process.env.MY_SECRET || "efwfwfwt5t65464yregweffwr45wfwefwef"
    );

    if (token && user) {
      return res.redirect("/user/dashboard");
    } else {
      next();
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Token has expired");
      return res.redirect("/");
    } else if (error.name === "JsonWebTokenError") {
      console.log("Invalid token");
      return res.redirect("/");
    } else {
      console.error(error);
      return res.redirect("/");
    }
  }
};
