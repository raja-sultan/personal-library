import { useLazyGetGlobalEmailForDropdownQuery } from "@services/configuration/email-templates/email-templates-api";
import {
  RHFAutocompleteAsync,
  RHFCustomSelect,
  RHFEditor,
  RHFTextField,
  RHFUploadSingleFileWithPreview,
} from "common";
import { useSelector } from "react-redux";

export const EmailTeam = () => {
  const getCompanyId = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );

  const getGlobalEmailForDropdownQuery =
    useLazyGetGlobalEmailForDropdownQuery();

  return {
    emailTeamDetails: [
      {
        id: 0,
        componentProps: {
          name: "template_name",
          outerLabel: "Template Name",
          placeholder: "Write here...",
        },
        component: RHFTextField,
        md: 6,
      },
      {
        id: 1,
        componentProps: {
          name: "from",
          outerLabel: "From",
          apiQuery: getGlobalEmailForDropdownQuery,
          externalParams: { companyId: getCompanyId },
          placeholder: "My Email Address",
          getOptionLabel: (option: any) => option?.email,
        },
        component: RHFAutocompleteAsync,
        md: 6,
      },
      {
        id: 2,
        componentProps: {
          name: "emailType",
          placeholder: "Choose an Email Type",
          outerLabel: "Email Type",
          options: [
            { id: 1, label: "Agency Email", value: "agency email" },
            { id: 2, label: "Calendly Email", value: "calendly email" },
            {
              id: 3,
              label: "Candidate Availability Report",
              value: "candidate avalaility request",
            },
            {
              id: 4,
              label: "Candidate Email",
              value: "candidate email",
            },
            {
              id: 5,
              label: "Candidate Interview Conformation",
              value: "candidate interview confermation",
            },
            {
              id: 6,
              label: "candidate Rejection",
              value: "candidate rejection",
            },
            {
              id: 7,
              label: "Candidate Self-Schedule Request",
              value: "candidate self schedule request",
            },
            {
              id: 8,
              label: "EEOC Request",
              value: "EEOC resquest",
            },
          ],
        },

        component: RHFCustomSelect,
        md: 6,
      },
      {
        id: 3,
        componentProps: {
          name: "cc",
          outerLabel: "CC ( you can add multiple recipients )",
          limitTags: 2,
          multiple: true,
          apiQuery: getGlobalEmailForDropdownQuery,
          externalParams: { companyId: getCompanyId },
          placeholder: "Choose Recipients",
          getOptionLabel: (option: any) => option?.email,
        },
        component: RHFAutocompleteAsync,
        md: 6,
      },
      {
        id: 4,
        componentProps: {
          name: "description",
          outerLabel: "Description",
          placeholder: "Enter a Description...",
          minRows: 5,
          multiline: true,
        },
        component: RHFTextField,
        md: 6,
      },
      {
        id: 5,
        componentProps: {
          name: "attachment",
          label: "Attachments",
          accept: ".pdf, .doc, .docx",
          outerLabel: "Attachments",
        },
        component: RHFUploadSingleFileWithPreview,
        md: 6,
      },
      {
        id: 6,
        componentProps: {
          name: "email_subject",
          outerLabel: "Email Subject",
          placeholder: "Write here...",
        },
        component: RHFTextField,
        md: 6,
      },
      {
        id: 7,
        componentProps: { name: "email_body", outerLabel: "Body" },
        component: RHFEditor,
        md: 12,
      },
    ],
  };
};
