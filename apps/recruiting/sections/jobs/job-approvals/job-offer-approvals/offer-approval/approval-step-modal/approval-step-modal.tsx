import { CustomModal } from "common";
import { ApprovalStepForm } from "../approval-step-form/approval-step-form";

export function ApprovalStepModel({
  isOpen,
  closeModel,
}: {
  isOpen: boolean;
  closeModel: () => void;
}): JSX.Element {
  return (
    <CustomModal
      isOpen={isOpen}
      rootSx={{ width: { xs: "90%", sm: "50%" } }}
      onClose={closeModel}
      headerLabel="Add approval step"
      closeButtonProps={{ onClick: closeModel }}
    >
      <ApprovalStepForm closeModel={closeModel} />
    </CustomModal>
  );
}
