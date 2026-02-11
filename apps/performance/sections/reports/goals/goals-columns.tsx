import dayjs from "dayjs";
import { CustomChip } from "common";
import { CustomUserAvatar } from "@components/custom-users-multiple-avatar";

const renderChipStatus = {
    'New': 'primary',
    'In Progress': 'warning',
    'Completed': 'success'
}

export const allColumns = [
    {
        accessorFn: ({ goalName }) => goalName,
        id: 'goalName',
        cell: ({ getValue }) => getValue(),
        header: () => <span>Goal Name</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ ownersData }) => ownersData,
        id: 'ownersData',
        cell: ({ getValue }) => <CustomUserAvatar data={getValue()} />,
        header: () => <span>Owners</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ startDate }) => startDate,
        id: 'startDate',
        cell: ({ getValue }) => getValue() ? dayjs(getValue()).format('D MMM YYYY') : '--',
        header: () => <span>start Date</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ endDate }) => endDate,
        id: 'endDate',
        cell: ({ getValue }) => getValue() ? dayjs(getValue()).format('D MMM YYYY') : '--',
        header: () => <span>Due Date</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ status }) => status,
        id: 'status',
        cell: ({ getValue }) => <CustomChip variant={renderChipStatus[getValue()]} ChipProps={{ label: getValue() }} />,
        header: () => <span>status</span>,
        isSortable: false,
    },
]

export const departmentGoals = [
    {
        accessorFn: ({ department }) => department?.departmentName,
        id: 'departmentName',
        cell: ({ getValue }) => getValue() ?? '--',
        header: () => <span>Department Name</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ totalGoals }) => totalGoals,
        id: 'totalGoals',
        cell: ({ getValue }) => getValue() ?? '--',
        header: () => <span>Total Goals</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ inProgressGoals }) => inProgressGoals,
        id: 'inProgressGoals',
        cell: ({ getValue }) => getValue() ?? '--',
        header: () => <span>Inprogress Goals</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ completedGoals }) => completedGoals,
        id: 'completedGoals',
        cell: ({ getValue }) => getValue() ?? '--',
        header: () => <span>Achieved Goals</span>,
        isSortable: false,
    },
]

export const directReports = [
    {
        accessorFn: ({ _id }) => _id,
        id: '_id',
        cell: ({ row: { original } }) => `${original?.user?.firstName} ${original?.user?.lastName}`,
        header: () => <span>Individual</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ totalGoals }) => totalGoals,
        id: 'totalGoals',
        cell: ({ getValue }) => getValue() ?? '--',
        header: () => <span>Total goals</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ inProgressGoals }) => inProgressGoals,
        id: 'inprogressGoal',
        cell: ({ getValue }) => getValue() ?? '--',
        header: () => <span>inprogress Goal</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ completedGoals }) => completedGoals,
        id: 'completedGoals',
        cell: ({ getValue }) => getValue() ?? '--',
        header: () => <span>achieved goals</span>,
        isSortable: false,
    },
]