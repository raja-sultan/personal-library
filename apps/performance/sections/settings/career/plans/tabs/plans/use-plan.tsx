import { useState } from "react";
import { useRouter } from "next/navigation";
// import { MyProfileIcon } from "@assets/icons";
import { CustomChip, TableIconActions } from "@root/../../packages/common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { Box, MenuItem, Tooltip, Typography } from "@mui/material";
import type { CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";
import {
  useDeletePlanMutation,
  useDuplicatePlanMutation,
  useGetCareerPlansQuery,
  usePublishUnPublishPlanMutation,
} from "@services/settings/career/plans/plans-api";
import { renderUserImage } from "@root/utils/render-user-image";
import dayjs, { extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.CAREER.CAREER_PLANS;

extend(relativeTime);

interface ReturnType {
  deleteModal: boolean;
  handleDeletePlan: () => void;
  handleDeleteModal: () => void;
  tableProps: CustomTableProps;
  handleSearch: (value: string) => void;
  handleStatusChange: (status: string) => void;
  handleGroupsChange: (ids: string[]) => void;
  isDeleteLoading: boolean;
  isDuplicateLoading: boolean;
  groupsFilter: { text: string; value: string }[];
}
interface Filter {
  search?: string;
  limit: number;
  offset: number;
  listingType: string;
  status?: string;
  groups?: string[];
}

const renderStatusChip = {
  draft: "primary",
  published: "success",
  unpublished: "custom",
};

export function usePlan(): ReturnType {
  const filterValues = { limit: 10, offset: 0, listingType: "plans" };
  const [filter, setFilter] = useState<Filter>(filterValues);
  const router = useRouter();
  const [currRowId, setCurrRowId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const {
    data: PlansData,
    isSuccess,
    isLoading,
    isFetching,
    isError,
  } = useGetCareerPlansQuery(filter);
  const [deleteSinglePlan, { isLoading: isDeleteLoading }] =
    useDeletePlanMutation();
  const [duplicatePlanMutation, { isLoading: isDuplicateLoading }] =
    useDuplicatePlanMutation();
  const [publishUnPublishPlanMutation] = usePublishUnPublishPlanMutation();
  const { data: careerGroupData } = useGetReferenceDataLookupQuery({
    type: "career_groups",
  });

  console.log("PlansData", PlansData);

  function handleDeleteModal(): void {
    setDeleteModal(!deleteModal);
  }

  async function handleDeletePlan(): Promise<void> {
    try {
      await deleteSinglePlan({ id: currRowId })
        .unwrap()
        .then((res) => {
          if (res) {
            toast.success("Plan deleted successfully");
            handleDeleteModal();
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Error while deleting plan");
    }
  }

  const handleDuplicatePlan = async (id): Promise<void> => {
    try {
      const res = await duplicatePlanMutation({ id }).unwrap();
      if (res) {
        toast.success("Plan duplicated successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error while duplicating plan");
    }
  };

  async function handlePublishPlan(status: string, id: string): Promise<void> {
    try {
      await publishUnPublishPlanMutation({
        id,
        status: status === "Published" ? "Draft" : "Published",
      })
        .unwrap()
        .then((res) => {
          if (res) {
            toast.success(`Plan ${status} successfully`);
          }
        });
    } catch (error) {
      toast.success(error?.data?.message || "Error while updating plan status");
    }
  }

  function handleSearch(search: string): void {
    setFilter({ ...filter, search });
  }

  const onPageChange = (value: number): void => {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  };

  function handleStatusChange(status: string): void {
    if (status === "All") {
      setFilter(filterValues);
    } else setFilter({ ...filter, status });
  }

  function handleGroupsChange(groups: string[]): void {
    setFilter({ ...filter, groups });
  }

  const columns = [
    {
      accessorFn: ({ title }) => title,
      id: "title",
      cell: ({ getValue }) => getValue() ?? "--",
      header: () => <>Plan Name</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "planAdmin",
      cell: ({ row: { original } }) =>
        renderUserImage({
          profileImage: original?.planAdmin?.profileImage,
          firstName: original?.planAdmin?.firstName ?? "--",
          lastName: original?.planAdmin?.lastName ?? "--",
        }),
      header: () => <>Plan Admin</>,
      isSortable: false,
    },
    {
      accessorFn: ({ employees }) => employees,
      id: "employees",
      cell: ({ getValue }) => getValue() ?? "--",
      header: () => <>employees</>,
      isSortable: false,
    },
    {
      accessorFn: ({ group }) => group,
      id: "group",
      cell: ({ getValue }) => getValue() ?? "--",
      header: () => <>group</>,
      isSortable: false,
    },
    {
      accessorFn: ({ daysAgo }) => daysAgo,
      id: "daysAgo",
      cell: ({ getValue }) => {
        const dateNumber = dayjs().date(Math.abs(getValue()));
        return dayjs(dateNumber).fromNow();
      },
      header: () => <>last updated</>,
      isSortable: false,
    },
    {
      accessorFn: ({ status }) => status,
      id: "status",
      cell: ({ getValue }) =>
        getValue()?.toLowerCase() ? (
          <CustomChip
            variant={renderStatusChip[getValue()?.toLowerCase()]}
            ChipProps={{
              label: (
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  textTransform="capitalize"
                >
                  {getValue()}
                </Typography>
              ),
            }}
          />
        ) : (
          "--"
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
                  `/settings/career/plans/view?id=${original._id}&actionType=view`
                );
              }}
            >
              View
            </MenuItem>
          </PermissionProtected>
          {original?.status === "Draft" && <PermissionProtected permission={PERMISSION.EDIT}>
            <MenuItem
              onClick={() => {
                router.push(
                  `/settings/career/plans/edit?id=${original._id}&tab=0&actionType=edit`
                );
              }}
            >
              {original?.status === "Draft" ? "Edit" : null}
            </MenuItem>
          </PermissionProtected>}
          <PermissionProtected permission={PERMISSION.DUPLICATE}>
            <MenuItem onClick={() => handleDuplicatePlan(original._id)}>
              Duplicate
            </MenuItem>
          </PermissionProtected>
          <PermissionProtected permission={PERMISSION.PUBLISH_OR_UNPUBLISH}>
            <MenuItem
              onClick={() => handlePublishPlan(original.status, original._id)}
            >
              {original?.status === "Draft" ? (
                <Tooltip
                  arrow
                  title={
                    <Box textAlign="center">
                      <Typography variant="subtitle2">
                        To publish a Career Plan,
                      </Typography>
                      <Typography variant="subtitle2">
                        ensure plan details, a comprehensive competency matrix,
                      </Typography>
                      <Typography variant="subtitle2">
                        and associated employees are added
                      </Typography>
                    </Box>
                  }
                >
                  <Typography variant="subtitle2">Publish</Typography>
                </Tooltip>
              ) : (
                <Typography variant="subtitle2">UnPublish</Typography>
              )}
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
    data: PlansData?.data?.careerPlan,
    columns,
    isSuccess,
    isLoading,
    isFetching,
    isError,
    onPageChange,
    currentPage: PlansData?.data?.meta?.page,
    totalPages: PlansData?.data?.meta?.pages,
  };

  return {
    tableProps,
    deleteModal,
    handleDeleteModal,
    handleDeletePlan,
    handleSearch,
    handleStatusChange,
    handleGroupsChange,
    isDeleteLoading,
    isDuplicateLoading,
    groupsFilter: careerGroupData?.data,
  };
}
