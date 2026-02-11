import {
  RHFCheckbox,
  RHFTextField,
  RHFUploadSingleFileWithoutPreview,
} from "common";
import * as Yup from "yup";

export const createESignatureTemplateDefaultValues = {
  templateName: "",
  publicFacingName: false,
  sourceFile: "",
  counterSigner: false,
};
export const createESignatureTemplateValidationSchema = Yup.object().shape({
  templateName: Yup.string().required("Template name is required"),
  publicFacingName: Yup.boolean().required("Public facing name is required"),
  sourceFile: Yup.string().required("Source file is required"),
  counterSigner: Yup.boolean().required("Counter signer is required"),
});
export const eSignatureTemplateFormData = [
  {
    id: 1,
    componentProps: {
      name: "templateName",
      outerLabel: "Name",
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: "publicFacingName",
      label: "Require a different public facing name?",
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: "sourceFile",
      label: "Select Source File",
      accept: ".pdf, .doc, .docx",
    },

    component: RHFUploadSingleFileWithoutPreview,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: "publicFacingName",
      label: "Require counter signer?",
    },
    component: RHFCheckbox,
    md: 12,
  },
];
