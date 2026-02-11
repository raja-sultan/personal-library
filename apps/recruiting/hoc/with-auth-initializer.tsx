import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { LogoSsoAdmin, SplashScreen } from "common";
import { useAuthMeMutation } from "@services/auth-api";
import { useDispatch, useSelector } from "@store";
import { authActions } from "@slices";
import toast from "react-hot-toast";
import type { Settings } from "common/types";

interface AuthProviderProps {
  children: ReactNode;
  handleTheme: (settings: Settings) => void;
}

export function AuthInitializer(props: AuthProviderProps): JSX.Element {
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    auth: {
      refreshToken,
      accessToken,
      user: { userId },
    },
    loginAs: { loginAs },
  }: any = useSelector(
    (state: { auth: any; loginAs: { loginAs?: string } }) => state
  );
  const [mutation, { isLoading }] = useAuthMeMutation();
  const { children, handleTheme } = props;
  const dispatch = useDispatch();

  const initialize = useCallback(async (): Promise<void> => {
    if (accessToken && refreshToken) {
      try {
        await mutation({ userId, refreshToken }).unwrap();
      } catch (error) {
        toast.error(error?.data?.message || "Something Went Wrong");
          dispatch(authActions.logout());
      }
    } else {
       dispatch(authActions.logout());
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  useEffect(() => {
    handleTheme({
      disableButtonsOnLoginAs: Boolean(loginAs),
    });
  }, [loginAs]);

  if (isLoading || !isInitialized) {
    return (
      <SplashScreen>
        <LogoSsoAdmin />
      </SplashScreen>
    );
  }

  return <>{children}</>;
}
