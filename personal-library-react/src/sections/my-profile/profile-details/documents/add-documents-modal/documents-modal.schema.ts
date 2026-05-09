import * as Yup from "yup";

export const schema = Yup.object({
  upload: Yup.string().required("Upload is required"),
});

export const defaultValues = {
  upload: "",
};
