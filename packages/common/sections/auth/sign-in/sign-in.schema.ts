import { getLocalStorage } from "common/utils/local-storage";
import type { SignInFormTypes } from "./sign-in.types";
import * as Yup from "yup";

const data: any = getLocalStorage("rememberMe");

export const signInInitialValue: SignInFormTypes = {
  email: data?.email || "",
  password: data?.password || "",
  loggedIn: data?.loggedIn || false,
};
export const signInFormSchema: any = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter valid email"),
  password: Yup.string().required("Password is required").min(2).max(15),
});
