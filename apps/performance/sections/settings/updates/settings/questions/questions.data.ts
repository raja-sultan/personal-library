// import type { DefaultData } from "./questions.types";
import * as Yup from "yup";

export const questionSchema = Yup.object().shape({
  question: Yup.string().required(),
});

export const defaultValues = {
  question:"",
};

