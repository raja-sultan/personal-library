import { useState } from "react";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { MenuItem } from "@mui/material";
import { TableIconActions } from "@root/../../packages/common";
import type { CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";
import {
  useCareeGroupListQuery,
  useDeleteGroupMutation,
} from "@services/settings/career/plans/groups-api";
import toast from "react-hot-toast";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.CAREER.CAREER_GROUPS;

interface ReturnType {
  tableProps?: CustomTableProps;
  handleSearch?: (value: string) => void;
  deleteModal?: boolean;
  handleDeleteModal?: () => void;
  handleDeleteGroup?: () => void;
  editGroupModal: boolean;
  handleEditGroupModal: () => void;
  currRowId: string;
}

export function useGroup(): ReturnType {
  const [currRowId, setCurrRowId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [editGroupModal, setEditGroupModal] = useState(false);
  const [search, setSearch] = useState<string>();
  const queryParams: any = {};

  const { data: careerGroupList } = useCareeGroupListQuery({
    limit: 10,
    offset: 0,
    search,
    ...queryParams,
  });

  const data = careerGroupList?.data?.careerPlanGroup;

  const [deleteCareerGroup] = useDeleteGroupMutation();

  function handleEditGroupModal(): void {
    setEditGroupModal(!editGroupModal);
  }

  function handleSearch(value: string): void {
    setSearch(value);
  }

  function handleDeleteModal(): void {
    setDeleteModal(!deleteModal);
  }

  const handleDeleteGroup = async (): Promise<void> => {
    await deleteCareerGroup(currRowId)
      .unwrap()
      .then(() => {
        toast.success("Group Deleted Successfully.");
        setDeleteModal(false);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
        setDeleteModal(false);
      });
  };

  const columns = [
    {
      accessorFn: ({ name }) => name,
      id: "name",
      cell: ({ getValue }) => getValue(),
      header: () => <>Name</>,
      isSortable: false,
    },
    {
      accessorFn: ({ planUsage }) => planUsage,
      id: "planUsage",
      cell: ({ getValue }) => getValue(),
      header: () => <>Plans</>,
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
                handleEditGroupModal();
                setCurrRowId(original._id);
              }}
            >
              Edit
            </MenuItem>
          </PermissionProtected>

          <PermissionProtected permission={PERMISSION.DELETE}>
            <MenuItem
              onClick={() => {
                handleDeleteModal();
                setCurrRowId(original._id);
               
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

  const tableProps: CustomTableProps = {
    data,
    columns,
    isSuccess: true,
    isPagination: false,
    isLoading: !data?.length,
  };

  return {
    handleSearch,
    tableProps,
    handleDeleteModal,
    deleteModal,
    handleDeleteGroup,
    editGroupModal,
    handleEditGroupModal,
    currRowId,
  };
}
