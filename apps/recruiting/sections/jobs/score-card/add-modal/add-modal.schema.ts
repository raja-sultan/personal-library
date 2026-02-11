import * as Yup from "yup";

export interface categoryType {
  category: string;
}
export const defaultValues: categoryType = {
  category: "",
};
export const schema = Yup.object({
  category: Yup.string().required("Category is required"),
});
