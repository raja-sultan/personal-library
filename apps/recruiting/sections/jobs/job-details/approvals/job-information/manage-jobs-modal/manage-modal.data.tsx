import { RHFAutocompleteAsync, RHFCustomSelect, RHFTextField } from "common";
import * as Yup from "yup";

export const defaultValues = {
  requisitionId: "",
  department: {},
  office: {},
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

export const ManageModalFormData = ({
  getDepartmentListQuery,
  getOfficeListQuery,
}: any): any => {
  return {
    jobInformationField: [
      {
        id: 1,
        componentProps: {
          name: "requisitionId",
          outerLabel: "Requisition ID",
          disabled: true,
          fieldHeader: null,
          placeholder: "Enter a description",
        },
        component: RHFTextField,
      },
      {
        id: 2,
        componentProps: {
          name: "department",
          outerLabel: "Department",
          apiQuery: getDepartmentListQuery,
          getOptionLabel: (option: any) => option.departmentName,
        },

        component: RHFAutocompleteAsync,
      },
      {
        id: 3,
        componentProps: {
          name: "office",
          outerLabel: "Office",
          apiQuery: getOfficeListQuery,
          getOptionLabel: (option: any) => option.officeName,
        },

        component: RHFAutocompleteAsync,
      },
      {
        id: 4,
        componentProps: {
          name: "employmentType",
          outerLabel: "Employment Type",
          options: [
            { id: 1, label: "Full-Time", value: "Full-Time" },
            { id: 2, label: "Part-Time", value: "Part-Time" },
            { id: 3, label: "Intern", value: "Intern" },
          ],
        },

        component: RHFCustomSelect,
      },
    ],
  };
};
