import * as Yup from "yup";
import {
  RHFTelInput,
  RHFTextField,
  RHFUploadSingleFileWithoutPreview,
} from "common";

export const schema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  education: Yup.array().of(
    Yup.object().shape({
      schoolName: Yup.string().required("School Name is required"),
      degree: Yup.string().required("Degree is required"),
    })
  ),
});

export const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  resume: {},
  coverLetter: {},
  linkedInProfile: "",
  website: "",
  education: [],
};

export const applyNowData = [
  {
    id: 1,
    componentProps: {
      name: "firstName",
      outerLabel: "First Name",
      placeholder: "Task name",
      size: "medium",
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 2,
    componentProps: {
      name: "lastName",
      outerLabel: "Last Name",
      placeholder: "Task name",
      size: "medium",
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      name: "email",
      outerLabel: "Email",
      placeholder: "Task name",
      size: "medium",
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 4,
    componentProps: {
      name: "phone",
      defaultCountry: "GB",
      isOptional: true,
      outerLabel: "Phone Number",
      placeholder: "+xx xxxx xxxxxx",
    },
    component: RHFTelInput,
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      name: "resume",
      label: "Resume",
      accept: ".doc, .docx, .pdf, .rtf",
      outerLabel: "Attachments",
    },
    component: RHFUploadSingleFileWithoutPreview,
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: "coverLetter",
      label: "Cover Letter",
      accept: ".doc, .docx, .pdf, .rtf",
      outerLabel: "Attachments",
    },
    component: RHFUploadSingleFileWithoutPreview,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: "linkedInProfile",
      outerLabel: "Add LinkedIn Profile Link",
      placeholder: "Add LinkedIn Profile Link",
      size: "medium",
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 8,
    componentProps: {
      name: "website",
      outerLabel: "Website",
      placeholder: "www.untitledui.com",
      size: "medium",
    },
    component: RHFTextField,
    md: 12,
  },
];
