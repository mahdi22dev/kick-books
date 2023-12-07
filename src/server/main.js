import cookieParser from "cookie-parser";
import express from "express";
import ViteExpress from "vite-express";
import userRoute from "./routes/user.route.js";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route.js";
import {
  JWTCheck,
  JWTTokenAuthAPI,
  JWTTokenAuthPages,
} from "./lib/authMiddleware/JwtToken.js";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
// api middlware
app.use("/user", JWTCheck, userRoute);
app.use("/auth", authRoute);
// auth pages middlware
app.use("/sign-up", JWTTokenAuthPages);
app.use("/sign-in", JWTTokenAuthPages);
app.get("/", JWTTokenAuthPages);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
