import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  aboutFeedback: Yup.array()
    .min(1, "Feedback about is required")
    .required("Feedback about is required")
    .nullable(),
  yourFeedback: Yup.string().required("Your feedback is required").max(500, "Your feedback should have maximum 500 characters"),
});
