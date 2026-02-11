"use client";

import CustomCard from "@components/custom-card";
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@assets/icons";
import { useUpdatesSetting } from "./use-updates-setting";
import { ThemeModeColor } from "@root/utils";
import { FormProvider, RHFSwitch } from "common";
import { Questions } from "./questions";
import { formData } from "./updates-setting.data";
import {
  Box,
  Card,
  Grid,
  Typography,
  Divider,
  Stack,
  MenuItem,
  Button,
} from "@mui/material";
import { CustomAlert } from "@components/alert";
import type { Theme } from "@mui/material";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions"

export function UpdateSettings(): JSX.Element {
  const {
    handleGeneralToggle,
    handleDefaultsToggle,
    isOpen,
    onSubmit,
    methods,
    handleSubmit,
  } = useUpdatesSetting();

  const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.UPDATES.SETTINGS;


  return (
    <>
      <CustomCard
        cardProps={{ sx: { py: 1.4 } }}
        subHeader
        cardSubHeader={{
          title: "Updates Settings",
        }}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

        <PermissionProtected permission={PERMISSION.EDIT_GENERAL}>
          <Card sx={styles.wrapper}>
            <Grid container>
              <Grid item xxs={12} md={5}>
                <Box sx={styles.headerWrapper}>
                  {!isOpen.general && (
                    <ArrowDownCircleIcon
                      onClick={handleGeneralToggle}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                  {isOpen.general && (
                    <ArrowUpCircleIcon
                      onClick={handleGeneralToggle}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={({ palette: { neutral } }: Theme) => ({
                      color: ThemeModeColor(neutral[700], neutral[300]),
                      ml: "2rem",
                    })}
                  >
                    General
                  </Typography>
                </Box>
              </Grid>

              <Grid item xxs={12} lg={7}>
                {isOpen.general && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    py="1rem"
                    sx={{ mx: { xxs: "3rem", lg: "0rem" } }}
                  >
                    <RHFSwitch
                      name="employeeSentiment"
                      label={
                        <Typography variant="body2" pl={1}>
                          Employee sentiment score
                        </Typography>
                      }
                    />

                    <Typography
                      pl={4.5}
                      variant="caption"
                      fontWeight={600}
                      color="text.secondary"
                      mb={1.6}
                    >
                      At the end of each update, ask users to rate how they’re
                      feeling on a scale of 1 - 5
                    </Typography>
                    <RHFSwitch
                      name="publicUpdates"
                      label={
                        <Typography variant="body2" pl={1}>
                          Public updates
                        </Typography>
                      }
                    />

                    <Typography
                      pl={4.5}
                      variant="caption"
                      fontWeight={600}
                      color="text.secondary"
                    >
                      Allow users to post their updates publicly for the entire
                      company to read
                    </Typography>
                  </Box>
                )}
              </Grid>

            </Grid>
          </Card>
        </PermissionProtected>

        <PermissionProtected permission={PERMISSION.EDIT_DEFAULT}>
          <Card sx={styles.wrapper}>
            <Grid container>
              <Grid item xxs={12} md={5}>
                <Box sx={styles.headerWrapper}>
                  {!isOpen.defaults && (
                    <ArrowDownCircleIcon
                      onClick={handleDefaultsToggle}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                  {isOpen.defaults && (
                    <ArrowUpCircleIcon
                      onClick={handleDefaultsToggle}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={({ palette: { neutral } }: Theme) => ({
                      color: ThemeModeColor(neutral[700], neutral[300]),
                      ml: "2rem",
                    })}
                  >
                    Defaults
                  </Typography>
                </Box>

              </Grid>
              {isOpen.defaults && (
                <>
                  <Grid item xxs={12} lg={7}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="end"
                      py="1rem"
                      sx={{
                        mx: { xxs: "3rem", lg: "0rem" },
                      }}
                    >
                      <RHFSwitch
                        name="allowManagerOverride"
                        label={
                          <Typography variant="body2" pl={1}>
                            Allow manager override
                          </Typography>
                        }
                      />

                      <Typography
                        pl={4.5}
                        variant="caption"
                        fontWeight={600}
                        color="text.secondary"
                        mb={1.6}
                      >
                        Allow managers to set their own qustions and schedule for
                        their direct reports
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xxs={12}>
                    <Box sx={{ padding: "0 2rem 2rem 6rem" }}>
                      <Divider />
                      <Questions />
                      <Divider sx={{ mt: 2 }} />
                      <Grid container>
                        <Grid item xxs={12} lg={4.5}>
                          <Stack direction="row" my={1}>
                            <Box sx={{ flex: "45%" }}>
                              <Typography variant="body2" fontWeight={600}>
                                Schedule
                              </Typography>
                              <Typography variant="subtitle2" fontWeight={400}>
                                When and how often the company&apos;s update
                                reminders are sent out
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xxs={12} lg={7}>
                          <Grid item xxs={12} md={8}>
                            {formData?.map((field) => (
                              <Box key={field.id} sx={{ mb: 3, mt: 1 }}>
                                <field.component
                                  fullWidth
                                  {...field.componentProps}
                                >
                                  {field?.componentProps?.select
                                    ? field?.options?.map(
                                      (option: {
                                        value?: string;
                                        label?: string;
                                      }) => (
                                        <MenuItem
                                          value={option.value}
                                          key={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      )
                                    )
                                    : null}
                                </field.component>
                              </Box>
                            ))}
                          </Grid>

                          <CustomAlert
                            message="Reminders will be sent out at 9:00 AM in each
                            employee’s set timezone. If no timezone is set, it
                            will default to the company’s set time zone London."
                          />
                          <Box display="flex" justifyContent="end" mt={2}>
                            <Button type="submit" variant="contained">
                              Submit
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Card>
        </PermissionProtected>

      </FormProvider>
    </>
  );
}

const styles = {
  wrapper: { my: 2 },
  headerWrapper: {
    padding: "2.4rem 2rem",
    display: "flex",
    alignItems: "center",
  },
};
