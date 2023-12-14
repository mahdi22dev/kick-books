import fs from "fs";
import { prisma } from "../../client/lib/prismaClient.js";
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
    console.log(file);
    const user = req?.user;
    const contentPDF = fs.readFileSync(file.path);

    await prisma.files.create({
      data: {
        fileName: file.originalname,
        content: contentPDF,
        categorie: "Politics", // Set the category as needed
        UserId: user?.id, // Replace with the actual user ID
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
      message: "Theres an Error Please try Again Later",
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
  console.log(fileId);
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
    const FilePath = "./files/tmp/" + uniqueSuffix + "_" + file.fileName;
    const bufferObject = Buffer.from(base64, "base64");

    fs.writeFile(FilePath, bufferObject, (err) => {
      if (err) throw err;
      console.log("PDF file saved");
    });

    // send back the file

    if (!file) {
      return res
        .status(404)
        .json({ success: false, message: "file not found" });
    }

    const FileLink =
      "http://localhost:3000/files/tmp/" + uniqueSuffix + "_" + file.fileName;

    res.status(200).json({ success: true, url: FileLink });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ success: false, message: error.message });
  }
};
