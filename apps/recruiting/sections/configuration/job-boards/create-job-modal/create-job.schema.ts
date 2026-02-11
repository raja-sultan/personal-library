import * as Yup from "yup";

export const schema = Yup.object({
  name: Yup.string().required("Board name required"),
  url: Yup.string().required("URL required"),
});

export const defaultValues = {
  name: "",
  logo: {},
  description: "",
  url: "",
};
