"use client";

import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import { Button } from "@mui/material";
import { Activated } from "./tabs/activated";
import { Deactivated } from "./tabs/deactivated";
import { useRouter } from "next/navigation";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING._1_ON_1S.TEMPLATES;

export function Templates(): JSX.Element {
  const router = useRouter();

  return (
    <CustomHeaderTableTabs
      headerProps={{
        title: "Templates",
        description:
          "Enable 1:1 templates for users to choose from as guidance in their conversations",
        actions: (
          <PermissionProtected permission={PERMISSION.CREATE}>
            <Button
              onClick={() => {
                router.push("templates/create-template");
              }}
              variant="contained"
            >
              Create Template
            </Button>
          </PermissionProtected>
        ),
      }}
      tabsArray={["Activated", "Deactivated"]}
      permissionsArray={[PERMISSION.VIEW_ACTIVE, PERMISSION.VIEW_INACTIVE]}
    >
      <Activated />
      <Deactivated />
    </CustomHeaderTableTabs>
  );
}
