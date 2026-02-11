import { type Dispatch, type SetStateAction, useState } from "react";
import { Avatar, Box } from "@mui/material";
import type { Columns } from "@sections/settings/people/impersonation/impersonation.types";
import { awsBaseUrl } from "@root/config";
import dayjs from "dayjs";
import { useImpersonationListQuery } from "@services/settings/people/impersonation-api";

interface UseImpersonationReturnType {
  columns: Columns[];
  offset: number;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  handleOffset: (value: number) => void;
  data:any,
  isLoading:boolean,
  isFetching:boolean,
  isSuccess:boolean,
  isError:boolean,
}

export function useImpersonation(): UseImpersonationReturnType {
  const [searchValue, setSearchValue] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);

  function handleOffset(value: number): void {
    setOffset((value - 1) * 10);
  }
  const limit = 10;
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useImpersonationListQuery({
    limit,
    offset,
    search: searchValue,
  });

  const columns: Columns[] = [
    {
      accessorFn: (row) => row.user,
      id: "user",
      cell: ({ row: { original } }) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{ width: "32px", height: "32px", objectFit: "cover" }}
            src={
              original?.target?.profileImage
                ? `${awsBaseUrl}${original?.target?.profileImage}`
                : `https://ui-avatars.com/api/?rounded=true&name=${original?.target?.firstName}+${original?.target?.lastName}&font-size=0.4&color=#344054&background=#F2F4F7&bold=true`
            }
          >
            {original?.target?.firstName?.charAt(0)} {original?.target?.lastName?.charAt(0)}
          </Avatar>
          {`${original?.target?.firstName} ${original?.target?.lastName}`}
        </Box>
      ),
      header: () => <span>Impersonated user</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row.admin,
      id: "admin",
      cell: ({ row: { original } }) => (
        <Avatar
          sx={{ width: "32px", height: "32px", objectFit: "cover" }}
          src={
            original?.source?.profileImage
              ? `${awsBaseUrl}${original?.source?.profileImage}`
              : `https://ui-avatars.com/api/?rounded=true&name=${original?.source?.firstName}+${original?.source?.lastName}&font-size=0.4&color=#344054&background=#F2F4F7&bold=true`
          }
        >
          {original?.source?.firstName?.charAt(0)} {original?.source?.lastName?.charAt(0)}
        </Avatar>
      ),
      header: () => <span>Admin</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row.when,
      id: "date",
      cell: ({ row: { original } }) => (
        <span>{dayjs(original?.createdAt).format("MMM DD YYYY, h:mmA")}</span>
      ),
      header: () => <span>When</span>,
      isSortable: false,
    },
  ];


  return {
    columns,
    searchValue,
    setSearchValue,
    offset,
    handleOffset,
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  };
}
