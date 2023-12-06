import cookieParser from "cookie-parser";
import express from "express";
import ViteExpress from "vite-express";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import bodyParser from "body-parser";
import { JWTCheck } from "../lib/JwtToken.js";
import { JwtAuthCheck } from "../lib/JwtAuthCheck.js";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/user", JWTCheck, userRoute);
app.use("/auth", JwtAuthCheck, authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
