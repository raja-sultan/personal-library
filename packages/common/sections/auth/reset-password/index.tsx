import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import type { ResetPasswordFormTypes } from "./reset-password.types";
import {
  resetPasswordInitialValue,
  resetPasswordFormSchema,
} from "./reset-password.schema";
import { PlLogoIcon, PasswordIcon } from "common/assets";
import { RHFTextField, FormProvider, StyledLink } from "common/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

export function ResetPasswordSection({
  useResetPasswordMutation,
}): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const [mutation, { isLoading }] = useResetPasswordMutation();

  const method = useForm<ResetPasswordFormTypes>({
    resolver: yupResolver(resetPasswordFormSchema),
    defaultValues: resetPasswordInitialValue,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit } = method;

  async function formSubmitHandler(
    formData: ResetPasswordFormTypes
  ): Promise<any> {
    const payload = {
      email,
      code,
      password: formData.newPassword,
    };
    try {
      const { message } = await mutation(payload).unwrap();
      toast.success(message || "Password Reset Successfully");
      router.push("/sign-in");
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <Stack sx={{ alignItems: "center", p: 2 }}>
      <Stack spacing={5}>
        <Box sx={{ textAlign: "center" }}>
          <PlLogoIcon />
        </Box>
        <FormProvider
          methods={method}
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <Stack spacing={4} direction="column">
            <Typography textAlign="center" variant="h4">
              Reset Password
            </Typography>
            {/* <Typography
              textAlign="center"
              variant="body2"
              color="text.secondary"
            >
              Enter new password
            </Typography> */}
            <RHFTextField
              type="password"
              fullWidth
              outerLabel="New Password"
              name="newPassword"
              placeholder="Enter password here"
              StartIcon={<PasswordIcon sx={{ color: "neutral.500", mr: 1 }} />}
            />
            <RHFTextField
              type="password"
              fullWidth
              outerLabel="Confirm Password"
              name="confirmPassword"
              placeholder="Enter password here"
              StartIcon={<PasswordIcon sx={{ color: "neutral.500", mr: 1 }} />}
            />
            <LoadingButton
              fullWidth
              variant="contained"
              type="submit"
              sx={{ borderRadius: "8px" }}
              loading={isLoading}
            >
              Login
            </LoadingButton>
            <Typography variant="body2" component="span" textAlign="center">
              Back to
              <StyledLink href="/sign-in">Sign In</StyledLink>
            </Typography>
          </Stack>
        </FormProvider>
      </Stack>
    </Stack>
  );
}
