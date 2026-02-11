"use client";
import { FormProvider } from "common";
import React, { Fragment } from "react";
import CustomCard from "@components/custom-card";
import { Typography, Box, Grid, Divider, MenuItem, Button } from "@mui/material";
import { useCreateGoal } from "./use-create-goal";
import { useCreateFormData, } from "./create-goal.data";
import { LoadingButton } from "@mui/lab";
import { CustomLoader } from "@components/loader";

// ===================================================

function CreateGoal(): React.JSX.Element {
  const {
    methods,
    router,
    handleSubmit,
    onSubmit,
    getGoalId,
    typeGroupComponent,
    typeDepartmentComponent,
    isCreateLoading,
    isUpdateLoading,
    isGetGoalLoading,
    path,
  } = useCreateGoal();

  const data = useCreateFormData();
  const watchValue = methods.watch('type')


  return (
    <CustomCard
      header
      cardHeader={{
        title: getGoalId ? 'Edit Goal' : 'Create Goal',
        divider: true,
        onBack: () => {
          router.push(path);
        },
      }}
    >
      {isGetGoalLoading && <CustomLoader />}
      <Box mt="25px">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {data.map(({ divider, fields, head, id, subText }) => (
            <Fragment key={id}>
              <Grid container spacing={2} columnGap={3}>
                <Grid item xs={12} md={4} lg={4.5} xl={4} sm={12}>
                  <Typography variant="subtitle1" fontWeight={600} color='text.primary'>
                    {head}
                  </Typography>
                  <Typography mt={0.4} variant="subtitle2" fontWeight={400} color='text.secondary'>
                    {subText}
                  </Typography>
                </Grid>
                <Grid item xl={4.5} lg={6} md={6} xs={12} sm={12} sx={{ width: '100%' }}>
                  <Grid container spacing={2}>
                    {fields.map((field) => (
                      <Grid item lg={field.lg} md={field.md} xs={field.xs} key={field.id} sx={{ width: '100%' }}>
                        <field.component size="small" fullWidth sx={{ mb: "20px" }} {...field.componentProps}>
                          {field?.componentProps?.select
                            ? field?.options?.map((option: { value?: string; label?: string }) => (
                              <MenuItem value={option?.value} key={option?.value} sx={{ fontSize: "1.6rem" }}>
                                {option?.label}
                              </MenuItem>
                            ))
                            : null}
                          {watchValue === 'Individual' && field?.componentProps?.name === 'visibility' && field?.componentProps?.select
                            ? field?.optionsIndividual?.map((option: { value?: string; label?: string }) => (
                              <MenuItem value={option?.value} key={option?.value} sx={{ fontSize: "1.6rem" }}>
                                {option?.label}
                              </MenuItem>
                            ))
                            : null}
                          {watchValue === 'Group' && field?.componentProps?.name === 'visibility' && field?.componentProps?.select
                            ? field?.optionsGroup?.map((option: { value?: string; label?: string }) => (
                              <MenuItem value={option?.value} key={option?.value} sx={{ fontSize: "1.6rem" }}>
                                {option?.label}
                              </MenuItem>
                            ))
                            : null}
                          {watchValue === 'Department' && field?.componentProps?.name === 'visibility' && field?.componentProps?.select
                            ? field?.optionsDepartment?.map((option: { value?: string; label?: string }) => (
                              <MenuItem value={option?.value} key={option?.value} sx={{ fontSize: "1.6rem" }}>
                                {option?.label}
                              </MenuItem>
                            ))
                            : null}
                          {watchValue === 'Company' && field?.componentProps?.name === 'visibility' && field?.componentProps?.select
                            ? field?.optionsCompany?.map((option: { value?: string; label?: string }) => (
                              <MenuItem value={option?.value} key={option?.value} sx={{ fontSize: "1.6rem" }}>
                                {option?.label}
                              </MenuItem>
                            ))
                            : null}
                        </field.component>
                        {watchValue === 'Group' && field?.componentProps?.name === 'type' && <typeGroupComponent.component size="small" fullWidth {...typeGroupComponent.componentProps}>
                          {typeGroupComponent?.componentProps?.select
                            ? typeGroupComponent?.groupOptions?.map((option: { value?: string; label?: string }) => (
                              <MenuItem value={option?.value} key={option?.value} sx={{ fontSize: "1.6rem" }}>
                                {option?.label}
                              </MenuItem>
                            ))
                            : null}
                        </typeGroupComponent.component>
                        }
                        {watchValue === 'Department' && field?.componentProps?.name === 'type' && <typeDepartmentComponent.component size="small" fullWidth {...typeDepartmentComponent.componentProps}>
                          {typeDepartmentComponent?.componentProps?.select
                            ? typeDepartmentComponent?.departmentOptions?.map((option: { value?: string; label?: string }) => (
                              <MenuItem value={option?.value} key={option?.value} sx={{ fontSize: "1.6rem" }}>
                                {option?.label}
                              </MenuItem>
                            ))
                            : null}
                        </typeDepartmentComponent.component>
                        }
                      </Grid>
                    ))}

                  </Grid>
                </Grid>
              </Grid>
              {divider && <Divider sx={{ my: 3 }} />}
            </Fragment>
          ))}
          <Box mt={1.5} pb={2} sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                router.push(path);
              }}
            >
              Cancel
            </Button>
            <LoadingButton loading={isCreateLoading || isUpdateLoading} type="submit" variant="contained">
              Save
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </CustomCard>
  );
}

export default CreateGoal;