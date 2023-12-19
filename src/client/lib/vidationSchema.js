import * as yup from "yup";
export const SingUpschema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required().min(8).max(20),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export const SignInschema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(20),
});

export const UploadSchema = yup.object().shape({
  file: yup.mixed().required("You need to provide a file"),
});
export const CetegorieSchema = yup.object().shape({
  categorie: yup
    .string()
    .min(3, "Please enter at least 3 characters to add categorie")
    .max(10, "max 10 characters are allowed")

    .required("You need to provide a categorie name"),
});
