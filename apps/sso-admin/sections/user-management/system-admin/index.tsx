"use client";
import { useState } from "react";
import {
  TableHeader,
  CustomTable,
  TableAction,
  CustomModal,
  WarningPrompt,
} from "common";
import { Box, Button, Switch, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {
  useGetUsersQuery,
  useResetPasswordMutation,
  useSuperAdminChangeStatusMutation,
} from "@services/user-management-api";
import toast from "react-hot-toast";
import UpdateUserSystemAdminForm from "./update-user-system-admin-form";
import { RoleAndRightForm } from "./role-and-right-form";
import { AddUserSystemAdminForm } from "./add-user-system-admin-form";
import type { ITableHeaderData } from "@type/table-header";

const tableHeaderData: ITableHeaderData[] = [
  {
    type: "search",
    FieldProps: {
      name: "search",
      placeholder: "username",
    },
  },

  {
    type: "select",
    FieldProps: {
      name: "status",
      label: "Status",
    },
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
];

export function SystemAdminTable(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const [otherParams, setOtherParams] = useState<any>();
  // API HANDLERS
  const { data, isError, isFetching, isLoading, isSuccess } = useGetUsersQuery({
    params: {
      limit: 10,
      companyUser: false,
      offset: params.offset,
      ...otherParams,
    },
  });
  const [resetPassword] = useResetPasswordMutation();
  const [superAdminChangeStatus] = useSuperAdminChangeStatusMutation();

  // FUNCTIONS
  function ResetPassword(Email: string): void {
    resetPassword({
      body: {
        email: Email,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("Reset password email sent to the user");
      })
      .catch((error: { data: { message: any } }) => {
        const errMsg = error?.data?.message;
        toast.error(`${errMsg}`);
      });
  }

  function ChangeStatus(status: any, id: string): void {
    superAdminChangeStatus({
      body: {
        status: status.target.checked,
        userId: id,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("status update successfully");
      })
      .catch((error: { data: { message: any } }) => {
        const errMsg = error?.data?.message;
        toast.error(`${errMsg}`);
      });
  }

  const columns = [
    {
      accessorFn: (row: any) => `${row.firstName} ${row.lastName}`,
      id: "Username",
      cell: (info: any) => (
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          gap={2}
        >
          {/* <Image src={Person} alt="" /> */}
          {info.getValue() ?? "-"}
        </Box>
      ),
      header: () => <span>Name</span>,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row.email,
      id: "email",
      cell: (info: any) => info.getValue(),
      header: () => <span>Email Address</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.isActive,
      id: "status",
      cell: (info: any) => (
        <Box>
          <Switch
            defaultChecked={info.getValue()}
            onChange={(e) => {
              ChangeStatus(e, info.row.original._id);
            }}
          />
        </Box>
      ),
      header: () => <span>Status</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.defaultRole,
      id: "Role",
      cell: (info: any) => info.getValue(),
      header: () => <span>Role</span>,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row._id,
      id: "Actions",
      cell: (info: any) => (
        <Box display="flex" justifyContent="center">
          <TableAction>
            <UpdateUserSystemAdminForm apiData={info.row.original} />
            <RoleAndRightForm rowId={info.row.original._id} />
            <WarningPrompt
              mainColor="warning.main"
              heading="Warning"
              subTitle="Are you sure you want to change password?"
              modelOpenLabel={<MenuItem>Reset Password</MenuItem>}
              acceptButtonLabel="Yes,sure!"
              acceptButtonProps={{
                onClick: () => {
                  ResetPassword(info.row.original.email);
                },
              }}
            />
          </TableAction>
        </Box>
      ),
      header: () => <span>Actions</span>,
    },
  ];

  return (
    <Box>
      <Box
        flexWrap={{ xs: "wrap", md: "unset" }}
        display="flex"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        mb={2}
        gap={1}
      >
        <TableHeader
          showClearFilterButton
          onChanged={(e) => {
            setOtherParams(e);
          }}
          tableHeaderData={tableHeaderData}
        />
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          size="small"
          sx={{
            width: "100%",
            maxWidth: 120,
            height: 35,
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add User
        </Button>
      </Box>

      <CustomTable
        data={data?.data?.users}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isPagination
        isSuccess={isSuccess}
        showSerialNo
        // count={Math.ceil(data?.data?.meta?.total / limit)}
        totalPages={data?.data?.meta?.pages ?? 0}
        currentPage={data?.data?.meta?.page ?? 1}
        onPageChange={(onPageData: any) => {
          setParams({
            page: onPageData,
            offset: (onPageData - 1) * 10,
          });
        }}
      />
      <CustomModal
        onClose={setOpen}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Add User"
        closeButtonProps={{
          onClick: () => {
            setOpen(false);
          },
        }}
        isOpen={open}
      >
        <AddUserSystemAdminForm setOpen={setOpen} />
      </CustomModal>
    </Box>
  );
}
