import * as Yup from "yup";

export const schema = Yup.object({
  templateName: Yup.string().required("Sender is required"),
  subject: Yup.string().required("Subject required"),
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
});

export const defaultValues = {
  templateName: "",
  subject: "",
  html: "",
  department: null,
  location: null,
  status: null,
  criteria: null,
};
