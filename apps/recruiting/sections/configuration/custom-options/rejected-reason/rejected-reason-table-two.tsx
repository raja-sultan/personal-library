import { Switch } from "@mui/material";
import { Box } from "@mui/system";
import {
  useGetAllRejectedReasonsListQuery,
  useUpdateRejectedReasonsStatusMutation,
} from "@services/configuration/rejected-reasons/rejected-reasons-api";
import { CustomTable } from "common";
import React, { useState } from "react";
import toast from "react-hot-toast";

function RejectedReasonTableTwo(): JSX.Element {
  //STATES
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
  const [UpdateRejectedReasonsStatus] =
    useUpdateRejectedReasonsStatusMutation();
  //FUNCTIONS
  const updateRejectedReasons = (id, isActive) => {
    UpdateRejectedReasonsStatus({
      params: {
        id: id,
      },
      body: {
        isActive: isActive,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("Rejected Reasons Status update Successfully");
      })
      .catch((error) => {
        toast.error(error ?? "someThing went wrong! ");
      });
  };
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
      accessorFn: (row: any) => row.isActive,
      id: "action",
      cell: (info) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          <Switch
            checked={info.getValue()}
            onChange={(e) => {
              updateRejectedReasons(info.row.original._id, e.target.checked);
            }}
          />
        </Box>
      ),
      header: () => <span>Action</span>,
      isSortable: false,
    },
  ];

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

export default RejectedReasonTableTwo;
