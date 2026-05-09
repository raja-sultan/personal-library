import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { CustomTable } from "common";
import Link from "next/link";

const OwnerPermission = [
  {
    id: 1,
    name: "Can manage and report on E-Signature documents",
    permission: true,
  },
  {
    id: 2,
    name: "Can configure tasks for future employees",
    permission: true,
  },
  {
    id: 3,
    name: "Can manage and report on assigned tasks",
    permission: true,
  },
  {
    id: 4,
    name: "Can Manage Fields Reports",
    permission: true,
  },
  {
    id: 5,
    name: "Can Manage Pending Hires",
    permission: true,
  },
  {
    id: 6,
    name: "Can manage new hires",
    permission: true,
  },
  {
    id: 7,
    name: "Can access the email activity tab on the employee profile",
    permission: true,
  },
  {
    id: 8,
    name: "Can access the integrations tab on the employee profile",
    permission: true,
  },
  {
    id: 9,
    name: "Can manage and report on feedback",
    permission: true,
  },
  {
    id: 10,
    name: "Can manage single sign-on",
    permission: true,
  },
  {
    id: 11,
    name: "Can onboard new hires",
    permission: true,
  },
  {
    id: 12,
    name: "Can resend new hire emails",
    permission: true,
  },
  {
    id: 13,
    name: "Can build welcome experience",
    permission: true,
  },
  {
    id: 14,
    name: "Can only view the tasks that have been assigned to direct reports",
    permission: true,
  },
  {
    id: 15,
    name: "Can view and edit the tasks that have been assigned to direct reports",
    permission: true,
  },
  {
    id: 16,
    name: "Can terminate employee",
    permission: true,
  },
  {
    id: 17,
    name: "Can delete employee record",
    permission: true,
  },
];

const CoordinatorPermission = [
  {
    id: 1,
    name: "Can configure the onboarding tasks for future employees",
    permission: true,
  },
  {
    id: 2,
    name: "Can manage and report on assigned tasks",
    permission: true,
  },
  {
    id: 3,
    name: "Can manage field reports",
    permission: true,
  },
  {
    id: 4,
    name: "Can access the integrations tab on the employee profile",
    permission: true,
  },
  {
    id: 5,
    name: "Can manage and report on feedback",
    permission: true,
  },
  {
    id: 6,
    name: "Can manage pending hires",
    permission: true,
  },
  {
    id: 7,
    name: "Can access the new hire report",
    permission: true,
  },
  {
    id: 8,
    name: "Can onboard new hires",
    permission: true,
  },
  {
    id: 9,
    name: "Can resend new hire emails",
    permission: true,
  },
  {
    id: 10,
    name: "Can build Welcome Experience",
    permission: true,
  },
  {
    id: 11,
    name: "Can manage and report on E-Signature documents",
    permission: false,
  },
];

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
    isDisabledView: true,
  },
  {
    id: 3,
    fieldName: "Birthday",
    canEditForOnself: true,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 4,
    fieldName: "Data & BI",
    canEditForOnself: false,
    viewableToCompany: true,
  },
  {
    id: 5,
    fieldName: "Date of Leaving",
    canEditForOnself: false,
    viewableToCompany: false,
  },
  {
    id: 5,
    fieldName: "Date of Termination",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 6,
    fieldName: "Department",
    canEditForOnself: false,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 7,
    fieldName: "Emergency Contact",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 8,
    fieldName: "Employment Status",
    canEditForOnself: false,
    viewableToCompany: false,
  },
  {
    id: 9,
    fieldName: "Ethnicity",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 10,
    fieldName: "Gender",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 11,
    fieldName: "Github Username",
    canEditForOnself: true,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 12,
    fieldName: "Legal Name",
    canEditForOnself: true,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 13,
    fieldName: "LinkedIn",
    canEditForOnself: true,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 14,
    fieldName: "Location",
    canEditForOnself: false,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 15,
    fieldName: "Manager",
    canEditForOnself: false,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 16,
    fieldName: "Marital Status",
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 17,
    fieldName: "Onboarding Coordinator",
    canEditForOnself: false,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 18,
    fieldName: "Personal Email",
    canEditForOnself: false,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 19,
    fieldName: "Personal Pronouns",
    canEditForOnself: true,
    viewableToCompany: true,
    isDisabledView: true,
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
    canEditForOnself: true,
    viewableToCompany: true,
    isDisabledView: true,
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
    canEditForOnself: true,
    viewableToCompany: true,
  },
  {
    id: 25,
    fieldName: "Start Date",
    canEditForOnself: true,
    viewableToCompany: true,
    isDisabledEdit: true,
    isDisabledView: true,
  },
  {
    id: 26,
    fieldName: "Time Zone",
    canEditForOnself: true,
    viewableToCompany: true,
    isDisabledView: true,
  },
  {
    id: 27,
    fieldName: "Title",
    canEditForOnself: false,
    viewableToCompany: true,
    isDisabledView: true,
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
            disabled={info?.row?.original.isDisabledEdit}
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

export function CustomAccessSettingsSection(props): JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const columnss = columns();

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Settings
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Name
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
        {props.roleName}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Permissions
      </Typography>

      {props.roleName === "Owner (You)" ? (
        <Box>
          {OwnerPermission.map((item: any) => {
            return (
              <Box key={item.id}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <Checkbox defaultChecked={item.permission} />
                  {item.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box>
          {CoordinatorPermission.map((item: any) => {
            return (
              <Box key={item.id}>
                {/* <Typography variant="body1" sx={{ mb: 1 }}> */}
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={item.permission}
                      onChange={(e) => {
                        console.log(e.target.checked);
                      }}
                    />
                  }
                  label={item.name}
                />

                {/* {item.name} */}
                {/* </Typography> */}
              </Box>
            );
          })}
          <Typography variant="body2" sx={{ mb: 1 }}>
            Field Permissions
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Specify additional access to employee fields. If nothing is checked,
            field is set to <Link href="">default employee access</Link>.
          </Typography>
          <Box
            sx={{ bgcolor: "background.paper", p: 1.5, borderRadius: 1, mt: 2 }}
          >
            <CustomTable
              data={data}
              columns={columnss}
              isLoading={false}
              isFetching={false}
              isError={false}
              isPagination={false}
              isSuccess
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
      )}
    </Box>
  );
}
