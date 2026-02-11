import * as Yup from "yup";

export const schema = Yup.object({
  formName: Yup.string().required("Form Name is required"),
  // jobStage: Yup.object().required("jobStage is required"),
  //   recipients: Yup.array()
  //     .of(Yup.string())
  //     .min(1, "At least 1 recipient required")
  //     .required("recipients"),
  //   subject: Yup.string().required("Subject Required"),
  //   emailSendAt: Yup.string().required("Select Time"),
});

export const defaultValues = {
  from: "info@personnelibrary.co.uk",
  subject: "",
  body: "",
  availableToken: "",
  //-----Form-------//
  formName: "",
  //-----Form2-------//
  jobStage: null,
  recruiter: false,
  coordinator: false,
  others: false,
  users: null,
};
