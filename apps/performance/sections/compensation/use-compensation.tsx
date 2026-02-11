import { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { CustomChip } from "common";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { Button } from "@mui/material";
import type { Theme } from "@mui/material";
import { ThemeModeColor } from "@root/utils";
import { useGetCompensationCycleQuery } from "@services/compensation/compensation-cycle/compensation-cycle-api";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

const { PERMISSION: COMPENSATION } =
  PERMISSIONS.PERFORMANCE.MODULE.COMPENSATION.COMPENSATION;

interface CompensationProps {
  tableData?: CustomTableProps;
  handleSearch: (value: string) => void;
}

const renderChipVariant = {
  ended: "danger",
  active: "success",
};

export function useCompensation(): CompensationProps {
  const router = useRouter();
  const filterValues = { limit: 10, offset: 0, draftedCycle: false };
  const [filter, setFilter] = useState<any>(filterValues);

  const {
    data: compensationCycleList,
    isError,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetCompensationCycleQuery(filter);

  const compensationTableData = compensationCycleList?.data?.compensation;

  function handleSearch(value: string): void {
    value
      ? setFilter({ ...filter, search: value })
      : setFilter({ ...filterValues });
  }

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 5 });
  }

  const columns = [
    {
      accessorFn: ({ name }) => name,
      id: "name",
      cell: ({ getValue }) => getValue(),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ tenureStartDate }) => tenureStartDate,
      id: "effectiveDate",
      cell: ({ getValue }) => dayjs(getValue()).format("DD MMM YYYY") ?? "--",
      header: () => <span>Effective date</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ status }) => status,
      id: "status",
      cell: ({ getValue }) =>
        getValue() ? (
          <CustomChip
            variant={renderChipVariant[getValue()]}
            ChipProps={{
              label: getValue().charAt(0).toUpperCase() + getValue().slice(1),
            }}
          />
        ) : (
          "--"
        ),
      header: () => <span>Status</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ status }) => status,
      id: "view",
      cell: ({ getValue, row: { original } }) => {
        const handleClick = (): void => {
          router.push(`/compensation/${getValue() === 'active' ? 'view-progress' : 'view-details'}?id=${original?._id}&title=${original?.name}`);
        };

        return (
          <div>
            <Button
              sx={({ palette: { neutral } }: Theme) => ({
                color: ThemeModeColor(neutral[600], neutral[400]),
                borderColor: ThemeModeColor(neutral[300], neutral[400]),
                "&:hover": {
                  borderColor: ThemeModeColor(neutral[300], neutral[400]),
                },
              })}
              variant="outlined"
              type="button"
              onClick={handleClick}
            >
              {getValue() === "active" ? <PermissionProtected permission={COMPENSATION.VIEW_ACTIVE_CYCLES}>View Progress </PermissionProtected> :
                <PermissionProtected permission={COMPENSATION.VIEW_COMPLETED_CYCLES}>
                  View Details </PermissionProtected>}
            </Button>

          </div>
        );
      },
      header: () => "",
      isSortable: false,
    },
  ];
  const tableData: CustomTableProps = {
    data: compensationTableData,
    columns,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    onPageChange,
    totalPages: compensationTableData?.data?.meta?.pages,
    currentPage: compensationTableData?.data?.meta?.page,
  };

  return {
    tableData,
    handleSearch,
  };
}
