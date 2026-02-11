import * as Yup from "yup";

export const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  category: Yup.string().required("Category is required"),
  dueDate: Yup.string(),
  assignedTo: Yup.string(),
  days: Yup.string(),
  attachment: Yup.string(),
});

export const defaultValues = {
  name: "",
  description: "",
  category: "",
  dueDate: "",
  assignedTo: "",
  days: "",
  attachment: "",
};
