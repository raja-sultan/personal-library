import * as Yup from "yup";

export const defaultValues = {
  openingId: "35-5",
  status: "",
  openDate: new Date(),
  tgtStartDate: new Date(),
  closeDate: new Date(),
  closeRes: "No Reason",
};

export const FormSchema = Yup.object().shape({
  openingId: Yup.string(),
  status: Yup.string().required("required"),
  openDate: Yup.date().required("required"),
  tgtStartDate: Yup.date().required("required"),
  closeDate: Yup.date().required("required"),
  closeRes: Yup.string().required("required"),
});

export const fieldsInfo = [
  {
    type: "TEXT",
    name: "openingId",
    outerLabel: "Opening ID",
    fieldHeader: null,
    disable: true,
    OuterConProps: { md: 12 },
  },
  {
    type: "SELECT_V2",
    name: "status",
    outerLabel: "Status",
    fieldHeader: null,
    options: [
      { id: 1, label: "Open", value: "Open" },
      { id: 2, label: "Closed", value: "Closed" },
    ],
    OuterConProps: { md: 12 },
  },
  {
    type: "DATE_PICKER",
    name: "openDate",
    outerLabel: "Open Date",
    fieldHeader: null,
    OuterConProps: { md: 12 },
  },
  {
    type: "DATE_PICKER",
    name: "tgtStartDate",
    outerLabel: "Target Start Date",
    fieldHeader: null,
    OuterConProps: { md: 12 },
  },
  {
    type: "DATE_PICKER",
    name: "closeDate",
    outerLabel: "Close Date",
    fieldHeader: null,
    OuterConProps: { md: 12 },
  },
  {
    type: "SELECT_V2",
    name: "closeRes",
    outerLabel: "Close Reason",
    fieldHeader: null,
    options: [
      { id: 1, label: "No Reason", value: "No Reason" },
      {
        id: 2,
        label: "Yes There was a reason",
        value: "Yes There was a reason",
      },
    ],
    OuterConProps: { md: 12 },
  },
];
