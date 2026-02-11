"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
// @mui imports
import { Avatar, Box, Typography } from "@mui/material";

// @assets imports
// import Image from "next/image";
import { Person } from "@assets/common";

// @components imports
import type { Columns } from "./view-groups-types";
import { TrashIcon } from "@assets/icons/trash-icon";
import {useSearchParams } from "next/navigation";
import {
  useDeleteViewGroupMutation,
  useGroupViewListQuery,
} from "@services/settings/people/groups-api";
import toast from "react-hot-toast";

interface UseViewGroupsReturnType {
  columns: Columns[];
  handleDeleteUser?: () => void;
  deleteUser?: boolean;
  setDeleteUser: Dispatch<SetStateAction<boolean>>;
  offset?: number;
  setSearchValue: Dispatch<SetStateAction<string>>;
  groupsViewData: any;
  groupViewLoading: boolean;
  groupViewFetching: boolean;
  groupViewSuccess: boolean;
  groupViewError: boolean;
  groupViewId?: string | null;
}

// Define the useGroups custom hook
export function useViewGroups(): UseViewGroupsReturnType {
  const [searchValue, setSearchValue] = useState<string>("");
  const [deleteUser, setDeleteUser] = useState(false);
  const [getGroupViewObj, setGroupViewObj] = useState<any>({});
 

  const searchParams = useSearchParams();
  const groupViewId = searchParams.get("viewId");
  const {
    data: groupsViewData,
    isLoading: groupViewLoading,
    isFetching: groupViewFetching,
    isSuccess: groupViewSuccess,
    isError: groupViewError,
  } = useGroupViewListQuery({
    searchValue,
    id: groupViewId,
  });
  const [deleteGroup, { isError }] = useDeleteViewGroupMutation({});
  const handleDeleteUser = async (): Promise<void> => {
    await deleteGroup({ groupId: groupViewId, userId: getGroupViewObj?._id });
    if (!isError) {
      setDeleteUser(false);
      toast.success("Delete member successful!");
     
    }
  };
  //   };

  const columns: Columns[] = [
    {
      accessorFn: (row) => `${row?.firstName} ${row?.lastName}`,
      id: "name",

      cell: ({ row: { original } }: any) => (
        <Box display="flex" gap={2}>
          <Avatar
            sx={{ width: "32px", height: "32px", objectFit: "cover" }}
            src={
              original?.profileImage
                ? Person?.src
                : `https://ui-avatars.com/api/?rounded=true&name=${original?.firstName}+${original?.lastName}&font-size=0.4&color=#344054&background=#F2F4F7&bold=true`
            }
          >
            {original?.firstName} {original?.lastName}
          </Avatar>
          {`${original?.firstName} ${original?.lastName}`}
        </Box>
      ),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.manager?.profileImage,
      id: "manager",
      cell: ({ row: { original } }: any) => (
        <Box gap={2}>
          <Avatar
            sx={{ width: "32px", height: "32px", objectFit: "cover" }}
            src={
              original?.manager?.profileImage
                ? Person?.src
                : `https://ui-avatars.com/api/?rounded=true&name=${original?.manager?.firstName}+${original?.manager?.lastName}&font-size=0.4&color=#344054&background=#F2F4F7&bold=true`
            }
          >
            {original?.manager?.firstName} {original?.manager?.lastName}
          </Avatar>
        </Box>
      ),
      header: () => <span>Manager</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.goals,
      id: "goals",
      cell: (info) => info.getValue(),
      header: () => <span>Goals</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row.id,
      header: () => <span>Actions</span>,
      id: "Actions",
      cell: (item: any) => {
        return (
          <Typography
            component="span"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setDeleteUser(true);
              setGroupViewObj(item?.row?.original);
            }}
          >
            <TrashIcon />
          </Typography>
        );
      },
    },
  ];

  return {
    deleteUser,
    setDeleteUser,
    columns,
    handleDeleteUser,
    setSearchValue,
    groupsViewData,
    groupViewLoading,
    groupViewFetching,
    groupViewSuccess,
    groupViewError,
    groupViewId,
  };
}
