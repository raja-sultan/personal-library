import * as Yup from "yup";

export interface formDataTypes {
  category: string;
  attributes: string[];
}

export const defaultValues: formDataTypes = {
  category: "",
  attributes: [""],
};

export const schema = Yup.object({
  category: Yup.string().required("category is required"),
  attributes: Yup.array().required(),
});
