import { style } from "./care-team-see-jobs-style";
import { TableHeader, CustomTable } from "common";
import { Box, Paper, Typography } from "@mui/material";
import StepperFormSkeleton from "@sections/jobs/stepper-form-skeleton";
import { UseCareTeamSeeJobs } from "./use-care-team-see-jobs";

export function CareTeamSeeJob(): JSX.Element {
  const {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    setSearch,
    careTeamSeeJobs,
  } = UseCareTeamSeeJobs();

  const columns = [
    {
      accessorFn: (row) => row.username,
      id: "username",
      cell: (info) => (
        <Typography variant="body1" display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Typography>
      ),
      header: () => (
        <Box width="100%" display="flex" justifyContent="flex-start">
          <Typography variant="body1">Name</Typography>
        </Box>
      ),
    },
    {
      accessorFn: (row) => row.email,
      id: "email",
      cell: (info) => (
        <Typography variant="body1" display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Typography>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          <Typography variant="body1">Email Address</Typography>
        </Box>
      ),
    },
    {
      accessorFn: (row) => row.type,
      id: "type",
      cell: (info) => (
        <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
          {info.getValue() ?? "---"}
        </Typography>
      ),
      header: () => (
        <Box display="flex" justifyContent="flex-start">
          <Typography variant="body1">Permission level</Typography>
        </Box>
      ),
    },
  ];

  if (isLoading) {
    return <StepperFormSkeleton />;
  }
  return (
    <Paper sx={style.careTeamSeeJobsMainDiv}>
      <Typography variant="h6" sx={{ py: 1 }}>
        Who can see this job?
      </Typography>

      <Box my={2}>
        <TableHeader
          onChanged={(e) => {
            setSearch(e);
          }}
          tableHeaderData={[
            {
              type: "search",
              FieldProps: {
                name: "search",
                placeholder: "Search",
              },
            },
            // {
            //   type: "select",
            //   FieldProps: {
            //     name: "allPermission",
            //     label: "All Permission",
            //   },
            //   options: [
            //     { label: "All Permissions", value: "allPermission" },
            //     { label: "job Admin: Private", value: "private" },
            //     { label: "job Admin: Standard", value: "standard" },
            //   ],
            // },
          ]}
        />
      </Box>

      <CustomTable
        columns={columns}
        data={careTeamSeeJobs}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        isPagination={false}
      />
    </Paper>
  );
}
