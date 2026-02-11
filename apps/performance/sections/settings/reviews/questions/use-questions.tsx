"use client";
import { useState } from "react";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { MenuItem, Typography } from "@mui/material";
import { TableIconActions } from "@root/../../packages/common";
import {
  useQuestionnairesListQuery,
  useDuplicatQuestionMutation,
  useDeleteQuestionnairesMutation,
} from "@services/settings/review/questions-api";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.REVIEWS.QUESTIONS;

interface useQuestionnairesReturnType {
  questionnairesData?: any;
  columns?: any;
  deleteModal?: boolean;
  duplicateModal?: boolean;
  createQuestionModal?: boolean;
  setCreateQuestionModal: any;
  handleDeleteModal?: () => void;
  handleDuplicateModal?: () => void;
  handleDuplicateQuestion?: () => void;
  handleDeleteQuestion?: () => void;
  handleCreateQuestionModal?: () => void;
  handleOffset: (value: number) => void;
  setSearchValue?: any;
  tableData: any;
  isEditQuestion?: boolean;
  tableId?: string;
  singleData: [];
}

export function useQuestion(): useQuestionnairesReturnType {
  const [duplicatQuestion] = useDuplicatQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionnairesMutation();

  const [isEditQuestion, setIsEditQuestion] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [duplicateModal, setDuplicateModal] = useState(false);
  const [offset, setOffset] = useState<number | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>("");
  const [createQuestionModal, setCreateQuestionModal] = useState(false);
  const [tableId, setTableId] = useState("");

  const filterValues = { limit: 10, offset: 0 };
  const [filter, setFilter] = useState<any>(filterValues);
  function handleDeleteModal(): void {
    setDeleteModal(!deleteModal);
  }

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  function handleDuplicateModal(): void {
    setDuplicateModal(!duplicateModal);
  }

  function handleCreateQuestionModal(): void {
    setCreateQuestionModal(!createQuestionModal);
    setIsEditQuestion(false);
  }

  const handleDeleteQuestion = async (): Promise<void> => {
    await deleteQuestion({ id: tableId });
    if (!isError) {
      setDeleteModal(!deleteModal);
      toast.success("Question deleted successfully.");
    } else {
      setDeleteModal(!deleteModal);
      toast.error("Something went wrong!");
    }
  };

  async function handleDuplicateQuestion(): Promise<void> {
    await duplicatQuestion({ id: tableId })
      .unwrap()
      .then(() => {
        toast.success("Question Duplicated.");
        setDuplicateModal(!duplicateModal);
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setDuplicateModal(!duplicateModal);
      });
  }

  const queryParams: any = {};

  const limit = 10;
  const {
    data: questionnairesData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useQuestionnairesListQuery({
    limit,
    offset,
    search: searchValue,
    ...queryParams,
  });

  function handleOffset(value: number): void {
    setOffset((value - 1) * 5);
  }

  const columns = [
    {
      accessorFn: ({ description }) => description,
      id: "description",
      cell: ({ getValue, row: { original } }) => (
        <>
          <Typography variant="body2">{getValue()}</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
            {original.type}
          </Typography>
        </>
      ),
      header: () => <>question</>,
      isSortable: false,
    },
    {
      accessorFn: ({ createdAt }) => createdAt,
      id: "createdAt",
      cell: ({ getValue }) => dayjs(getValue()).format("DD MMM YYYY"),
      header: () => <>Created Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ updatedAt }) => updatedAt,
      id: "updatedAt",
      cell: ({ getValue }) => dayjs(getValue()).format("DD MMM YYYY"),
      header: () => <>last updated</>,
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
                handleCreateQuestionModal();
                setIsEditQuestion(true);
                setTableId(original?._id);
              }}
            >
              Edit
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

          <PermissionProtected permission={PERMISSION.DUPLICATE}>
            <MenuItem
              onClick={() => {
                handleDuplicateModal();
                setTableId(original?._id);
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

  const arrayOfObjects = questionnairesData?.data?.Questionnaires;

  const data = arrayOfObjects?.map((obj) => {
    if (obj.type && typeof obj.type === "string") {
      obj = {
        ...obj,
        type: obj.type
          .replace("_", " ")
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase()),
      };
    }
    return obj;
  });

  const singleData = arrayOfObjects?.filter((item) => item._id === tableId);

  const tableData: any = {
    data,
    columns,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    onPageChange,
    totalPages: questionnairesData?.data?.meta?.pages,
    currentPage: questionnairesData?.data?.meta?.page,
  };

  return {
    questionnairesData,
    columns,
    deleteModal,
    duplicateModal,
    createQuestionModal,
    setCreateQuestionModal,
    handleDeleteModal,
    handleDuplicateModal,
    handleDeleteQuestion,
    handleDuplicateQuestion,
    handleCreateQuestionModal,
    handleOffset,
    tableData,
    setSearchValue,
    isEditQuestion,
    tableId,
    singleData,
  };
}
