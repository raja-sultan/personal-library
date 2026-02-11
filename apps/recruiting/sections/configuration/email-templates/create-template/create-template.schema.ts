import * as Yup from "yup";

const emailCcSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const schema = Yup.object({
  template_name: Yup.string().required("Template name is required"),
  from: Yup.object().required("Email is required"),
  cc: Yup.array()
    .of(emailCcSchema)
    .required("Array of companies is required")
    .min(1, "At least one email is required"),
  email_subject: Yup.string().required("Subject is required"),
  emailType: Yup.string().required("Email Type is required"),
});

export const defaultValues: any = {
  template_name: "",
  from: null,
  cc: [],
  attachment: "",
  email_subject: "",
  email_body: "",
  description: "",
  emailType: "",
};

// export const schema = Yup.object({
//   // template_name: Yup.string()
//   //   .nullable()
//   //   .test("check null", "Template name is required", (value) => value !== null),
//   template_name: Yup.string().required("Template name is required"),
//   form: Yup.string()
//     .email("Invalid email format")
//     .required("Sender is required"),
//   cc: Yup.array()
//     .of(Yup.string().email("Invalid email format"))
//     .nullable(),
//   email_subject: Yup.string().required("Subject is required"),
//   emailType: Yup.string().required("Email Type is required"),
// });

// interface TemplateInterface {
//   template_name: string;
//   form: string;
//   cc: string[];
//   attachment: string;
//   email_subject: string;
//   email_body: string;
//   description: string;
//   emailType: string;
// }

// export const defaultValues: TemplateInterface = {
//   template_name: "",
//   form: "",
//   cc: [],
//   attachment: "",
//   email_subject: "",
//   email_body: "",
//   description: "",
//   emailType: "",
// };
