import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { CustomTable, TableIconActions } from "common";
import React, { useState } from "react";
import RejectedReasonModel from "./rejected-reason-models";
import { useGetAllRejectedReasonsListQuery } from "@services/configuration/rejected-reasons/rejected-reasons-api";
import RejectedReasonsDeleteModel from "./rejected-reason-models/rejected-reasons-delete-models";

function RejectedReasonTableOne(): JSX.Element {
  const columns = [
    {
      accessorFn: (row: any) => row.rejectionReason,
      id: "rejectionReasons",
      cell: (info: any) => info.getValue(),
      header: () => <span>Rejection Reasons</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.rejectionType,
      id: "reasonType",
      cell: (info: any) => info.getValue(),
      header: () => <span>Reason Type</span>,
      isSortable: false,
    },
    {
      accessorFn: () => null,
      id: "action",
      cell: (info) => (
        <Box>
          <TableIconActions icon={<TableActionsIcon />}>
            <RejectedReasonModel
              apiData={info.row.original}
              modelTrigger={
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                >
                  Edit
                </MenuItem>
              }
            />
            <RejectedReasonsDeleteModel
              apiData={info.row.original}
              modelTrigger={
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                >
                  Delete
                </MenuItem>
              }
            />
          </TableIconActions>
        </Box>
      ),
      header: () => <span>Action</span>,
      isSortable: false,
    },
  ];
  const [page, setPage] = useState<any>({
    page: 1,
    offset: 0,
  });
  // API HANDLERS
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetAllRejectedReasonsListQuery({
      params: {
        limit: 10,
        offset: page.offset,
      },
    });
  return (
    <CustomTable
      data={data?.data?.rejectionReason ?? []}
      columns={columns}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      isSuccess={isSuccess}
      isPagination
      showSerialNo={false}
      // count={Math.ceil(data?.data?.meta?.total / limit)}
      totalPages={data?.data?.meta?.pages ?? 0}
      currentPage={data?.data?.meta?.page ?? 1}
      onPageChange={(onPageData: any) => {
        setPage({
          page: onPageData,
          offset: (onPageData - 1) * 10,
        });
      }}
    />
  );
}

export default RejectedReasonTableOne;
