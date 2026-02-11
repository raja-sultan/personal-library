import { CustomPopover } from "@components/custom-popover";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import type { CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types"
import { renderUserImage } from "@root/utils/render-user-image";
import { useGetBudgetQuery, useGetDistributeQuery, useUpdateCycleMutation } from "@services/compensation/compensation-cycle/compensation-cycle-api";
import { toast } from "react-hot-toast";

interface ReturnType {
    tableData?: CustomTableProps;
    handleContinue: () => void;
    totalBudget: number | string;
    totalDistributedBudget: number
    isBudgetLoading: boolean;
    isUpdateLoading: boolean;
}

export function useDistribute({ viewDetailId, handleNext }): ReturnType {

    const [updateCycleMutation, { isLoading: isUpdateLoading }] = useUpdateCycleMutation();
    const { data: budgetData, isLoading: isBudgetLoading } = useGetBudgetQuery({ id: viewDetailId })

    const { data: distributeData, isLoading, isError, isFetching, isSuccess } = useGetDistributeQuery({ id: viewDetailId });


    const totalBudget = Number(budgetData?.data?.totalBudget + budgetData?.data?.budget?.raise + budgetData?.data?.promotion?.totalSpend).toFixed(2);
    const totalDistributedBudget = distributeData?.data.reduce((total: number, department: { distributedBudget: number }) => total + department.distributedBudget, 0);

    async function handleContinue(): Promise<void> {
        await updateCycleMutation({ id: viewDetailId, body: { stage: 'distribute' } }).unwrap().then((data) => {
            if (data?.data?._id) {
                handleNext()
            }
        }).catch((error) => {
            toast.error(error?.data?.message || 'Error while updating distribute list')
        })
    }

    const columns = [
        {
            accessorFn: ({ departmentName }) => departmentName,
            id: "departmentName",
            cell: ({ row: { original } }) => <Box display="flex" alignItems="center" gap='6px'>
                {original?.heads.length > 0 ? <CustomPopover
                    customIcon={false}
                    customActionComponentSX={{ cursor: 'pointer' }}
                    customActionComponent={<Box display='flex' alignItems='center' gap='10px'>
                        {renderUserImage({
                            profileImage: original?.heads[0]?.profileImage,
                            firstName: original?.heads[0]?.firstName,
                            lastName: original?.heads[0]?.lastName,
                        })}
                        <Typography variant="subtitle1" fontWeight={500}>{original?.heads[0]?.firstName} {original?.heads[0]?.lastName}</Typography>
                    </Box>}
                    customComponent={
                        original?.heads?.map((user: { _id: string, profileImage: string | null, firstName: string, lastName: string }) => (
                            <MenuItem key={user?._id}>
                                <Box display='flex' alignItems='center' gap='10px'>
                                    {renderUserImage({
                                        profileImage: user?.profileImage ?? '',
                                        firstName: user?.firstName,
                                        lastName: user?.lastName,
                                    })}
                                    <Typography variant="subtitle1" fontWeight={500}>{user?.firstName} {user?.lastName}</Typography>
                                </Box>
                            </MenuItem>
                        ))}
                /> :
                    '--'
                }
            </Box>,
            header: () => <>Department Head</>,
            isSortable: false,
        },
        {
            accessorFn: ({ departmentName }) => departmentName,
            id: "departmentName",
            cell: ({ getValue }) => getValue(),
            header: () => <>department</>,
            isSortable: false,
        },
        {
            accessorFn: ({ employees }) => employees,
            id: "employees",
            cell: ({ getValue }) => getValue(),
            header: () => <>employees</>,
            isSortable: false,
        },
        {
            accessorFn: ({ distributedBudget }) => distributedBudget,
            id: "distributedBudget",
            cell: ({ getValue }) => getValue(),
            header: () => <>distributed budget</>,
            isSortable: false,
        },
        {
            accessorFn: ({ additional }) => additional,
            id: "additional",
            cell: ({ getValue }) => <TextField disabled variant="outlined" defaultValue={getValue()} size='small' />,
            header: () => <>additional</>,
            isSortable: false,
        },
    ];

    const tableData: CustomTableProps = {
        data: distributeData?.data,
        columns,
        isLoading, isError, isFetching, isSuccess,
        isPagination: false
    }
    return {
        tableData,
        handleContinue,
        totalBudget,
        totalDistributedBudget,
        isBudgetLoading,
        isUpdateLoading
    }
}