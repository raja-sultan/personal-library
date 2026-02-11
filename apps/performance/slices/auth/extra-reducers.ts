import type { PayloadAction } from "@reduxjs/toolkit";
import { setSessionStorage } from "common";

type LoginAction = PayloadAction<any>;

export const loginSuccess = (state: AuthState, action: LoginAction): void => {
  const { data } = action.payload;
  state.accessToken = data.authToken;
  state.refreshToken = data.refreshToken;
  state.user = {
    ...data?.user,
    company: {
      ...data?.user?.company,
      menuPermissions: data?.user?.company?.menuPermissions ?? []
    },
    userPermissions: data?.user?.userPermissions?.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {})
  };
  state.isAuthenticated = true;

  setSessionStorage("accessToken", data.authToken);
  setSessionStorage("refreshToken", data.refreshToken);
};

export const authMeSuccess = (state: AuthState, action: LoginAction): void => {
  const { data } = action.payload;
  state.accessToken = data.authToken;
  state.refreshToken = data.refreshToken;
  state.isAuthenticated = true;

  setSessionStorage("accessToken", data.authToken);
  setSessionStorage("refreshToken", data.refreshToken);
};
