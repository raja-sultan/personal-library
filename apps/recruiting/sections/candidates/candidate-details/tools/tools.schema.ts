import * as Yup from "yup";

export const schema = Yup.object({
  notEmail: Yup.boolean(),
});

export const defaultValues = {
  notEmail: false,
};
