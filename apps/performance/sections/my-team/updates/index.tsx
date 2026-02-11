'use client'
import { SettingIcon } from "@assets/icons";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { Button } from "@mui/material";
import Link from "next/link";
import { useUpdates } from "./use-updates";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.UPDATES.UPDATES_FOR_TEAM_MEMBERS

export function TeamUpdates(): JSX.Element {
    const { handleSearch, tableData } = useUpdates();
    return (
        <CustomTableWithHeader
            primaryHeader
            primaryHeaderProps={{
                title: 'Recent Updates',
                description: 'Review recent updates shared by your team',
                actions: <Link href='/my-team/update/setting'>
                    <PermissionProtected permission={PERMISSION.SET_CUSTOM}>
                        <Button variant="outlined" startIcon={<SettingIcon />}>Setting</Button>
                    </PermissionProtected>
                </Link>
            }}
            secondaryHeader
            secondaryHeaderProps={{
                handleSearch
            }}
            tableProps={tableData}
        />
    )
}