"use client";

import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { main, button } from "./style";
import { FormProvider, RHFTextField } from "common/components";
import { useForm } from "react-hook-form";
import { ChangePasswordIcon } from "common/assets/icons";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, changePasswordInitialValue } from "./schema";
import toast from "react-hot-toast";
import type { ChangePasswordTypes } from "./types";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { authActions } from "@slices";
import { useDispatch } from "@store";

export function ChangePassword({
  useChangePasswordMutation,
}: any): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const methods = useForm<ChangePasswordTypes>({
    resolver: yupResolver(schema),
    defaultValues: changePasswordInitialValue,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [mutation, { isLoading }] = useChangePasswordMutation();
  const { handleSubmit } = methods;

  async function formSubmitHandler(payload: ChangePasswordTypes): Promise<any> {
    try {
      const result = await mutation(payload).unwrap();
      toast.success(result?.message || "Password Change Successfully!");
      dispatch(authActions.logout());
      router.push("/sign-in");
    } catch (error) {
      toast.error(error.data.message);
    }
  }
  return (
    <Grid container p={5}>
      <Grid item xs={12} spacing={4} sx={main}>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={6} m={5} mb={3}>
            <Card sx={{ border: "1px solid lightgrey", borderRadius: 4 }}>
              <CardContent>
                <Grid
                  item
                  xs={12}
                  sx={{
                    height: "40px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Link href="my-profile" style={{ textDecoration: "none" }}>
                    <ChangePasswordIcon sx={{ color: "neutral.400" }} />
                  </Link>
                </Grid>

                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(formSubmitHandler)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    mt={1}
                  >
                    <Typography sx={{ fontSize: 36, fontWeight: 700 }}>
                      Change Password
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: "text.secondary",
                      }}
                      mt={2}
                    >
                      Enter your new Password here
                    </Typography>
                    <Grid
                      item
                      md={7}
                      xs={12}
                      container
                      direction="column"
                      gap={3}
                      mt={3}
                    >
                      <Box>
                        <RHFTextField
                          name="oldPassword"
                          type="password"
                          placeholder="Current Password"
                          fullWidth
                        />
                      </Box>
                      <Box>
                        <RHFTextField
                          name="newPassword"
                          type="password"
                          placeholder="New Password"
                          fullWidth
                        />
                      </Box>
                      <Box>
                        <RHFTextField
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                          fullWidth
                        />
                      </Box>
                      <Box>
                        <LoadingButton
                          sx={button}
                          loading={isLoading}
                          variant="contained"
                          type="submit"
                        >
                          Change Password
                        </LoadingButton>
                      </Box>
                    </Grid>
                  </Box>
                </FormProvider>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
