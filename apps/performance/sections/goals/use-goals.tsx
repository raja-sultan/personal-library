"use client";
import { useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CustomChip, TableIconActions } from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import {
  useDeleteGoalMutation,
  useGetGoalsQuery,
} from "@services/goals/goals.api";
import dayjs from "dayjs";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { CustomUserAvatar } from "@components/custom-users-multiple-avatar";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.GOALS.MY_GOALS;

interface ReturnType {
  handleDeleteGoal: () => void;
  handleSearch: (value: string) => void;
  handleDeleteModal: (id: string | null) => void;
  isOpenDeleteModal: string | null;
  ownersOptions: { id: string; name: string }[];
  handleOwnersFilter: (values: string[]) => void;
  tableData: CustomTableProps;
  handleTabChange: (tab: number) => void;
  tabArray: string[];
  isDeleteLoading: boolean;
  initialData: any;
  PERMISSION:any
}

interface Filters {
  limit: number;
  offset: number;
  search?: string;
  owners?: string[];
  goalType: string | undefined;
}

const renderStatusChip = {
  Completed: "success",
  New: "started",
  "In Progress": "warning",
};

export function useGoals(): ReturnType {
  const router = useRouter();

  const tabArray = [
    "My Goals",
    "Direct Reports",
    "Department",
    "Company",
    "All",
  ];
  

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<string | null>(
    null
  );

  const filterValues = { limit: 10, offset: 0, goalType: "My Goals" };
  const [filter, setFilter] = useState<Filters>(filterValues);

  const [initialData, setInitialData] = useState(null);

  const {
    data: getGoalsData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetGoalsQuery(filter);

  const [deleteGoal, { isLoading: isDeleteLoading }] = useDeleteGoalMutation();

  const { data: getOwner } = useGetReferenceDataLookupQuery({
    type: "employees",
  });

  const ownersOptions = getOwner?.data?.map(
    (ownersData: { value: string; text: string }) => ({
      id: ownersData?.value,
      name: ownersData?.text,
    })
  );

  useEffect(() => {
    setInitialData(getGoalsData?.data?.goals);
  }, []);

  function handleDeleteModal(id: string | null): void {
    setIsOpenDeleteModal(id);
  }

  function handleSearch(search: string): void {
    setFilter({ ...filter, search });
  }

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  function handleOwnersFilter(owners: string[]): void {
    setFilter({ ...filter, owners });
  }

  function handleTabChange(tab: 0): void {
    setFilter({ ...filter, goalType: tabArray[tab] });
  }

  async function handleDeleteGoal(): Promise<void> {
    try {
      await deleteGoal({ id: isOpenDeleteModal })
        .unwrap()
        .then((res) => {
          if (res) {
            toast.success("Goal deleted successfully");
            handleDeleteModal(null);
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Error While Deleting Goal");
    }
  }

  const columns = [
    {
      accessorFn: ({ goalName }) => goalName,
      id: "goalName",
      cell: ({ getValue }) => getValue() ?? "--",
      header: () => <span>Goal Name</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ ownersData }) => ownersData,
      id: "ownersData",
      cell: ({ getValue }) => <CustomUserAvatar data={getValue()} />,
      header: () => <span>Owners</span>,
      isSortable: false,
    },

    {
      accessorFn: ({ startDate }) => startDate,
      id: "startDate",
      cell: ({ getValue }) =>
        getValue() ? dayjs(getValue()).format("D MMM YYYY") : "--",
      header: () => <span>Last update</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ endDate }) => endDate,
      id: "endDate",
      cell: ({ getValue }) =>
        getValue() ? dayjs(getValue()).format("D MMM YYYY") : "--",
      header: () => <span>Due date</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ status }) => status,
      id: "status",
      cell: ({ getValue }) =>
        getValue() ? (
          <CustomChip
            variant={renderStatusChip[getValue()]}
            ChipProps={{ label: getValue() }}
          />
        ) : (
          "--"
        ),
      header: () => <span>Status</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ progress }) => progress,
      id: "progress",
      cell: ({ getValue }) => getValue(),
      header: () => <span>Progress</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      header: () => <span>Actions</span>,
      id: "_id",
      cell: ({ getValue }) => (
        <TableIconActions icon={<TableActionsIcon />}>
          <PermissionProtected permission={PERMISSION.VIEW}>
            <MenuItem
              onClick={() => {
                router.push(`/goals/view-details/?goalId=${getValue()}`);
              }}
            >
              View details
            </MenuItem>
          </PermissionProtected>
          <PermissionProtected permission={PERMISSION.UPDATE}>
            <MenuItem
              onClick={() => {
                router.push(`/goals/create-goal/?id=${getValue()}`);
              }}
            >
              Edit
            </MenuItem>
          </PermissionProtected>
          <PermissionProtected permission={PERMISSION.DELETE}>
            <MenuItem
              onClick={() => {
                setIsOpenDeleteModal(getValue());
              }}
            >
              Delete
            </MenuItem>
          </PermissionProtected>
        </TableIconActions>
      ),
    },
  ];

  const tableData: CustomTableProps = {
    data: getGoalsData?.data?.goals,
    columns,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    onPageChange,
    totalPages: getGoalsData?.data?.meta?.pages,
    currentPage: getGoalsData?.data?.meta?.page,
  };

  return {
    handleSearch,
    handleDeleteModal,
    isOpenDeleteModal,
    handleDeleteGoal,
    ownersOptions,
    handleOwnersFilter,
    tableData,
    handleTabChange,
    tabArray,
    isDeleteLoading,
    initialData,
    PERMISSION,
  };
}
