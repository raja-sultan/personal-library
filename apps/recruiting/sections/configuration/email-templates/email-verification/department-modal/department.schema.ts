import * as Yup from "yup";

export const schema = Yup.object({
  from: Yup.string().required("Sender is required"),
  recipients: Yup.string().when("shouldSendEmail", {
    is: true,
    then: (res) => res.required("Recipient required"),
  }),
  subject: Yup.string().required("Subject required"),
});

export const defaultValues = {
  from: "info@personnelibrary.co.uk",
  recipients: "",
  ccRecipients: [],
  subject: "",
  html: "",
  emailSendAt: "",
};
