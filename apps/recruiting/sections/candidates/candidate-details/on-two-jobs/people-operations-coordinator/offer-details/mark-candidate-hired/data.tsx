import { useLazyGetAllUsersQuery } from "@services/jobs/job-details/forms/forms-api";
import { useLazyGetDropDownCloseReasonsListQuery } from "@services/jobs/job-details/job-setup/job-info/job-info-details-api";
import { RHFAutocompleteAsync, RHFRadioGroup } from "common";

export const EmailTeam = () => {
  const getAllUsersQuery = useLazyGetAllUsersQuery();
  const closeReasonsList = useLazyGetDropDownCloseReasonsListQuery({});

  return {
    emailTeamDetails: [
      {
        id: 1,
        componentProps: {
          name: "closeReason",
          outerLabel: "Close Reason",
          placeholder: "Select",
          apiQuery: closeReasonsList,
          getOptionLabel: (option: any) => option?.closeReason,
          transformResponse: (res) => {
            return res?.data?.closeReason;
          },
        },
        component: RHFAutocompleteAsync,
        md: 12,
      },
      {
        id: 2,
        componentProps: {
          name: "makeCandidatePrivate",
          outerLabel: "Make candidate private?",
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ],
        },
        component: RHFRadioGroup,
      },
      {
        id: 3,
        componentProps: {
          multiple: true,
          name: "emailCandidate",
          queryKey: "id",
          outerLabel: "Email a summary of this candidate to ",
          placeholder: "Select users...",
          apiQuery: getAllUsersQuery,
          getOptionLabel: (option: any) => option?.userName,
        },
        component: RHFAutocompleteAsync,
        md: 12,
      },
    ],
  };
};
