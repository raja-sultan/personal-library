import * as Yup from "yup";

export const officeFormSchema = Yup.object().shape({
  officeName: Yup.string().required("Office Name is required"),
  location: Yup.string().required("Location Name is required"),
});
