import type { SetNewPasswordFormTypes } from "./set-password.types";
import * as Yup from "yup";

const passwordValidationReg =
  /^.*(?=.{8,})((?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const setNewPasswordInitialValue: SetNewPasswordFormTypes = {
  // email: "",
  temporaryPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const setNewPasswordFormSchema: any = Yup.object().shape({
  // email: Yup.string().email().required("Invalid Entry"),
  temporaryPassword: Yup.string().required("Invalid Entry"),
  newPassword: Yup.string()
    .required("Invalid Entry")
    .matches(
      passwordValidationReg,
      "Password must contain at least 8 characters, one uppercase, one number and one special character"
    )
    .min(8, "Password should be of minimum 6 characters length")
    .max(15),
  confirmPassword: Yup.string()
    .required("Invalid Entry")
    .oneOf(
      [Yup.ref("newPassword")],
      `Password does't match, Please try again with same password`
    ),
});
