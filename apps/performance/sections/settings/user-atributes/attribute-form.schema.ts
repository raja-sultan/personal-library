import * as Yup from "yup";

export const userAttributesSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(30)
    .matches(/^[A-Za-z\s]+$/, "Name should only contain alphabets"),
  visibility: Yup.string().required("Visibility is required"),
  // options: Yup.array().min(1, "Options are required"),
});

export const EditUserAttributesSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  visibility: Yup.string().required("Visibility is required"),
});
