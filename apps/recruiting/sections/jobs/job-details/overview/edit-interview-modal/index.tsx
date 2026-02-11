import { type SetStateAction, type Dispatch } from "react";
import { CustomModal } from "common";
import { InterviewPlanSection } from "@sections/jobs/interview-plan";

export function EditInterviewModal({
  interview,
  setInterview,
}: {
  interview: boolean;
  setInterview: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <CustomModal
      onClose={setInterview}
      rootSx={{
        maxWidth: { xs: "auto", sm: 550, md: 800, lg: 1250, xl: 1400 },
        maxHeight: 900,
        overflowY: "scroll",
      }}
      headerLabel="Edit Form"
      closeButtonProps={{
        onClick: () => {
          setInterview(false);
        },
      }}
      isOpen={interview}
    >
      <InterviewPlanSection
        nextStepHandler={undefined}
        previousStepHandler={undefined}
        hideButton
        showScroll={false}
      />
    </CustomModal>
  );
}
