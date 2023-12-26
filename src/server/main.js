import cookieParser from "cookie-parser";
import express from "express";
import ViteExpress from "vite-express";
import userRoute from "./routes/user.route.js";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route.js";
import { JWTCheck, JWTTokenAuthPages } from "./lib/authMiddleware/JwtToken.js";
const app = express();

app.use((req, res, next) => {
  res.header("Content-Type", "text/html; charset=utf-8");
  next();
});
app.use(cookieParser());
app.use(bodyParser.json());
// api middlware
app.use("/user", JWTCheck, userRoute);
app.use("/api/v1/user", JWTCheck, userRoute);
app.use("/files", JWTCheck, userRoute);
app.use("/api/v1/auth", authRoute);


// auth pages middlware
app.use("/sign-up", JWTTokenAuthPages);
app.use("/sign-in", JWTTokenAuthPages);
app.get("/", JWTTokenAuthPages);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
const PORT = process.env.PORT || 3000;
ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000...")
);
