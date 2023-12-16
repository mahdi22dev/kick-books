import { prisma } from "../../client/lib/prismaClient.js";
import fs from "fs";

export const EditUsername = (req, res) => {
  try {
    const token = req?.cookies?.access_token;
    const { newUsername } = req?.body;
    console.log(newUsername);
    if (!token || !req.user) {
      return res.status(401).json({
        success: false,
        request: null,
        message: "Your Not Authorized",
      });
    }

    return res.status(201).json({
      success: true,
      request: req.user,
      message: `Username edited successfly ${newUsername}!`,
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export const userUpload = async (req, res) => {
  try {
    const file = req?.file;
    console.log(file.path);
    const user = req?.user;

    // generate buffer
    const contentPDF = fs.readFileSync(file.path);
    // encoding file name
    const encodedFileName = encodeURIComponent(file.originalname);

    await prisma.files.create({
      data: {
        fileName: encodedFileName,
        content: contentPDF,
        categorie: "Politics",
        UserId: user?.id,
        thumbnail: contentPDF,
      },
    });

    // Delete the file from the server
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File deleted");
      }
    });

    res
      .status(201)
      .json({ success: true, file, message: "File Uploaded Successfly" });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      success: false,
      message: "There's an Error Please try Again Later",
    });
  }
};

export const getFiles = async (req, res) => {
  const UserId = req.user.id;
  console.log(UserId);
  try {
    const files = await prisma.files.findMany({
      select: {
        fileName: true,
        id: true,
      },
      where: {
        UserId: UserId,
      },
    });

    res.status(201).json({ success: true, files });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
export const getSingleFile = async (req, res) => {
  const UserId = req.user.id;
  const fileId = req.params.id;
  try {
    const file = await prisma.files.findUnique({
      select: {
        content: true,
        fileName: true,
        id: true,
      },
      where: {
        id: fileId,
        UserId: UserId,
      },
    });

    const base64 = file.content;
    const uniqueSuffix = Date.now();
    const decodedFileName = decodeURIComponent(file.fileName);

    console.log(decodedFileName);
    const FilePath = "./files/tmp/" + uniqueSuffix + "_" + decodedFileName;
    const bufferObject = Buffer.from(base64, "base64");

    fs.writeFile(FilePath, bufferObject, (err) => {
      if (err) throw err;
    });

    if (!file) {
      return res
        .status(404)
        .json({ success: false, message: "file not found" });
    }
    const filePath = uniqueSuffix + "_" + decodedFileName;
    const FileLink =
      "http://localhost:3000/files/tmp/" + uniqueSuffix + "_" + decodedFileName;

    res.status(200).json({
      success: true,
      url: FileLink,
      fileName: decodedFileName,
      filePath,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ success: false, message: error.message });
  }
};

export const DeleteFileAfterDW = async (req, res) => {
  try {
    const filePath = req.params.id;
    console.log("filePath", filePath);
    const fullPath = "./files/tmp/" + filePath;
    fs.unlink(fullPath, (err) => {
      if (err) {
        res.status(404).json({
          success: false,
        });
      } else {
        res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

function makeThumb(page) {
  // draw page to fit into 96x96 canvas
  var vp = page.getViewport(1);
  var canvas = document.createElement("canvas");
  canvas.width = canvas.height = 96;
  var scale = Math.min(canvas.width / vp.width, canvas.height / vp.height);
  return page
    .render({
      canvasContext: canvas.getContext("2d"),
      viewport: page.getViewport(scale),
    })
    .promise.then(function () {
      return canvas;
    });
}
