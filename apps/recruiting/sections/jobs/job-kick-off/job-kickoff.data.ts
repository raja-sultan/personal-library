import { RHFEditor, RHFTextField, RHFAutocompleteAsync } from "common";

export const JobKickOffFormData = ({
  getUsersListQuery,
  getUsersEmailListQuery,
}: any): any => {
  return [
    {
      id: 1,
      componentProps: {
        name: "from",
        outerLabel: "From",
        placeholder: "From",
        apiQuery: getUsersEmailListQuery,
        getOptionLabel: (option: any) => option?.from?.email,
        transformResponse: (res) => {
          console.log(res, "res");

          return res?.data;
        },
      },
      component: RHFAutocompleteAsync,
      md: 3,
    },
    {
      id: 2,
      componentProps: {
        name: "sendTo",
        outerLabel: "Send To",
        placeholder: "Send To",
        apiQuery: getUsersListQuery,
        getOptionLabel: (option: any) => option.userName,
      },
      component: RHFAutocompleteAsync,
      md: 3,
    },
    {
      id: 3,
      componentProps: {
        placeholder: "Subject",
        name: "subject",
        outerLabel: "Subject",
      },
      component: RHFTextField,
      md: 3,
    },
    {
      id: 4,
      componentProps: { placeholder: "body", name: "body", outerLabel: "Body" },
      component: RHFEditor,
      md: 6,
    },
    {
      id: 5,
      componentProps: {
        placeholder: "Token",
        name: "availableToken",
        outerLabel: "Available Token",
        multiline: true,
        rows: 10,
      },
      component: RHFTextField,
      md: 3,
    },
  ];
};
