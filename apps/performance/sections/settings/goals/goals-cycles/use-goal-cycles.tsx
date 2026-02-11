import React, { useState } from "react";
import type { SetStateAction } from "react";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { CustomChip, TableIconActions } from "@root/../../packages/common";
import { MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  useDeleteGoalMutation,
  useGetGoalCyclesQuery,
  usePatchGoalByIdMutation,
} from "@services/goal-cycle/goal-cycle-api";
import dayjs from "dayjs";
import type { CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";
import { toast } from "react-hot-toast";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.GOALS.GOALS;

interface ReturnType {
  markAsActiveModal?: boolean;
  mutationLoading: boolean;
  handleMarkAsActive?: () => void;
  handleMarkAsActiveContinue?: () => void;
  deleteModal?: boolean;
  handleDeleteModal?: () => void;
  handleDelete?: () => void;
  tableData?: CustomTableProps;
  markAsActive?: { cycleStartDate: null | string; cycleDueDate: null | string };
  handleMarkAsActiveChange?: (value: string, name: string) => void;
  setSearch?: React.Dispatch<SetStateAction<string>>;
  PERMISSION:any;
}

export const renderChipStatus = {
  Draft: "warning",
  Active: "success",
  Completed: "Started",
  Inactive: "danger",
};

export function useGoalCycles(): ReturnType {
  const router = useRouter();
  const [tableId, setTableId] = useState("");

  const [markAsActiveModal, setMarkAsActiveModal] = useState(false);
  const [mutationLoading, setMutationLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState<number>(0);

  const {
    data: goalCycleTableData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetGoalCyclesQuery({
    search,
    limit: 10,
    offset,
  });
  const [deleteGoal] = useDeleteGoalMutation({});
  const [patchGoal] = usePatchGoalByIdMutation();

  const [markAsActive, setMarkAsActive] = useState({
    cycleStartDate: "",
    cycleDueDate: "",
    status: "",
  });

  function handleOffset(value: number): void {
    setOffset((value - 1) * 5);
  }

  // mark as active
  function handleMarkAsActive(): void {
    setMarkAsActiveModal(!markAsActiveModal);
  }
  function handleMarkAsActiveChange(value: string, name: string): void {
    setMarkAsActive({ ...markAsActive, [name]: value });
  }
  async function handleMarkAsActiveContinue(): Promise<void> {
    setMutationLoading(true);
    const { status, cycleDueDate, cycleStartDate } = markAsActive;
    const obj = {
      status: status === "Active" ? "Inactive" : "Active",
      cycleDueDate,
      cycleStartDate,
    };
    try {
      await patchGoal({ id: tableId, payload: obj }).unwrap();
      toast.success("Status updated successfully");
      handleMarkAsActive();
    } catch (error) {
      toast.error(error?.data?.message || "Error while updating status");
    } finally {
      setMutationLoading(false);
    }
  }

  // delete
  function handleDeleteModal(): void {
    setDeleteModal(!deleteModal);
  }
  async function handleDelete(): Promise<void> {
    setMutationLoading(true);
    try {
      await deleteGoal({ id: tableId });
      toast.success("Goal cycle deleted successfully");
      handleDeleteModal();
    } catch (error) {
      toast.error(error?.data?.message || "Error while deleting goal cycle ");
    } finally {
      setMutationLoading(false);
    }
  }

  const columns = [
    {
      accessorFn: ({ cycleName }) => cycleName,
      id: "cycleName",
      cell: ({ getValue }) => getValue(),
      header: () => <>Goal Cycle</>,
      isSortable: false,
    },
    {
      accessorFn: ({ cycleStartDate }) =>
        dayjs(cycleStartDate).format("DD MMM YYYY"),
      id: "cycleStartDate",
      cell: ({ getValue }) => getValue(),
      header: () => <>Start Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ cycleDueDate }) =>
        dayjs(cycleDueDate).format("DD MMM YYYY"),
      id: "cycleDueDate",
      cell: ({ getValue }) => getValue(),
      header: () => <>Due Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ goals }) => goals ?? "--",
      id: "goals",
      cell: ({ getValue }) => getValue(),
      header: () => <>Goals</>,
      isSortable: false,
    },
    {
      accessorFn: ({ status }) => status,
      id: "status",
      cell: ({ getValue }) => (
        <CustomChip
          variant={renderChipStatus[getValue()]}
          ChipProps={{ label: getValue() }}
        />
      ),
      header: () => <>Status</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row: { original } }) => (
        <TableIconActions icon={<TableActionsIcon />}>
          <PermissionProtected permission={PERMISSION.EDIT}>
            <MenuItem
              onClick={() => {
                router.push(
                  `/settings/goals/goals-cycles/goal?id=${original?._id}`
                );
              }}
            >
              Edit
            </MenuItem>
          </PermissionProtected>
          <PermissionProtected
            permission={PERMISSION.MARK_AS_ACTIVE_OR_INACTIVE}
          >
            <MenuItem
              onClick={() => {
                handleMarkAsActive();
                setTableId(original?._id);
                setMarkAsActive({
                  cycleDueDate: original.cycleDueDate,
                  cycleStartDate: original.cycleStartDate,
                  status: original.status,
                });
              }}
            >
              {original.status === "Active"
                ? "mark as inactive"
                : "mark as active"}
            </MenuItem>
          </PermissionProtected>
          <PermissionProtected permission={PERMISSION.DELETE}>
            <MenuItem
              onClick={() => {
                handleDeleteModal();
                setTableId(original?._id);
              }}
            >
              Delete
            </MenuItem>
          </PermissionProtected>
        </TableIconActions>
      ),
      header: () => <>Action</>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: goalCycleTableData?.data?.goalCycles,
    columns,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    currentPage: goalCycleTableData?.data?.meta?.page,
    totalPages: goalCycleTableData?.data?.meta?.pages,
    onPageChange: handleOffset,
  };

  return {
    markAsActiveModal,
    mutationLoading,
    handleMarkAsActive,
    handleMarkAsActiveContinue,
    deleteModal,
    handleDeleteModal,
    handleDelete,
    tableData,
    handleMarkAsActiveChange,
    markAsActive,
    setSearch,
    PERMISSION,
  };
}
