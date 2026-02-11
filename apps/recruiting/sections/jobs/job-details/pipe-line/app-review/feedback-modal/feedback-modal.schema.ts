import * as Yup from "yup";
import type { feedbackModalTypes } from "./feedback-modal.types";

export const schema = Yup.object({
  feedback: Yup.string().required("required"),
});

export const defaultValues: feedbackModalTypes = {
  feedback: "",
};
