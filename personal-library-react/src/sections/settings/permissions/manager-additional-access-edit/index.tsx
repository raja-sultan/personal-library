import React, { useState } from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import { CustomTable } from "common";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";

const data = [
  {
    id: 1,
    fieldName: "About",
    canEditSorDirectReports: false,
    canViewForDirectReports: true,
    isDisbaledView: true,
  },
  {
    id: 2,
    fieldName: "Address",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 3,
    fieldName: "Birthday",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 4,
    fieldName: "Date of Termination",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 5,
    fieldName: "Department",
    canEditSorDirectReports: false,
    canViewForDirectReports: true,
    isDisbaledEdit: true,
    isDisbaledView: true,
  },
  {
    id: 6,
    fieldName: "Emergency Contact",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 7,
    fieldName: "Employment Status",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
    isDisbaledEdit: true,
  },
  {
    id: 8,
    fieldName: "Ethnicity",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 9,
    fieldName: "Gender",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 10,
    fieldName: "Github Username",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 11,
    fieldName: "Legal Name *",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 12,
    fieldName: "LinkedIn",
    canEditSorDirectReports: false,
    canViewForDirectReports: true,
    isDisbaledView: true,
  },
  {
    id: 13,
    fieldName: "Location",
    canEditSorDirectReports: false,
    canViewForDirectReports: true,
    isDisbaledEdit: true,
    isDisbaledView: true,
  },
  {
    id: 14,
    fieldName: "Manager",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 15,
    fieldName: "Marital Status",
    canEditSorDirectReports: false,
    canViewForDirectReports: true,
  },
  {
    id: 16,
    fieldName: "Mentor",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 17,
    fieldName: "Onboarding Coordinator",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 18,
    fieldName: "Personal Email",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 19,
    fieldName: "Personal Pronouns",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 20,
    fieldName: "Phone Number",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
    isDisbaledView: true,
  },
  {
    id: 21,
    fieldName: "Preferred Name",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
    isDisbaledView: true,
  },
  {
    id: 22,
    fieldName: "Profile Image",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 23,
    fieldName: "Salary",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 24,
    fieldName: "SSN",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 25,
    fieldName: "Start Date",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 26,
    fieldName: "Time Zone",
    canEditSorDirectReports: false,
    canViewForDirectReports: true,
  },
  {
    id: 27,
    fieldName: "Title",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 28,
    fieldName: "Work Country",
    canEditSorDirectReports: false,
    canViewForDirectReports: false,
  },
  {
    id: 29,
    fieldName: "Work Email",
    canEditSorDirectReports: false,
    canViewForDirectReports: true,
    isDisbaledView: true,
  },
];

const checkValueHandler = (row: any) => {
  console.log(row);
};

const columns = () => {
  return [
    {
      accessorFn: (row: any) => row.fieldName,
      id: "fieldName",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">{info.getValue() ?? "-"}</Typography>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Field
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.canEditSorDirectReports,
      id: "canEditSorDirectReports",
      cell: (info: any) => (
        <Box>
          <Checkbox
            disabled={info?.row?.original.isDisbaledEdit}
            defaultChecked={info?.row?.original.canEditSorDirectReports}
            onChange={() => {
              checkValueHandler(info?.row?.original);
            }}
          />
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Can Edit for Direct Reports
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.canViewForDirectReports,
      id: "canViewForDirectReports",
      cell: (info: any) => (
        <Box>
          <Checkbox
            disabled={info?.row?.original.isDisbaledView}
            defaultChecked={info?.row?.original.canViewForDirectReports}
            onChange={() => {
              checkValueHandler(info?.row?.original);
            }}
          />
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Can View for Direct Reports
        </Typography>
      ),
      isSortable: false,
    },
  ];
};

export function ManagerAdditionalAccessEditSection(): JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  const columnss = columns();

  return (
    <Box>
      <Box sx={{ display: "flex", mb: 2 }}>
        <StyledBackLink href="/settings/permissions">Permissons</StyledBackLink>
        <ArrowForwardIosIcon
          sx={{ fontSize: "small", mx: 2, position: "relative", top: "6px" }}
        />
        <StyledBackLink href="/settings/permissions/edit">
          Manager Additional Ascess
        </StyledBackLink>
      </Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Manager Additional Ascess
      </Typography>
      <Typography variant="body1">
        Managers maintain special permissions and access for their direct
        reports. View and edit these permissions here.
      </Typography>
      <Typography variant="body1" sx={{ my: 2, fontWeight: 500 }}>
        Field Permissions
      </Typography>
      <Typography variant="body2" sx={{ my: 2 }}>
        Permissions
      </Typography>
      <Typography variant="body2">
        <Checkbox defaultChecked={false} /> Can manage employee documents and
        signature requests
      </Typography>
      <Typography variant="body2" sx={{ pb: 2 }}>
        <Checkbox defaultChecked={false} />
        Can see and edit the tasks that have been assigned to current employees
      </Typography>
      <Typography variant="body2">Field Permissions</Typography>
      <Typography variant="body1" sx={{ my: 1 }}>
        Specify additional access to employee fields. If nothing is checked,
        field is set to <Link href="">default employee access</Link>.
      </Typography>
      <Box sx={{ bgcolor: "background.paper", p: 1.5, borderRadius: 1, mt: 2 }}>
        <CustomTable
          data={data}
          columns={columnss}
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
        />
      </Box>
    </Box>
  );
}

const StyledBackLink = styled(Link)(({ theme }) => ({
  color: theme.palette.neutral[900],
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
}));
