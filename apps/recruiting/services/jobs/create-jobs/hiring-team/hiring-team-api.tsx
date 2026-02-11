import { baseAPI } from "@services/base-api";
import { HIRING_TEAM } from "@services/tags";

export const hiringTeamAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get Api
    getWhoCanSeeThisJob: builder.query({
      query: ({ params, jobId }) => ({
        url: `jobs/updated-job-results/${jobId}`,
        method: "GET",
        params,
      }),
      providesTags: [HIRING_TEAM],
    }),
    getHiringTeam: builder.query({
      query: ({ params, jobId }) => ({
        url: `jobs/details/${jobId}`,
        method: "GET",
        params,
      }),
      providesTags: [HIRING_TEAM],
    }),

    // Get Users Api of responsible jobs
    getHiringTeamUsers: builder.query({
      query: ({ params }) => ({
        url: "/super-admin/system-admin/dropdown-get-all-users",
        method: "GET",
        params,
      }),
      providesTags: [HIRING_TEAM],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    // Put Api of responsible jobs
    putHiringTeam: builder.mutation({
      query: ({ formData, jobId }: any) => ({
        url: `jobs/update-job/${jobId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [HIRING_TEAM],
    }),

    // Job Details
    // Put Api of responsible Persons in Basic Information
    putResponsiblePerson: builder.mutation({
      query: ({ formData, jobId, params }: any) => ({
        url: `jobs/hiring-team/responsible-person/${jobId}?personType=${params.personType}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [HIRING_TEAM],
    }),
    downloadHiringTeam: builder.query({
      query: ({ jobId }) => ({
        url: `jobs/hiring-team/export/${jobId}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetWhoCanSeeThisJobQuery,
  useGetHiringTeamQuery,
  useGetHiringTeamUsersQuery,
  useLazyGetHiringTeamUsersQuery,
  usePutHiringTeamMutation,
  usePutResponsiblePersonMutation,
  useLazyDownloadHiringTeamQuery,
} = hiringTeamAPI;
