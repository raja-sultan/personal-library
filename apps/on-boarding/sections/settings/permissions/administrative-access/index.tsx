import { AdministrativeAccessRole } from "@enums/role";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, IconButton, Typography } from "@mui/material";
import { useLazyGetRoleListWithIDListQuery } from "@services/settings/permission-api/permission-api";
import { CustomTable } from "common";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export function AdministrativeAccessSection(): JSX.Element {
  const [getRoleListWithIDList, { isLoading, isFetching, isError, isSuccess }] =
    useLazyGetRoleListWithIDListQuery();
  const [data, setData] = useState([]);
  const getData = useCallback(async (): Promise<void> => {
    try {
      const tableTableData: any = [];
      const OwnerResponse = await getRoleListWithIDList({
        role: AdministrativeAccessRole.Owner,
      }).unwrap();
      const CoordinatorResponse = await getRoleListWithIDList({
        role: AdministrativeAccessRole.Coordinator,
      }).unwrap();
      const ownerData = {
        id: 3,
        roleName: "Owner (You)",
        role: AdministrativeAccessRole.Owner,
        users: OwnerResponse?.data?.meta.total,
        description:
          "Manage and view information for all employees, Add and remove users with owners access",
      };
      const Coordinator = {
        id: 4,
        roleName: "Coordinator",
        role: AdministrativeAccessRole.Coordinator,
        users: CoordinatorResponse?.data?.meta.total,
        description:
          "Add and remove coordinators, Update access levels for all coordinators",
      };
      tableTableData.push(ownerData);
      tableTableData.push(Coordinator);
      setData(tableTableData);
    } catch (error) {
      setData([]);
    }
  }, [getRoleListWithIDList]);
  useEffect(() => {
    getData();
  }, [getData]);
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
            href={{
              pathname: "/settings/permissions/administrative-edit-access",
              query: {
                role: info.row.original.role,
                roleName: info.row.original.roleName,
              },
            }}
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

  return (
    <Box sx={{ p: 0.5 }}>
      <Typography sx={{ mb: 2, fontWeight: 500 }}>
        Administrative Access
      </Typography>
      <CustomTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isPagination={false}
        isSuccess={isSuccess}
      />
    </Box>
  );
}
