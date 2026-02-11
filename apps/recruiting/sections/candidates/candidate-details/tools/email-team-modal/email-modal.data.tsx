import { Chip } from "@mui/material";
import {
  RHFAutocompleteSync,
  RHFCheckbox,
  RHFCustomSelect,
  RHFEditor,
  RHFTextField,
} from "common";
import dayjs from "dayjs";

export const emailTeam = () => {
  return {
    emailTeamDetails: [
      {
        id: 1,
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
        id: 2,
        componentProps: {
          multiple: true,
          name: "recipients",
          outerLabel: "To",
          placeholder: "info@personnelibrary.co.uk",
        },
        component: RHFTextField,
        md: 6,
      },
      {
        id: 3,
        componentProps: {
          name: "ccRecipients",
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
      {
        id: 6,
        componentProps: {
          name: "emailSendAt",
          outerLabel: "Send email when",
          options: [
            { id: 1, label: "Now", value: dayjs().format() },
            {
              id: 1,
              label: "After 1 hour",
              value: dayjs().add(1, "h").format(),
            },
            {
              id: 2,
              label: "After 2 hours",
              value: dayjs().add(2, "h").format(),
            },
            {
              id: 3,
              label: "After Office end time i.e 06:00 PM current Time zone",
              value: dayjs().format("YYYY-MM-DDT18:00:00Z"),
            },
          ],
        },
        component: RHFCustomSelect,
        md: 12,
      },
      {
        id: 7,
        componentProps: {
          name: "candidateProfile",
          label: `Add a link to the candidate's profile`,
        },

        component: RHFCheckbox,
        md: 12,
      },
    ],
  };
};
