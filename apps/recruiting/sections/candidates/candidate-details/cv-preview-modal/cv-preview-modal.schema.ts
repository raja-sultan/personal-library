import * as Yup from "yup";

export const defaultValues = {
  jobStatus: "Open",
  openDate: "12/01/2023",
};

export const FormSchema = Yup.object().shape({
  jobStatus: Yup.string().required("Job Status is required"),
});

export const fieldsInfo = [
  {
    type: "SELECT_V2",
    name: "jobStatus",
    outerLabel: "Job Status",
    fieldHeader: null,
    options: [
      {
        id: 1,
        label: "Open",
        value: "Open",
      },
      {
        id: 2,
        label: "Close",
        value: "Close",
      },
    ],
    OuterConProps: { md: 6 },
  },
  {
    type: "DATE_PICKER",
    name: "openDate",
    outerLabel: "Open Date",
    disable: true,
    fieldHeader: null,
    OuterConProps: { md: 6 },
  },
];
