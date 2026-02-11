'use client'
import CustomCard from "@components/custom-card";
import { CustomTable } from "@root/../../packages/common";
import { useRouter } from 'next/navigation';
import { Box, Button, Checkbox } from '@mui/material'
import FormControlLabel from "@mui/material/FormControlLabel";
import { styles } from "./setting.styles";

export default function NotificationSetting(): JSX.Element {
    const router = useRouter();

    const data = [{
        name: 'invites',
        company1: 'Microsoft Teams',
        company2: 'Slack',
        company3: 'Email',
    }]

    function CustomCheckbox({ name, ...rest }): JSX.Element {
        return (
            <FormControlLabel control={<Checkbox {...rest} />} label={name} />
        )
    }

    const columns: any = [
        {
            accessorFn: (row) => row.name,
            id: "name",
            cell: (info) => info.getValue(),
            header: false,
            isSortable: false,
        },
        {
            accessorFn: (row) => row.company1,
            id: "company1",
            cell: (info) => <CustomCheckbox name={info.getValue()} />,
            header: false,
            isSortable: false,
        },
        {
            accessorFn: (row) => row.company2,
            id: "company2",
            cell: (info) => <CustomCheckbox name={info.getValue()} />,
            header: false,
            isSortable: false,
        },
        {
            accessorFn: (row) => row.company3,
            id: "company3",
            cell: (info) => <CustomCheckbox name={info.getValue()} />,
            header: false,
            isSortable: false,
        },
    ];

    return (
        <Box sx={styles.wrapper}>
            <CustomCard
                header
                cardHeader={{
                    title: 'Settings',
                    onBack: () => { router.push('/settings/notifications') }
                }}>

                <CustomTable
                    data={data}
                    columns={columns}
                    isSuccess
                    isPagination={false}
                />
                <Button variant="contained" sx={{ ml: 'auto', display: 'block' }}>Save</Button>
            </CustomCard>
        </Box>
    )
}

