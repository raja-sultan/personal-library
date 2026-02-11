import React from 'react'
import type { CustomTableProps } from "common/components/custom-table/custom-table.types"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { GlobalAvatar } from '@components/global-avatar';
import { useGetCompanyResultsQuery, useLazyGetSingleTeamResultQuery } from '@services/compensation/compensation-cycle/compensation-cycle-view-details-api';
import toast from 'react-hot-toast';

interface ReturnType {
  tableData: CustomTableProps;
  detailDrawer: string | null;
  handleDetailDrawer: (val: string | null) => void;
  singleCompanyResult: any;
  singleCompanyLoading: boolean;
}


export function useCompanyResults(): ReturnType {
  const [detailDrawer, setDetailDrawer] = useState<string | null>(null);

  const { data: data } = useGetCompanyResultsQuery({ id: "65812c5ec70b6baf31a6c02d" })
  const companyResultsList = data?.data
  console.log(companyResultsList)

  const [trigger, { data: singleCompanyResult, isFetching: singleCompanyLoading }] =
  useLazyGetSingleTeamResultQuery({});

  const handleDetailDrawer = async (userid: string): Promise<void> => {
    setDetailDrawer(userid);
    try {
      if (userid) {
        await trigger({ id: "65812c5ec70b6baf31a6c02d", userId: userid });
      } else {
        null;
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const companyResultColumns = [
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ row: { original } }) => <Box display='flex' gap='10px' alignItems='center'>
        {<GlobalAvatar imgUrl={original?.user?.profileImage} firstName={original?.user?.firstName} lastName={original?.user?.lastName} />}
        <Box>
          <Typography >{original?.user?.firstName + " " + original?.user?.lastName}</Typography>
          <Typography variant='caption' color='neutral.500'>{original?.user?.designation}</Typography>
        </Box>
      </Box>,
      header: () => <>name</>,
      isSortable: false,
    },
    {
      accessorFn: ({ level }) => level,
      id: "level",
      cell: ({ row: { original } }) => <Box display='flex' gap='10px' alignItems='center'>
        <Box>
          <Typography >{original?.user?.jobLevel}</Typography>
        </Box>
      </Box>,
      header: () => <>level</>,
      isSortable: false,
    },
    {
      accessorFn: ({ previousPay }) => previousPay,
      id: "previousPay",
      cell: ({ row: { original } }) => <Box display='flex' gap='10px' alignItems='center'>
        <Box>
          <Typography >{original?.currentSalary}</Typography>
        </Box>
      </Box>,
      header: () => <>previous Pay</>,
      isSortable: false,
    },
    {
      accessorFn: ({ payIncrease }) => payIncrease,
      id: "payIncrease",
      cell: ({ row: { original } }) => <Box display='flex' gap='10px' alignItems='center'>
        <Box>
          <Typography >{original?.guidance}</Typography>
        </Box>
      </Box>,
      header: () => <>pay Increase</>,
      isSortable: false,
    },
    {
      accessorFn: ({ newPay }) => newPay,
      id: "newPay",
      cell: ({ row: { original } }) => <Box display='flex' gap='10px' alignItems='center'>
        <Box>
          <Typography >{original?.currentSalary + original?.guidance}</Typography>
        </Box>
      </Box>,
      header: () => <>new Pay</>,
      isSortable: false,
    },
    {
      accessorFn: ({ payEffectiveDate }) => payEffectiveDate,
      id: "payEffectiveDate",
      cell: ({ getValue }) => getValue(),
      header: () => <>pay Effective Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ user: { _id: id } }) => id,
      id: "_id",
      cell: ({ getValue }) => <IconButton onClick={() => { handleDetailDrawer(getValue()) }}><RemoveRedEyeIcon /></IconButton>,
      header: () => <>Action</>,
      isSortable: false,
    },
  ]

  const tableData: CustomTableProps = {
    data: companyResultsList,
    columns: companyResultColumns,
    isSuccess: true,
    isPagination: false
  }

  return {
    tableData,
    detailDrawer,
    handleDetailDrawer,
    singleCompanyResult,
    singleCompanyLoading
  }
}