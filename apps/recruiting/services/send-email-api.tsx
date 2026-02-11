import { baseAPI } from "@services/base-api";
// import { UserManagementTag } from "./tags";

// const Tag = [UserManagementTag];

const SendEmailAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    sendEmail: builder.mutation({
      query: ({ body, emailSendAt }) => ({
        url: `/super-admin/send-email?emailSendAt=${emailSendAt}`,
        method: "POST",
        body,
      }),
      // providesTags: Tag,
    }),
  }),
});

export const { useSendEmailMutation } = SendEmailAPI;
// emailSendAt is a Date String
// body = {
//   recipients: [""],
//   ccRecipients: [""],
//   subject: "",
//   text: "",
//   html: "",
//   attachments: [
//     {
//       filename: "filename.pdf",
//       content: "buffer",
//       contentType: "application/pdf",
//     },
//   ],
// };
