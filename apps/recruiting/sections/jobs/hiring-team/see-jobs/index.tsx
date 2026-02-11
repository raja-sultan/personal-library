import { style } from "./see-jobs-style";
import { TableHeader, CustomTable } from "common";
import { Box, Paper, Typography } from "@mui/material";
import StepperFormSkeleton from "@sections/jobs/stepper-form-skeleton";
import { UseSeeJobs } from "./use-see-jobs";

export function SeeJobs(): JSX.Element {
  const {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    columns,
    setSearch,
    seeJobs,
  } = UseSeeJobs();

  if (isLoading) {
    return <StepperFormSkeleton />;
  }

  return (
    <Paper sx={style.seeJobsMainDiv}>
      <Typography variant="h6" sx={style.seeJobsTitle}>
        Who can see this job?
      </Typography>

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
      <Box sx={{ mt: 2 }}>
        <CustomTable
          columns={columns}
          data={seeJobs}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          isPagination={false}
        />
      </Box>
    </Paper>
  );
}
