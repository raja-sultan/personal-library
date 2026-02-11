import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { CustomBreadCrumbs, CustomTable, TableHeader } from "common";
//import SouthIcon from "@mui/icons-material/South";
//import { ShareModal } from "./share-modal";
import { breadcrumbs, creatingAreaOptions } from "./interviewing-data";
import ReactApexChart from "react-apexcharts";
import useInterviewing from "./use-interviewing";

function InterviewingActivitySection(): JSX.Element {
  const {
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    stageLabels,
    newSeries,
    // open,
    //setOpen,
    departmentOptions,
    officeOptions,
    jobList,
    userList,
    setParams,
  } = useInterviewing();

  const columns = [
    {
      accessorFn: (row: any) => row.jobName ?? "-",
      id: "jobName",
      header: () => <Box>Job Name</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.count ?? "-",
      id: "count",
      header: () => <Box>Count</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
  ];

  return (
    <Card
      sx={{
        p: "8px 25px 25px 25px",
        background: "background.default",
      }}
    >
      <Box sx={{ mt: 1.5 }}>
        <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ color: "text.primary", my: 3 }}>
          Interviewing Activity
        </Typography>
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(true);
            }}
          >
            Share
          </Button>
          <Avatar sx={{ backgroundColor: "primary.main" }}>
            <SouthIcon sx={{ color: "common.white" }} />
          </Avatar>
        </Box> */}
      </Box>
      <Card sx={{ p: 2 }}>
        <Typography
          variant="body1"
          sx={{ color: "text.primary", fontWeight: 600 }}
        >
          Apply Filters
        </Typography>
        <TableHeader
          showClearFilterButton
          gridProps={{
            lg: 2.2,
          }}
          onChanged={(e: any) => {
            setParams(e);
          }}
          tableHeaderData={[
            {
              type: "multiselect",
              FieldProps: {
                name: "job",
                label: "Job",
              },
              options: jobList ?? [
                {
                  id: 1,
                  label: "No Job Found",
                  value: "No Job Found",
                },
              ],
            },
            {
              type: "select",
              FieldProps: {
                name: "jobStatus",
                label: "Job Status",
              },
              options: [
                {
                  label: "Part Time",
                  value: "partTime",
                },
                {
                  label: "Full Time",
                  value: "fullTime",
                },
                {
                  label: "Contract",
                  value: "contract",
                },
                {
                  label: "Permanent",
                  value: "permanent",
                },
                {
                  label: "Intern",
                  value: "Intern",
                },
                {
                  label: "Temporary",
                  value: "temporary",
                },
                {
                  label: "Terminated",
                  value: "terminated",
                },
              ],
            },
            {
              type: "multiselect",
              FieldProps: {
                name: "department",
                label: "Department",
              },
              options: departmentOptions ?? [
                {
                  id: 1,
                  label: "No Department Found",
                  value: "No Department Found",
                },
              ],
            },
            {
              type: "multiselect",
              FieldProps: {
                name: "office",
                label: "Office",
              },
              options: officeOptions ?? [
                {
                  id: 1,
                  label: "No Office Found",
                  value: "No Office Found",
                },
              ],
            },
            {
              type: "date",
              FieldProps: {
                name: "date",
                label: "Date Applied",
              },
            },
            {
              type: "multiselect",
              FieldProps: {
                name: "recruiter",
                label: "Recruiter",
              },
              options: userList ?? [
                {
                  id: 1,
                  label: "No Recruiter Found",
                  value: "No Recruiter Found",
                },
              ],
            },
          ]}
        />
      </Card>
      <Box sx={{ mt: 2 }}>
        {/* Chart to display data */}
        <Box
          sx={{
            my: 3,
            backgroundColor: "background.default",
            borderRadius: "8px",
            py: 2,
          }}
        >
          <ReactApexChart
            options={creatingAreaOptions(stageLabels) as ApexCharts.ApexOptions}
            series={newSeries}
            type="bar"
            height={320}
          />
        </Box>
        <CustomTable
          data={data?.data}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isPagination
          isSuccess={isSuccess}
          showSerialNo
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
          // onPageChange={(onPageData: any) => {
          //   setParams({
          //     page: onPageData,
          //     offset: (onPageData - 1) * 10,
          //   });
          // }}
        />
      </Box>
      {/* Share Email Modal */}
      {/* <ShareModal open={open} setOpen={setOpen} /> */}
    </Card>
  );
}

export default InterviewingActivitySection;
