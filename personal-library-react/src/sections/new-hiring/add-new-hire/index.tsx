"use client";
import React, { useState } from "react";
import { Button, Grid, Paper, Typography, Divider } from "@mui/material";
import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  RHFCheckbox,
} from "common";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import TaskScreenSection from "./task-screen";
import { useNewHire } from "./use-new-hire";
import { newHireDetails, workInformationDetails } from "./new-hire-data";
import { useGetCriteriaListQuery } from "@services/settings/tasks/tasks-api";

export default function AddNewHireSection(): JSX.Element {
  const {
    handleSubmit,
    onSubmit,
    methods,
    router,
    departmentList,
    locationList,
    getUsersListQuery,
  } = useNewHire();
  const [isSecondScreenShow, setIsSecondScreenShow] = useState(false);
  const { data: criteriaDetails } = useGetCriteriaListQuery({
    params: { search: "", limit: 10, offset: 0 },
  });

  return (
    <Paper sx={{ p: 2 }}>
      <Button
        sx={{ mb: 2 }}
        variant="outlined"
        onClick={() => {
          router.back();
        }}
        startIcon={<ArrowCircleLeftOutlinedIcon />}
      >
        Add New Hire
      </Button>
      <Divider sx={{ mb: 2, borderBottomWidth: "2px" }} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container gap={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Personal Information
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Update the details that will be visible on Employees Profile
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            {newHireDetails?.map((item) => (
              <item.component
                sx={{ mb: 3 }}
                {...item?.componentProps}
                key={item.id}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mb: 2, borderBottomWidth: "2px" }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Work Information
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Add your work Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ mt: 1 }}>
            <>
              {workInformationDetails?.map((item) => (
                <item.component
                  sx={{ mb: 3 }}
                  {...item?.componentProps}
                  key={item.id}
                />
              ))}
              <Grid item xs={12} sx={{ mt: 1 }}>
                <RHFAutocompleteAsync
                  limitTags={2}
                  multiple
                  outerLabel="Department (optional)"
                  name="department"
                  getOptionLabel={(option: any) => option?.departmentName}
                  disableCloseOnSelect={false}
                  apiQuery={departmentList}
                  placeholder="Select Department"
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <RHFAutocompleteAsync
                  limitTags={2}
                  multiple
                  disableCloseOnSelect={false}
                  outerLabel="Location (optional)"
                  name="location"
                  getOptionLabel={(option: any) => option?.location}
                  apiQuery={locationList}
                  placeholder="Select Location"
                />
              </Grid>
              <Grid item xs={12} sx={{ my: 3 }}>
                <RHFAutocompleteAsync
                  disableCloseOnSelect={false}
                  outerLabel="Manager"
                  placeholder="Select Manager"
                  name="manager"
                  apiQuery={getUsersListQuery}
                  getOptionLabel={(option: any) => option?.userName}
                />
              </Grid>
            </>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mb: 2, borderBottomWidth: "2px" }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Onboarding
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Add employee Onboarding Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid item xs={12}>
              <RHFAutocompleteAsync
                disableCloseOnSelect={false}
                outerLabel="Onboarding Coordinator (Optional)"
                placeholder="Select Coordinator"
                name="onboardingCoordinator"
                apiQuery={getUsersListQuery}
                getOptionLabel={(option: any) => option?.userName}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2.5 }}>
              <RHFAutocompleteAsync
                disableCloseOnSelect={false}
                outerLabel="People to Notify (Optional)"
                placeholder="Select People"
                name="peopleNotify"
                apiQuery={getUsersListQuery}
                getOptionLabel={(option: any) => option?.userName}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2.5 }}>
              <RHFAutocompleteSync
                multiple
                limitTags={4}
                name="employmentStatus"
                outerLabel="Employment Status"
                placeholder="Employment Status"
                options={[
                  {
                    id: 1,
                    label: "Contact",
                    value: "Contact",
                  },
                  {
                    id: 2,
                    label: "Full Time",
                    value: "Full Time",
                  },
                  {
                    id: 3,
                    label: "Part Time",
                    value: "Part Time",
                  },
                  {
                    id: 4,
                    label: "Temporary",
                    value: "Temporary",
                  },
                  {
                    id: 5,
                    label: "Intern",
                    value: "intern",
                  },
                  {
                    id: 6,
                    label: "Terminated",
                    value: "terminated",
                  },
                ]}
                getOptionLabel={(option: any) => option?.label}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2.5 }}>
              <RHFAutocompleteSync
                limitTags={4}
                multiple
                name="otherCriteria"
                outerLabel="Other Criteria"
                placeholder="Select Criteria"
                options={
                  criteriaDetails?.data?.criteria.length
                    ? criteriaDetails?.data?.criteria?.map((item) => {
                        return {
                          id: item._id,
                          name: item.criteriaName,
                          value: item.criteriaName,
                        };
                      })
                    : []
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent="end" py={2} px={3} gap={1}>
          <RHFCheckbox name="skipPlan" label="Skip Onboarding Plan" />
          <Button variant="contained" type="submit" size="medium">
            Next
          </Button>
        </Grid>
      </FormProvider>

      {isSecondScreenShow && (
        <TaskScreenSection setIsSecondScreenShow={setIsSecondScreenShow} />
      )}
    </Paper>
  );
}
