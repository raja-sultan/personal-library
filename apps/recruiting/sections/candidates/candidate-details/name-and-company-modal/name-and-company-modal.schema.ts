import * as Yup from "yup";

export const defaultValues = {
  jobStatus: "Open",
  department: "Human Resource",
  officeName: "Uxbridge, London",
  openDate: "12/01/2023",
  noOfOpenings: "10",
  requisitionID: 0,
  openingId: "18-1",
};

export const FormSchema = Yup.object().shape({
  jobStatus: Yup.string().required("Job Status is required"),
  officeName: Yup.string().required("Office Name is required"),
  department: Yup.string().required("Department is required"),
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
  {
    type: "TEXT",
    name: "openingId",
    outerLabel: "Opening IDs",
    disable: true,
    fieldHeader: null,
    OuterConProps: { md: 6 },
  },
];
