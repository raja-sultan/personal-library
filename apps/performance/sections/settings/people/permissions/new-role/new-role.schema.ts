import * as Yup from "yup";

export const roleFormSchema = Yup.object().shape({
  name: Yup.string().max(256, 'Name must be at most 256 characters'),

  description: Yup.string().max(512, 'Name must be at most 512 characters'),
});
