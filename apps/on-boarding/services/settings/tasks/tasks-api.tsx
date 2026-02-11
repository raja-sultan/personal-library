import { baseAPI } from "@services/base-api";
import { ONBOARDING_TASKS } from "@services/tags";

const TasksApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTasksList: builder.query({
      query: (payload) => ({
        url: "tasks/tasks-list-limited",
        method: "GET",
        body: payload.body,
        params: payload.param,
      }),
      providesTags: [ONBOARDING_TASKS],
    }),
    postTask: builder.mutation<null, any>({
      query: (payload) => ({
        url: `tasks/Tasks-Onboarding`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [ONBOARDING_TASKS],
    }),
    getCriteriaList: builder.query({
      query: (payload) => ({
        url: "Criteria/criteria/list",
        method: "GET",
        params: payload.params,
      }),
      providesTags: [ONBOARDING_TASKS],
    }),
    getDepartments: builder.query({
      query: () => ({
        url: "organization/dropdown-department-list",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getOffice: builder.query({
      query: () => ({
        url: "organization/dropdown-office-list",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    deleteTask: builder.mutation<null, any>({
      query: (payload) => ({
        url: `tasks/bulk-delete-tasks`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: [ONBOARDING_TASKS],
    }),
    postCSV: builder.mutation<null, any>({
      query: (payload) => ({
        url: `tasks/download-tasks-csv`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [ONBOARDING_TASKS],
    }),
    patchReassignTasks: builder.mutation<null, any>({
      query: (payload) => ({
        url: `tasks/bulk-reassign-tasks`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [ONBOARDING_TASKS],
    }),
    patchAllTasks: builder.mutation<null, any>({
      query: ({ body, taskId }: any) => ({
        url: `tasks/update-tasks/${taskId.tasksId}`, // Access taskId directly
        method: "PATCH",
        body,
      }),
      invalidatesTags: [ONBOARDING_TASKS],
    }),
  }),
});
export const {
  useGetTasksListQuery,
  usePostTaskMutation,
  useLazyGetCriteriaListQuery,
  useGetCriteriaListQuery,
  useGetDepartmentsQuery,
  useGetOfficeQuery,
  useDeleteTaskMutation,
  useLazyGetOfficeQuery,
  useLazyGetDepartmentsQuery,
  usePostCSVMutation,
  usePatchReassignTasksMutation,
  usePatchAllTasksMutation,
} = TasksApi;
