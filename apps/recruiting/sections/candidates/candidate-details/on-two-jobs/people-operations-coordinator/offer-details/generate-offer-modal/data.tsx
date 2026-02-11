import { Chip } from "@mui/material";
import { RHFAutocompleteSync } from "common";

export const emailTeam = () => {
  return {
    emailTeamDetails: [
      {
        id: 1,
        componentProps: {
          name: "template",
          outerLabel: "Select Template",
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
    ],
  };
};
