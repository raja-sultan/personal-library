import * as Yup from "yup";

export const schema = Yup.object({
  // template: Yup.string(),
  from: Yup.string().required("Sender is required"),
  recipients: Yup.array()
    .of(Yup.string())
    .min(1, "At least 1 recipient required")
    .required("recipients"),
  subject: Yup.string().required("Subject Required"),
  emailSendAt: Yup.string().required("Select Time"),
});

export const defaultValues = {
  template: ["None"],
  from: "info@personnelibrary.co.uk",
  recipients: [],
  ccRecipients: [],
  subject: "",
  html: "",
  emailSendAt: "",
  resume: "",
  ccMe: false,
};
