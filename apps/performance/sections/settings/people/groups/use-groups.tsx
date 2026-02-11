"use client";

import { useState } from "react";
import toast from "react-hot-toast";

// @mui imports
import { Box, MenuItem } from "@mui/material";

// @assets imports
import { TableActionsIcon } from "@assets/icons/table-action-icon";

// @components imports
import { TableIconActions } from "common";
import type { Columns, UseGroupsReturnType } from "./groups-types";
import { usePathname, useRouter } from "next/navigation";
import {
  useDeleteGroupMutation,
  useGroupListQuery,
} from "@services/settings/people/groups-api";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

const { PERMISSION: PEOPLE_PERMISSION } =
  PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.GROUPS;
// Define the useGroups custom hook
export function useGroups(): UseGroupsReturnType {
  const pathName = usePathname();
  const [offset, setOffset] = useState<number>(0);
  const [deleteUser, setDeleteUser] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [getGroupObj, setGetGroupObj] = useState<any>({});

  // api call
  const [deleteGroup, { isError }] = useDeleteGroupMutation({});

  const {
    data: groupsData,
    isLoading,
    isFetching,
    isSuccess,
  } = useGroupListQuery(
    { limit: 10, offset, searchValue },
    { skip : pathName.includes("settings/groups/edit-group?id") }
  );
  function handleOffset(value: number): void {
    setOffset((value - 1) * 5);
  }

  const route = useRouter();

  const handleDeleteUser = async (): Promise<void> => {
    await deleteGroup(getGroupObj?._id);
    if (!isError) {
      setDeleteUser(false);
      toast.success("Group deleted successfully");
    }
  };

  let timer: ReturnType<typeof setTimeout>;

  function changeHandler(value: string): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearchValue(value);
    }, 1000);
  }

  const columns: Columns[] = [
    {
      accessorFn: (row) => row?.groupName,
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.description,
      id: "description",
      cell: (info) => info.getValue(),
      header: () => <span>Description</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.membersCount,
      id: "members",
      cell: (info) => info.getValue(),
      header: () => <span>Members</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row._id,
      header: () => <span>Actions</span>,
      id: "Actions",
      cell: (item: any) => {
        return (
          <Box display="flex">
            <TableIconActions icon={<TableActionsIcon />}>
            <PermissionProtected permission={PEOPLE_PERMISSION.VIEW}>
              <MenuItem
                onClick={() => {
                  route.push(
                    `/settings/groups/view/?viewId=${item?.row?.original?._id}`
                  );
                }}
              >
                View
              </MenuItem>
              </PermissionProtected>
              <PermissionProtected permission={PEOPLE_PERMISSION.EDIT}>
              <MenuItem
                onClick={() => {
                  route.push(
                    `/settings/groups/edit-group/?id=${item?.row?.original?._id}&GroupName=${item?.row?.original?.groupName}`
                  );
                }}
              >
                Edit
              </MenuItem>
              </PermissionProtected>
              <PermissionProtected permission={PEOPLE_PERMISSION.DELETE}>
              <MenuItem
                onClick={() => {
                  setDeleteUser(true);
                  setGetGroupObj(item?.row?.original);
                }}
              >
                {" "}
                Delete
              </MenuItem>
              </PermissionProtected>
            </TableIconActions>
          </Box>
        );
      },
    },
  ];
  return {
    offset,
    deleteUser,
    columns,
    handleDeleteUser,
    handleOffset,
    setDeleteUser,
    changeHandler,
    searchValue,
    groupsData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  };
}
