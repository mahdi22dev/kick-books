import { Mime } from "mime";

export const isPDF = (filename) => {
  const mimeType = Mime.lookup(filename);
  return mimeType === "application/pdf";
};
