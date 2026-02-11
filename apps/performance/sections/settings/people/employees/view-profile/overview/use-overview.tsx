import { Button, Typography } from "@mui/material";

import { useGetUserProfileQuery } from "@services/profile/profile-api";
import { CustomChip } from "common";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface ReturnType {
  reviewsTableData: CustomTableProps;
  goalsTableData: CustomTableProps;
  handleDeleteModal: () => void;
  deleteModal: boolean;
  isDrawerOpen: boolean;
  handleDrawer: () => void;
  getProfileData?: any;
  handleDelete?: any;
  setGrowthId?: any;
  growthId?: any;
  isLoading?: any;

}

const renderChipColor = {
  "On Track": "started",
  "Off Track": "danger",
};


export function useOverview(): ReturnType {
  const router = useRouter();

  const memberId = useSearchParams().get("id");

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [growthId, setGrowthId] = useState();

  const { data: getProfileData, isLoading } = useGetUserProfileQuery(memberId);



  const handleDrawer = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  function handleDeleteModal(): void {
    setDeleteModal(!deleteModal);
  }


  const reviewsColumns = [
    {
      accessorFn: ({ name }) => name,
      id: "name",
      cell: ({ getValue }) => (
        <Typography variant="subtitle2" fontWeight={600}>
          {getValue()}
        </Typography>
      ),
      header: () => "",
      isSortable: false,
    },
    {
      accessorFn: ({ launchStatus }) => launchStatus,
      id: "launchStatus",
      cell: ({ getValue }) => (
        <CustomChip variant="custom" ChipProps={{ label: getValue() }} />
      ),
      header: () => "",
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ row }) => (
        <Button
          onClick={() => {
            router.push(`/reviews/perform-reviews?id=${row?.original?._id}`);
          }}
          size="small"
          variant="outlined"
        >
          View Details
        </Button>
      ),
      header: () => "",
      isSortable: false,
    },
  ];

  const reviewsTableData: CustomTableProps = {
    data: getProfileData?.data?.reviews,
    columns: reviewsColumns,
    isSuccess: true,
    isPagination: false,
  };

  const goalsColumns = [
    {
      accessorFn: ({ goalName }) => goalName,
      id: "goalName",
      cell: ({ getValue }) => (
        <Typography variant="subtitle2" fontWeight={600}>
          {getValue()}
        </Typography>
      ),
      header: () => "",
      isSortable: false,
    },
    {
      accessorFn: ({ status }) => status,
      id: "status",
      cell: ({ getValue }) => (
        <CustomChip
          variant={renderChipColor[getValue()]}
          ChipProps={{ label: getValue() }}
        />
      ),
      header: () => "",
      isSortable: false,
    },
    {
      accessorFn: ({ progress }) => progress,
      id: "progress",
      cell: ({ getValue }) => `${getValue()}%`,
      header: () => "",
      isSortable: false,
    },
  ];

  const goalsTableData: CustomTableProps = {
    data: getProfileData?.data?.goals,
    columns: goalsColumns,
    isSuccess: true,
    isPagination: false,
    isLoading,
  };

  return {
    reviewsTableData,
    goalsTableData,
    deleteModal,
    handleDeleteModal,
    isDrawerOpen,
    handleDrawer,
    getProfileData,
    setGrowthId,
    growthId,
    isLoading,

  }
}