import React, { useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomTable, WarningPrompt } from "common";
import { AddUserModal } from "./add-user-modal";

const data = [
  {
    id: 1,
    userName: "Fisal Aleem - faisal@ceative.co.uk",
  },
  {
    id: 2,
    userName: "Fisal Aleem - faisal@ceative.co.uk",
  },
];

const columns = [
  {
    accessorFn: (row: any) => row.userName,
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
    cell: (info: any) => (
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
              // void onProspectPoolDelete(info.row.original._id);
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

export function CustomAccessUserSection(props): JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const [addUser, setAddUser] = useState<boolean>(false);

  return (
    <Box>
      <Box sx={{ bgcolor: "background.paper", p: 1.5, borderRadius: 1, mt: 2 }}>
        <Stack flexDirection="row" justifyContent="flex-end">
          <Button
            onClick={() => {
              setAddUser(true);
            }}
            variant="contained"
            sx={{ mb: 2 }}
          >
            Add User
          </Button>
        </Stack>
        <CustomTable
          data={data}
          columns={columns}
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
      <AddUserModal addUser={addUser} setAddUser={setAddUser} />
    </Box>
  );
}
