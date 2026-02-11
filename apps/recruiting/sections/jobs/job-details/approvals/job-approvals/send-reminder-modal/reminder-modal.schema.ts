import * as Yup from "yup";

export const defaultValues = {
  detail: "",
};

export const FormSchema = Yup.object().shape({
  detail: Yup.string().required("Reminder is required"),
});
