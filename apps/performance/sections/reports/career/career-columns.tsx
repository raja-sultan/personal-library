import { GlobalAvatar } from "@components/global-avatar";
import { Box } from "@mui/material";
import { awsBaseUrl } from "@root/config";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
export const individualColumns = [
    {
        accessorFn: (row) => `${row?.firstName? row?.firstName :'--'} ${row?.lastName?row?.lastName: '--'}`,
        id: 'firstNameLastName',
        cell:({ row: { original } }: any) => (
          <Box display="flex" justifyContent="start" alignItems="start" gap={2}>
            <Box display="flex" gap="10px" alignItems="center"> 
                <GlobalAvatar
                  imgUrl={awsBaseUrl + original?.profileImage}
                  firstName={original?.firstName}
                  lastName={original?.lastName}
                />
                {`${original?.firstName} ${original?.lastName}`}
              </Box>
          </Box>
        ),
        header: () => <span>Name</span>,
        isSortable: false,
      },
    {
        accessorFn: (row) => row?.manager?.firstName && row?.manager?.lastName ? `${row.manager.firstName} ${row.manager.lastName}` :'--',
        id: 'manager',
        cell: (info) => info.getValue(),
        header: () => <span>Manager</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ department }) => department?.departmentName??'--',
        id: 'department',
        cell: (info) => info.getValue(),
        header: () => <span>Department</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ careerPlans }) => careerPlans?.title??'--',
        id: 'plan',
        cell: (info) => info.getValue(),
        header: () => <span>Plan</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ levelInfo }) => levelInfo?.levelName??'--',
        id: 'planLevel',
        cell: (info) => info.getValue(),
        header: () => <span>Plan Level</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ totalCareerGrowth }) => totalCareerGrowth??'--',
        id: 'growthAreas',
        cell: (info) => info.getValue(),
        header: () => <span>Growth Areas</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ completedCareerGrowth }) => completedCareerGrowth??'--',
        id: 'growthAreasCompleted',
        cell: (info) => info.getValue(),
        header: () => <span>Growth Areas Completed</span>,
        isSortable: false,
    },
    {  
        accessorFn: ({ lastUpdated }) => lastUpdated ? dayjs(lastUpdated).fromNow():'Never',
        id: 'lastUpdate',
        cell: (info) => info.getValue(),
        header: () => <span>Last Update</span>,
        isSortable: false,
    },
]

export const departmentColumns = [
    {
        accessorFn: ({ departmentName }) => departmentName??'--',
        id: 'departmentName',
       cell: (info) => info.getValue(),
        header: () => <span>Department</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ totalEmployees }) => totalEmployees??'--',
        id: 'totalEmployees',
       cell: (info) => info.getValue(),
        header: () => <span>Total Employees</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ numberOfUsersWithCareerPlan }) => numberOfUsersWithCareerPlan??'--',
        id: 'employeesWithCareerPlan',
       cell: (info) => info.getValue(),
        header: () => <span>Employees With Career Plan</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ totalCareerGrowth }) => totalCareerGrowth??'--',
        id: 'growthAreas',
       cell: (info) => info.getValue(),
        header: () => <span>Growth Areas</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ completedCareerGrowth }) => completedCareerGrowth??'--',
        id: 'growthAreasCompleted',
       cell: (info) => info.getValue(),
        header: () => <span>Growth Areas Completed</span>,
        isSortable: false,
    },
]
export const careerPlanColumns = [
    {
        accessorFn: ({ title }) => title??'--',
        id: 'careerPlan',
        cell: (info) => info.getValue(),
        header: () => <span>Career Plan</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ planLevels }) => planLevels??'--',
        id: 'planLevels',
        cell: (info) => info.getValue(),
        header: () => <span>Plan Levels</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ employeesWithCareerPlan }) => employeesWithCareerPlan??'--',
        id: 'employeesWithCareerPlan',
        cell: (info) => info.getValue(),
        header: () => <span>Employees With Career Plan</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ totalCareerGrowth }) => totalCareerGrowth??'--',
        id: 'growthAreas',
        cell: (info) => info.getValue(),
        header: () => <span>Growth Areas</span>,
        isSortable: false,
    },
    {
        accessorFn: ({ completedCareerGrowth }) => completedCareerGrowth??'--',
        id: 'growthAreasCompleted',
        cell: (info) => info.getValue(),
        header: () => <span>Growth Areas Completed</span>,
        isSortable: false,
    },
]
