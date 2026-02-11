import * as Yup from "yup";

export const departmentFormSchema = Yup.object().shape({
  departmentName: Yup.string().required("Department Name is required"),
});
