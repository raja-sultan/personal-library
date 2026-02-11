import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import CustomModal from "@components/custom-modal";
import { GroupModal } from "../group-modal";
import { useGroup } from "./use-group";

export function TabGroups(): JSX.Element {
  const {
    tableProps,
    handleSearch,
    deleteModal,
    handleDeleteGroup,
    handleDeleteModal,
    editGroupModal,
    handleEditGroupModal,
    currRowId,
  } = useGroup();

  return (
    <>
      <CustomHeaderTableTabs
        table={{
          secondaryHeader: true,
          secondaryHeaderProps: {
            handleSearch,
          },
          tableProps,
        }}
      />

      {deleteModal && (
        <CustomModal
          open={deleteModal}
          onClose={handleDeleteModal}
          message="Are you sure you want to delete this group?"
          acceptButtonProps={{
            onClick: handleDeleteGroup,
          }}
        />
      )}

      {editGroupModal && (
        <GroupModal
          open={editGroupModal}
          onClose={handleEditGroupModal}
          id={currRowId}
        />
      )}
    </>
  );
}
