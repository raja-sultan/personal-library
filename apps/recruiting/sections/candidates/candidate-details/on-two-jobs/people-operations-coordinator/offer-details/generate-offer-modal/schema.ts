import * as Yup from "yup";

export const schema = Yup.object({
  // template: Yup.string().required("Template is required"),
});

export const defaultValues = {
  template: ["None"],
};
