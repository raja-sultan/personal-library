import React, { useState } from "react";
import { style } from "./basic-information-style";
import { useSearchParams } from "next/navigation";
import { FormProvider, RHFAutocompleteAsync } from "common";
import { Typography, Stack, Box, Paper, Button, Grid } from "@mui/material";
import { usePutResponsiblePersonMutation } from "@services/jobs/create-jobs/hiring-team/hiring-team-api";
import { UseBasicInformation } from "./use-basic-information";
import type { HiringTeamInterface } from "@sections/jobs/hiring-team/responsible-jobs/responsible-types";

export function BasicInformation({ hiringTeamData = {} }): JSX.Element {
  const {
    getHiringTeamUsersQuery,
    methods,
    getValues,
    watch,
    // toggleInputs,
    onSubmit,
    handleSubmit,
    showValue,
  } = UseBasicInformation({
    hiringTeamData,
  });
  return (
    <Box>
      <Stack sx={style.headerStyle}>
        <Typography variant="h6">Basic Information</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Responsible for tasks by default
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
        Category
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={0.3}>
          <Grid item xs={12} md={6}>
            <Paper sx={style.categoryData}>
              <Typography variant="body2" component="h6">
                Hiring Manager
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <EditUser
              showValue={showValue}
              name="hiringManagers"
              placeholder="Hiring Manager"
              value={getValues("hiringManagers")}
              apiQuery={getHiringTeamUsersQuery}
              watch={watch}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={style.categoryData}>
              <Typography variant="body2" component="h6">
                Recruiter
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <EditUser
              showValue={showValue}
              name="recruiters"
              placeholder="Recruiters"
              value={getValues("recruiters")}
              apiQuery={getHiringTeamUsersQuery}
              watch={watch}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={style.categoryData}>
              <Typography variant="body2" component="h6">
                Coordinators
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <EditUser
              showValue={showValue}
              name="coordinators"
              placeholder="Coordinators"
              value={getValues("coordinators")}
              apiQuery={getHiringTeamUsersQuery}
              watch={watch}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={style.categoryData}>
              <Typography variant="body2" component="h6">
                Sources
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <EditUser
              showValue={showValue}
              name="sources"
              placeholder="Sources"
              value={getValues("sources")}
              apiQuery={getHiringTeamUsersQuery}
              watch={watch}
            />
          </Grid>
        </Grid>
        {/* {!showValue && (
          <Stack flexDirection="row" gap={1.6}>
            <Button
              type="button"
              onClick={toggleInputs}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </Stack>
        )} */}
      </FormProvider>
    </Box>
  );
}

function EditUser({
  apiQuery,
  name,
  placeholder,
  // toggleInputs,
  value,
  // showValue,
  watch, // onSubmit,
}: HiringTeamInterface): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [showValue, setShowValue] = useState<boolean>(true);

  const [updateResponsiblePersonData]: any = usePutResponsiblePersonMutation();
  let displayValue = "N/A";

  if (value?.length > 0) {
    displayValue = value.map((obj) => obj.userName).join(", ");
  }
  const editUserHandler = (event: any): void => {
    event.preventDefault();
    setShowValue(false);
  };
  const updateUserHandler = (names: any): void => {
    const data = watch(names);
    const updatedJobData = {
      persons: data,
    };
    try {
      updateResponsiblePersonData({
        jobId,
        formData: updatedJobData,
        params: {
          personType: names,
        },
      });
    } catch (error) {
      // console.log(error);
    }
    setShowValue(true);
  };
  // const toggleInputs = (): void => {
  //   setShowValue((oldValue) => oldValue);
  // };
  return (
    <Box sx={style.categoryData}>
      <Box width="85%">
        {showValue && (
          <Typography variant="subtitle2">{displayValue}</Typography>
        )}
        {!showValue && (
          <RHFAutocompleteAsync
            fullWidth
            multiple
            name={name}
            placeholder={placeholder}
            apiQuery={apiQuery}
            getOptionLabel={(option: any) => option.userName}
            limitTags={2}
          />
        )}
      </Box>
      {showValue ? (
        <Button color="primary" variant="contained" onClick={editUserHandler}>
          Edit
        </Button>
      ) : (
        <>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              updateUserHandler(name);
            }}
          >
            Update
          </Button>
          {/* <Button type="submit" variant="contained">
            Update...
          </Button> */}
        </>
      )}
    </Box>
  );
}
