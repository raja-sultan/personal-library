import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { CustomBreadCrumbs, CustomTable, TableHeader } from "common";
//import SouthIcon from "@mui/icons-material/South";
//import { ShareModal } from "./share-modal";
import { breadcrumbs } from "./summary-data";
import useSummary from "./use-summary";

function DepartmentSummarySection(): JSX.Element {
  const {
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    // open,
    // setOpen,
    departmentOptions,
    officeOptions,
    userList,
    setParams,
  } = useSummary();

  const departmentData = data?.data?.map((item) => {
    return item;
  });

  const columns = [
    {
      accessorFn: (row: any) =>
        row?.totalOpeningsByDepartment?.department ?? "-",
      id: "totalOpeningsByDepartment",
      header: () => <Box>Department : [ Total Openings ]</Box>,
      cell: (info: any) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {`${info.getValue()}`}
          <Box
            sx={{ color: "primary.main", fontWeight: 600 }}
          >{`[${info?.row?.original?.totalOpeningsByDepartment?.totalOpenings ?? "-"}]`}</Box>
        </Box>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.openJobsCount ?? "-",
      id: "openJobsCount",
      header: () => <Box>Open Jobs</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.liveJobsCount ?? "-",
      id: "liveJobsCount",
      header: () => <Box>Live Jobs Count</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
    {
      accessorFn: (row: any) =>
        row?.totalOpeningsByDepartment?.totalOpenings ?? "-",
      id: "totalOpenings",
      header: () => <Box>Total Openings</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.stageCounts?.department ?? "-",
      id: "stageCounts",
      header: () => <Box>Department</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.stageCounts?.department ?? "-",
      id: "stageCounts",
      header: () => <Box>Stages : [ Jobs Count ]</Box>,
      cell: (info: any) => {
        return (
          <Box>
            {info?.row?.original?.stageCounts?.stageCounts?.map(
              (item, index) => (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  key={index}
                >
                  {item?.stage ?? "Unknown Stage"}
                  <Box
                    sx={{ color: "primary.main", fontWeight: 600 }}
                  >{`[${item?.count ?? "-"}]`}</Box>
                </Box>
              )
            )}
          </Box>
        );
      },
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
          Department Summary
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
              type: "multiselect",
              FieldProps: {
                name: "user",
                label: "User",
              },
              options: userList ?? [
                {
                  id: 1,
                  label: "No User Found",
                  value: "No User Found",
                },
              ],
            },
          ]}
        />
      </Card>
      <Box sx={{ mt: 2 }}>
        <CustomTable
          data={
            departmentData && departmentData.length > 0
              ? departmentData[0]?.data
              : []
          }
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isPagination
          isSuccess={isSuccess}
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

export default DepartmentSummarySection;
