import { Box, Typography } from "@mui/material"
import { RHFRadioGroup, RHFTextField } from "@root/../../packages/common"
import type { Theme } from "@mui/material"
import { useGetEmployeesQuery } from "@services/login-as"


function GetEmployees(): JSX.Element {
    const { data: employees } = useGetEmployeesQuery({ type: 'employees' })
    const empLength = employees?.data?.length;
    return <span>{empLength}</span>
}

export const formData = (handleEmployeeChange): any =>
    [
        {
            id: '1',
            gridLength: 6,
            componentProps: {
                name: 'name',
                outerLabel: 'Cycle Name',
                variant: 'outlined',
                placeholder: 'Enter cycle name',
                size: 'small',
            },
            component: RHFTextField
        },
        {
            id: '2',
            gridLength: 12,
            componentProps: {
                name: 'reviewType',
                outerLabel: 'Review Type',
                row: false,
                options: [
                    { value: 'PROJECT', label: <Typography variant="subtitle1" fontWeight={400} color='neutral.800'>Project based</Typography> },
                    { value: 'ORGANIZATION', label: <Typography variant="subtitle1" fontWeight={400} color='neutral.800'>Organisation based</Typography> }
                ]
            },
            component: RHFRadioGroup,
        },
        {
            id: '3',
            componentProps: {
                gridLength: 12,
                id: "reviewees",
                name: 'reviewees',
                outerLabel: 'Reviewees',
                sx: ({ palette: { primary, neutral } }: Theme) => ({
                    mt: '12px',
                    gap: '16px',
                    ml: '10px',
                    '& .MuiFormControlLabel-root': {
                        alignItems: 'flex-start',
                        padding: '10px',
                        border: `1px solid ${neutral[200]}`,
                        borderRadius: '8px',
                        gap: '10px',
                        '& .Mui-checked + & .MuiFormControlLabel-root': {
                            border: `1px solid ${primary.main}`,
                        }
                    }
                }),
                options: [
                    {
                        value: 'allEmployees', label: <>
                            <Typography variant="subtitle1" fontWeight={600} color='neutral.900'>Include all employees</Typography>
                            <Typography variant="subtitle2" fontWeight={400} color='neutral.500'>All <GetEmployees /> employees in the company will receive reviews</Typography>
                        </>
                    },
                    {
                        value: 'specificEmployees', label: <Box onClick={handleEmployeeChange}>
                            <Typography variant="subtitle1" fontWeight={600} color='neutral.900'>Select specific employees</Typography>
                            <Typography variant="subtitle2" fontWeight={400} color='neutral.500'>Choose specific employees to receive reviews</Typography>
                        </Box>
                    }
                ]
            },
            component: RHFRadioGroup,
        },

    ]