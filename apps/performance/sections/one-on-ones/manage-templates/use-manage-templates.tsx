"use client";
import { useEffect, useState } from "react";
import { Box, MenuItem } from "@mui/material";
import { TableIconActions } from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { type FormValues, type UseManageTemplateReturnType } from "./manage-templates-type";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useGetManageTemplateListQuery, useLazyGetAppliedTemplatesQuery } from "@services/settings/one-on-ones/templetes-api";
import { useApplyTemplatesMutation, useDeleteTemplatesMutation } from "@services/settings/one-on-ones/templetes-api";
import { useGetOneOnOneApplyUserQuery } from "@services/one-on-ones/one-on-ones-api";
import { type CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";
import { CustomUserAvatar } from "@components/custom-users-multiple-avatar";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE._1_ON_1S.TEMPLATES;

let timer: ReturnType<typeof setTimeout>;

export function useManageTemplate(): UseManageTemplateReturnType {

  const router = useRouter();

  const [deleteUser, setDeleteUser] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>();
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [isApply, setIsApply] = useState<boolean>(false);
  const [isAppliedHistoryOpen, setAppliedHistoryOpen] = useState<boolean>(false);
  const [search, setSearch] = useState('');

  const filterValues = { limit: 10, offset: 0 };
  const [filter, setFilter] = useState<any>(filterValues);

  const { data: templates, isError, isFetching, isLoading, isSuccess } = useGetManageTemplateListQuery(filter);
  const { data: oneOnOneWith } = useGetOneOnOneApplyUserQuery({});
  const [deleteTemplates, { isLoading: isDeleteLoading }] = useDeleteTemplatesMutation();
  const [applyTemplates, { isLoading: isApplyTemplateLoading }] = useApplyTemplatesMutation({});
  const [lazyGetAppliedTemplatesQuery, { data: appliedTemplateData, isLoading: isAppliedHistoryLoading }] = useLazyGetAppliedTemplatesQuery();



  function handleDeleteModal(): void {
    setDeleteUser(!deleteUser);
  };

  function handleAppliedHistoryModal(): void {
    setAppliedHistoryOpen(!isAppliedHistoryOpen);
  };

  function handleApplyModal(): void {
    setIsApply(!isApply);
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(Yup.object().shape({
      applyTo: Yup.string().required('Field is required'),
      userId: Yup.string().required('Field is required')
    })),
    defaultValues: {
      applyTo: "",
      userId: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: FormValues): Promise<void> => {
    try {
      await applyTemplates({
        applyTo: formData.applyTo,
        templateId,
        userId: formData.userId,
      }).unwrap().then((res) => {
        if (res) {
          handleApplyModal();
          reset();
          toast.success("Default Template is created successfully!");
        }
      });
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleDeleteUser = async (): Promise<void> => {
    try {
      await deleteTemplates({ templateId: userId }).unwrap().then((res) => {
        if (res) {
          handleDeleteModal();
          toast.success("Template deleted successfully!");
        }
      });
    } catch (error) {
      toast.success(error?.data?.message || "somethings went wrong !");
    }
  };

  const templateApplyHandler = (id: string | null): void => {
    setTemplateId(id);
    handleApplyModal();
  };

  const handleSearch = (val: string): void => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearch(val);
    }, 1000);
  };

  useEffect(() => {
    async function getTemplateHistoryData() {
      try {
        await lazyGetAppliedTemplatesQuery({ id: templateId, search }).unwrap();
      } catch (error) {
        error?.data?.message
      }
    }
    getTemplateHistoryData();
  }, [templateId, search])

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  const columns = [
    {
      accessorFn: ({ title }) => title,
      id: "title",
      cell: ({ getValue }) => getValue(),
      header: () => <span>Name </span>,
      isSortable: false,
    },
    {
      accessorFn: ({ createdBy }) => createdBy,
      id: "createdBy",
      cell: ({ getValue }) => getValue(),
      header: () => <Box textTransform='capitalize'>Created By</Box>,
      isSortable: false,
    },
    {
      accessorFn: ({ defaultApplied }) => defaultApplied,
      id: "defaultApplied",
      cell: ({ getValue }) => <CustomUserAvatar data={getValue()} />,
      header: () => <span>Default Template Applied To</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      header: () => <span>Actions</span>,
      id: "actions",
      cell: ({ row: { original } }) => {
        return (
          <Box display="inline-flex" justifyContent="center">
            <TableIconActions icon={<TableActionsIcon />}>
              <PermissionProtected permission={PERMISSION.VIEW}>
                <MenuItem
                  onClick={() => {
                    router.push(
                      `/one-on-ones/manage-templates/view?id=${original?._id}`
                    );
                  }}
                >
                  Preview
                </MenuItem>
              </PermissionProtected>
              <MenuItem
                onClick={() => {
                  templateApplyHandler(original?._id);
                }}
              >
                Apply
              </MenuItem>
              <PermissionProtected permission={PERMISSION.UPDATE}>
                {(original?.createdBy !== "default" && original?.createdBy !== "Admin") && (
                  <MenuItem
                    onClick={() => {
                      router.push(
                        `/one-on-ones/manage-templates/edit?id=${original?._id}`
                      );
                    }}
                  >
                    Edit
                  </MenuItem>
                )}
              </PermissionProtected>
              <PermissionProtected permission={PERMISSION.DELETE}>
                {(original?.createdBy !== "default" && original?.createdBy !== "Admin") && (
                  <MenuItem
                    onClick={() => {
                      handleDeleteModal();
                      setUserId(original?._id);
                    }}
                  >
                    Delete
                  </MenuItem>
                )}
              </PermissionProtected>
              <MenuItem onClick={() => { setTemplateId(original?._id); handleAppliedHistoryModal(); }}>
                Applied History
              </MenuItem>
            </TableIconActions>
          </Box>
        );
      },
    },
  ];

  const tableData: CustomTableProps = {
    columns,
    data: templates?.data?.oneOnOneTemplate,
    isError, isFetching, isLoading, isSuccess,
    onPageChange,
    totalPages: templates?.data?.meta?.pages,
    currentPage: templates?.data?.meta?.page,
  };

  return {
    tableData,
    deleteUser,
    isAppliedHistoryOpen,
    handleAppliedHistoryModal,
    handleDeleteUser,
    isApply,
    handleApplyModal,
    templateApplyHandler,
    onSubmit,
    handleSubmit,
    methods,
    oneOnOneWith,
    handleDeleteModal,
    isApplyTemplateLoading,
    isDeleteLoading,
    isAppliedHistoryLoading,
    handleSearch,
    appliedTemplateData
  };
}
