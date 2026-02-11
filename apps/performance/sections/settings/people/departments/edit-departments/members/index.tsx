"use client"
import { Box, Typography } from "@mui/material";
import { useMembers } from "./use-members";
import CustomModal from "@components/custom-modal";
import { CustomTableWithHeader } from "@components/custom-table-with-header";

export function Members(): JSX.Element {
    const {
        columns, isOpenDeleteModal, onDeleteModalHandler, getMembers, handleSearch, setIsOpenDeleteModal, membersErrorHandling,
    } = useMembers()


    return (
        <Box>
            <CustomTableWithHeader
                primaryHeader
                primaryHeaderProps={{
                    title: <Typography variant="body2" fontWeight={600} color="text.primary">Members</Typography>
                }}
                secondaryHeader
                secondaryHeaderProps={{
                    handleSearch
                }}
                tableProps={{
                    data: getMembers?.data?.members,
                    columns,
                    isLoading: membersErrorHandling?.membersLoading,
                    isSuccess: membersErrorHandling?.membersSuccess,
                    isError: membersErrorHandling?.membersError,
                    isPagination: false,
                    // totalPages: getMembers?.data?.meta?.pages,
                    // currentPage: getMembers?.data?.meta?.page,
                    // onPageChange: (onPageData: number) => {
                    //     handleOffset(onPageData);
                    // },
                    onSortByChange: (onSortData: any) => {
                        return onSortData;
                    }
                }}
            />
            <CustomModal
                open={isOpenDeleteModal}
                onClose={() => { setIsOpenDeleteModal(!isOpenDeleteModal) }}
                acceptButtonProps={{ onClick: onDeleteModalHandler }}
            />
        </Box>
    )

}