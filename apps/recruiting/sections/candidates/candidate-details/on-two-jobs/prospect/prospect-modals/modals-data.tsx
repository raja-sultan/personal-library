import { Chip } from "@mui/material";
import {
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  RHFEditor,
  RHFTextField,
} from "common";

export const modalsData = (): any => {
  return {
    jobCandidateInitialDetails: [
      {
        id: 1,
        componentProps: {
          name: "template",
          outerLabel: "Template",
          placeholder: "Select",
          disabled: true,
          freeSolo: true,
          getOptionLabel: (option: any) => option,
          renderOption: false,
          options: ["None"],
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
        id: 2,
        componentProps: {
          multiple: true,
          name: "from",
          outerLabel: "From",
          placeholder: "From",
          disabled: true,
        },
        component: RHFTextField,
        md: 6,
      },
      {
        id: 3,
        componentProps: {
          multiple: true,
          name: "recipients",
          outerLabel: "To",
          placeholder: "To",
        },
        component: RHFTextField,
        md: 6,
      },
      {
        id: 4,
        componentProps: {
          name: "ccRecipients",
          outerLabel: "CC",
          freeSolo: true,
          limitTags: 2,
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
        id: 5,
        componentProps: { name: "subject", outerLabel: "Subject" },
        component: RHFTextField,
        md: 12,
      },
      {
        id: 6,
        componentProps: { name: "html", outerLabel: "Body" },
        component: RHFEditor,
        md: 12,
      },
    ],
  };
};
export const editProspectFormData: any = ({ ...formData }) => {
  return {
    data: [
      {
        id: 1,
        componentProps: {
          name: "specificJob",
          outerLabel: "Specific Job(s)",
          fullWidth: true,
          limitTags: 2,
          multiple: true,
          placeholder: "Select one or more jobs",
          filterSelectedOptions: false,
          getOptionLabel: (option: any) => option.jobName,
          apiQuery: formData.jobDropdownApi,
        },
        component: RHFAutocompleteAsync,
        md: 12,
      },
      {
        id: 1.5,
        md: 12,
        componentProps: {
          label: `And / or:`,
          variant: "outlined",
          sx: {
            border: "none",
            color: "primary.main",
            fontWeight: 800,
          },
        },
        component: Chip,
      },
      {
        id: 2,
        componentProps: {
          name: "department",
          outerLabel: "Department",
          fullWidth: true,
          placeholder: "Department name",
          disableCloseOnSelect: false,
          renderOption: false,
          apiQuery: formData.departmentApiQuery,
          getOptionLabel: (option: any) => option.departmentName,
        },
        component: RHFAutocompleteAsync,
        md: 12,
      },
      {
        id: 3,
        componentProps: {
          name: "office",
          outerLabel: "Office",
          fullWidth: true,
          placeholder: "Office Name",
          disableCloseOnSelect: false,
          renderOption: false,
          getOptionLabel: (option: any) => option.officeName,
          apiQuery: formData.officeApiQuery,
        },
        component: RHFAutocompleteAsync,
        md: 12,
      },
      // text
      {
        id: 3.5,
        md: 12,
        componentProps: {
          label: `Add ${formData.name} to a specific pool, stage and assign an owner :-`,
          variant: "outlined",
          sx: { border: "none", color: "neutral.500" },
        },
        component: Chip,
      },
      {
        id: 4,
        componentProps: {
          name: "pool",
          outerLabel: "Pool",
          fullWidth: true,
          placeholder: "Pool Name",
          disableCloseOnSelect: false,
          getOptionLabel: (option: any) => option.name,
          renderOption: false,
          apiQuery: formData.poolStagesQuery,
        },
        component: RHFAutocompleteAsync,
        md: 12,
      },
      {
        id: 5,
        componentProps: {
          name: "prospectStage",
          outerLabel: "Prospect Stage",
          fullWidth: true,
          placeholder: "Prospect Pool Stage",
          disableCloseOnSelect: false,
          getOptionLabel: (option: any) => option.name,
          renderOption: false,
          options: formData.stages ?? [
            { id: 1, name: "No Stages Found", value: undefined },
          ],

          disabled: !formData.stages?.length,
        },
        component: RHFAutocompleteSync,
        md: 12,
      },
      {
        id: 6,
        componentProps: {
          name: "prospectOwner",
          outerLabel: "Prospect Owner",
          fullWidth: true,
          placeholder: "Owner Name",
          disableCloseOnSelect: false,
          getOptionLabel: (option: any) => option.userName,
          renderOption: false,
          apiQuery: formData.prospectOwnersQuery,
        },
        component: RHFAutocompleteAsync,
        md: 12,
      },
    ],
  };
};
