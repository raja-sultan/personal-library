import * as Yup from "yup";

export const schema = Yup.object({
  attachment: Yup.string().required("Attachment is required"),
});

export const defaultValues = {
  attachment: "",
};
