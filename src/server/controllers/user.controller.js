export const dashboard = (req, res, err, next) => {
  next();
  return res.redirect("/user/dashboard");
};
export const settings = (req, res, err, next) => {
  next();
  return res.redirect("/user/Settings");
};
