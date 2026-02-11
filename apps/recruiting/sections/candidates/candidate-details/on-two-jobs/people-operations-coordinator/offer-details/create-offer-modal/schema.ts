import * as Yup from "yup";

export const schema: any = Yup.object({
  opening: Yup.object().required("Opening is required"),
  startDate: Yup.string(),
  employmentType: Yup.string().required("Employment type is required"),
  salary: Yup.string(),
});

export const defaultValues = {
  opening: null,
  startDate: "",
  employmentType: "",
  salary: "",
};
