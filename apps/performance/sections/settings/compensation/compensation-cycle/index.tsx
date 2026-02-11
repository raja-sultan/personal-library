'use client'
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { Button } from "@mui/material";
import { useCompensationCycle } from "./use-compensation-cycle";
import Link from "next/link";
import CustomModal from "@components/custom-modal";
import { CustomPopover } from "@components/custom-popover";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.COMPENSATION.COMPENSATION_CYCLES;

export function CompensationCycle(): JSX.Element {
    const {
        tableData,
        deleteModal,
        handleDeleteModal,
        handleDeleteCycle,
        handleSearch,
        handleStatusChange
    } = useCompensationCycle()
    return (
        <>
            <CustomTableWithHeader
                key="Compensation Cycles"
                primaryHeader
                primaryHeaderProps={{
                    title: "Compensation Cycles",
                    description:
                        "Refer to the recurring periods during which organizations review, adjust, and distribute employee salaries and benefits.",
                    actions: <Link href='/settings/compensation/compensation-cycle/create-cycle'>
                        <PermissionProtected permission={PERMISSION.CREATE}>
                            <Button variant="contained">Create Cycle</Button>
                        </PermissionProtected>
                    </Link>,
                }}
                secondaryHeader
                secondaryHeaderProps={{
                    handleSearch,
                    actions: <CustomPopover
                        btnText="All Statuses"
                        options={['all', 'draft', 'active', 'ended']}
                        handleChange={handleStatusChange}
                    />,
                }}
                tableProps={tableData}
            />
            {deleteModal && <CustomModal
                open={deleteModal}
                onClose={handleDeleteModal}
                acceptButtonProps={{ onClick: handleDeleteCycle }}
            />}
        </>
    )
}