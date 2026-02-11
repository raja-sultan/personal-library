"use client";
import { Box, Card, Stack, Typography } from "@mui/material";
import React from "react";
import { PERMISSIONS as permissionsData } from "@enums/permissions";
import { styles } from "./permissions-sidebar.styles";

interface PermissionsSidebarProps {
  activeTab: string | null;
  setActiveTab: (id) => void;
}

interface ModuleType {
  id: string;
  name: string;
}

function PermissionsSidebar({
  activeTab,
  setActiveTab,
}: PermissionsSidebarProps): JSX.Element {
  return (
    <Card sx={styles.cardWrapper}>
      <Stack spacing="20px">
        {Object.values(permissionsData.PERFORMANCE).map((module) => (
          <React.Fragment key={(module as ModuleType).id}>
            <Typography
              px={2}
              variant="h6"
              color="text.primary"
              fontWeight={600}
            >
              {(module as ModuleType).name}
            </Typography>
            <Box mt={2}>
              <Stack gap={1}>
                {Object.values(module).map((subModule) => {
                  if (subModule.name && typeof subModule.name === "string") {
                    return (
                      <Box
                        key={subModule.id}
                        sx={{
                          ...styles.tab,
                          ...(activeTab === subModule.id && styles.tabActive),
                        }}
                        onClick={() => {
                          setActiveTab(subModule.id);
                        }}
                      >
                        <Typography
                          variant={
                            activeTab === subModule.id ? "subtitle1" : "body2"
                          }
                          fontWeight={activeTab === subModule.id ? 600 : 400}
                          color={
                            activeTab === subModule.id
                              ? "neutral[700]"
                              : "neutral[500]"
                          }
                        >
                          {subModule.name}
                        </Typography>
                      </Box>
                    );
                  }
                  return null;
                })}
              </Stack>
            </Box>
          </React.Fragment>
        ))}
      </Stack>
    </Card>
  );
}

export default PermissionsSidebar;
