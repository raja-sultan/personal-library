"use client";

import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import { Employees } from "./tabs/employees";
import { Feedback } from "./tabs/feedback";
import { PendingRequests } from "./tabs/pending-requests";
import { PERMISSIONS } from "@enums/permissions";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.FEEDBACK.FEEDBACK_LOG;

export function FeedbackLog(): JSX.Element {
  return (
    <CustomHeaderTableTabs
      headerProps={{
        title: "Feedback Logs",
        description: "View feedback log for your company",
      }}
      tabsArray={["Feedback", "Pending Requests", "Employees"]}
      permissionsArray={[PERMISSION.VIEW_ALL, PERMISSION.VIEW_PENDING_ONLY, PERMISSION.VIEW_INDIVIDUAL]}
    >
      <Feedback />
      <PendingRequests />
      <Employees />
    </CustomHeaderTableTabs>
  );
}
