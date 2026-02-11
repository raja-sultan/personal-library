import type { ForgotPasswordFormTypes } from "./forgot-password.types";
import * as Yup from "yup";

export const forgotPasswordInitialValue: ForgotPasswordFormTypes = {
  email: "",
};
export const forgotPasswordFormSchema: any = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required("Email is required"),
});
