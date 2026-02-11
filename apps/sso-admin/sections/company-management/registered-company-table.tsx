"use client";

import { useState } from "react";
import { CustomChip, TableHeader, CustomTable } from "common";
import { useGetAllCompanyUsersQuery } from "@services/company-management-api";
import { EditCompanyUserForm } from "./edit-company-user-form";
import { Box } from "@mui/material";
import type { ITableHeaderData } from "@type/table-header";

type Variants = "warning" | "success" | "started" | "danger";

function getVariant(status: string): Variants {
  switch (status) {
    case "Not Started":
    case "Abandoned":
    case "Under Review":
      return "warning";
    case "Approved":
    case "Submitted":
      return "success";
    case "started":
      return "started";
    case "Declined":
    case "Expired":
      return "danger";
    default:
      return "success";
  }
}

const tableHeaderData: ITableHeaderData[] = [
  {
    type: "search",
    FieldProps: {
      name: "search",
      placeholder: "Search",
    },
  },
  {
    type: "select",
    FieldProps: {
      name: "productName",
      label: "Product",
    },
    options: [
      { label: "Performance", value: "PERFORMANCE" },
      { label: "Onboarding", value: "ONBOARDING" },
      { label: "Recruiting", value: "RECRUITMENT" },
    ],
  },

  {
    type: "select",
    FieldProps: {
      name: "verificationStatus",
      label: "Verification Status",
    },
    options: [
      { label: "Not Started", value: "Not Started" },
      { label: "Started", value: "Started" },
      { label: "Approved", value: "Approved" },
      { label: "Submitted", value: "Submitted" },
      { label: "Expired", value: "Expired" },
      { label: "Abandoned", value: "Abandoned" },
      { label: "Declined", value: "Declined" },
      { label: "Under Review", value: "Under Review" },
    ],
  },
];

export default function RegisteredCompanyTable(): JSX.Element {
  const [Params, setParams] = useState<any>({ offset: 0 });

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
      header: () => <span>Username</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.businessName ?? "-",
      id: "businessName",
      cell: (info: any) => info.getValue(),
      header: () => <span>Business name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.email ?? "-",
      id: "businessEmail",
      cell: (info: any) => info.getValue(),
      header: () => <span>Business Email</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.country ?? "-",
      id: "Country",
      cell: (info: any) => info.getValue(),
      header: () => <span>Country</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.allowedCompany ?? ["-"],
      id: "products",
      cell: (info: any) => (
        <Box>
          {info.getValue()?.map((product: any, index: number) => (
            <Box key={index}>
              {product}
              {index !== 0 && ","}
            </Box>
          ))}
        </Box>
      ),
      header: () => <span>Products</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.contactNumber ?? "-",
      id: "phoneNo",
      cell: (info: any) => info.getValue(),
      header: () => <span>Phone No</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.noOfEmployees ?? "-",
      id: "noOfEmployees",
      cell: (info: any) => info.getValue(),
      header: () => <span>No of Employees</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.verificationStatus ?? "-",
      id: "verificationStatus",
      cell: (info: any) => (
        <Box>
          <CustomChip
            variant={getVariant(info.getValue())}
            ChipProps={{ label: info.getValue() }}
          />
        </Box>
      ),
      header: () => <span>Verification Status</span>,
    },
    {
      accessorFn: (row: any) => row.a_id,
      id: "Actions",
      cell: (info: any) => (
        <Box>
          <EditCompanyUserForm apiData={info.row.original} />
        </Box>
      ),
      header: () => <span>Actions</span>,
    },
  ];
  // API HANDLERS
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetAllCompanyUsersQuery({
      params: {
        companyRegistered: true,
        limit: 10,
        offset: Params.offset,
        ...Params,
      },
    });

  return (
    <Box>
      <Box mb={2}>
        <TableHeader
          onChanged={(e) => {
            setParams((prv) => {
              return {
                ...prv,
                ...e,
                offset: 0,
              };
            });
          }}
          showClearFilterButton
          tableHeaderData={tableHeaderData}
        />
      </Box>
      <CustomTable
        data={data?.data?.users}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        isPagination
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
