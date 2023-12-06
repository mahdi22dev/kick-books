import cookieParser from "cookie-parser";
import express from "express";
import ViteExpress from "vite-express";
import userRoute from "./routes/user.route.js";
import bodyParser from "body-parser";
import { JWTCheck } from "../lib/JwtToken.js";
import authRoute from "./routes/auth.route.js";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/user", JWTCheck, userRoute);
app.use("/auth", authRoute);

app.use("/sign-up", (req, res, next) => {
  const token = req?.cookies?.access_token;
  if (token) {
    return res.redirect("/user/dashboard");
  } else {
    next();
  }
});
app.use("/sign-in", (req, res, next) => {
  const token = req?.cookies?.access_token;
  if (token) {
    return res.redirect("/user/dashboard");
  } else {
    next();
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
