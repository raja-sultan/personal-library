import * as Yup from "yup";

export const defaultValues = {
  jobStatus: "Open",
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
    options: ["Open", "Close"],
    OuterConProps: { md: 6 },
  },
  {
    type: "SELECT_V2",
    name: "jobPost",
    outerLabel: "Job Post",
    fieldHeader: null,
    options: ["Admin Coordinator(London)", "Admin Coordinator(London)"],
    OuterConProps: { md: 6 },
  },
  {
    type: "SELECT_V2",
    name: "jobBoard",
    outerLabel: "Job Board",
    fieldHeader: null,
    options: ["Care Library", "Share My Dine"],
    OuterConProps: { md: 12 },
  },
];
