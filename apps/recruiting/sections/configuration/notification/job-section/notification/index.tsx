import { useState } from "react";
import { MainCard } from "../main-card";
import { WeeklyReportModal } from "./weekly-report-modal";
import { AddNotificationModal } from "./add-notification-modal";

export function Notification({
  jobId,
  NotificationsCountList,
  stageName,
}: any): JSX.Element {
  const [weeklyReport, setWeeklyReport] = useState<boolean>(false);
  const [notificationModal, setNotificationModal] = useState<boolean>(false);

  const closeWeeklyModal = (): void => {
    setWeeklyReport(false);
  };
  const closeAddNotificationModal = (): void => {
    setNotificationModal(false);
  };
  return (
    <>
      <MainCard
        clickHandler={() => {
          setWeeklyReport(true);
        }}
        title="Weekly Recruiting Report"
        desc="Weekly recruiting report emails will be sent to these participants:"
        jobId={jobId}
        participantsList={NotificationsCountList?.data?.weeklyRecruitingReport}
      />
      <MainCard
        clickHandler={() => {
          setNotificationModal(true);
        }}
        title="Stage Transitions"
        desc="Automate internal communication to select team members when a candidate transition into a stage"
        btnText="Add Notification"
        jobId={jobId}
        participantsList={NotificationsCountList?.data?.stageTransitions}
      />
      {weeklyReport && (
        <WeeklyReportModal
          isOpen={weeklyReport}
          closeModel={closeWeeklyModal}
          jobId={jobId}
        />
      )}
      {notificationModal && (
        <AddNotificationModal
          isOpen={notificationModal}
          closeModel={closeAddNotificationModal}
          jobId={jobId}
          stageName={stageName}
        />
      )}
    </>
  );
}
