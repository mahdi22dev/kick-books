import express from "express";
import {
  EditUsername,
  getFiles,
  getSingleFile,
  userUpload,
} from "../controllers/user.controller.js";
import multer from "multer";
const userRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

userRoute.get("/settings", (req, res, next) => {
  next();
});

userRoute.post("/edit", EditUsername);
userRoute.post("/upload", upload.single("file"), userUpload);
userRoute.get("/get-files", getFiles);
userRoute.get("/get-file/:id", getSingleFile);
export default userRoute;
