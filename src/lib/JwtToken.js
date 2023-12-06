import jwt from "jsonwebtoken";
export const JWTCheck = (req, res, next) => {
  const token = req?.cookies?.access_token;
  if (!token) {
    return res.redirect("/");
  }
  const user = jwt.verify(
    token,
    process.env.MY_SECRET || "efwfwfwt5t65464yregweffwr45wfwefwef"
  );
  console.log(user);
  req.user = user;
  console.log(req.user);
  next();
};
