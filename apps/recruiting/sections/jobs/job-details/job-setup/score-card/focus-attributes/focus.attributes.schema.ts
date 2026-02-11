import * as Yup from "yup";

export const schema = Yup.object({
  name: Yup.string(),
  isSelected: Yup.boolean(),
});

export const defaultValues = {
  name: "",
  isSelected: false,
};
