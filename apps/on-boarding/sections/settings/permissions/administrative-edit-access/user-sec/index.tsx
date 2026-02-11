import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import {
  useDeleteRoleListMutation,
  useGetRoleListWithIDListQuery,
} from "@services/settings/permission-api/permission-api";
import { CustomTable, WarningPrompt } from "common";
import { useState } from "react";
import toast from "react-hot-toast";

export function CustomAccessUserSection(props): JSX.Element {
  const { role } = props;
  const [params, setParams] = useState<any>({
    offset: 0,
  });
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetRoleListWithIDListQuery({
      role,
      params: {
        limit: 10,
        offset: params.offset,
      },
    });
  const [DeleteRoleList] = useDeleteRoleListMutation();
  const DeleteHandler = (id: any) => {
    DeleteRoleList({
      role,
      params: {
        employeeId: id,
      },
    })
      .unwrap()
      .then((res) => {
        toast.success(res.message ?? "Role Delete SuccessFully");
      })
      .catch((error) => {
        toast.success(error ?? "Role Delete SuccessFully");
      });
  };
  const columns = [
    {
      accessorFn: (row: any) => `${row.firstName} ${row.lastName}`,
      id: "Name",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">{info.getValue() ?? "-"}</Typography>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Name
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.id,
      id: "Actions",
      cell: (info) => (
        <Box>
          <WarningPrompt
            mainColor="error.main"
            heading="Alert"
            subTitle="You are sure yu want to delete role?"
            modelOpenLabel={
              <IconButton>
                <DeleteIcon />
              </IconButton>
            }
            acceptButtonLabel="Delete"
            acceptButtonProps={{
              onClick: () => {
                DeleteHandler(info.row.original._id);
              },
              variant: "contained",
              color: "error",
              sx: {
                bgcolor: "error.main",
                color: "primary.contrastText",
              },
            }}
          />
        </Box>
      ),
      header: () => <span>Actions</span>,
    },
  ];

  return (
    <Box>
      <Box sx={{ bgcolor: "background.paper", p: 0.5, borderRadius: 1, mt: 2 }}>
        <CustomTable
          data={data?.data.employees}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isPagination={false}
          isSuccess={isSuccess}
          totalPages={data?.data.meta.total ?? 0}
          currentPage={data?.data.meta.page}
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
