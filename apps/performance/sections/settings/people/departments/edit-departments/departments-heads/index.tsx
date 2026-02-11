"use client"
import { Box, Typography, } from "@mui/material";
import { useDepartmentsHeads } from "./use-departments-heads";
import CustomModal from "@components/custom-modal";
import { CustomTableWithHeader } from "@components/custom-table-with-header";

export function DepartmentsHeads(): JSX.Element {
    const {
        columns,
        isOpenDeleteModal, onDeleteModalHandler, getHeads, handleSearch, setIsOpenDeleteModal, getDepartmentsErrorHandling
    } = useDepartmentsHeads()
    return (
        <Box>
            <CustomTableWithHeader
                primaryHeader
                primaryHeaderProps={{
                    title: <Typography variant="body2" fontWeight={600} color="text.primary">Departments Heads</Typography>
                }}
                secondaryHeader
                secondaryHeaderProps={{
                    handleSearch
                }}
                tableProps={{
                    data: getHeads?.data?.heads,
                    columns,
                    isLoading: getDepartmentsErrorHandling?.getHeadsLoading,
                    isSuccess: getDepartmentsErrorHandling?.getHeadsSuccess,
                    isError: getDepartmentsErrorHandling?.getHeadsError,
                    isPagination: false,
                }}
            />
            <CustomModal open={isOpenDeleteModal} onClose={() => { setIsOpenDeleteModal(!isOpenDeleteModal) }}
                acceptButtonProps={{ onClick: onDeleteModalHandler }} />
        </Box>

    )

}