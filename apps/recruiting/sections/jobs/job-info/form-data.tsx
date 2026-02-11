import { useLazyGetOfficeQuery } from "@services/candidate/candidate-details/tools/add-prospect-api";
import { useLazyGetDepartmentsQuery } from "@services/jobs/existing-job/existing-job-api";
import * as Yup from "yup";

function reqId(): any {
  return Math.floor(Math.random() * 1000000);
}
export const defaultValues = {
  jobName: "",
  isTemplate: false,
  department: null,
  office: null,
  employmentType: "",
  requisitionId: reqId(),
  openings: [
    {
      openingId: "",
      status: "",
      openDate: new Date(),
      targetStartDate: new Date(),
      closeDate: new Date(),
      closeReason: null,
    },
  ],
};

export const FormSchema = Yup.object().shape({
  jobName: Yup.string().required("Required"),
  isTemplate: Yup.boolean(),
  department: Yup.object().required("Required"),
  office: Yup.object().required("Required"),
  employmentType: Yup.string().required("Required"),
  requisitionId: Yup.number(),
  openings: Yup.array().of(
    Yup.object().shape({
      status: Yup.string().required("Required"),
      openDate: Yup.date()
        .required("Open date is required")
        .typeError("The close  date is required"),
      targetStartDate: Yup.date()
        .required("The target start date is required")
        .typeError("The target start  date is required"),
      closeDate: Yup.date()
        .required("The close date is required")
        .typeError("The close  date is required"),

      closeReason: Yup.object().nullable(),
    })
  ),
});

export const fieldsInfo = [
  {
    type: "TEXT",
    name: "jobName",
    outerLabel: "Internal Job Name",
    fieldHeader: null,
    OuterConProps: { md: 9 },
  },
  {
    type: "CHECKBOX",
    name: "isTemplate",
    label: "Set as a Template",
    fieldHeader: null,
  },
  {
    getOptionLabel: (option: any) => option?.departmentName,
    type: "ASYNC_MULTISELECT",
    name: "department",
    queryKey: "search",
    apiQuery: useLazyGetDepartmentsQuery,
    multiple: false,
    placeholder: "Select...",
    outerLabel: "Department",
    OuterConProps: { md: 3 },
  },
  {
    getOptionLabel: (option: any) => option?.officeName,
    type: "ASYNC_MULTISELECT",
    name: "office",
    queryKey: "search",
    apiQuery: useLazyGetOfficeQuery,
    multiple: false,
    placeholder: "Select...",
    outerLabel: "Office",
    OuterConProps: { md: 3 },
  },

  {
    type: "SELECT_V2",
    name: "employmentType",
    outerLabel: "Employment Type",
    fieldHeader: null,
    options: [
      { id: 1, label: "Full-Time", value: "Full-Time" },
      { id: 2, label: "Part-Time", value: "Part-Time" },
      { id: 3, label: "Intern", value: "Intern" },
    ],
    OuterConProps: { md: 3 },
  },
  {
    type: "TEXT",
    name: "requisitionId",
    outerLabel: "Requisition ID",
    fieldHeader: null,
    disable: true,
    OuterConProps: { md: 3 },
  },
];
