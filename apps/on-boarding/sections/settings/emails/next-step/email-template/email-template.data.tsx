import { RHFAutocompleteAsync, RHFEditor, RHFTextField } from "common";

export const emailTeam = ({ departmentList }: any) => {
  return {
    emailTeamDetail: [
      {
        id: 1,
        componentProps: {
          name: "templateName",
          outerLabel: "Template Name",
          placeholder: "Template Name",
        },
        component: RHFTextField,
        md: 12,
      },
      {
        id: 2,
        componentProps: {
          name: "subject",
          outerLabel: "Email Subject",
          placeholder: "Email Subject",
        },
        component: RHFTextField,
        md: 12,
      },
      {
        id: 3,
        componentProps: { name: "html", outerLabel: "Message" },
        component: RHFEditor,
        md: 12,
      },
      {
        id: 4,
        componentProps: {
          name: "department",
          outerLabel: "Department Matches",
          apiQuery: departmentList,
          getOptionLabel: (option: any) => option.departmentName,
          placeholder: "Department",
        },

        component: RHFAutocompleteAsync,
        md: 6,
      },
      {
        id: 5,
        componentProps: {
          name: "location",
          outerLabel: "Location Matches",
          apiQuery: departmentList,
          placeholder: "Location",
          getOptionLabel: (option: any) => option.departmentName,
        },

        component: RHFAutocompleteAsync,
        md: 6,
      },
      {
        id: 6,
        componentProps: {
          name: "status",
          outerLabel: "Employment Status Matches",
          placeholder: "Employment Status",
          apiQuery: departmentList,
          getOptionLabel: (option: any) => option.departmentName,
        },

        component: RHFAutocompleteAsync,
        md: 6,
      },
      {
        id: 7,
        componentProps: {
          name: "criteria",
          outerLabel: "Other Criteria Matches",
          placeholder: "Criteria",
          apiQuery: departmentList,
          getOptionLabel: (option: any) => option.departmentName,
        },

        component: RHFAutocompleteAsync,
        md: 6,
      },
    ],
  };
};

export const list = [
  {
    id: 1,
    title: "HRIS/Payroll",
  },
  {
    id: 2,
    title: "Benefits provider",
  },
  {
    id: 3,
    title: "Intranet",
  },
  {
    id: 4,
    title: "Expenses",
  },
  {
    id: 5,
    title: "Performance review software",
  },
];

export const hireInformation = [
  {
    id: 1,
    label: "New Hire Name",
    title: "Candidate",
  },
  {
    id: 2,
    label: "Start Date",
    title: "-",
  },
  {
    id: 3,
    label: "Title",
    title: "-",
  },
  {
    id: 4,
    label: "Manager",
    title: "-",
  },
  {
    id: 5,
    label: "Location",
    title: "-",
  },
  {
    id: 6,
    label: "Department",
    title: "-",
  },
];
