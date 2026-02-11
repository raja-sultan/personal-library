import {
  RHFAutocompleteAsync,
  RHFCustomSelect,
  RHFDatePicker,
  RHFTextField,
} from "common";

export const addProspectData = (getJobOpeningsIdsQuery, jobId) => [
  {
    id: 1,
    componentProps: {
      name: "opening",
      outerLabel: "Opening",
      placeholder: "Select...",
      apiQuery: getJobOpeningsIdsQuery,
      externalParams: { jobId },
      getOptionLabel: (option: any) => option?.openingId,
      transformResponse: (res: any) => res?.data,
    },
    component: RHFAutocompleteAsync,
    lg: 6,
  },
  {
    id: 2,
    componentProps: {
      name: "startDate",
      outerLabel: "Start Date",
    },

    component: RHFDatePicker,
    format: (date: any) => {
      return new Date(date);
    },
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: "employmentType",
      outerLabel: "Employment Type",
      options: [
        { id: 1, label: "Full Time", value: "Full Time" },
        { id: 2, label: "Part Time", value: "Part Time" },
        { id: 3, label: "Intern", value: "Intern" },
        { id: 4, label: "Contract", value: "Contract" },
        { id: 5, label: "Temporary", value: "Temporary" },
      ],
    },
    component: RHFCustomSelect,
    md: 12,
  },
  // {
  //   id: 4,
  //   componentProps: {
  //     name: "salary",
  //     outerLabel: "Salary",
  //     options: [
  //       { id: 1, label: "GBP", value: "GBP" },
  //       { id: 2, label: "Euro", value: "Euro" },
  //     ],
  //   },
  //   component: RHFCustomSelect,
  //   md: 3,
  // },
  {
    id: 4,
    componentProps: { name: "salary", outerLabel: "Salary" },
    component: RHFTextField,
    md: 12,
  },
];
