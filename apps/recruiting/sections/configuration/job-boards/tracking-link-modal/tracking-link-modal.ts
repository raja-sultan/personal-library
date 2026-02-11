import * as Yup from "yup";

export const schema = Yup.object({
  url: Yup.string().required("URL required"),
});

export const defaultValues = {
  url: "",
};
