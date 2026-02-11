"use client";
import React, { useState } from "react";
import {
  TableHeader,
  CustomTable,
  CustomChip,
  TableAction,
  WarningPrompt,
} from "common";
import { Box, MenuItem } from "@mui/material";
import { EditCompanyUserForm } from "./edit-company-user-form";

import {
  useGetUsersQuery,
  useResetPasswordMutation,
} from "@services/user-management-api";
import toast from "react-hot-toast";
import { RoleAndRightForm } from "./role-and-right-form";
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
      { label: "Active", value: "true" },
      { label: "Inactive", value: "false" },
    ],
  },
];

export function CompanyUserTable(): JSX.Element {
  const [Params, setParams] = useState<any>({ offset: 0 });

  // API HANDLERS
  const { data, isError, isFetching, isLoading, isSuccess } = useGetUsersQuery({
    params: {
      limit: 10,
      companyUser: true,
      offset: Params.offset,
      ...Params,
    },
  });
  const [resetPassword] = useResetPasswordMutation();
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

  const columns = [
    {
      accessorFn: (row: any) => `${row.firstName} ${row.lastName}`,
      id: "Username",
      cell: (info: any) => (
        <Box>
          {/* <Image src={Person} alt="" /> */}
          {info.getValue() ?? "-"}
        </Box>
      ),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.isActive,
      id: "status",
      cell: (info: any) => {
        if (info.getValue()) {
          return (
            <Box>
              <CustomChip variant="success" ChipProps={{ label: "Active" }} />
            </Box>
          );
        } else if (!info.getValue()) {
          return (
            <Box>
              <CustomChip variant="danger" ChipProps={{ label: "Inactive" }} />
            </Box>
          );
        }
        return "-";
      },
      header: () => <span>Status</span>,
    },

    {
      accessorFn: (row: any) => row.email,
      id: "businessEmail",
      cell: (info: any) => info.getValue() ?? "-",
      header: () => <span>Email Address</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.businessName,
      id: "company",
      cell: (info: any) => info.getValue() ?? "-",
      header: () => <span>Company</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.allowedCompany ?? "-",
      id: "products",
      cell: (info: any) => {
        if (Array.isArray(info.getValue())) {
          return (
            <Box>
              {info.getValue().map((product: any, index: number) => (
                <Box key={index}>
                  {product}
                  {index !== 0 && ","}
                </Box>
              ))}
            </Box>
          );
        }
      },
      header: () => <span>Products</span>,
      isSortable: false,
    },

    {
      id: "Actions",
      cell: (info: any) => (
        <Box>
          <TableAction>
            <EditCompanyUserForm apiData={info.row.original} />
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
      <Box mb={2}>
        <TableHeader
          showClearFilterButton
          onChanged={(e) => {
            setParams((prv) => {
              return {
                ...prv,
                ...e,
                offset: 0,
              };
            });
          }}
          tableHeaderData={tableHeaderData}
        />
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
          setParams((prv) => {
            return {
              ...prv,
              offset: (onPageData - 1) * 10,
            };
          });
        }}
      />
    </Box>
  );
}
