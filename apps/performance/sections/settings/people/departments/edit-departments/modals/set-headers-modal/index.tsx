"use client";
import { Box, MenuItem } from "@mui/material";
import CustomModal from "@components/custom-modal";
import { TableAction } from "common";
import { useSetDepartmentHeadsModal } from "./use-set-headers-modal";
import { membersModalStyles } from "../add-members-modal/add-members-modal.styles";
import SetDepartmentModal from "../../../set-department-modal/set-department-modal";

export function SetDepartmentHeadsModal({ getDepartment }: { getDepartment: any }): JSX.Element {
    const {
        isOpenHeadersModal,
        headersData,
        setShowUser,
        onSubmit,
        onDeleteHandler,
        setIsOpenHeadersModal,
        isOpenDeleteModal,
        setIsOpenDeleteModal,
    } = useSetDepartmentHeadsModal();

    const styles = membersModalStyles();

    return (
        <>
            <Box gap={2} sx={styles.buttonWrap}>
                <TableAction placeholder="Actions">
                    <MenuItem
                        onClick={() => {
                            setIsOpenHeadersModal(!isOpenHeadersModal);
                            setShowUser(false);
                        }}
                    >
                        {" "}
                        Set department heads{" "}
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setIsOpenDeleteModal(!isOpenDeleteModal);
                        }}
                    >
                        {" "}
                        Delete
                    </MenuItem>
                </TableAction>
            </Box>
            <SetDepartmentModal
                isOpen={isOpenHeadersModal}
                handleClose={() => {
                    setIsOpenHeadersModal(!isOpenHeadersModal);
                }}
                title={getDepartment ? ` ${getDepartment?.data?.departmentName} Heads` : "Heads"}
                onSubmit={onSubmit}
                headersData={headersData}
                // handleDelete={deleteSelectedTextHandler}
            />
            
            {/* delete modal  */}
            <CustomModal
                open={isOpenDeleteModal}
                onClose={() => {
                    setIsOpenDeleteModal(!isOpenDeleteModal);
                }}
                acceptButtonProps={{
                    color: "primary",
                    onClick: onDeleteHandler,
                }}
            />
        </>
    );
}
