import path from "path";
import pdf2html from "pdf2html";
import fs from "fs/promises"; // Use fs.promises for Promise-based fs operations

export const isPDF = (filename) => {
  const FileType = path.extname(filename);
  return FileType === ".pdf";
};

export async function getPdfThumbnail(url, outputFileName, outputDirectory) {
  try {
    const options = {
      page: 1,
      imageType: "png",
      width: 160,
      height: 226,
    };
    const thumbnailPath = await pdf2html.thumbnail(url, options);
    // Create the output directory if it doesn't exist
    await fs.mkdir(outputDirectory, { recursive: true });
    // Specify the desired output path and filename
    const outputPath = path.join(outputDirectory, outputFileName + ".png");
    console.log(outputPath);
    // Use fs.promises.copyFile to copy the thumbnail to the desired location
    await fs.copyFile(thumbnailPath, outputPath);
    // Delete the original thumbnail file
    await fs.unlink(thumbnailPath);
    return outputPath;
  } catch (error) {
    console.error("Error generating PDF thumbnail:", error.message);
    return null;
  }
}
