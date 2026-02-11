import { Box, Button, Checkbox, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import React, { useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { CustomTable, TableHeader } from "common";
import type { ITableHeaderData } from "@root/types/table-header";
import { FormSendModal } from "../../../form-send-modal";

const tableHeaderData: ITableHeaderData[] = [
  {
    type: "select",
    FieldProps: {
      name: "selectJob",
      label: "Select Job",
    },
    options: [
      { label: "Chat Specialist", value: "chat-specialist" },
      { label: "Designer", value: "designer" },
      { label: "Data Engineer", value: "data-engineer" },
      { label: "Coordinator", value: "coordinator" },
    ],
  },
  {
    type: "select",
    FieldProps: {
      name: "selectForm",
      label: "Select Form",
    },
    options: [
      {
        label: "Application Screening Form",
        value: "application-screening-form",
      },
      { label: "Background Check Form", value: "background-check-form" },
      { label: "Basic Application Form", value: "basic-application-form" },
    ],
  },
];

const data = [
  {
    id: 1,
    name: "Sara kallenberg",
    department: "Automation Engineer",
    stage: "Application Screening",
    jobStatus: "Collect Feedback in Application Review",
  },
  {
    id: 2,
    name: "Sara kallenberg",
    department: "Automation Engineer",
    stage: "Application Screening",
    jobStatus: "Collect Feedback in Application Review",
  },
];

export function FormToSend(): React.JSX.Element {
  const [formSend, setFormSend] = useState<boolean>(false);
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const [otherParams, setOtherParams] = useState<any>();

  // const { data, isError, isFetching, isLoading, isSuccess } = useGetUsersQuery({
  //   params: {
  //     limit: 10,
  //     companyUser: true,
  //     offset: params.offset,
  //   },
  // });

  const columns = [
    {
      id: "select",
      header: ({ table }: any) => {
        return (
          <Box>
            {/* <Checkbox
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            /> */}
          </Box>
        );
      },
      cell: ({ row }: any) => (
        <Box width={20}>
          <Checkbox
            disabled={row?.original?.Assigned}
            checked={row?.original?.Assigned ? false : row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => `${row.name} ${row.department}`,
      id: "name",
      cell: (info: any) => (
        <Box sx={{ textAlign: "left" }}>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "600" }}>
              {info.row.original.name ?? "-"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              {info.row.original.department ?? "-"}
            </Typography>
          </Box>
        </Box>
      ),
      header: () => (
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-start"
          alignContent="center"
          ml={2}
        >
          <Typography variant="body2" sx={{ fontWeight: "600" }}>
            name
          </Typography>
        </Box>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.stage,
      id: "stage",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">{info.getValue() ?? "-"}</Typography>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Stage
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.jobStatus,
      id: "jobStatus",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">{info.getValue() ?? "-"}</Typography>
          <Box>
            <Typography variant="body2">
              Not yet sent
              <Button variant="text" sx={{ textDecoration: "underline" }}>
                Send
              </Button>
            </Typography>
          </Box>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Job/Status
        </Typography>
      ),
      isSortable: false,
    },
  ];

  return (
    <Box
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        px: { md: 3, xs: 2 },
        pt: 4,
        pb: 3,
      }}
    >
      <StyledBackLink href="/dashboard">
        <ArrowCircleLeftIcon sx={{ position: "relative", top: "6px", mr: 1 }} />{" "}
        Back To Dashboard
      </StyledBackLink>
      <Box>
        <Box
          display="flex"
          alignContent="center"
          alignItems="center"
          flexWrap={{ xs: "wrap", lg: "unset" }}
          my={2}
        >
          <TableHeader
            showClearFilterButton
            onChanged={(e) => {
              setOtherParams(e);
            }}
            tableHeaderData={tableHeaderData}
          />
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              setFormSend(true);
            }}
          >
            Send
          </Button>
        </Box>
        <CustomTable
          data={data}
          columns={columns}
          isLoading={false}
          isFetching={false}
          isError={false}
          isPagination={false}
          isSuccess
          // count={Math.ceil(data?.data?.meta?.total / limit)}
          totalPages={data.length ?? 0}
          currentPage={1}
          onPageChange={(onPageData: any) => {
            setParams({
              page: onPageData,
              offset: (onPageData - 1) * 10,
            });
          }}
          onSelected={(e) => {
            console.log(e, "selected rows");
          }}
        />
      </Box>

      <FormSendModal formSend={formSend} setFormSend={setFormSend} />
    </Box>
  );
}

const StyledBackLink = styled(Link)(({ theme }) => ({
  color: theme.palette.neutral[900],
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
}));
