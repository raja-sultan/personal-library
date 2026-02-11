import { useState, type Dispatch, type SetStateAction } from "react";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { MenuItem } from "@mui/material";
import { TableIconActions } from "common";
import {
  useDeleteCareerSkillMutation,
  useGetCareerSkillsQuery,
} from "@services/settings/career/skills/skills-api";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.CAREER.SKILLS;

interface UseFullReportTypes {
  columns: any;
  handleCreateSkillModal?: () => void;
  handleDeleteModal?: () => void;
  isEditSkill?: boolean;
  setCreateSkillModal?: any;
  createSkillModal?: boolean;
  deleteModal?: boolean;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  handleSearch?: (value: string) => void;
  tableData: CustomTableProps;
  handleCareerSkill?: (type: string | null, id: string | null) => void;
  getCareerSkillsId: string | null;
  isDeleteLoading?: boolean;
  viewPlansModal?: boolean;
  handleModal: () => void;
}
interface Filters {
  limit?: number;
  offset?: number;
  search?: string;
}

export function useSkillTable(): UseFullReportTypes {
  const [deleteModal, setDeleteModal] = useState(false);
  const [isEditSkill, setIsEditSkill] = useState<boolean>(false);
  const [getCareerSkillsId, setGetCareerSkillsId] = useState<string | null>(
    null
  );
  const [createSkillModal, setCreateSkillModal] = useState<boolean>(false);
  const [viewPlansModal, setViewPlansModal] = useState<boolean>(false);
  const filterValues = { limit: 10, offset: 0 };
  dayjs.extend(relativeTime);
  const [filter, setFilter] = useState<Filters>(filterValues);
  //API's
  const {
    data: getCareerSkillsData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetCareerSkillsQuery(filter);
  const [deleteSkills, { isLoading: isDeleteLoading }] =
    useDeleteCareerSkillMutation();

  const handleDeleteModal = async (): Promise<void> => {
    try {
      await deleteSkills({
        id: getCareerSkillsId,
      }).unwrap();
      toast.success("Skill deleted successful!");
      setDeleteModal(!deleteModal);
    } catch (error) {
      toast.error(error?.data?.message || "Error While Deleting Skills");
    }
  };

  function handleModal(): void {
    setViewPlansModal(!viewPlansModal);
  }

  function handleCareerSkill(type: string | null, id: string | null): void {
    setGetCareerSkillsId(id);
    if (type === "edit") {
      setIsEditSkill(true);
      setCreateSkillModal(!createSkillModal);
    }
    if (type === "delete") {
      setDeleteModal(true);
    }
    if (type === "viewPlans") {
      handleModal();
    }
  }

  function handleCreateSkillModal(): void {
    setCreateSkillModal(!createSkillModal);
    setIsEditSkill(false);
  }
  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }
  //handleSearch
  function handleSearch(value: string): void {
    setFilter({ ...filter, search: value });
  }
  const columns = [
    {
      accessorFn: (row) => row?.name ?? "N/A",
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <span>Skill Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.description ?? "N/A",
      id: "description",
      cell: (info) => info.getValue(),
      header: () => <span>Description</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.category ?? "N/A",
      id: "category",
      cell: (info) => info.getValue(),
      header: () => <span>Category</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.planUsage ?? "N/A",
      id: "planUsage",
      cell: (info) => info.getValue(),
      header: () => <span>Usage</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => dayjs(row?.updatedAt).fromNow() ?? "N/A",
      id: "updatedAt",
      cell: (info) => info.getValue(),
      header: () => <span>Last Updated</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ getValue }) => {
        return (
          <TableIconActions icon={<TableActionsIcon />}>
            <PermissionProtected permission={PERMISSION.EDIT}>
              <MenuItem
                onClick={() => {
                  handleCareerSkill("edit", getValue());
                }}
              >
                Edit
              </MenuItem>
            </PermissionProtected>
            <PermissionProtected permission={PERMISSION.DELETE}>
              <MenuItem
                onClick={() => {
                  handleCareerSkill("delete", getValue());
                }}
              >
                Delete
              </MenuItem>
            </PermissionProtected>
            <PermissionProtected permission={PERMISSION.VIEW}>
              <MenuItem
                onClick={() => {
                  handleCareerSkill("viewPlans", getValue());
                }}
              >
                View Plans
              </MenuItem>
            </PermissionProtected>
          </TableIconActions>
        );
      },
      header: () => <>Action</>,
      isSortable: false,
    },
  ];
  const tableData: CustomTableProps = {
    data: getCareerSkillsData?.data?.careerSkill,
    columns,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    isPagination: true,
    onPageChange,
    totalPages: getCareerSkillsData?.data?.meta?.pages,
    currentPage: getCareerSkillsData?.data?.meta?.page,
  };

  return {
    columns,
    handleCreateSkillModal,
    handleDeleteModal,
    isEditSkill,
    setCreateSkillModal,
    createSkillModal,
    deleteModal,
    tableData,
    handleSearch,
    setDeleteModal,
    getCareerSkillsId,
    isDeleteLoading,
    viewPlansModal,
    handleModal,
  };
}
