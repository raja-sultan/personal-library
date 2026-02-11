import type { ResetPasswordFormTypes } from "./reset-password.types";
import * as Yup from "yup";

const passwordValidationReg =
  /^.*(?=.{8,})((?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const resetPasswordInitialValue: ResetPasswordFormTypes = {
  newPassword: "",
  confirmPassword: "",
};
export const resetPasswordFormSchema: any = Yup.object().shape({
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
