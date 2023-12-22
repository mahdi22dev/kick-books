import { app } from "../src/server/main.js";
import ViteExpress from "vite-express";
const PORT = process.env.PORT || 3000;

ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000...")
);
