import * as Yup from "yup";
import type { DefaultValuesTypes } from "./score-card.types";

export const defaultValues: DefaultValuesTypes = {
  attributes: [""],
};

export const schema = Yup.object({
  attributes: Yup.array().required(),
});

export const editSchema = Yup.object({
  category: Yup.string().required("category is required"),
  attributes: Yup.array().required(),
});

export interface formDataTypes {
  category: string;
  attributes: string[];
}
