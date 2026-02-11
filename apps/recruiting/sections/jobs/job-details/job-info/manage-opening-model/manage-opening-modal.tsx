
import { ManageOpeningContextProvider } from "../../approvals/openings/manage-opening-model/manage-opening-context";
import { ManageOpenings } from "./manage-openings";
import { Modal } from "@mui/material";

export function ManageOpeningModal({
  isOpen,
  closeModel,
}: {
  isOpen: boolean;
  closeModel: () => void;
}): JSX.Element {
  return (
    <Modal open={isOpen} onClose={closeModel}>
      <ManageOpeningContextProvider>
        <ManageOpenings closeModel={closeModel} />
      </ManageOpeningContextProvider>
    </Modal>
  );
}
