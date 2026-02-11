import * as Yup from "yup";

export const schema = Yup.object({
  templateName: Yup.string().required("Sender is required"),
  templateDescription: Yup.string().required("Sender is required"),
  department: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  location: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  status: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  criteria: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  day: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  time: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  answered: Yup.string().required("Subject required"),
  recipients: Yup.string().when("shouldSendEmail", {
    is: true,
    then: (res) => res.required("Recipient required"),
  }),
  subject: Yup.string().required("Subject required"),
});

export const defaultValues = {
  templateName: "",
  templateDescription: "",
  department: null,
  location: null,
  status: null,
  criteria: null,
  day: null,
  time: null,
  answered: "",
  recipients: "",
  subject: "",
  html: "",
};
