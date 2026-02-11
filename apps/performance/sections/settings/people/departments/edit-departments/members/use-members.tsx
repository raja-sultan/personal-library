"use client";
import { Box, useTheme, } from "@mui/material";
import type { Columns } from "./members.types";
import { TableDeleteIcon } from "@assets/icons/table-delete-icon";
import { useState } from "react";
import { useDeleteMemberUserMutation, useGetDepartmentByIdQuery } from "@services/department/department-api";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import type { Dispatch, SetStateAction } from "react"
import { GlobalAvatar } from "@components/global-avatar";
import { awsBaseUrl } from "@root/config";

interface UseMemberType {
  columns?: any;
  isOpenDeleteModal: boolean,
  onDeleteModalHandler?: any;
  getMembers: any;
  handleSearch?: (value: string) => void;
  setIsOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  membersErrorHandling: {
    membersLoading: boolean;
    membersError: boolean;
    membersSuccess: boolean
  };
  // handleOffset: (value: number) => void
}
   
export function useMembers(): UseMemberType {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [searchValues, setSearchValues] = useState('');
  const departmentId = useSearchParams().get('id')
  const [getMemberObj, setGetMemberObj] = useState<any>({});
  // const [Offset, setOffset] = useState<number>(0)

  const { data: getMembers, isLoading: membersLoading, isError: membersError, isSuccess: membersSuccess } = useGetDepartmentByIdQuery({ search: searchValues, id: departmentId });
  const [deleteMember, { isError }] = useDeleteMemberUserMutation();
  const membersErrorHandling = {
    membersLoading,
    membersError,
    membersSuccess
  }

  const theme = useTheme()

  function handleSearch(value: string): void {
    setSearchValues(value)
    
  }

  const onDeleteModalHandler = async (): Promise<void> => {
    const membersToDelete = {


      id: departmentId,
      memberId: getMemberObj?._id,
    };
    await deleteMember({ id: membersToDelete?.id, memberId: membersToDelete?.memberId }).unwrap();
    if (!isError) {
      setIsOpenDeleteModal(!isOpenDeleteModal);
      toast.success("Member deleted");
    }
  };

  // function handleOffset(value: number): void {
  //   setOffset((value - 1) * 10);
  // }

  const columns: Columns[] = [
    {
      accessorFn: (row) => `${row?.firstName? row?.firstName :"N/A"} ${row?.lastName?row?.lastName: "N/A"}`,
      id: 'firstNameLastName',
      cell:({ row: { original } }: any) => (
        <Box display="flex" justifyContent="start" alignItems="start" gap={2}>
          <Box display="flex" gap="10px" alignItems="center"> 
              <GlobalAvatar
                imgUrl={awsBaseUrl + original?.profileImage}
                firstName={original?.firstName}
                lastName={original?.lastName}
              />
              {`${original?.firstName} ${original?.lastName}`}
            </Box>
        </Box>
      ),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => `${row?.manager?.firstName ?? 'N/A'} ${row?.manager?.lastName ?? 'N/A'}`,

      id: "manager",
      cell: (info) => info.getValue(),
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
      id: "Action",
      cell: (item: any) => {
        return (
          <Box display="flex" justifyContent="start" alignItems="start">
            <TableDeleteIcon sx={{ cursor: 'pointer', color: theme.palette.primary.main }}
              onClick={() => {
                setGetMemberObj(item?.row?.original);
                setIsOpenDeleteModal(!isOpenDeleteModal); onDeleteModalHandler
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
    setIsOpenDeleteModal,
    isOpenDeleteModal,
    onDeleteModalHandler,
    getMembers,
    membersErrorHandling,
  };
}
