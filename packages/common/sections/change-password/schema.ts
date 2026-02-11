import * as Yup from "yup";
import type { ChangePasswordTypes } from "./types";

export const changePasswordInitialValue: ChangePasswordTypes = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
export const schema = Yup.object({
  oldPassword: Yup.string().required("current Password is required"),
  // newPassword: Yup.string().required("new Password is required"),
  newPassword: Yup.string()
  .required("New Password is required")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
