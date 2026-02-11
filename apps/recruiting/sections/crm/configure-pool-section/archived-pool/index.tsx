import { Box, MenuItem, Typography } from "@mui/material";
import { CustomTable, TableIconActions, WarningPrompt } from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import {
  useDeleteProspectPoolMutation,
  useGetPoolTableDataApiQuery,
  usePutPoolArchiveRestoredMutation,
} from "@services/crm/configure-crm/configure-crm-api";
import { useState } from "react";
import toast from "react-hot-toast";

export function ArchivedPools({ setProspectPoolModal }: any): JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
    limit: 10,
    poolType: "archived",
  });
  const { data } = useGetPoolTableDataApiQuery(params);
  const [putData] = usePutPoolArchiveRestoredMutation();
  const [deleteProspectPool] = useDeleteProspectPoolMutation();

  async function onSubmit({ body, poolId }: any): Promise<void> {
    try {
      const res: any = await putData({
        body,
        poolId,
      }).unwrap();
      toast.success(res?.message ?? `Update Successfully!`);
    } finally {
      setProspectPoolModal(false);
      // nextStepHandler();
    }
  }
  async function onProspectPoolDelete(poolId): Promise<void> {
    try {
      const res: any = await deleteProspectPool(poolId).unwrap();
      toast.success(res?.message ?? `Profile Image Deleted Successfully!`);
    } finally {
      setProspectPoolModal(false);
    }
  }
  const columns = [
    {
      accessorFn: (row: any) => row.name ?? "-",
      id: "name",
      cell: (info: any) => {
        return (
          <>
            <Typography variant="body1" fontWeight="bold">
              {info.row.original?.name ?? "-"}
            </Typography>
            <Typography variant="body2">
              {info.row.original?.description ?? "-"}
            </Typography>
          </>
        );
      },
      header: () => <span>Prospect Pools</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.stages ?? "-",
      id: "stage",
      cell: (info: any) => {
        return info.row.original.stages.map((item) => (
          <Box key={item._id}>{item.stage ?? "-"}</Box>
        ));
      },
      header: () => <span>Prospect Stages</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.poolAdmins ?? "-",
      id: "poolAdmins",
      cell: (info: any) => {
        return info.row.original.poolAdmins.map((item) => (
          <Box key={item._id}>{item.adminName ?? "-"}</Box>
        ));
      },
      header: () => <span>Pool Admins</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.status ?? "-",
      id: "status",
      cell: (info: any) => (
        <TableIconActions icon={<TableActionsIcon />}>
          <MenuItem
            onClick={() => {
              void onSubmit({
                body: { status: "active" },
                poolId: info.row.original._id,
              });
            }}
          >
            <Typography variant="subtitle2">Restore</Typography>
          </MenuItem>

          <WarningPrompt
            mainColor="error.main"
            heading="Delete Prospect Pool"
            subTitle="You are about to remove the college Recruitment prospect pool.
            Are You sure you to do that?"
            modelOpenLabel={
              <MenuItem>
                <Typography variant="subtitle2">Delete</Typography>
              </MenuItem>
            }
            acceptButtonLabel="Delete"
            acceptButtonProps={{
              onClick: () => {
                void onProspectPoolDelete(info.row.original._id);
              },
              variant: "contained",
              color: "error",
              sx: {
                bgcolor: "error.main",
                color: "primary.contrastText",
              },
            }}
          />
        </TableIconActions>
      ),
      header: () => <span>Action</span>,
    },
  ];

  return (
    <Box
      sx={{
        height: "50vh",
        overflow: "scroll",
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <CustomTable
        data={data?.data?.prospectPool}
        columns={columns}
        isLoading={false}
        isFetching={false}
        isError={false}
        isSuccess
        totalPages={data?.data?.meta?.pages ?? 0}
        currentPage={data?.data?.meta?.page ?? 1}
        onPageChange={(onPageData: any) => {
          setParams({
            page: onPageData,
            offset: (onPageData - 1) * 10,
          });
        }}
      />
    </Box>
  );
}
