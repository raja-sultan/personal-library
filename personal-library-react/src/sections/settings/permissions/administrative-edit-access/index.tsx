import { Box, Button, Stack, Typography } from "@mui/material";
import { CustomBreadCrumbs, CustomTabs } from "common";
import { useState } from "react";
import { AddUserModal } from "./add-user-modal";
import { CustomAccessSettingsSection } from "./setting-sec";
import { CustomAccessUserSection } from "./user-sec";

export function AdministrativeEditAccessSection(props): JSX.Element {
  const roleName = props.searchParams.roleName;
  const role = props.searchParams.role;
  const [addUser, setAddUser] = useState<boolean>(false);
  const breadcrumbs = [
    { key: "1", value: "Home", link: "/dashboard" },
    { key: "2", value: "Permissions", link: "/settings/permissions" },
    { key: "3", value: `${roleName}`, link: "" },
  ];
  return (
    <Box>
      <Box sx={{ display: "flex", mb: 2 }}>
        <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      </Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {roleName}
      </Typography>
      <Box sx={{ bgcolor: "background.paper", p: 0.5, borderRadius: 1, mt: 2 }}>
        <CustomTabs tabsNameArray={["User", "Settings"]}>
          <Stack gap={0.5}>
            <Button
              variant="contained"
              sx={{ ml: "auto" }}
              onClick={() => {
                setAddUser(true);
              }}
            >
              Add User
            </Button>
            <CustomAccessUserSection role={role} />
          </Stack>

          <Box>
            <CustomAccessSettingsSection roleName={roleName} />
          </Box>
        </CustomTabs>
      </Box>

      <AddUserModal addUser={addUser} setAddUser={setAddUser} />
    </Box>
  );
}
