import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import type { ForgotPasswordFormTypes } from "./forgot-password.types";
import {
  forgotPasswordInitialValue,
  forgotPasswordFormSchema,
} from "./forgot-password.schema";
import { PlLogoIcon, FormEmailIcon } from "common/assets";
import { RHFTextField, FormProvider, StyledLink } from "common/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

export function ForgotPasswordSection({
  useForgotPasswordMutation,
}: any): JSX.Element {
  const [mutation, { isLoading }] = useForgotPasswordMutation();

  const method = useForm<ForgotPasswordFormTypes>({
    resolver: yupResolver(forgotPasswordFormSchema),
    defaultValues: forgotPasswordInitialValue,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { handleSubmit, reset } = method;
  async function formSubmitHandler(
    formData: ForgotPasswordFormTypes
  ): Promise<any> {
    try {
      const { message } = await mutation(formData).unwrap();
      toast.success(message || "Email Sent Successfully");
      reset();
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
              Forgot Password
            </Typography>
            <Typography
              textAlign="center"
              variant="body2"
              color="text.secondary"
            >
              Enter your registered email address to receive a reset password
              link
            </Typography>
            <RHFTextField
              type='text'
              outerLabel="Email"
              fullWidth
              name="email"
              placeholder="Enter Your Email"
              StartIcon={<FormEmailIcon sx={{ color: "neutral.500", mr: 1 }} />}
            />
            <LoadingButton
              fullWidth
              variant="contained"
              type="submit"
              sx={{ borderRadius: "8px" }}
              loading={isLoading}
            >
              Send link
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
