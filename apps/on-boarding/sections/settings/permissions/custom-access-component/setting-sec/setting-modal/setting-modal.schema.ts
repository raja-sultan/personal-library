import * as Yup from "yup";

export const defaultValues = {
  roleName: "",
};

export const FormSchema = Yup.object().shape({
  roleName: Yup.string().required("Role Name is required"),
});

