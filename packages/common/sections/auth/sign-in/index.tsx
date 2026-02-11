import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import type { SignInFormTypes } from "./sign-in.types";
import { signInInitialValue, signInFormSchema } from "./sign-in.schema";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEmailIcon, PlLogoIcon, PasswordIcon } from "common/assets";
import { RHFTextField, FormProvider, RHFCheckbox, StyledLink } from "common/components";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { setLocalStorage, removeLocalStorage } from "common/utils/local-storage";

export function SignInSection({ useLoginMutation }: any): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const [mutation, { isLoading }] = useLoginMutation();

  const method = useForm<SignInFormTypes>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: signInInitialValue,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit } = method;

  async function formSubmitHandler(payload: SignInFormTypes): Promise<any> {
    const { email, password, loggedIn } = payload;
    loggedIn
      ? setLocalStorage("rememberMe", { email, password, loggedIn })
      : removeLocalStorage("rememberMe");
    try {
      const { message } = await mutation({ email, password }).unwrap();
      toast.success(message || "Sign in successfully!");
      router.push(returnTo || "dashboard");
    } catch (error) {
      toast.error(error?.data?.message ?? "Something went wrong!");
    }
  }

  return (
    <Stack
      sx={{
        alignItems: "center",
        p: 2,
      }}
    >
      <Stack spacing={5}>
        <Box sx={{ textAlign: "center" }}>
          <PlLogoIcon />
        </Box>
        <FormProvider methods={method} onSubmit={handleSubmit(formSubmitHandler)}>
          <Stack spacing={4} direction="column">
            <RHFTextField
              type="text"
              outerLabel="Email *"
              fullWidth
              name="email"
              placeholder="Enter Email Here"
              StartIcon={<FormEmailIcon sx={{ color: "neutral.500", mr: 1 }} />}
            />
            <RHFTextField
              type="password"
              fullWidth
              outerLabel="Password *"
              name="password"
              placeholder="Enter Password Here"
              StartIcon={<PasswordIcon sx={{ color: "neutral.500", mr: 1 }} />}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <RHFCheckbox name="loggedIn" label="Remember me" />
              <Typography variant="body2" component="span" textAlign="center">
                <StyledLink href="/forgot-password" sx={{ fontWeight: 600 }}>
                  Forgot Password
                </StyledLink>
              </Typography>
            </Box>
            <LoadingButton
              fullWidth
              variant="contained"
              type="submit"
              sx={{ borderRadius: "8px" }}
              loading={isLoading}
            >
              Login
            </LoadingButton>
            <Typography variant="body2" component="span" textAlign="center" fontWeight={600}>
              {`Don't have an account?`}
              <StyledLink href="/sign-up">Book a demo</StyledLink>
            </Typography>
          </Stack>
        </FormProvider>
      </Stack>
    </Stack>
  );
}
