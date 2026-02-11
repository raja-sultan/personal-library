import * as Yup from "yup";

export const defaultValues = {
  stage: null,
  actions: null,
  whenToSend: null,
  template: null,
  emailFrom: null,
  emailTo: null,
  emailSubject: null,
  emailBody: null,
};

export const FormSchema = Yup.object().shape({
  stage: Yup.object().required("Stage is Required"),
  actions: Yup.object().required("Action is Required"),
  whenToSend: Yup.object().required("Required"),
  template: Yup.object().required("Required"),
  emailFrom: Yup.object().required("Required"),
  emailTo: Yup.string().email("Invalid email address").required("Required"),
  emailSubject: Yup.string().required("Required"),
  emailBody: Yup.string().required("Email Body is Required"),
});
