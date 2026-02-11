"use client";
import { Box, useTheme, } from "@mui/material";
import type { Columns } from "./departments-heads.types";
import { TableDeleteIcon } from "@assets/icons/table-delete-icon";
import { useState } from "react";
import { useGetDepartmentByIdQuery, useDeleteHeaderUserMutation } from "@services/department/department-api";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { GlobalAvatar } from "@components/global-avatar";
import { awsBaseUrl } from "@root/config";

interface UseDepartmentsHeads {
  columns?: any;
  isOpenDeleteModal: boolean,
  onDeleteModalHandler?: any;
  getHeads: any;
  handleSearch?: (value: string) => void;
  setIsOpenDeleteModal: any
  getDepartmentsErrorHandling: {
    getHeadsLoading: boolean;
    getHeadsSuccess: boolean;
    getHeadsError: boolean
  }
}

export function useDepartmentsHeads(): UseDepartmentsHeads {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [search, setSearch] = useState('')
  const [getHeadersObj, setGetHeadersObj] = useState<any>({});
  const departmentId = useSearchParams().get('id')
  const { data: getHeads, isLoading: getHeadsLoading, isSuccess: getHeadsSuccess, isError: getHeadsError } = useGetDepartmentByIdQuery({ id: departmentId, search })
  const [deleteHeader, { isError }] = useDeleteHeaderUserMutation();
  const getDepartmentsErrorHandling = {
    getHeadsLoading,
    getHeadsSuccess,
    getHeadsError
  }

  function handleSearch(value: string): void {
    setSearch(value)
  }
  const onDeleteModalHandler = async (): Promise<void> => {
    const headersToDelete = {
      id: departmentId,
      memberId: getHeadersObj?._id,
    }
    await deleteHeader({ id: headersToDelete?.id, memberId: headersToDelete?.memberId }).unwrap();
    if (!isError) {
      setIsOpenDeleteModal(!isOpenDeleteModal);
      toast.success("Delete department head successful!");
    }
  };
  const theme = useTheme()
  const columns: Columns[] = [
    {
      accessorFn: (row) => `${row?.firstName ? row?.firstName : "N/A"} ${row?.lastName ? row?.lastName : "N/A"}`,
      id: "name",
      cell: ({ row: { original } }: any) => (
        <Box display="flex" justifyContent="start" alignItems="start" gap={2}>
          <GlobalAvatar
            imgUrl={awsBaseUrl + original?.profileImage}
            firstName={original?.firstName}
            lastName={original?.lastName}
          />
          {`${original?.firstName} ${original?.lastName}`}
        </Box>
      ),
      header: () => <span>Name</span>,
      isSortable: false,
    },

    {
      accessorFn: (row) => row.id,
      header: () => <span style={{display:"flex", justifyContent:"center",width:"100%"}}>Actions</span>,
      id: "Action",
      cell: (item: any) => {
        return (
          <Box display="flex" justifyContent="center" alignItems="start">
            <TableDeleteIcon sx={{ cursor: 'pointer', color: theme.palette.primary.main }}
              onClick={() => {
                setGetHeadersObj(item?.row?.original);
                setIsOpenDeleteModal(!isOpenDeleteModal); onDeleteModalHandler;
              }
              } />
          </Box>
        );
      },
    },
  ];

  return {
    columns,
    handleSearch,
    isOpenDeleteModal, onDeleteModalHandler, getHeads, setIsOpenDeleteModal, getDepartmentsErrorHandling
  };
}
