import { prisma } from "../../client/lib/prismaClient.js";
import fs from "fs";
import { isPDF } from "../lib/utils.js";

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
    const user = req?.user;

    if (isPDF(file.originalname)) {
      const contentPDF = fs.readFileSync(file.path);
      const encodedFileName = encodeURIComponent(file.originalname);

      await prisma.files.create({
        data: {
          fileName: encodedFileName,
          content: contentPDF,
          category: "ALL",
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
    } else {
      res.status(400).json({
        success: true,
        file,
        message:
          "Mismatched type: The provided data is in an incorrect format.",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      success: false,
      message: "There's an Error Please try Again Later",
    });
  }
};

export const getFiles = async (req, res) => {
  const filter = req.params.filter;

  const UserId = req.user.id;
  let files = [];
  try {
    if (filter.toUpperCase() == "ALL") {
      files = await prisma.files.findMany({
        select: {
          fileName: true,
          id: true,
          category: true,
        },
        where: {
          UserId: UserId,
        },
      });
    } else {
      files = await prisma.files.findMany({
        select: {
          fileName: true,
          id: true,
          category: true,
        },
        where: {
          UserId: UserId,
          category: filter.toUpperCase(),
        },
      });
    }
    if (files.length === 0) {
      res.status(404).json({
        success: true,
        error: `files in ${filter} categorie not found`,
      });
    } else {
      res.status(201).json({ success: true, files });
    }
  } catch (error) {
    console.log(error.message);
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

export const addCategorie = async (req, res) => {
  const categorie = req?.body;
  const user = req?.user;
  try {
    await prisma.catogories.create({
      data: {
        name: categorie?.categorie,
        UserId: user?.id,
      },
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
export const getCategories = async (req, res) => {
  const user = req?.user;
  try {
    const data = await prisma.catogories.findMany({
      select: {
        name: true,
        id: true,
      },
      where: {
        UserId: user?.id,
      },
    });
    res.status(200).json({
      success: true,
      categories: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
export const deletCategorie = async (req, res) => {
  const categorie = req?.params?.id;
  try {
    await prisma.user.delete({
      where: {
        id: categorie,
      },
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
