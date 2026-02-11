import { RHFCheckbox, RHFDatePicker, RHFTextField } from "@root/../../packages/common";
import { Typography } from '@mui/material';

export const createGoalData = [
    {
        id: '1',
        content: {
            title: 'Goal Cycle Information',
            desc: 'Create a company wide goal setting practice. You will have the ability to send notifications and monitor progress through the goal cycle.'
        },
        components: [
            {
                id: '1',
                componentProps: {
                    name: 'cycleName',
                    outerLabel: 'Cycle Name',
                    sx: { mb: '48px' }
                },
                component: RHFTextField
            },
            {
                id: '2',
                componentProps: {
                    name: 'cycleStartDate',
                    outerLabel: 'Cycle Start Date',
                    sx: { mb: '48px' }
                },
                component: RHFDatePicker
            },
            {
                id: '3',
                componentProps: {
                    name: 'cycleDueDate',
                    outerLabel: 'Cycle Due Date',
                    sx: { mb: '48px' }
                },
                component: RHFDatePicker
            },
        ]
    },
    {
        id: '2',
        content: {
            title: 'Goal Types',
            desc: 'Select the type of goals you want to allow your people to create in this goal cycle'
        },
        gridItemSX: { display: 'flex', flexDirection: 'column', gap: '24px' },
        components: [
            {
                id: '1',
                componentProps: {
                    name: 'companyGoal',
                    label: <>
                        <Typography variant="subtitle2">Company Goals</Typography>
                        <Typography variant="caption" color='neutral.400'>Create goals for the whole company</Typography>
                    </>
                },
                component: RHFCheckbox
            },
            {
                id: '2',
                componentProps: {
                    name: 'departmentGoal',
                    label: <>
                        <Typography variant="subtitle2">Department Goals</Typography>
                        <Typography variant="caption" color='neutral.400'>Create goals for a department within the  company</Typography>
                    </>
                },
                component: RHFCheckbox
            },
            {
                id: '3',
                componentProps: {
                    name: 'individualGoal',
                    label: <>
                        <Typography variant="subtitle2">Individual Goals</Typography>
                        <Typography variant="caption" color='neutral.400'>Create goals for an individual within the  company</Typography>
                    </>
                },
                component: RHFCheckbox
            },
        ]
    }
]