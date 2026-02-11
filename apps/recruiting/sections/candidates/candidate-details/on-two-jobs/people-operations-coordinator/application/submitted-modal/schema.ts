import * as Yup from "yup";

export const schema = Yup.object({
  datePicker: Yup.string().required("Date is required"),
});

export const defaultValues = {
  datePicker: "",
};
