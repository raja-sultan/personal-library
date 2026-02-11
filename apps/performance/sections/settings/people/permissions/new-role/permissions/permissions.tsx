import { Grid } from "@mui/material";
import React, { useState } from "react";
import PermissionsSidebar from "./permissions-sidebar/permissions-sidebar";
import PermissionsMainContent from "./permissions-main-content/permissions-main-content";
import type { PermissionsContentTypes } from "../new-role.types";
import { PERMISSIONS } from "@enums/permissions";

function Permissions({ ...props }: PermissionsContentTypes): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>(
    PERMISSIONS.PERFORMANCE.MODULE._1_ON_1S.id
  );

  function handleActiveTab(id: string): void {
    setActiveTab(id);
  }

  return (
    <Grid container spacing={2.4}>
      <Grid item xs={12} md={4} lg={3} xl={2.3}>
        <PermissionsSidebar
          activeTab={activeTab}
          setActiveTab={handleActiveTab}
        />
      </Grid>
      <Grid item xs={12} md={8} lg={9} xl={9.7}>
        <PermissionsMainContent activeTab={activeTab} {...props} />
      </Grid>
    </Grid>
  );
}

export default Permissions;
