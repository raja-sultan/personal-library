import { style } from "./responsible-style";
import { FormProvider, RHFAutocompleteAsync } from "common";
import { Grid, Paper, Box, Button, Stack, Typography } from "@mui/material";

// mui
import Tooltip from "@mui/material/Tooltip";
import type { HiringTeamInterface } from "./responsible-types";
import { UseResponsibleJobs } from "./use-responsible";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export function ResponsibleJobs({ hiringTeamData = {} }: any): JSX.Element {
  const {
    showValue,
    methods,
    onSubmit,
    handleSubmit,
    toggleInputs,
    getValues,
    getHiringTeamUsersQuery,
  } = UseResponsibleJobs({ hiringTeamData });

  return (
    <Paper sx={style.responsibleMainDiv}>
      <Stack sx={style.stack}>
        <Typography variant="h6" color="text.primary">
          Who&apos;s responsible for this job?
        </Typography>
        <Typography variant="subtitle2" color="text.primary">
          Responsible for tasks by default <InfoOutlinedIcon />
        </Typography>
      </Stack>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <ResponsiblePerson
              showValue={showValue}
              starIcon="*"
              label="Hiring Managers"
              name="hiringManagers"
              placeholder="Hiring Managers"
              info="All Hiring Managers must have either site admin or job admin permissions on this job. If a user is removed, they will be kept for historical purposes but will not be able to access this job."
              value={getValues("hiringManagers")}
              apiQuery={getHiringTeamUsersQuery}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ResponsiblePerson
              showValue={showValue}
              label="Recruiters"
              name="recruiters"
              placeholder="Recruiters"
              info="All Hiring Managers must have either site admin or job admin permissions on this job. If a user is removed, they will be kept for historical purposes but will not be able to access this job."
              value={getValues("recruiters")}
              apiQuery={getHiringTeamUsersQuery}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ResponsiblePerson
              showValue={showValue}
              label="Sources"
              name="sources"
              placeholder="Sources"
              info="All Hiring Managers must have either site admin or job admin permissions on this job. If a user is removed, they will be kept for historical purposes but will not be able to access this job."
              value={getValues("sources")}
              apiQuery={getHiringTeamUsersQuery}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ResponsiblePerson
              showValue={showValue}
              label="Coordinators"
              name="coordinators"
              placeholder="Coordinators"
              info="All Hiring Managers must have either site admin or job admin permissions on this job. If a user is removed, they will be kept for historical purposes but will not be able to access this job."
              value={getValues("coordinators")}
              apiQuery={getHiringTeamUsersQuery}
            />
          </Grid>
        </Grid>
        {!showValue && (
          <Stack flexDirection="row" gap={1.6}>
            <Button
              type="button"
              onClick={toggleInputs}
              variant="outlined"
              // color="error"
              sx={style.responsibleButtons}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={style.responsibleButtons}
            >
              Save
            </Button>
          </Stack>
        )}
      </FormProvider>
      {showValue && (
        <Button
          onClick={toggleInputs}
          variant="contained"
          sx={style.responsibleButtons}
        >
          Edit
        </Button>
      )}
    </Paper>
  );
}

function ResponsiblePerson({
  apiQuery,
  name,
  placeholder,
  label,
  value,
  info,
  showValue,
  starIcon,
}: HiringTeamInterface): JSX.Element {
  let displayValue = "N/A";

  if (value?.length > 0) {
    displayValue = value.map((obj) => obj.userName).join(", ");
  }

  return (
    <Box>
      <Stack flexDirection="row" gap={1.6} marginBottom={1}>
        <Typography>
          {label}{" "}
          <Typography color="error.main" component="span">
            {starIcon}
          </Typography>
        </Typography>
        <Tooltip title={info} placement="top">
          <InfoOutlinedIcon fontSize="small" />
        </Tooltip>
      </Stack>

      {showValue && <Typography variant="subtitle2">{displayValue}</Typography>}
      {!showValue && (
        <RHFAutocompleteAsync
          multiple
          name={name}
          placeholder={placeholder}
          apiQuery={apiQuery}
          getOptionLabel={(option: any) => option.userName}
          limitTags={2}
        />
      )}
    </Box>
  );
}
