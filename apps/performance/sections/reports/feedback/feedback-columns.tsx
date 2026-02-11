import { GlobalAvatar } from "@components/global-avatar";
import { Box } from "@mui/material";
// import { awsBaseUrl } from "@root/config";

export const individualFeedbackColumns = [
    {
        accessorFn: ({ name }) => name,
        id: 'name',
        cell: ({ row: { original } }: any) => (
          <Box display="flex" alignItems="center" gap={2}>
            <GlobalAvatar
              imgUrl={original?.profileImage}
              firstName={original?.firstName}
              lastName={original?.lastName}
            />
            {original?.name}
          </Box>
        ),
        header: () => <span>Name</span>,
        isSortable: false,
      },
      {
        accessorFn: ({ department }) => department,
        id: 'department',
        cell: ({ getValue }) => getValue() ?? '--',
        header: () => <span>Department</span>,
        isSortable: false,
      },
      {
        accessorFn: ({ given }) => given,
        id: 'given',
        cell: ({ getValue }) => getValue(),
        header: () => <span>Given</span>,
        isSortable: false,
      },
  
      {
        accessorFn: ({ received }) => received,
        id: 'received',
        cell: ({ getValue }) => getValue(),
        header: () => <span>Received</span>,
        isSortable: false,
      },
      {
        accessorFn: ({ requested }) => requested,
        id: 'requested',
        cell: ({ getValue }) => getValue(),
        header: () => <span>Requested</span>,
        isSortable: false,
      },
]

export const departmentFeedbackColumns = [
    {
        accessorFn: ({ name }) => name??'--',
        id: 'departmentName',
       cell: (info) => info.getValue(),
        header: () => <span>Department</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ employeesCount }) => employeesCount??'--',
        id: 'totalEmployees',
       cell: (info) => info.getValue(),
        header: () => <span>Employees</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ given }) => given??'--',
        id: 'employeesWithCareerPlan',
       cell: (info) => info.getValue(),
        header: () => <span>Given</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ received }) => received??'--',
        id: 'growthAreas',
       cell: (info) => info.getValue(),
        header: () => <span>Received</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ requested }) => requested??'--',
        id: 'growthAreasCompleted',
       cell: (info) => info.getValue(),
        header: () => <span>Requested</span>,
        isSortable: false,
    },
]
export const managerFeedbacksColumns = [
    {
        accessorFn: ({ name }) => name??'--',
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ department }) => department??'--',
        id: 'department',
        cell: (info) => info.getValue(),
        header: () => <span>Department</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ given }) => given??'--',
        id: 'employeesWithCareerPlan',
       cell: (info) => info.getValue(),
        header: () => <span>Given</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ received }) => received??'--',
        id: 'growthAreas',
       cell: (info) => info.getValue(),
        header: () => <span>Received</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ requested }) => requested??'--',
        id: 'growthAreasCompleted',
       cell: (info) => info.getValue(),
        header: () => <span>Requested</span>,
        isSortable: false,
    },
]
export const roleFeedbacksColumns = [
    {
        accessorFn: ({ name }) => name??'--',
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Role</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ employeesCount }) => employeesCount??'--',
        id: 'department',
        cell: (info) => info.getValue(),
        header: () => <span>Employees</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ given }) => given??'--',
        id: 'employeesWithCareerPlan',
       cell: (info) => info.getValue(),
        header: () => <span>Given</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ received }) => received??'--',
        id: 'growthAreas',
       cell: (info) => info.getValue(),
        header: () => <span>Received</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ requested }) => requested??'--',
        id: 'growthAreasCompleted',
       cell: (info) => info.getValue(),
        header: () => <span>Requested</span>,
        isSortable: false,
    },
]