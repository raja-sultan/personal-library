import * as Yup from "yup";

// export const defaultValues = {
//   emailType: "",
//   UserName: "",

// };
// export interface FormValues {
//   requisitionId?: string;
//   department: string;
// }
// export const FormSchema = Yup.object().shape({
//   emailType: Yup.string().required("Office Name is required"),
//   UserName: Yup.string().required("Employment Type is required"),
// });

export const defaultValues = {
  requisitionId: "",
  department: "",
  office: "",
  employmentType: "",
};

export interface FormValues {
  requisitionId?: string;
  department: string;
  office: string;
  employmentType: string;
}
export const FormSchema = Yup.object().shape({
  //requisitionId: Yup.number().required("required"),
  department: Yup.string().required("Department Name is required"),
  office: Yup.string().required("Office Name is required"),
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
    type: "SELECT_V2",
    name: "department",
    outerLabel: "Department",
    fieldHeader: null,
    options: [
      "data & BI",
      "Finance",
      "Human Resourse",
      "Infrastructure and Operations",
      "Marketing and Sales",
      "Procurement",
    ],
    OuterConProps: { md: 3 },
  },
  {
    type: "SELECT_V2",
    name: "office",
    outerLabel: "Office",
    fieldHeader: null,
    options: [
      "UxBridge, London",
      "Calagary, Alberta",
      "Ankara, Turkey",
      "Islamabad, Pakistan",
    ],
    OuterConProps: { md: 3 },
  },
  {
    type: "SELECT_V2",
    name: "employmentType",
    outerLabel: "Employment Type",
    fieldHeader: null,
    options: ["Full-Time", "Part-Time", "Intern"],
    OuterConProps: { md: 3 },
  },
];
