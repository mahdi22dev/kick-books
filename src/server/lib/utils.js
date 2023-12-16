import path from "path";

export const isPDF = (filename) => {
  const FileType = path.extname(filename);
  console.log(FileType);
  return FileType === ".pdf";
};
