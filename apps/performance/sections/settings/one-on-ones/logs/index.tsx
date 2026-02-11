import { Individuals } from "./tabs/individuals";
import { OneOnOneTable } from "./tabs/one-on-one-table";
import { PERMISSIONS } from "@enums/permissions";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING._1_ON_1S._1_ON_1_LOGS;

export function OneOnOnesLogs(): JSX.Element {
    return (
        <CustomHeaderTableTabs
            headerProps={{
                title: '1 on 1s log'
            }}
            tabsArray={['1 on 1s', 'Individuals']}
            permissionsArray={[PERMISSION.VIEW, PERMISSION.VIEW_INDIVIDUAL]}
        >
            <OneOnOneTable />
            <Individuals />
        </CustomHeaderTableTabs>
    )
}