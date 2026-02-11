import * as Yup from "yup";

export const schema = Yup.object({
  custom: Yup.string().required("required"),
  before: Yup.string().required("required"),
  days: Yup.string().required("required"),
});

export const defaultValues = {
  custom: "",
  before: "",
  days: "",
};
