import { useState } from "react";
import { TableIconActions } from "common";
import { useRouter, useSearchParams } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { renderUserImage } from "@root/utils/render-user-image";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useGetCareerPlanByIdEmployeeQuery, useUpdateCareerPlanMutation } from "@services/career/plans/plans-api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setPlanLevel } from "@root/slices";

interface useEmployeesTypes {
  removePlan: boolean;
  router: AppRouterInstance;
  tableData: CustomTableProps;
  handleRemovePlan: () => void;
  addEmployeeModalOpen: boolean;
  setAddEmployeeModalOpen: Dispatch<SetStateAction<boolean>>;
  handleAssignEmployees: (employees: string[]) => Promise<void>;
}

export function useEmployees({ id, disabled, plan }): useEmployeesTypes {
  const planId = useSearchParams().get("id");
  const tab = useSearchParams().get("tab");
  const dispatch = useDispatch();
  const [updateEmplyees] = useUpdateCareerPlanMutation();
  const [removePlan, setRemovePlan] = useState(false);
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState<boolean>(false);
  const planLevelId = useSelector((state: any) => state.matrixLevel.userPlanLevel);
  const { data } = useGetCareerPlanByIdEmployeeQuery({ id: planId });

  const handlePlanLevelId = async ({ userId, levelId }: any): Promise<void> => {
    await dispatch(setPlanLevel({ userId, levelId }));
  };

  id; //for further use
  const router = useRouter();

  function handleTableAction(original: any): void {
    console.log(original);
  }

  function handleRemovePlan(): void {
    setRemovePlan(!removePlan);
  }

  async function handleAssignEmployees(ids: string[]): Promise<void> {
    try {
      await updateEmplyees({
        id: planId,
        users: ids,
      }).unwrap();
      router.push(`?tab=${tab}&id=${planId}&status=publish`);
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred while adding category. Please try again later.");
    }
  }

  // table columns
  const employeeTabColumns = [
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ row: { original } }) => (
        <Box display="flex" gap="10px" alignItems="center">
          {renderUserImage({
            profileImage: original?.profileImage,
            firstName: original?.firstName,
            lastName: original?.lastName
          })}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {`${original?.firstName} ${original?.lastName}`}
            <Typography variant="caption" color="neutral.500">
              {original?.employeeTitle}
            </Typography>
          </Box>
        </Box>
      ),
      header: () => <>Employee</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ row: { original } }) => (
        <Box display="flex" gap="10px" alignItems="center">
          {original?.manager && (renderUserImage({
            profileImage: original?.manager?.profileImage,
            firstName: original?.manager?.firstName,
            lastName: original?.manager?.lastName
          }))}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {original?.manager ? `${original?.manager?.firstName} ${original?.manager?.lastName}` : '--'}
            <Typography variant="caption" color="neutral.500">
              {original?.manager?.employeeTitle}
            </Typography>
          </Box>
        </Box>
      ),
      header: () => <>Manager</>,
      isSortable: false,
    },
    // {
    //   accessorFn: ({ _id }) => _id,
    //   id: "_id",
    //   cell: ({ row: { original } }) => {
    //     const value = original?.department?.[0] || '';
    //     return value;
    //   },
    //   header: () => <>Department</>,
    //   isSortable: false,
    // },
    {
      accessorFn: (row) => row,
      id: "row",
      cell: ({ row: { original } }) => (
        <Select
          size="small"
          name="status"
          value={planLevelId.find((item) => item.userId === original._id)?.levelId || ''}
          sx={{ minWidth: "320px" }}
          onChange={(e: any) => {
            const selectedLevelId = e.target.value;
            handlePlanLevelId({ userId: original._id, levelId: selectedLevelId })
          }}
        >
          {plan?.data?.levels?.map((item: any) => (
            <MenuItem key={item._id} value={item?._id}>
              {item.levelName}
            </MenuItem>
          ))}
        </Select>
      ),
      header: () => <>Plan level</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row: { original } }) => (
        <TableIconActions icon={<TableActionsIcon />} selectButtonProps={{ disabled }}>
          <MenuItem onClick={handleRemovePlan}>Remove from plan</MenuItem>
          <MenuItem
            onClick={() => {
              handleTableAction(original);
            }}
          >
            View Profile
          </MenuItem>
        </TableIconActions>
      ),
      header: () => <>Action</>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: data?.data?.employees,
    columns: employeeTabColumns,
    isSuccess: true,
  };

  return {
    router,
    tableData,
    removePlan,
    handleRemovePlan,
    addEmployeeModalOpen,
    handleAssignEmployees,
    setAddEmployeeModalOpen,
  };
}
