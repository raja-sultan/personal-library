import * as Yup from "yup";

export const defaultValues = {
  status: "",
  openDate: new Date(),
  tgtStartDate: new Date(),
  closeDate: new Date(),
  closeRes: "No Reason",
};

export const FormSchema = Yup.object().shape({
  status: Yup.string().required("required"),
  openDate: Yup.date().required("required"),
  tgtStartDate: Yup.date().required("required"),
  closeDate: Yup.date().required("required"),
  closeRes: Yup.string().required("required"),
});

export const fieldsInfo = [
  {
    type: "SELECT_V2",
    name: "status",
    label: "Status",
    fieldHeader: null,
    options: ["open", "close"],
    OuterConProps: { md: 2 },
  },
  {
    type: "DATE_PICKER",
    name: "openDate",
    label: "Open Date",
    fieldHeader: null,
    OuterConProps: { md: 2 },
  },
  {
    type: "DATE_PICKER",
    name: "tgtStartDate",
    label: "Target Start Date",
    fieldHeader: null,
    OuterConProps: { md: 2 },
  },
  {
    type: "DATE_PICKER",
    name: "closeDate",
    label: "Close Date",
    fieldHeader: null,
    OuterConProps: { md: 2 },
  },
  {
    type: "SELECT_V2",
    name: "closeRes",
    label: "Close Reason",
    fieldHeader: null,
    options: ["No Reason", "Yes There was a reason"],
    OuterConProps: { md: 2 },
  },
];
