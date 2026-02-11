import { useEffect, useState } from "react";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { MenuItem, Typography } from "@mui/material";
import { TableIconActions } from "@root/../../packages/common";
import { useRouter } from "next/navigation";
import {
  useTemplateDuplicateMutation,
  useTemplateListQuery,
} from "@services/settings/review/templates-api";
import type { ReturnType, columns } from "./templates-types";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.REVIEWS.TEMPLATES;

export function useTemplates(): ReturnType {
  const router = useRouter();
  const [duplicateModal, setDuplicateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [offset, setOffset] = useState<number | undefined>(0);
  const [question, setQuestion] = useState<string>("");
  const [tableId, setTableId] = useState("");
  const [templateData, setTemplateData] = useState("");
  const limit = 10;

  const [duplicateTemplate, { isError }] = useTemplateDuplicateMutation({});

  function handleDuplicateModal(): void {
    setDuplicateModal(!duplicateModal);
  }
  function handleViewModal(): void {
    setViewModal(!viewModal);
  }

  const { data, isLoading, isFetching, isSuccess } = useTemplateListQuery({
    limit,
    offset,
    searchValue,
  });

  function handleOffset(value: number): void {
    setOffset((value - 1) * limit);
  }

  useEffect(() => {
    setTemplateData(data);
  }, [data]);

  const handleDuplicateTemplate = async (): Promise<void> => {
    await duplicateTemplate({ id: tableId });
    if (!isError) {
      handleDuplicateModal();
      toast.success("Template is duplicated successfully");
    }
  };

  const columns: columns[] = [
    {
      accessorFn: ({ templateName }) => templateName,
      id: "templateName",
      cell: ({ getValue, row: { original } }) => (
        <>
          <Typography variant="body2">{getValue()}</Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight="400"
          >
            {original.questionsCount} questions
          </Typography>
        </>
      ),
      header: () => <>name</>,
      isSortable: false,
    },
    {
      accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD MMM YYYY"),
      id: "createdAt",
      cell: ({ getValue }) => getValue(),
      header: () => <>Created Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ updatedAt }) => dayjs(updatedAt).format("DD MMM YYYY"),
      id: "updatedAt",
      cell: ({ getValue }) => getValue(),
      header: () => <>last updated</>,
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
                handleViewModal();
                setTableId(original?._id);
                setQuestion(original?.templateName);
              }}
            >
              View
            </MenuItem>
          </PermissionProtected>
          <PermissionProtected permission={PERMISSION.EDIT}>
            <MenuItem
              onClick={() => {
                router.push(
                  `/settings/reviews/templates/edit/?id=${original?._id}`
                );
                setQuestion(original?.templateName);
              }}
            >
              Edit
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

  return {
    columns,
    duplicateModal,
    handleDuplicateModal,
    handleDuplicateTemplate,
    viewModal,
    tableId,
    handleViewModal,
    setSearchValue,
    templateData,
    isLoading,
    isFetching,
    isSuccess,
    question,
    handleOffset,
    setOffset,
  };
}
