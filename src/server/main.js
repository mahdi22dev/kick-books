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

// app.get("/api/image/:id", async (req, res) => {
//   const imageId = parseInt(req.params.id, 10);

//   try {

//     if (!image) {
//       return res.status(404).json({ error: "Image not found" });
//     }

//     // Convert the buffer to a Blob and send it to the client
//     const blob = new Blob([image.data], { type: "image/jpeg" });
//     res.setHeader("Content-Type", "image/jpeg");
//     res.status(200).send(blob);
//   } catch (error) {
//     console.error("Error retrieving image from Prisma:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   } finally {
//     await prisma.$disconnect();
//   }
// });

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
