import React from "react";
import { Chip } from "@mui/material";
import {
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  RHFEditor,
  RHFTextField,
} from "common";

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
          multiple: true,
          minRows: 3,
          name: "description",
          outerLabel: "Template Description",
          placeholder: "Description",
        },
        component: RHFTextField,
        md: 12,
      },
      {
        id: 3,
        componentProps: {
          name: "department",
          outerLabel: "Department",
          apiQuery: departmentList,
          getOptionLabel: (option: any) => option.departmentName,
          placeholder: "Department",
        },

        component: RHFAutocompleteAsync,
        md: 6,
      },
      {
        id: 4,
        componentProps: {
          name: "location",
          outerLabel: "Location",
          apiQuery: departmentList,
          placeholder: "Location",
          getOptionLabel: (option: any) => option.departmentName,
        },

        component: RHFAutocompleteAsync,
        md: 6,
      },
      {
        id: 5,
        componentProps: {
          name: "status",
          outerLabel: "Employment Status",
          placeholder: "Employment Status",
          apiQuery: departmentList,
          getOptionLabel: (option: any) => option.departmentName,
        },

        component: RHFAutocompleteAsync,
        md: 6,
      },
      {
        id: 6,
        componentProps: {
          name: "criteria",
          outerLabel: "Other Criteria",
          placeholder: "Criteria",
          apiQuery: departmentList,
          getOptionLabel: (option: any) => option.departmentName,
        },

        component: RHFAutocompleteAsync,
        md: 6,
      },
      {
        id: 7,
        componentProps: {
          name: "answered",
          outerLabel: "Who should be notified when this is answered?",
          placeholder: "Select",
        },
        component: RHFTextField,
        md: 12,
      },
      {
        id: 8,
        componentProps: {
          name: "recipients",
          placeholder: "info@personnelibrary.co.uk",
          outerLabel: "To",
          freeSolo: true,
          autoSelect: true,
          getOptionLabel: (option: any) => option,
          renderOption: false,
          multiple: true,
          isOptionEqualToValue: (option: any, newValue: any) =>
            option === newValue,
          options: [],
          renderTags: (value: readonly string[], getTagProps) =>
            value?.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                key={option}
                label={option}
                {...getTagProps({ index })}
              />
            )),
        },
        component: RHFAutocompleteSync,
        md: 12,
      },
      {
        id: 9,
        componentProps: {
          name: "subject",
          outerLabel: "Subject",
          placeholder: "Subject",
        },
        component: RHFTextField,
        md: 12,
      },
      {
        id: 10,
        componentProps: { name: "html", outerLabel: "Body" },
        component: RHFEditor,
        md: 12,
      },
    ],
  };
};

export const tableData = [
  {
    id: 1,
    hireDetails: "Preferred Name",
  },
  {
    id: 2,
    hireDetails: "Title",
  },
  {
    id: 3,
    hireDetails: "Department",
  },
  {
    id: 2,
    hireDetails: "Start Date",
  },
  {
    id: 2,
    hireDetails: "Location",
  },
];
