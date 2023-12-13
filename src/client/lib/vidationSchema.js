import * as yup from "yup";
export const SingUpschema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required(),
});
export const SignInschema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const UploadSchema = yup.object().shape({
  file: yup.mixed().required("You need to provide a file"),
  // .test(
  //   "fileSize",
  //   "The file is too large",
  //   (value) => value && value[0].size <= 20000
  // )
  // .test(
  //   "type",
  //   "Only PDF format is accepted",
  //   (value) => value && value[0].type === "application/pdf"
  // ),
});
