import { useLazyDepartmentListQuery } from "@services/jobs/job-details/approvals/job-info-approvals-api";
import * as Yup from "yup";

export const defaultValues = {
  requisitionId: "",
  department: undefined,
  office: undefined,
  employmentType: "",
};

export interface FormValues {
  requisitionId?: string;
  department: string;
  office: string;
  employmentType: string;
}
export const FormSchema: any = Yup.object().shape({
  //requisitionId: Yup.number().required("required"),
  department: Yup.object().required("Department Name is required"),
  office: Yup.object().required("Office Name is required"),
  employmentType: Yup.string().required("Employment Type is required"),
});

export const fieldsInfo = [
  {
    type: "TEXT",
    name: "requisitionId",
    outerLabel: "Requisition ID",
    disabled: true,
    fieldHeader: null,
    OuterConProps: { md: 3 },
  },
  {
    type: "ASYNC_MULTISELECT",
    name: "department",
    outerLabel: "Department",
    placeholder: "Select...",
    apiQuery: useLazyDepartmentListQuery,
    getOptionLabel: (option) => option?.departmentName,
    OuterConProps: { md: 3 },
    transformResponse: (res: any) => {
      console.log(res);

      return res?.data;
    },
  },

  {
    type: "SELECT_V2",
    name: "office",
    outerLabel: "Office",
    fieldHeader: null,
    options: [
      { id: 1, label: "UxBridge, London", value: "UxBridge, London" },
      { id: 2, label: "Calagary, Alberta", value: "Calagary, Alberta" },
      { id: 3, label: "Ankara, Turkey", value: "Ankara, Turkey" },
      { id: 4, label: "Islamabad, Pakistan", value: "Islamabad, Pakistan" },
    ],
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
];
// {
//   getOptionLabel: (option: any) => option?.officeName,
//   type: "ASYNC_MULTISELECT",
//   name: "closeRes",
//   queryKey: "search",
//   apiQuery: useLazyCloseReasonListQuery,
//   multiple: false,
//   placeholder: "Select...",
//   outerLabel: "Office",
//   OuterConProps: { md: 3 },
// },
