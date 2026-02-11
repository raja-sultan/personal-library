import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  feedbackReceiverId: Yup.array()
    .required("Feedback about is required")
    .nullable(),
  feedbackVisibility: Yup.string().required("Feedback visibility is required"),
  senderFeedbackText: Yup.string().required("Your feedback is required"),
});
