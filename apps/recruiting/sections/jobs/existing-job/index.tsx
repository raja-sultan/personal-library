import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styles } from "./styles";
import {
  CustomBreadCrumbs,
  CustomChip,
  CustomTable,
  TableHeader,
} from "common";
import {} from "@mui/system";
import { useGetExistingJobQuery } from "@services/jobs/existing-job/existing-job-api";
import { useGetDepartmentsListQuery } from "@services/offices-and-departments/departments-api";
import { useGetOfficesListQuery } from "@services/offices-and-departments/offices-api";
import Link from "next/link";
import { styled } from "@mui/material/styles";

export function ExistingJobSection(): JSX.Element {
  const breadcrumbs = [
    { key: "", value: "Create a Job", link: "" },
    { key: "", value: "Copy an Existing Job", link: "" },
  ];

  const [search, setSearch] = useState<any>();
  const [template, setTemplate] = useState<boolean>(false);
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  //Status Function
  function getColorBasedOnStatus(
    info: any
  ): "success" | "warning" | "danger" | "started" {
    if (info.row.original.status === "Open") {
      return "success";
    } else if (info.row.original.status === "Close") {
      return "danger";
    } else if (info.row.original.status === "Draft") {
      return "warning";
    }
    return "started";
  }
  // table data

  const jobListColumns = [
    {
      accessorFn: (row: any) => row.jobInfo.jobName,
      id: "jobName",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          <StyledBackLink
            href={`/create-job?existing_job&jobId=${info?.row?.original?._id}`}
          >
            {info.getValue()}
          </StyledBackLink>
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Job
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row.requisitionId,
      id: "requisitionId",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Req ID
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row.jobInfo.department,
      id: "department",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Department
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row.jobInfo.office,
      id: "office",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Office
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row.status,
      id: "status",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          <CustomChip
            ChipProps={{ label: info.getValue() }}
            variant={getColorBasedOnStatus(info)}
          />
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Job Status
        </Box>
      ),
    },
  ];
  // API HANDLERS
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetExistingJobQuery({
      params: {
        limit: 10,
        offset: params.offset,
        templateJobs: template,
        ...search,
      },
    });

  // office and department api
  const { data: departmentData, isSuccess: departmentLoading } =
    useGetDepartmentsListQuery({});
  const departmentList = departmentData?.data?.departments;

  const { data: officeData, isSuccess: officeLoading } = useGetOfficesListQuery(
    {}
  );
  const officeList = officeData?.data?.office;

  const departmentOptions = departmentList?.map((option: any) => {
    return {
      id: option._id,
      label: option.departmentName,
      value: option.departmentName,
    };
  });

  const officeOptions = officeList?.map((option: any) => {
    return {
      id: option._id,
      label: option.officeName,
      value: option.officeName,
    };
  });

  return (
    <Card sx={styles.mainCardStyling}>
      <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      <Typography variant="h5" sx={{ py: 1, mb: 2 }}>
        Choose an existing job to copy
      </Typography>

      <Card sx={styles.selectCardStyling}>
        {departmentLoading && officeLoading ? (
          <TableHeader
            showClearFilterButton
            onChanged={(e: any) => {
              setSearch(e);
            }}
            tableHeaderData={[
              {
                type: "select",
                FieldProps: {
                  name: "status",
                  label: "Job Status",
                },
                options: [
                  { label: "Open", value: "Open" },
                  { label: "Close", value: "Close" },
                  { label: "Draft", value: "Draft" },
                ],
              },
              {
                type: "select",
                FieldProps: {
                  name: "department",
                  label: "Department",
                },
                options: departmentOptions,
              },
              {
                type: "select",
                FieldProps: {
                  name: "office",
                  label: "Office",
                },
                options: officeOptions,
              },
              {
                type: "search",
                FieldProps: {
                  name: "search",
                  placeholder: "Search",
                },
              },
            ]}
          />
        ) : (
          <Skeleton height={80} animation="wave" />
        )}

        <Box sx={{ py: 1 }}>
          <FormControlLabel
            control={<Checkbox />}
            name="template"
            label={
              <Typography variant="subtitle2">
                Show only template jobs
              </Typography>
            }
            onChange={(e: any) => {
              setTemplate(e.target.checked);
            }}
          />
        </Box>
      </Card>

      <Card sx={styles.tableCardStyling}>
        <CustomTable
          data={data?.data?.jobs}
          columns={jobListColumns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isPagination
          isSuccess={isSuccess}
          showSerialNo
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
          onPageChange={(onPageData: any) => {
            setParams({
              page: onPageData,
              offset: (onPageData - 1) * 10,
            });
          }}
        />
      </Card>
    </Card>
  );
}

const StyledBackLink = styled(Link)(({ theme }) => ({
  color: theme.palette.neutral[900],
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
}));
