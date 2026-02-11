import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { CustomBreadCrumbs, CustomTable, TableHeader } from "common";
//import SouthIcon from "@mui/icons-material/South";
//import { ShareModal } from "./share-modal";
import { breadcrumbs, getMonthName } from "./referrals-data";
import useCandidateSource from "./use-candidate-source";

function NewCandidateSource(): JSX.Element {
  const {
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    // open,
    //setOpen,
    setParams,
    departmentOptions,
    officeOptions,
    userList,
  } = useCandidateSource();

  const columns = [
    {
      accessorFn: (row: any) => row.source ?? "-",
      id: "source",
      header: () => <Box>Source</Box>,
      cell: (info: any) => info.getValue(),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => getMonthName(row.month) ?? "-",
      id: "stage",
      header: () => <Box>Month</Box>,
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
          New Candidate By Source
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
                  label: "Open",
                  value: "Open",
                },
                {
                  label: "Close",
                  value: "Close",
                },
                {
                  label: "Draft",
                  value: "Draft",
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
            {
              type: "date",
              FieldProps: {
                name: "date",
                label: "Date Applied",
              },
            },
          ]}
        />
      </Card>
      <Box sx={{ mt: 2 }}>
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

export default NewCandidateSource;
