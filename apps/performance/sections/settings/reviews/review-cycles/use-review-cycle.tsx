import { useState } from "react";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { MenuItem, Typography } from "@mui/material";
import { CustomChip, TableIconActions } from "@root/../../packages/common";
import { useRouter } from "next/navigation";
import {
  useDeleteReviewCycleMutation,
  useDuplicateReviewCycleMutation,
  useGetReviewCyclesQuery,
} from "@services/settings/review/review-cycle-api";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import toast from "react-hot-toast";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.REVIEWS.REVIEW_CYCLES;

interface ReturnType {
  tableData?: CustomTableProps;
  handleStageChange: (value: string) => void;
  deleteModal?: boolean;
  handleDeleteModal?: () => void;
  duplicateModal?: boolean;
  handleDuplicateModal?: () => void;
  handleDuplicateReview?: () => void;
  handleDeleteReview?: () => void;
  handleSearch?: (value: string) => void;
}

const renderStatusChip = {
  draft: "primary",
  active: "success",
  ended: "warning",
};

interface Filter {
  limit: number;
  offset: number;
  search?: string;
  launchStatus?: string;
}

export function useReviewCycle(): ReturnType {
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [duplicateModal, setDuplicateModal] = useState<boolean>(false);
  const [tableId, setTableId] = useState<string>("");
  const filterValues = { limit: 10, offset: 0 };
  const [filter, setFilter] = useState<Filter>(filterValues);
  const {
    data: reviewCyclesData,
    isError,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetReviewCyclesQuery(filter);
  const [duplicateReviewCycleMutation] = useDuplicateReviewCycleMutation();
  const [deleteReviewCycleMutation] = useDeleteReviewCycleMutation();

  function handleDeleteModal(): void {
    setDeleteModal(!deleteModal);
  }

  function handleDuplicateModal(): void {
    setDuplicateModal(!duplicateModal);
  }

  function handleStageChange(value: string): void {
    if (value !== "all stages")
      setFilter({ ...filterValues, launchStatus: value.toUpperCase() });
    else {
      setFilter({ ...filterValues });
    }
  }

  function handleSearch(value: string): void {
    setFilter({ ...filter, search: value });
  }

  async function handleDeleteReview(): Promise<void> {
    try {
      await deleteReviewCycleMutation({ id: tableId });
      setDeleteModal(!deleteModal);
      toast.success("Review cycle deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Error while deleting review cycle");
    }
  }

  async function handleDuplicateReview(): Promise<void> {
    try {
      await duplicateReviewCycleMutation({ id: tableId });
      setDuplicateModal(!duplicateModal);
      toast.success("Review cycle duplicated successfully");
    } catch (error) {
      toast.error(
        error?.data?.message || "Error while duplicating review cycle"
      );
    }
  }

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  const columns = [
    {
      accessorFn: ({ name }) => name,
      id: "name",
      cell: ({ getValue }) => (
        <Typography variant="body2" fontWeight={600}>
          {getValue()}
        </Typography>
      ),
      header: () => <>cycle</>,
      isSortable: false,
    },
    {
      accessorFn: ({ reviewType }) => reviewType,
      id: "reviewType",
      cell: ({ getValue }) => (
        <Typography textTransform="capitalize" fontSize="14px">
          {getValue().toLowerCase()}
        </Typography>
      ),
      header: () => <>type</>,
      isSortable: false,
    },
    {
      accessorFn: ({ launchStatus }) => launchStatus,
      id: "launchStatus",
      cell: ({ getValue }) => (
        <CustomChip
          variant={renderStatusChip[getValue().toLowerCase()]}
          ChipProps={{
            label: (
              <Typography textTransform="capitalize" variant="subtitle2">
                {getValue().toLowerCase()}
              </Typography>
            ),
          }}
        />
      ),
      header: () => <>status</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row: { original } }) => (
        <TableIconActions icon={<TableActionsIcon />}>
          <PermissionProtected permission={PERMISSION.VIEW}>
            <MenuItem
              onClick={() => {
                router.push(
                  `/settings/reviews/review-cycles/view-progress?id=${original?._id}`
                );
              }}
            >
              View
            </MenuItem>
          </PermissionProtected>
          <PermissionProtected permission={PERMISSION.EDIT}>
            <MenuItem
              onClick={() => {
                router.push(
                  `/settings/reviews/review-cycles/edit?id=${original?._id}`
                );
              }}
            >
              Edit
            </MenuItem>
          </PermissionProtected>
          <PermissionProtected permission={PERMISSION.DELETE}>
            <MenuItem
              onClick={() => {
                handleDeleteModal();
                setTableId(original._id);
              }}
            >
              Delete
            </MenuItem>
          </PermissionProtected>
          <PermissionProtected permission={PERMISSION.DUPLICATE}>
            <MenuItem
              onClick={() => {
                handleDuplicateModal();
                setTableId(original._id);
              }}
            >
              Duplicate
            </MenuItem>
          </PermissionProtected>
        </TableIconActions>
      ),
      header: () => <>Action</>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: reviewCyclesData?.data?.Reviews,
    columns,
    isError,
    isLoading,
    isSuccess,
    isFetching,
    isPagination: true,
    onPageChange,
    totalPages: reviewCyclesData?.data?.meta?.pages,
    currentPage: reviewCyclesData?.data?.meta?.page,
  };

  return {
    tableData,
    handleStageChange,
    deleteModal,
    handleDeleteModal,
    duplicateModal,
    handleDuplicateModal,
    handleDuplicateReview,
    handleDeleteReview,
    handleSearch,
  };
}
