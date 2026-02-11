"use client";

import { Box, MenuItem } from "@mui/material";
import type { Columns } from "./user-attributes.types";
import { CustomChip, TableIconActions } from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useArchiveRestoreAttributeMutation } from "@services/settings/people/user-attribute-api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

interface UseUserAttributes {
  columns: Columns[];
  offset: number;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  handleOffset: (value: number) => void;
}
 const {PERMISSION} = PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.USER_ATTRIBUTES;

export function useUserAttributes(): UseUserAttributes {
  const router = useRouter();

  const [offset, setOffset] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  const [archiveRestore] = useArchiveRestoreAttributeMutation({});

  function handleOffset(value: number): void {
    setOffset((value - 1) * 10);
  }

  const handleEdit = (id: string): void => {
    router.push(`/settings/user-attributes/edit?id=${id}`);
    id;
  };
  const handleArchive = async (
    id: string,
    archived: boolean
  ): Promise<void> => {
    try {
      await archiveRestore({ id, archived }).unwrap();
      toast.success(`Custom attribute ${archived ? "archived" : "restored"}`);
    } catch (error) {
      toast.error(error?.data?.message || "Error while updating attributes");
    }
  };

  const columns: Columns[] = [
    {
      accessorFn: ({ name }) => name,
      id: "name",
      cell: ({ getValue }) => getValue(),
      header: () => <span>Attribute</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ visibility }) => visibility,
      id: "visibility",
      cell: ({ getValue }) => getValue(),
      header: () => <span>Visibility</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ status }) => status,
      id: "status",
      cell: ({ getValue }) =>
        getValue() ? (
          <CustomChip variant="started" ChipProps={{ label: "Default" }} />
        ) : (
          <CustomChip variant="custom" ChipProps={{ label: "Custom" }} />
        ),
      header: () => <span>Status</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row.action,
      id: "action",
      cell: ({ row: { original } }) => (
        <Box display="flex">
          <TableIconActions icon={<TableActionsIcon />}>
          <PermissionProtected permission={PERMISSION.EDIT}>
            {!original.default && !original?.archived && (
              <MenuItem
                onClick={() => {
                  handleEdit(original?._id);
                }}
              >
                Edit
              </MenuItem>
            )}
          </PermissionProtected>
          <PermissionProtected permission={PERMISSION.ARCHIVE}>
            {!original.default && !original?.archived && (
              <MenuItem
                onClick={async () => {
                  await handleArchive(original?._id, true);
                }}
              >
                Archive
              </MenuItem>
            )}
            </PermissionProtected>
            <PermissionProtected permission={PERMISSION.RESTORE}>
            {original?.archived && (
              
              <MenuItem
                onClick={async () => {
                  await handleArchive(original?._id, false);
                }}
              >
                Restore
              </MenuItem>
            )}
            </PermissionProtected>
          </TableIconActions>
        </Box>
      ),
      header: () => <>Actions</>,
      isSortable: false,
    },
  ];

  return {
    columns,
    offset,
    searchValue,
    setSearchValue,
    handleOffset,
  };
}
