import * as Yup from "yup";
import { useLazyGetOfficeQuery } from "@services/candidate/candidate-details/tools/add-prospect-api";
import { useLazyGetDepartmentsQuery } from "@services/jobs/existing-job/existing-job-api";

export const defaultValues = {
  requisitionId: null,
  department: "",
  office: "",
  employmentType: "",
  note: "",
};

export const FormSchema = Yup.object().shape({
  requisitionId: Yup.number(),
  department: Yup.object(),
  office: Yup.object(),
  employmentType: Yup.string(),
  note: Yup.string().required("required"),
});

export const fieldsInfo = [
  {
    type: "TEXT",
    name: "requisitionId",
    outerLabel: "Requisition ID",
    fieldHeader: null,
    disable: true,
    OuterConProps: { md: 3 },
  },
  {
    getOptionLabel: (option: any) => option?.departmentName,
    type: "ASYNC_MULTISELECT",
    name: "department",
    queryKey: "search",
    // apiQuery: useGetDepartmentsListQuery,
    apiQuery: useLazyGetDepartmentsQuery,
    multiple: false,
    disable: true,
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
    disable: true,
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
      {
        id: 1,
        label: "Full-Time",
        value: "Full-Time",
      },
      {
        id: 2,
        label: "Part-Time",
        value: "Part-Time",
      },
      {
        id: 3,
        label: "Intern",
        value: "Intern",
      },
    ],
    OuterConProps: { md: 3 },
    disable: true,
  },
  {
    type: "TEXT_MULTILINE",
    name: "note",
    outerLabel: "Leave a Note",
    fieldHeader: null,
    OuterConProps: { md: 12 },
  },
];
