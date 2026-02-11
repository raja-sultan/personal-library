// RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

// Store + configuration
import { BASE_URL } from "@root/config";
import { TAGS } from "./tags";
import type { RootState } from "@store";
// import toast from "react-hot-toast";

// interface ErrorInterface {
//   data: null;
//   message: string;
//   errors: string[];
// }

// Create baseQuery instance
const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const response = await fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set("ngrok-skip-browser-warning", "69420")
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);
  // if (response.error && typeof response.error.status === 'number' && response.error.status > 300) {
  //   response.error.data && toast.error((response.error.data as ErrorInterface).message);
  // };
  return response
};

export const baseAPI = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: TAGS,
  endpoints: () => ({}),
});
