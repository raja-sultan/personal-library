import { baseAPI } from "./base-api";
import { USERS } from "./tags";

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: (user: { id: string }) => ({
        url: "users/logout",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [USERS],
    }),
    login: builder.mutation({
      query: (credentials: LoginCredentials) => ({
        url: "auth/signin",
        method: "PUT",
        body: credentials,
      }),
    }),
    changePassword: builder.mutation({
      query: (body: ChangePasswordCredentials) => ({
        url: "auth/change-password",
        method: "POST",
        body,
      }),
    }),
    authMe: builder.mutation({
      query: (body) => ({
        url: "auth/refresh-token",
        method: "PUT",
        body,
      }),
    }),
    signUp: builder.mutation({
      query: (body: SignUpPayload) => ({
        url: "auth/signup-company",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    setNewPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/set-new-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/confirm-forgot-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useAuthMeMutation,
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useSetNewPasswordMutation,
  useResetPasswordMutation,
} = authAPI;
