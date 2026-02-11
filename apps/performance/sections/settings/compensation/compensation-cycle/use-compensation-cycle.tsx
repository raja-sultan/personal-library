import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { MenuItem } from "@mui/material";
import type { CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";
import { useDeleteSingleCycleMutation, useGetCompensationCycleQuery } from "@services/compensation/compensation-cycle/compensation-cycle-api";
import { CustomChip, TableIconActions } from "common";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

interface compensationCycleProps {
    tableData?: CustomTableProps;
    handleDeleteModal: () => void;
    deleteModal: boolean;
    handleDeleteCycle: () => void;
    handleSearch: (value: string) => void;
    handleStatusChange: (value: string) => void;
}
const renderChipVariant = {
    'draft': "primary",
    'ended': 'custom',
    'active': 'success'
};

interface Filter {
    limit?: number;
    offset?: number;
    search?: string;
    status?: string;
}
const { PERMISSION: COMPENSATION_PERMISSION } =
  PERMISSIONS.PERFORMANCE.SETTING.COMPENSATION.COMPENSATION_CYCLES;
export function useCompensationCycle(): compensationCycleProps {
    const router = useRouter();
    const filterValues = { limit: 10, offset: 0 };
    const [filter, setFilter] = useState<Filter>(filterValues)
    const { data: compensationTableData, isLoading, isError, isFetching, isSuccess } = useGetCompensationCycleQuery(filter);
    const [deleteCycleMutation] = useDeleteSingleCycleMutation();
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [tableRowId, setTableRowId] = useState<string>('');

    function handleDeleteModal(): void {
        setDeleteModal(!deleteModal);
    }
    function handleSearch(value: string): void {
        setFilter({ ...filter, search: value })
    }

    function handleStatusChange(value: string): void {
        if (value !== 'all')
            setFilter({ ...filterValues, status: value })
        else setFilter(filterValues)
    }

    async function handleDeleteCycle(): Promise<void> {
        try {
            await deleteCycleMutation({ id: tableRowId }).unwrap();
            toast.success('Cycle deleted successfully');
            handleDeleteModal();
        } catch (error) {
            toast.error(error?.data?.message || 'Error while deleting cycle')

        }
    }

    function handleTableAction(action: string, tableRow: { _id: string }): void {
        setTableRowId(tableRow?._id)
        switch (action) {
            case 'View Details':
                router.push(`/settings/compensation/compensation-cycle/view-details?id=${tableRow?._id}`)
                break;
            case 'Delete':
                handleDeleteModal();
                break;
            default:
                break;
        }
    }

    function onPageChange(value: number): void {
        setFilter({ ...filter, offset: (value - 1) * 10 })
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
            id: "tenureStartDate",
            cell: ({ getValue }) => dayjs(getValue()).format('DD/MM/YY') ?? '--',
            header: () => <span>Start date</span>,
            isSortable: false,
        },
        {
            accessorFn: ({ status }) => status,
            id: "status",
            cell: ({ getValue }) => (
                getValue() ? <CustomChip
                    variant={renderChipVariant[getValue()]}
                    ChipProps={{
                        label: getValue().charAt(0).toUpperCase() + getValue().slice(1),
                    }}
                /> : '--'
            ),
            header: () => <span>Status</span>,
            isSortable: false,
        },
        {
            accessorFn: ({ _id }) => _id,
            header: () => <span>Actions</span>,
            id: "actions",
            cell: ({ row }) => {
                return (
                    <TableIconActions icon={<TableActionsIcon />}>
                           <PermissionProtected permission={COMPENSATION_PERMISSION.VIEW}>
                        <MenuItem
                            onClick={() => { handleTableAction('View Details', row?.original) }}>
                            View Details
                        </MenuItem>
                        </PermissionProtected>
                        {row?.original?.status !== 'active' && 
                         <PermissionProtected permission={COMPENSATION_PERMISSION.DELETE}>
                        <MenuItem
                            onClick={() => { handleTableAction('Delete', row?.original) }}>
                                
                            Delete
                        </MenuItem>
                        </PermissionProtected>
                        }
                    </TableIconActions>
                );
            },
        },
    ];

    const tableData: CustomTableProps = {
        data: compensationTableData?.data?.compensation,
        columns, isLoading, isError, isFetching, isSuccess,
        onPageChange,
        totalPages: compensationTableData?.data?.meta?.pages,
        currentPage: compensationTableData?.data?.meta?.page,
    }

    return {
        tableData,
        deleteModal,
        handleDeleteModal,
        handleDeleteCycle,
        handleSearch,
        handleStatusChange
    }
}