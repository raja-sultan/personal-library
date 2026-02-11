import { useState } from "react";
import { MainCard } from "../main-card";
import { ApprovedRecruitingModal } from "./approved-recruiting-modal";
import { OfferedModal } from "./offered-modal";

export function ApprovalNotification({
  jobId,
  NotificationsCountList,
}: any): JSX.Element {
  const [approvalRecruitingModal, setApprovalRecruitingModal] =
    useState<boolean>(false);
  const [offeredModal, setOfferedModal] = useState<boolean>(false);

  const closeAprrovalRecruitingModal = (): void => {
    setApprovalRecruitingModal(false);
  };
  const closeOfferModal = (): void => {
    setOfferedModal(false);
  };
  return (
    <>
      <MainCard
        clickHandler={() => {
          setApprovalRecruitingModal(true);
        }}
        title="Approved to Start Recruiting"
        desc="For each job that is fully approved to start recruiting, emails will be sent to:"
        jobId={jobId}
        participantsList={NotificationsCountList?.data?.startRecruiting}
      />
      <MainCard
        clickHandler={() => {
          setOfferedModal(true);
        }}
        title="Offer Fully Approved"
        desc="For each candidate that is fully approved, emails will be sent to:"
        jobId={jobId}
        participantsList={NotificationsCountList?.data?.offerFullyApproved}
      />
      {approvalRecruitingModal && (
        <ApprovedRecruitingModal
          isOpen={approvalRecruitingModal}
          closeModel={closeAprrovalRecruitingModal}
          jobId={jobId}
        />
      )}
      {offeredModal && (
        <OfferedModal
          isOpen={offeredModal}
          closeModel={closeOfferModal}
          jobId={jobId}
        />
      )}
    </>
  );
}
