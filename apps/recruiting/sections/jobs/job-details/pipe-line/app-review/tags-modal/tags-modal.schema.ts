import * as Yup from "yup";
import type { tagsTypes } from "./tags-modal.types";

export const schema = Yup.object({
  tags: Yup.string().required("required"),
});

export const defaultValues: tagsTypes = {
  tags: "",
};
