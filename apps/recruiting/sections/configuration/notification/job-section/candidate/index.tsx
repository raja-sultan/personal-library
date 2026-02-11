import { MainCard } from "../main-card";
import { useState } from "react";
import { NewApplicantModal } from "./new-applicant-modal";
import { NewInternalApplicantsModal } from "./new-internal-applicants";
import { ReferralModal } from "./referal-modal";

export function Candidate({ jobId, NotificationsCountList }: any): JSX.Element {
  const [newApplicant, setNewApplicant] = useState<boolean>(false);
  const [newInternalApplicant, setNewInternalApplicant] =
    useState<boolean>(false);
  const [referralApplicant, setReferralApplicant] = useState<boolean>(false);
  const closeNewApplicantModal = (): void => {
    setNewApplicant(false);
  };
  const closeNewInternalApplicantModal = (): void => {
    setNewInternalApplicant(false);
  };
  const closeReferralApplicantModal = (): void => {
    setReferralApplicant(false);
  };

  return (
    <>
      <MainCard
        clickHandler={() => {
          setNewApplicant(true);
        }}
        title="New Applicants"
        desc="For each New candidate that applies to this job, email will be sent to these participants"
        jobId={jobId}
        participantsList={NotificationsCountList?.data?.newApplicants}
      />
      <MainCard
        clickHandler={() => {
          setNewInternalApplicant(true);
        }}
        title="New Internal Applicants"
        desc="For each new internal Applicants that applies to this job, email will be sent to these participants"
        jobId={jobId}
        participantsList={NotificationsCountList?.data?.newInternalApplicants}
      />
      <MainCard
        clickHandler={() => {
          setReferralApplicant(true);
        }}
        title="New Referrals"
        desc="For each New referral added to this job, emails will be sent to:"
        jobId={jobId}
        participantsList={NotificationsCountList?.data?.newReferrals}
      />

      {newApplicant && (
        <NewApplicantModal
          isOpen={newApplicant}
          closeModel={closeNewApplicantModal}
          jobId={jobId}
        />
      )}
      {newInternalApplicant && (
        <NewInternalApplicantsModal
          isOpen={newInternalApplicant}
          closeModel={closeNewInternalApplicantModal}
          jobId={jobId}
        />
      )}
      {referralApplicant && (
        <ReferralModal
          isOpen={referralApplicant}
          closeModel={closeReferralApplicantModal}
          jobId={jobId}
        />
      )}
    </>
  );
}
