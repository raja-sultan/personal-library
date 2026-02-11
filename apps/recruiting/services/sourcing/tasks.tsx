import { baseAPI } from "@services/base-api";
import { TASKS } from "@services/tags";

export const TasksApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTaskInfo: builder.query({
      query: ({ params }) => ({
        url: "/jobs/task-list",
        method: "GET",
        // body: payload.body,
        params,
      }),
      providesTags: [TASKS],
    }),
    deleteTask: builder.mutation({
      query: (payload) => ({
        url: `jobs/delete-task/${payload.jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TASKS],
    }),
    addTasks: builder.mutation<null, any>({
      query: (body) => ({
        url: "jobs/add-task",
        method: "POST",
        body,
      }),
      invalidatesTags: [TASKS],
    }),
    updateTask: builder.mutation<null, any>({
      query: (payload) => ({
        url: `jobs/update-task/${payload.params.id}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: [TASKS],
    }),
  }),
  
});

export const {
  useAddTasksMutation,
  useGetTaskInfoQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = TasksApi;
