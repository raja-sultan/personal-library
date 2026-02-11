import {
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  RHFCheckbox,
  RHFTextField,
} from "common";

export const newFieldDetails = () => {
  return {
    newFieldDetail: [
      {
        id: 1,
        componentProps: {
          name: "displayName",
          outerLabel: "Display Name",
          placeholder: "Display display name",
        },
        component: RHFTextField,
        lg: 6,
      },
      {
        id: 2,
        componentProps: {
          name: "helpText",
          outerLabel: "Help Text",
          placeholder: "Enter help text",
        },
        component: RHFTextField,
        lg: 6,
      },
      {
        id: 3,
        componentProps: {
          name: "fieldType",
          placeholder: "Select",
          outerLabel: "Field Type",
          multiple: false,
          getOptionLabel: (option: any) => option.label,
          options: [
            { id: 1, label: "Short Text", value: "short_text" },
            { id: 2, label: "Long Text", value: "long_text" },
            { id: 3, label: "Single Select", value: "single_select" },
            { id: 4, label: "Multi Select", value: "multi_select" },
            { id: 5, label: "Attachment", value: "attachment" },
            { id: 6, label: "Date Selection", value: "date_selection" },
            { id: 7, label: "URL", value: "url" },
            {
              id: 8,
              label: "Searchable Dropdown",
              value: "searchable_dropdown",
            },
          ],
        },

        component: RHFAutocompleteSync,
        lg: 6,
      },
      {
        id: 4,
        componentProps: {
          name: "fieldGroup",
          outerLabel: "Field Group",
          placeholder: "Personal information fields",
          disabled: true,
        },
        component: RHFTextField,
        lg: 6,
      },
      // {
      //   id: 5,
      //   componentProps: {
      //     name: "personalLibrary",
      //     outerLabel: "Personal Library Recruiting Field",
      //     placeholder: "Select",
      //     apiQuery: departmentList,
      //     getOptionLabel: (option: any) => option.departmentName,
      //   },
      //   component: RHFAutocompleteAsync,
      //   lg: 6,
      // },
      {
        id: 6,
        componentProps: {
          name: "forNewHireManager",
          label: "Require For New Hires and/or Managers",
        },
        component: RHFCheckbox,
        lg: 12,
      },
    ],
  };
};

export const newRulesDetails = ({ departmentList }: any) => {
  return {
    newRuleDetail: [
      {
        id: 1,
        componentProps: {
          name: "department",
          outerLabel: "Department Matches",
          placeholder: "Select Department",
          apiQuery: departmentList,
          getOptionLabel: (option: any) => option.departmentName,
        },
        component: RHFAutocompleteAsync,
        lg: 6,
      },
      {
        id: 2,
        componentProps: {
          name: "location",
          outerLabel: "Location Matches",
          placeholder: "Enter Location",
          apiQuery: departmentList,
          getOptionLabel: (option: any) => option.departmentName,
        },
        component: RHFAutocompleteAsync,
        lg: 6,
      },
      {
        id: 3,
        componentProps: {
          name: "employment",
          outerLabel: "Employment Status Matches",
          placeholder: "Select Employment",
          multiple: false,
          getOptionLabel: (option: any) => option.label,
          options: [
            { id: 1, label: "Part time", value: "partTime" },
            { id: 2, label: "Full time", value: "fulltime" },
            { id: 3, label: "Permanent", value: "permanent" },
            { id: 4, label: "Contract", value: "contract" },
            { id: 5, label: "intern", value: "intern" },
            { id: 6, label: "temporary", value: "temporary" },
            { id: 7, label: "terminated", value: "terminated" },
          ],
        },

        component: RHFAutocompleteSync,
        lg: 6,
      },
      {
        id: 4,
        componentProps: {
          name: "criteria",
          outerLabel: "Other Criteria Matches",
          placeholder: "Select Criteria",
          apiQuery: departmentList,
          getOptionLabel: (option: any) => option.departmentName,
        },
        component: RHFAutocompleteAsync,
        lg: 6,
      },
    ],
  };
};

export const fieldType = [
  { id: 1, label: "Short Text", value: "short_text" },
  { id: 2, label: "Long Text", value: "long_text" },
  { id: 3, label: "Single Select", value: "single_select" },
  { id: 4, label: "Multi Select", value: "multi_select" },
  { id: 5, label: "Attachment", value: "attachment" },
  { id: 6, label: "Date Selection", value: "date_selection" },
  { id: 7, label: "URL", value: "url" },
  {
    id: 8,
    label: "Searchable Dropdown",
    value: "searchable_dropdown",
  },
];
