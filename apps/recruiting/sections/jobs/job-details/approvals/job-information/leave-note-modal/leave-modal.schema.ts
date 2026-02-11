import * as Yup from "yup";
import type { detailModalTypes } from "./leave-modal.types";

export const defaultValues: detailModalTypes = {
  // note: "",
  text: "",
  addedBy: "",
  createdAt: "",
  note: ""
};

export const FormSchema = Yup.object().shape({
  note: Yup.string().required("Detail is required"),
});
