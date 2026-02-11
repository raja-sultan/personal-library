import {
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  RHFCheckbox,
  RHFTextField,
  RHFUploadSingleFileWithoutPreview,
} from "common";
import * as Yup from "yup";

export const styles = {
  listStyling: {
    listStyleType: "disc",
    marginLeft: "10px",
    paddingLeft: "18px",
    mb: "-10px",
  },
};
export const cardData = [
  {
    id: 1,
    title: "Listing only the qualifications that are necessary for the role",
  },
  {
    id: 2,
    title: "Avoiding stereotypically masculine language",
  },
  {
    id: 3,
    title:
      "Communicating a growth mindset by using language that emphasizes learning and growth over innate abilities",
  },
  {
    id: 4,
    title:
      "Including benefits that appeal to a wide range of demographic groups",
  },
];
export const uploadModalDefaultValues = {
  templateName: "",
  office: [],
  allOffices: false,
  departments: [],
  allDepartments: false,
  employeeTypes: [],
  allEmployees: false,
  attachment: undefined,
};
export const uploadModalValidationSchema = Yup.object().shape({
  templateName: Yup.string().required("Template Name is required"),
  office: Yup.array()
    .nullable()
    .required("Office is required")
    .test(
      "checkLength",
      "At least one office is required",
      (value) => value && value.length > 0
    ),
  allOffices: Yup.boolean(),
  departments: Yup.array()
    .nullable()
    .required("Departments are required")
    .test(
      "checkLength",
      "At least one department is required",
      (value) => value && value.length > 0
    ),
  allDepartments: Yup.boolean(),
  employeeTypes: Yup.array()
    .nullable()
    .required("Employee Types are required")
    .test(
      "checkLength",
      "At least one employee type is required",
      (value) => value && value.length > 0
    ),
  allEmployees: Yup.boolean(),
  attachment: Yup.mixed()
    .nullable()
    .test("Required", (value: any) => Boolean(value)),
});
export const UploadModalData = ({
  getDepartmentListQuery,
  getOfficeListQuery,
}: any): any => {
  return [
    {
      id: 1,
      componentProps: {
        name: "templateName",
        outerLabel: "Template Name",
        placeholder: "Write here...",
      },

      component: RHFTextField,
      md: 12,
    },
    {
      id: 2,
      componentProps: {
        name: "office",
        outerLabel: "Only show offer templates in these offices",
        placeholder: "Select",
        apiQuery: getOfficeListQuery,
        getOptionLabel: (option: any) => option.officeName,
        multiple: true,
      },

      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      id: 3,
      componentProps: {
        name: "allOffices",
        label: "All Offices",
      },

      component: RHFCheckbox,
      md: 12,
    },
    {
      id: 4,
      componentProps: {
        name: "departments",
        outerLabel: "Only show offer templates in these departments",
        placeholder: "Select",
        apiQuery: getDepartmentListQuery,
        getOptionLabel: (option: any) => option.departmentName,
        multiple: true,
      },

      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      id: 5,
      componentProps: {
        name: "allDepartments",
        label: "All Departments",
      },

      component: RHFCheckbox,
      md: 12,
    },
    {
      id: 6,
      componentProps: {
        name: "employeeTypes",
        outerLabel: "Only show offer templates in these employee types",
        options: [
          { id: 1, name: "Temporary", value: "Temporary" },
          { id: 2, name: "Permanent", value: "Permanent" },
        ],
        multiple: true,
      },

      component: RHFAutocompleteSync,
      md: 12,
    },
    {
      id: 7,
      componentProps: {
        name: "allEmployees",
        label: "All Employees",
      },

      component: RHFCheckbox,
      md: 12,
    },
    {
      id: 8,
      componentProps: {
        name: "attachment",
        label: "Upload",
        accept: ".pdf",
      },

      component: RHFUploadSingleFileWithoutPreview,
      md: 12,
    },
  ];
};
