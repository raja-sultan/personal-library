'use client'

import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs"
import { UpdateLogTable } from "./tabs/updates"
import { IndividualLogTable } from "./tabs/individual"
import { PERMISSIONS } from "@enums/permissions"
import { PermissionProtected } from "@guards/permission-protected"

export function UpdateLog(): JSX.Element {

    const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.UPDATES.UPDATES_LOG

    return (
        <CustomHeaderTableTabs
            headerProps={{
                title: "Updates Log",
                description: 'View update log for your company'
            }}
            tabsArray={['Updates', 'Individuals']}
        >
            <PermissionProtected permission={PERMISSION.VIEW}>
                <UpdateLogTable />
            </PermissionProtected>

            <PermissionProtected permission={PERMISSION.VIEW_INDIVIDUAL}>
                <IndividualLogTable />
            </PermissionProtected>
        </CustomHeaderTableTabs>
    )
}