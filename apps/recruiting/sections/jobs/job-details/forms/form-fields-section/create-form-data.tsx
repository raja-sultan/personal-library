import { Typography } from "@mui/material";
import { RHFAutocompleteAsync, RHFCheckbox, RHFTextField } from "common";

export const CreateAFormData = ({
  getJobStagesQuery,
  jobId,
  getAllUsersQuery,
}: any): any => {
  return {
    emailPortion: [
      {
        id: 1,
        componentProps: {
          multiple: true,
          name: "from",
          fullWidth: true,
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
          name: "subject",
          outerLabel: "Subject",
          placeholder: "Write here...",
          fullWidth: true,
        },

        component: RHFTextField,
        md: 6,
      },
      {
        id: 3,
        componentProps: {
          name: "body",
          fullWidth: true,
          outerLabel: "Body",
          placeholder: "Write here...",
          multiline: true,
          minRows: 3,
        },
        component: RHFTextField,
        md: 6,
      },
    ],
    form1: [
      {
        id: 1,
        componentProps: {
          name: "formName",
          fullWidth: true,
          outerLabel: "Form Name (candidate-facing)",
          placeholder: "Write here...",
        },
        component: RHFTextField,
        md: 6,
      },
    ],
    form2: () => [
      {
        id: 1,
        componentProps: {
          name: "jobStage",
          placeholder: "Select stage",
          outerLabel: `"Forms to send" will appear as a task when candidates reach the following stage:`,
          apiQuery: getJobStagesQuery,
          externalParams: { jobId },
          getOptionLabel: (option: any) => option?.stageName,
        },
        component: RHFAutocompleteAsync,
        md: 6,
      },
      {
        id: 2,
        componentProps: {
          color: "text.secondary",
          variant: "caption",
        },
        text: "Where do tasks appear?",
        component: Typography,
        md: 6,
      },
      {
        id: 3,
        componentProps: {
          variant: "body1",
          fontWeight: 600,
        },
        text: "Notification",
        component: Typography,
        md: 6,
      },
      {
        id: 4,
        componentProps: {
          color: "text.secondary",
          variant: "subtitle2",
        },
        text: "Notify the following users when a form is submitted by a candidate:",
        component: Typography,
        md: 6,
      },
      {
        id: 5,
        componentProps: {
          name: "recruiter",
          label: "Candidate`s recruiter",
        },

        component: RHFCheckbox,
        md: 12,
      },
      {
        id: 6,
        componentProps: {
          name: "coordinator",
          label: "Candidate`s coordinator",
        },

        component: RHFCheckbox,
        md: 12,
      },
      {
        id: 7,
        componentProps: {
          name: "others",
          label: "Other",
        },

        component: RHFCheckbox,
        md: 12,
      },
      {
        id: 8,
        componentProps: {
          name: "users",
          placeholder: "Select user",
          apiQuery: getAllUsersQuery,
          // externalParams: { jobId },
          getOptionLabel: (option: any) => option?.userName,
        },
        component: RHFAutocompleteAsync,
        md: 6,
      },
    ],
  };
};
