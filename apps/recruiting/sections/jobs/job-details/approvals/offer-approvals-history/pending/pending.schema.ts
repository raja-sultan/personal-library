import * as Yup from "yup";

export const defaultValues = {
  detail: "",
};

export const FormSchema = Yup.object().shape({
  detail: Yup.string().required("depName is required"),
});

export const fieldsInfo = [
  {
    type: "TEXT",
    name: "detail",
    outerLabel: "Detail",
    fieldHeader: null,
    OuterConProps: { md: 3 },
  },
];
