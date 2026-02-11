import * as Yup from "yup";

export const schema = Yup.object({
  documents: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
});

export const defaultValues = {
  documents: null,
};
