import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  askFeedback: Yup.object().shape({
    id: Yup.string().required("ID is required"),
    name: Yup.string().required("Name is required"),
    value: Yup.string().required("Value is required"),
  }).required("Ask feedback details are required"),
  aboutFeedback: Yup.object().shape({
    id: Yup.string().required("ID is required"),
    name: Yup.string().required("Name is required"),
    value: Yup.string().required("Value is required"),
  }).required("About feedback details are required"),
  feedbackPrompt: Yup.string().required("Question is required"),
  addType: Yup.string().required("Feedback visibility is required"),
  yourFeedback: Yup.string().required("Your feedback is required").max(500, "Your feedback should have maximum 500 characters"),
});
