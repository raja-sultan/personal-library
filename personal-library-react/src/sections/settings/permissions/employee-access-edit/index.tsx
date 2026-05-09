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
    canEditForOnself: true,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 2,
    fieldName: "Address",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 3,
    fieldName: "Birthday",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 4,
    fieldName: "Date of Termination",
    canEditForOnself: false,
    viewableToCompany: false,
  },
  {
    id: 5,
    fieldName: "Department",
    canEditForOnself: false,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 6,
    fieldName: "Emergency Contact",
    canEditForOnself: true,
    viewableToCompany: false,
  },
  {
    id: 7,
    fieldName: "Employment Status",
    canEditForOnself: false,
    viewableToCompany: false,
  },
  {
    id: 8,
    fieldName: "Ethnicity",
    canEditForOnself: true,
    viewableToCompany: false,
  },
  {
    id: 9,
    fieldName: "Gender",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 10,
    fieldName: "Github Username",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 11,
    fieldName: "Legal Name *",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 12,
    fieldName: "LinkedIn",
    canEditForOnself: true,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 13,
    fieldName: "Location",
    canEditForOnself: false,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 14,
    fieldName: "Manager",
    canEditForOnself: false,
    viewableToCompany: false,
  },
  {
    id: 15,
    fieldName: "Marital Status",
    canEditForOnself: false,
    viewableToCompany: true,
  },
  {
    id: 16,
    fieldName: "Mentor",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 17,
    fieldName: "Onboarding Coordinator",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 18,
    fieldName: "Personal Email",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 19,
    fieldName: "Personal Pronouns",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 20,
    fieldName: "Phone Number",
    canEditForOnself: true,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 21,
    fieldName: "Preferred Name",
    canEditForOnself: true,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 22,
    fieldName: "Profile Image",
    canEditForOnself: false,
    viewableToCompany: false,
  },
  {
    id: 23,
    fieldName: "Salary",
    canEditForOnself: false,
    viewableToCompany: false,
  },
  {
    id: 24,
    fieldName: "SSN",
    canEditForOnself: false,
    viewableToCompany: false,
  },
  {
    id: 25,
    fieldName: "Start Date",
    canEditForOnself: false,
    viewableToCompany: false,
  },
  {
    id: 26,
    fieldName: "Time Zone",
    canEditForOnself: false,
    viewableToCompany: true,
  },
  {
    id: 27,
    fieldName: "Title",
    canEditForOnself: false,
    viewableToCompany: false,
  },
  {
    id: 28,
    fieldName: "Work Country",
    canEditForOnself: false,
    viewableToCompany: false,
  },
  {
    id: 29,
    fieldName: "Work Email",
    canEditForOnself: false,
    viewableToCompany: true,
    isDisabledView: true,
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
      accessorFn: (row: any) => row.canEditForOnself,
      id: "canEditForOnself",
      cell: (info: any) => (
        <Box>
          <Checkbox
            defaultChecked={info?.row?.original.canEditForOnself}
            onChange={(e) => {
              console.log(e.target.checked);
              checkValueHandler(info?.row?.original);
            }}
          />
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Can Edit for Onself
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.viewableToCompany,
      id: "viewableToCompany",
      cell: (info: any) => (
        <Box>
          <Checkbox
            disabled={info?.row?.original.isDisabledView}
            defaultChecked={info?.row?.original.viewableToCompany}
            onChange={(e) => {
              console.log(e.target.checked);
              checkValueHandler(info?.row?.original);
            }}
          />
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Viewable to Company
        </Typography>
      ),
      isSortable: false,
    },
  ];
};

export function EmployeeAccessEditSection(): JSX.Element {
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
          Default Ascess for Emaployees
        </StyledBackLink>
      </Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Default Access for Employees
      </Typography>
      <Typography variant="body1">
        Employees in your organization have a standard set of permissions
        allowing them basic limited access.
      </Typography>
      <Typography variant="body1" sx={{ my: 2, fontWeight: 500 }}>
        Field Permissions
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
