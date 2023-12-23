import express from "express";
import path from "path";
import {
  DeeleteFile,
  DeleteFileAfterDW,
  EditUsername,
  addCategorie,
  deletCategorie,
  getCategories,
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
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

userRoute.get("/settings", (req, res, next) => {
  next();
});

userRoute.post("/edit", EditUsername);

// files
userRoute.post("/upload", upload.single("file"), userUpload);
userRoute.get("/get-files/q/:filter/p/:page", getFiles);
userRoute.get("/get-file/:id", getSingleFile);
userRoute.get("/d/:id", DeleteFileAfterDW);
userRoute.get("/file/d/:id", DeeleteFile);
userRoute.get("/file/d/:id", DeeleteFile);
// categories
userRoute.post("/categorie/add", addCategorie);
userRoute.get("/categorie/get", getCategories);
userRoute.get("/categorie/d/:id", deletCategorie);

userRoute.post("/categorie/add", addCategorie);
userRoute.get("/categorie/get", getCategories);
userRoute.get("/categorie/d/:id", deletCategorie);
export default userRoute;
