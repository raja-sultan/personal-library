"use client";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import { Button } from "@mui/material";
import Link from "next/link";
import { GroupModal } from "./tabs/group-modal";
import { TabGroups } from "./tabs/groups";
import { TabPlans } from "./tabs/plans";
import { TabTemplates } from "./tabs/templates";
import { usePlans } from "./use-plans";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.CAREER.CAREER_GROUPS;
const { CREATE } = PERMISSIONS.PERFORMANCE.SETTING.CAREER.CAREER_PLANS.PERMISSION;

export function CareerPlan(): JSX.Element {
  const { createGroupModal, handleCreateGroupModal } = usePlans();
  return (
    <>
      <CustomHeaderTableTabs
        headerProps={{
          title: "Plans",
          description: "Create a growth plan for your people",
          actions: (
            <>
              <PermissionProtected permission={PERMISSION.CREATE}>
                <Button variant="outlined" onClick={handleCreateGroupModal}>
                  Create Group
                </Button>
              </PermissionProtected>
              <PermissionProtected permission={CREATE}>
                <Link href="/settings/career/plans/create?actionType=add">
                  <Button variant="contained">Create Plan</Button>
                </Link>
              </PermissionProtected>
            </>
          ),
        }}
        tabsArray={["Plans", "Groups", "Templates"]}
      >
        <TabPlans />
        <TabGroups />
        <TabTemplates />
      </CustomHeaderTableTabs>

      {/* create group modal */}
      {createGroupModal && (
        <GroupModal
          open={createGroupModal}
          onClose={handleCreateGroupModal}
          refetch=""
        />
      )}
    </>
  );
}
