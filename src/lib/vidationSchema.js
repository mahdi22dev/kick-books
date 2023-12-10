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
