import type { PayloadAction } from "@reduxjs/toolkit";

type LoginAction = PayloadAction<any>;

export const loginSuccess = (state: { loginAs: string }, action: LoginAction): void => {
  const { data } = action.payload;
  if (data?.user?.loggedInAs) {
    state.loginAs = data?.user?.loggedInAs;
  }
};