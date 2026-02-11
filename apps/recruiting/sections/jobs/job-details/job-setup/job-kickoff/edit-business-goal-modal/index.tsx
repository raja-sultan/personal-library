import { CustomModal } from "common";
import { BusinessGoals } from "../business-goals";

export function EditBusinessGoalModal({
  isOpen,
  closeModel,
  setShowBusinessModal,
  modalData,
}: {
  isOpen: boolean;
  closeModel: () => void;
  setShowBusinessModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: any;
}): JSX.Element {
  return (
    <CustomModal
      isOpen={isOpen}
      rootSx={{ width: { xs: "90%", sm: "50%" } }}
      onClose={closeModel}
      closeButtonProps={{ onClick: closeModel }}
    >
      <BusinessGoals
        setShowBusinessModal={setShowBusinessModal}
        modalData={modalData}
      />
    </CustomModal>
  );
}
