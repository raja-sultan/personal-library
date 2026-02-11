"use client";
import {
  usePermissionsListQuery,
  useDeleteRoleMutation,
} from "@services/settings/people/permissions-api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Box, MenuItem } from "@mui/material";
import { CustomChip, TableIconActions } from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
// import type { columnsType } from "./permissions.types";
import toast from "react-hot-toast";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

interface Permissions {
  router: AppRouterInstance;
  newPermissionsArray: any;
  openDeleteModal: boolean;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
  handleNewRoleClick: any;
  handleEdit: any;
  handleDelete: any;
  tableData?: CustomTableProps;
  handleSearch?: (value: string) => void;
}

interface SetRole {
  id: string;
  name: string;
  members: number;
  type: string;
}

const { PERMISSION: PEOPLE_PERMISSION } =
  PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.PERMISSIONS;

export function usePermissions(): Permissions {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const [roleId, setRoleId] = useState<SetRole>({
    id: "",
    name: "",
    members: 0,
    type: "",
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();

  const [mutate] = useDeleteRoleMutation();

  const {
    data: permissionsList,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = usePermissionsListQuery({
    search: searchValue,
    limit: 10,
    offset,
  });


  const newPermissionsArray = permissionsList?.data?.roles.map((item) => ({
    id: item._id,
    name: item.name,
    members: item?.membersCount,
    type: !item.default ? "Custom" : "Default",
  }));

  function handleNewRoleClick(): void {
    router.push("/settings/permissions/new-role");
  }
  const handleEdit = (id: string): void => {
    router.push(`/settings/permissions/edit-role?id=${id}`);
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await mutate({ id: roleId?.id });
      toast.success(`${roleId?.name} is deleted successfully`);
    } catch (error) {
      toast.error(`${roleId?.name} ${error?.data?.message}`);
    }
    setOpenDeleteModal(!openDeleteModal);
  };
  const renderTypeVariant = {
    'Default': 'primary',
    'Custom': 'custom'
  }

  function onPageChange(value: number): void {
    setOffset((value - 1) * 10);
  }
  function handleSearch(value: string): void {
    setSearchValue(value);
  }

  

  const columns= [
    {
      accessorFn: (row) => row.name,
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <>Name</>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row.members,
      id: "members",
      cell: (info) => info.getValue(),
      header: () => <>Members</>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row.type,
      id: "default",
      cell: (info) => <CustomChip variant={renderTypeVariant[info.getValue()]} ChipProps={{ label: info?.getValue() }} />,
      header: () => <>Type</>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row._id,
      id: "action",
      cell: ({ row: { original } }: any) => (
        <Box display="flex">
          <TableIconActions icon={<TableActionsIcon />}>
          <PermissionProtected permission={PEOPLE_PERMISSION.EDIT_ROLE}>
            <MenuItem
              onClick={() => {
                handleEdit(original.id);
              }}
            >
              Edit
            </MenuItem>
            </PermissionProtected>
            <PermissionProtected permission={PEOPLE_PERMISSION.DELETE_ROLE}>
            <MenuItem
              onClick={() => {
                setOpenDeleteModal(!openDeleteModal);
                setRoleId(original);
              }}
            >
              Delete
            </MenuItem>
            </PermissionProtected>
          </TableIconActions>
        </Box>
      ),
      header: () => <>action</>,
      isSortable: false,
    },
  ];
 

  const tableData: CustomTableProps = {
    data: newPermissionsArray,
     columns,
     isSuccess,
     isLoading,
     isFetching,
     isError,
     isPagination: true,
     onPageChange,
     totalPages: permissionsList?.data?.meta?.pages,
     currentPage: permissionsList?.data?.meta?.page,
  };

  
  return {
    router,
    newPermissionsArray,
    openDeleteModal,
    setOpenDeleteModal,
    setSearchValue,
    handleNewRoleClick,
    handleEdit,
    handleDelete,
    tableData,
    handleSearch
  };
}
