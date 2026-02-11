import React from "react";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import type { SetNewPasswordFormTypes } from "./set-password.types";
import {
  setNewPasswordInitialValue,
  setNewPasswordFormSchema,
} from "./set-password.schema";
import { PlLogoIcon, PasswordIcon } from "common/assets";
import { RHFTextField, FormProvider } from "common/components";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { useRouter, useSearchParams } from "next/navigation";

export function SetNewPasswordSection({
  useSetNewPasswordMutation,
}): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [mutation, { isLoading }] = useSetNewPasswordMutation();

  const method = useForm<SetNewPasswordFormTypes>({
    resolver: yupResolver(setNewPasswordFormSchema),
    defaultValues: setNewPasswordInitialValue,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { handleSubmit } = method;
  async function formSubmitHandler(
    formData: SetNewPasswordFormTypes
  ): Promise<any> {
    const payload = {
      email,
      tempPassword: formData.temporaryPassword,
      newPassword: formData.newPassword,
    };
    try {
      const { message } = await mutation(payload).unwrap();
      toast.success(message || "New Password Set Successfully");
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
            {/* <RHFTextField
              type="email"
              outerLabel="Email"
              fullWidth
              name="email"
              placeholder="Enter Email here"
              StartIcon={<FormEmailIcon sx={{ color: "neutral.500", mr: 1 }} />}
            /> */}
            <RHFTextField
              type="password"
              fullWidth
              outerLabel="Temporary Password"
              name="temporaryPassword"
              placeholder="Enter password here"
              StartIcon={<PasswordIcon sx={{ color: "neutral.500", mr: 1 }} />}
            />
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
          </Stack>
        </FormProvider>
      </Stack>
    </Stack>
  );
}
