import { useState } from "react";
import { MainCard } from "../main-card";
import { ScoreCardModal } from "./scorecard-modal";
import { NewScoreCardModal } from "./new-scorecard-modal";

export function Scoreboard({
  jobId,
  stageName,
  NotificationsCountList,
}: any): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [newScoreCardModal, setNewScoreCardModal] = useState<boolean>(false);

  const closeModal = (): void => {
    setOpen(false);
  };
  const closeNewScoreCardModal = (): void => {
    setNewScoreCardModal(false);
  };
  return (
    <>
      <MainCard
        clickHandler={() => {
          setOpen(true);
        }}
        title="Scorecard Reminders"
        desc="Customize the time and frequency that scoreboard reminders are sent to interviewers."
        jobId={jobId}
        participantsList={NotificationsCountList?.data?.firstReminder}
      />
      <MainCard
        clickHandler={() => {
          setNewScoreCardModal(true);
        }}
        title="New Scorecards"
        desc="Emails select team members when a new scorecard is submitted with a summary of submitted and outstanding scorecards for for the selected stage"
        jobId={jobId}
        participantsList={NotificationsCountList?.data?.newScorecard}
      />
      {open && (
        <ScoreCardModal isOpen={open} closeModel={closeModal} jobId={jobId} />
      )}
      {newScoreCardModal && (
        <NewScoreCardModal
          isOpen={newScoreCardModal}
          closeModel={closeNewScoreCardModal}
          jobId={jobId}
          stageName={stageName}
        />
      )}
    </>
  );
}
