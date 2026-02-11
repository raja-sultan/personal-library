import * as Yup from "yup";

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const defaultValues: IChangePassword = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const containsDot = function containsDot(string): any {
  return /^(?=.*[.])/.test(string);
};

export const ValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password should be of minimum 8 characters length"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Please match the given criteria")
    .max(30, "Maximum 30 characters allowed")
    .matches(/^(?=.*[A-Z])/, "Please match the given criteria")
    .matches(/^(?=.*[a-z])/, "Must include atlease 1 small letter")
    .matches(/^(?=.*[!@#\\$%\\^&\\*])/, "Please match the given criteria")
    .test(
      "Should not contain a period",
      "Should not contain a period",
      (value) => !containsDot(value)
    ),
  confirmPassword: Yup.string()
    .required("Confirm new password is required")
    .oneOf([Yup.ref("newPassword")], "Password do not match"),
});
