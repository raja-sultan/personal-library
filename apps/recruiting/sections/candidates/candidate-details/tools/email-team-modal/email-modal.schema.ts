import * as Yup from "yup";

export const schema = Yup.object({
  template: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  from: Yup.string().required("Sender is required"),
  recipients: Yup.string().when("shouldSendEmail", {
    is: true,
    then: (res) => res.required("Recipient required"),
  }),
  subject: Yup.string().required("Subject required"),
  emailSendAt: Yup.string().required("Select Time"),
});

export const defaultValues = {
  template: null,
  from: "info@personnelibrary.co.uk",
  recipients: "",
  ccRecipients: [],
  subject: "",
  html: "",
  emailSendAt: "",
  candidateProfile: false,
};
