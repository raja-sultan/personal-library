import { Chip } from "@mui/material";
import { RHFAutocompleteSync, RHFEditor, RHFTextField } from "common";

export const emailTeam = () => {
  return {
    emailTeamDetails: [
      {
        id: 1,
        componentProps: {
          multiple: true,
          name: "recipients",
          outerLabel: "To",
          placeholder: "info@personnelibrary.co.uk",
        },
        component: RHFTextField,
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
        md: 12,
      },
      {
        id: 3,
        componentProps: {
          name: "cc",
          placeholder: "info@personnelibrary.co.uk",
          outerLabel: "CC (you can add multiple recipients)",
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
        id: 4,
        componentProps: {
          name: "subject",
          outerLabel: "Subject",
          placeholder: "Subject",
        },
        component: RHFTextField,
        md: 12,
      },
      {
        id: 5,
        componentProps: { name: "html", outerLabel: "Body" },
        component: RHFEditor,
        md: 12,
      },
    ],
  };
};
