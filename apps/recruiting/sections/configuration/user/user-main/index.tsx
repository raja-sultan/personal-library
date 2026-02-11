import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, Typography } from "@mui/material";
import { DownloadCsv } from "@root/utils";
import {
  useGetAllConfigurationUsersQuery,
  useLazyDownloadConfigurationUserQuery,
} from "@services/configuration/user-api";
import { useLazyDropdownDepartmentsListQuery } from "@services/offices-and-departments/departments-api";
import { CustomTable, TableHeader } from "common";

import dayjs from "dayjs";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import AddNewUserModel from "./add-new-user-modal";
// import QuickSelectModal from "./quick-select";
import { useLazyGetInterviewerTagsListQuery } from "@services/configuration/interviewer-tags-api/interviewer-tags-api";
import { useLazyDropdownOfficeListQuery } from "@services/offices-and-departments/offices-api";

export function UserMain(): JSX.Element {
  const [show, setShow] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [otherParams, setOtherParams] = useState<any>({
    offset: 0,
  });

  const departmentQuery = useLazyDropdownDepartmentsListQuery();
  const tagQuery = useLazyGetInterviewerTagsListQuery();
  const officeQuery = useLazyDropdownOfficeListQuery();

  const convertRoleIDTORoleText = (roleId: string) => {
    switch (roleId) {
      case "RCT_JOB_ADMIN_BASIC":
        return "Basic Users";
      case "RCT_JOB_ADMIN_STANDARD":
        return "Job Admin";
      case "RCT_SITE_ADMIN":
        return "Site Admin";
      default:
        return "All Permissions";
    }
  };
  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }: any) => {
          return (
            <Box>
              <Checkbox
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
              />
            </Box>
          );
        },
        cell: ({ row }: any) => (
          <Box>
            <Checkbox
              disabled={row?.original?.Assigned}
              checked={row?.original?.Assigned ? false : row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </Box>
        ),
      },
      {
        accessorFn: (row: any) => row,
        id: "srNo",
        cell: (info) => <Box>{Number(info?.row?.id) + 1}</Box>,
        header: () => <Box>Sr.</Box>,
        isSortable: false,
      },
      {
        accessorFn: (row: any) => `${row.firstName} ${row.lastName}`,
        id: "name",
        header: () => <Box>Name</Box>,
        cell: (info: any) => (
          <Box
            display="flex"
            justifyContent="center"
            alignContent="center"
            flexDirection="column"
            gap={2}
            sx={{
              a: {
                textDecoration: "none",
                color: "unset",
              },
            }}
          >
            <Link
              href={{
                pathname: "/configuration/user/user-details",
                query: {
                  userId: info.row.original._id,
                },
              }}
            >
              {info.getValue()}
            </Link>
          </Box>
        ),
        isSortable: false,
      },
      {
        accessorFn: (row: any) => row.email,
        id: "email",
        header: () => <Box>Email Address</Box>,
        cell: (info: any) => info.getValue(),
        isSortable: false,
      },
      {
        accessorFn: (row: any) => row.updatedAt,
        id: "lastActivity",
        header: () => <Box>lastActivity</Box>,
        cell: (info: any) => dayjs(info.getValue()).format("MMMM, DD ,YYYY"),
        isSortable: false,
      },
      {
        accessorFn: (row: any) => row.role,
        id: "permissions",
        header: () => <Box>Permissions</Box>,
        cell: (info: any) => convertRoleIDTORoleText(info.getValue()),
        isSortable: false,
      },
    ],
    []
  );

  const { data, isSuccess, isLoading, isFetching, isError } =
    useGetAllConfigurationUsersQuery({
      params: {
        limit: 10,
        ...otherParams,
      },
    });
  const [downloadConfigurationUser, { isLoading: isLoadingDownload }] =
    useLazyDownloadConfigurationUserQuery();
  const handleSelectedRows = useCallback(
    (selectedRows) => {
      setShow(selectedRows.length > 0);

      const userIds = selectedRows
        .map((row: any) => `userIds=${row.original._id}`)
        .join("&");

      // Check if the selectedRowIds have changed
      if (JSON.stringify(userIds) !== JSON.stringify(selectedRowIds)) {
        setSelectedRowIds(userIds);
      }
    },
    [selectedRowIds]
  );
  const tbData: any = [
    {
      type: "asyncMultiselect",
      FieldProps: {
        name: "department",
        label: "User Department",
      },
      queryParams: {
        apiQuery: departmentQuery,
        transformResponse: (res) => res?.data,
        getOptionLabel: (option) => option?.departmentName,
        multiple: false,
      },
    },
    {
      type: "asyncMultiselect",
      FieldProps: {
        name: "location",
        label: "User Office",
      },
      queryParams: {
        apiQuery: officeQuery,
        transformResponse: (res) => res?.data,
        getOptionLabel: (option) => option?.officeName,
        multiple: false,
      },
    },
    {
      type: "select",
      FieldProps: {
        name: "status",
        label: "User Status",
      },
      options: [
        { label: "Part time", value: "Part time" },
        { label: "Full time", value: "Full time" },
        { label: "Contract", value: "Contract" },
        { label: "Permanent", value: "Permanent" },
        { label: "intern", value: "intern" },
        { label: "temporary", value: "temporary" },
        { label: "terminated", value: "terminated" },
      ],
    },
    {
      type: "asyncMultiselect",
      FieldProps: {
        name: "tags",
        label: "Tags",
      },
      queryParams: {
        apiQuery: tagQuery,
        transformResponse: (res: any) => res?.data?.interviewerTags,
        getOptionLabel: (option: any) => option.interviewerTag,
        externalParams: {
          limit: 100000000000,
          offset: 0,
        },
        multiple: false,
      },
    },
    {
      type: "select",
      FieldProps: {
        name: "permissions",
        label: "Permissions",
      },
      options: [
        // { label: "All", value: "All" },
        { label: "Basic Users", value: "RCT_JOB_ADMIN_BASIC" },
        { label: "Job Admin: Private", value: "RCT_JOB_ADMIN_STANDARD" },
        { label: "Job Admin: Standard", value: "RCT_SITE_ADMIN" },
      ],
    },
    // {
    //   type: "checkbox",
    //   FieldProps: {
    //     name: "neverSignedInOnly",
    //     label: (
    //       <Typography variant="subtitle2">Never Signed in only</Typography>
    //     ),
    //   },
    // },
  ];
  return (
    <Box>
      <Typography variant="h5">User</Typography>
      <Box mt={2} display="flex" flexDirection="column" gap={0.8} mb={2}>
        <Typography variant="h6">Filter</Typography>
        <Typography color="neutral.500" variant="subtitle2">
          Not sure which job? Pick the closet option and make sure to leave a
          note for the hiring team!
        </Typography>
      </Box>
      <Box my={1}>
        <TableHeader
          gridProps={{
            lg: 2.81,
          }}
          showClearFilterButton
          tableHeaderData={tbData}
          onChanged={(e) => {
            const updateData: any = {};

            for (const keys in e) {
              if (e[keys] === "" || e[keys] === null) {
                updateData[keys] = undefined;
              } else if (typeof e[keys] === "object") {
                updateData[keys] = e[keys]._id;
              } else {
                updateData[keys] = e[keys];
              }
            }
            setOtherParams((prev) => {
              return { ...prev, ...updateData, offset: 0 };
            });
          }}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <Box
          ml="auto"
          my={2}
          gap={0.8}
          flexWrap="wrap"
          display="flex"
          alignItems="center"
        >
          <AddNewUserModel />
          {show && (
            <>
              {/* <QuickSelectModal /> */}
              <LoadingButton
                size="small"
                sx={{ color: "neutral.500", borderColor: "neutral.500" }}
                variant="outlined"
                loading={isLoadingDownload}
                onClick={() => {
                  DownloadCsv(downloadConfigurationUser, "Userlist", {
                    params: selectedRowIds,
                  });
                }}
              >
                Export to Excel
              </LoadingButton>
            </>
          )}
        </Box>
      </Box>
      <CustomTable
        data={data?.data?.users}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        isPagination
        // showSerialNo
        // count={Math.ceil(data?.data?.meta?.total / limit)}
        totalPages={data?.data?.meta?.pages ?? 1}
        currentPage={data?.data?.meta?.page ?? 1}
        onPageChange={(onPageData: any) => {
          setOtherParams((prev) => {
            return { ...prev, offset: (onPageData - 1) * 10 };
          });
        }}
        onSelected={handleSelectedRows}
      />
    </Box>
  );
}
