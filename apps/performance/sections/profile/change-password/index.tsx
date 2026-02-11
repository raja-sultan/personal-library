"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ValidationSchema, defaultValues } from "./change-password.data";
import type { IChangePassword } from "./change-password.data";
import { Box, Grid, Button, Typography, Stack, Card } from "@mui/material";
import { FormProvider, RHFTextField } from "common";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordValidation } from "@components/password-validation";
import { useRouter } from "next/navigation";
import { useChangePasswordMutation } from "@services/profile/profile-api";
import toast from "react-hot-toast";

// ===================================================

function ProfileChangePassword(): React.JSX.Element {
  const [showPassCriteria, setShowPassCriteria] = useState<boolean>(false);
  const router = useRouter();
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ValidationSchema),
  });
  const { handleSubmit, watch, reset } = methods;
  const password = watch("newPassword");
  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (data: IChangePassword): Promise<void> => {
    const formData = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    try {
      await changePassword(formData).unwrap();
      toast.success("Your password has been successfully changed.");
      reset();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Card sx={{ p: 2.4 }}>
      <Box>
        <Typography variant="h5" fontWeight={600}>
          Change Password
        </Typography>
        <Typography
          variant="subtitle2"
          fontWeight={400}
          color="neutral.500"
          className="content"
        >
          Reset your account password
        </Typography>
      </Box>
      <Grid container sx={{ mt: 4.8, mb: 2 }}>
        <Grid item xs={12} lg={4} xl={4}>
          <Box>
            <Typography variant="h6" color="neutral.700" fontWeight={600}>
              Account Sign In
            </Typography>
            <Typography
              mt={0.6}
              color="neutral.500"
              variant="subtitle2"
              fontWeight={400}
            >
              We recommend that you periodically update your password to help
              prevent unauthorized access to your account.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <FormProvider
            sx={{ width: "100%" }}
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid sx={{ marginBottom: "2rem" }} item xs={12} lg={6}>
              <Stack sx={{ gap: 2 }}>
                <RHFTextField
                  name="currentPassword"
                  outerLabel="Current Password"
                  type="password"
                  placeholder="Enter Password here"
                  mb="1rem"
                />
                <RHFTextField
                  name="newPassword"
                  outerLabel="New Password"
                  type="password"
                  placeholder="Enter Password here"
                  onFocus={() => {
                    setShowPassCriteria(true);
                  }}
                  onBlur={() => {
                    setShowPassCriteria(false);
                  }}
                />
                {showPassCriteria && <PasswordValidation value={password} />}
                <RHFTextField
                  name="confirmPassword"
                  outerLabel="Confirm Password"
                  type="password"
                  placeholder="Enter Password here"
                />
              </Stack>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                gap: "1rem",
                mt: 5,
              }}
            >
              <Button
                type="button"
                onClick={() => {
                  router.push("/profile");
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            </Box>
          </FormProvider>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProfileChangePassword;
