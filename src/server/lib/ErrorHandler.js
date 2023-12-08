export const APIErrorHandler = (req, res, error) => {
  if (error.name === "TokenExpiredError") {
    console.log("Token has expired");
    return res.status(401).json({
      success: false,
      request: null,
      message: "Your Not Authorized",
    });
  } else if (error.name === "JsonWebTokenError") {
    console.log("Invalid token");
    return res.status(401).json({
      success: false,
      request: null,
      message: "Your Not Authorized",
    });
  } else {
    console.error(error.message);
    returnres.status(401).json({
      success: false,
      request: null,
      message: "Your Not Authorized",
    });
  }
};

export const AuthErrorHandler = (req, res, error) => {
  if (error.name === "TokenExpiredError") {
    console.log("Token has expired");
    return res.redirect("/sign-in");
  } else if (error.name === "JsonWebTokenError") {
    console.log("Invalid token");
    return res.redirect("/sign-in");
  } else {
    console.error(error.message);
    return res.redirect("/sign-in");
  }
};
