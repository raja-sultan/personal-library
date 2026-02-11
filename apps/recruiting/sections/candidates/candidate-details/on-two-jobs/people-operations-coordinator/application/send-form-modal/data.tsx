import { Chip } from "@mui/material";
import {
  RHFAutocompleteSync,
  // RHFCheckbox,
  //   RHFCustomSelect,
  RHFEditor,
  RHFTextField,
  // RHFUploadSingleFileWithoutPreview,
} from "common";

export const emailTeam = () => {
  return {
    emailTeamDetails: [
      // {
      //   id: 1,
      //   componentProps: {
      //     name: "template",
      //     outerLabel: "Template",
      //     placeholder: "Select",
      //     disabled: true,
      //     freeSolo: true,
      //     getOptionLabel: (option: any) => option,
      //     renderOption: false,
      //     options: ["None"],
      //     renderTags: (value: readonly string[], getTagProps) =>
      //       value?.map((option: string, index: number) => (
      //         <Chip
      //           variant="outlined"
      //           key={option}
      //           label={option}
      //           {...getTagProps({ index })}
      //         />
      //       )),
      //   },
      //   component: RHFAutocompleteSync,
      //   md: 12,
      // },
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
          name: "recipients",
          outerLabel: "To",
          freeSolo: true,
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
        md: 6,
      },
      // {
      //   id: 4,
      //   componentProps: {
      //     name: "ccRecipients",
      //     outerLabel: "CC",
      //     freeSolo: true,
      //     getOptionLabel: (option: any) => option,
      //     renderOption: false,
      //     multiple: true,
      //     isOptionEqualToValue: (option: any, newValue: any) =>
      //       option === newValue,
      //     options: [],
      //     renderTags: (value: readonly string[], getTagProps) =>
      //       value?.map((option: string, index: number) => (
      //         <Chip
      //           variant="outlined"
      //           key={option}
      //           label={option}
      //           {...getTagProps({ index })}
      //         />
      //       )),
      //   },
      //   component: RHFAutocompleteSync,
      //   md: 12,
      // },
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
      // {
      //   id: 7,
      //   componentProps: {
      //     name: "resume",
      //     label: "Attach Resume:",
      //     accept: ".doc, .docx, .pdf, .rtf",
      //     outerLabel: "Attachments",
      //   },
      //   component: RHFUploadSingleFileWithoutPreview,
      //   md: 9,
      // },
      // {
      //   id: 8,
      //   componentProps: {
      //     name: "ccMe",
      //     label: "Bcc me",
      //   },

      //   component: RHFCheckbox,
      //   md: 12,
      // },
    ],
  };
};
