"use client";
import React from "react";
import { Button, Stack } from "@mui/material";
import CustomModal from "@components/custom-modal";
import { usePermissions } from "./use-permissions";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.PERMISSIONS;
export function PermissionsComp(): JSX.Element {
  const {
    tableData,
    openDeleteModal,
    setOpenDeleteModal,
    handleNewRoleClick,
    handleDelete,
    handleSearch
  } = usePermissions();

  return (
    <Stack spacing={3}>
      <CustomHeaderTableTabs
        headerProps={{
          title: "Permissions",
          description:
            "Grant authorization to individuals or entities to access, or perform certain actions within a system",
        }}
        table={{
          secondaryHeader: true,
          secondaryHeaderProps: {
            handleSearch,
            actions: (
              <PermissionProtected permission={PERMISSION.ADD_ROLE}>
              <Button variant="contained" onClick={handleNewRoleClick}>
                New Role
              </Button>
              </PermissionProtected>
            ),
          },

          tableProps:  tableData,
        }}
      />
          <CustomModal
            open={openDeleteModal}
            onAccept={() => {
              handleDelete();
            }}
            onClose={() => {
              setOpenDeleteModal(!openDeleteModal);
            }}
            title="Are you sure?"
            message="Are you sure you want to delete this role?"
      />
    </Stack>
  );
}
