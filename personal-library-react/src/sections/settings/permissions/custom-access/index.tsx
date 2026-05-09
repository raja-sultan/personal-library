import React, { useState } from "react";

import { Box, Button, IconButton, Typography } from "@mui/material";
import { CustomTable } from "common";
import Link from "next/link";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { CreateNewRoleModal } from "./create-new-user-modal";

const data = [
  {
    id: 1,
    roleName: "Assistant",
    users: "1",
    description:
      "Add and remove assistants, Update access levels for all assistants",
  },
];

const columns = [
  {
    accessorFn: (row: any) => row.roleName,
    id: "Role",
    cell: (info: any) => (
      <Box>
        <Typography variant="body2">{info.getValue() ?? "-"}</Typography>
      </Box>
    ),
    header: () => (
      <Typography variant="body2" sx={{ fontWeight: "600" }}>
        Role
      </Typography>
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.users,
    id: "users",
    cell: (info: any) => (
      <Box>
        <Typography variant="body2">{info.getValue() ?? "-"}</Typography>
      </Box>
    ),
    header: () => (
      <Typography variant="body2" sx={{ fontWeight: "600" }}>
        Users
      </Typography>
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.description,
    id: "description",
    cell: (info: any) => (
      <Box>
        <Typography variant="body2">{info.getValue() ?? "-"}</Typography>
      </Box>
    ),
    header: () => (
      <Typography variant="body2" sx={{ fontWeight: "600" }}>
        Description
      </Typography>
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.id,
    id: "Actions",
    cell: (info: any) => (
      <Box>
        <Link
          href={`/settings/permissions/administrative-edit-access?id=${info.row.original.id}&roleName=${info.row.original.roleName}`}
        >
          <IconButton>
            <RemoveRedEyeIcon />
          </IconButton>
        </Link>
      </Box>
    ),
    header: () => <span>Actions</span>,
  },
];

export function CustomAccessSection(): JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const [createRole, setCreateRole] = useState<boolean>(false);

  return (
    <Box sx={{ p: 1.5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography sx={{ fontWeight: 500 }}>Custom Access</Typography>
        <Button
          variant="outlined"
          onClick={() => {
            setCreateRole(true);
          }}
        >
          Create New
        </Button>
      </Box>
      {data.length === 0 ? (
        <Typography>
          Give employees like your IT Managers, Office Managers, or Employee
          Mentors special access to employee information
        </Typography>
      ) : (
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
      )}

      <CreateNewRoleModal
        createRole={createRole}
        setCreateRole={setCreateRole}
      />
    </Box>
  );
}
