import { baseAPI } from "@services/base-api";
import { FORM_TABLE } from "@services/tags";

const TAG = "job-details-forms";
const JobDetailsFormsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobStages: builder.query({
      query: ({ params }: any) => ({
        url: `jobs/get-job-stages/${params?.jobId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data?.interviewPlan;
      },
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `/super-admin/system-admin/dropdown-get-all-users`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getFormListForTable: builder.query({
      query: ({ params, jobId }) => ({
        url: `/jobs/list-form?jobIds=${jobId}`,
        method: "GET",
        params,
      }),
      providesTags: [TAG, FORM_TABLE],
    }),
    //
    addNewForm: builder.mutation({
      query: ({ jobId, body }) => ({
        url: `/jobs/create-form?jobId=${jobId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG, FORM_TABLE],
    }),
    //
    editForm: builder.mutation({
      query: ({ formId, body }) => ({
        url: `/jobs/update-form`,
        method: "PATCH",
        body,
        params: {
          formId,
        },
      }),
      invalidatesTags: [TAG, FORM_TABLE],
    }),
    //
    deleteForm: builder.mutation({
      query: ({ id }) => ({
        url: `/jobs/delete-form?formId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG, FORM_TABLE],
    }),
    //-----------------Create Form APIs----------------------//
    getFormById: builder.query({
      query: ({ id }) => ({
        url: `/jobs/get-form?formId=${id}`,
        method: "GET",
      }),
      transformResponse: (res: any) => {
        const data = res?.data;
        return {
          form: {
            from: data?.emailDetail?.from,
            subject: data?.emailDetail?.subject,
            body: data?.emailDetail?.body,
            availableToken: data?.emailDetail?.token,
            //-----Form-------//
            formName: data?.formName,
            //-----Form2-------//
            jobStage: data?.jobStage,
            recruiter: data?.notification?.recruiter,
            coordinator: data?.notification?.coordinator,
            others: data?.notification?.others,
            users: data?.notification?.users[0],
          },
          sections: data?.sections,
          formId: data?._id,
        };
      },
    }),
  }),
});
export const {
  useLazyGetAllUsersQuery,
  useLazyGetJobStagesQuery,
  useGetFormListForTableQuery,
  useAddNewFormMutation,
  useEditFormMutation,
  useDeleteFormMutation,
  useGetFormByIdQuery,
} = JobDetailsFormsAPI;
