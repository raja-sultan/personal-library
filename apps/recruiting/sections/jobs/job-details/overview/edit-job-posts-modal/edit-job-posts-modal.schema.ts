import * as Yup from "yup";

export const defaultValues = {
  jobStatus: "",
  jobPost: "",
  jobBoard: "",
};

export const FormSchema = Yup.object().shape({
  jobStatus: Yup.string().required("Job Status is required"),
  jobPost: Yup.string().required("Job Post is required"),
  jobBoard: Yup.string().required("Job Board is required"),
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
    type: "SELECT_V2",
    name: "jobPost",
    outerLabel: "Job Post",
    fieldHeader: null,
    options: [
      {
        id: 1,
        label: "Front End Developer",
        value: "Front End Developer",
      },
      {
        id: 2,
        label: "Admin Coordinator(London)",
        value: "Admin Coordinator(London)",
      },
    ],
    OuterConProps: { md: 6 },
  },
  {
    type: "SELECT_V2",
    name: "jobBoard",
    outerLabel: "Job Board",
    fieldHeader: null,
    options: [
      {
        id: 1,
        label: "Internal Only",
        value: "Internal Only",
      },
      {
        id: 2,
        label: "Internal Library",
        value: "Internal Library",
      },
    ],
    OuterConProps: { md: 12 },
  },
];
