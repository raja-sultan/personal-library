import * as Yup from "yup";

export const schema = Yup.object({
  upload: Yup.string().required("upload is required"),
});

export const defaultValues = {
  upload: "",
};
