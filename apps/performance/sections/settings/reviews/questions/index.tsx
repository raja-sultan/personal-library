"use client";
import CustomModal from "@components/custom-modal";
import { Button } from "@mui/material";
import { useQuestion } from "./use-questions";
import { NewQuestionModal } from "./new-question-modal";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import CustomCard from "@components/custom-card";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.REVIEWS.QUESTIONS;

export function ReviewQuestions(): JSX.Element {
  const {
    duplicateModal,
    handleDuplicateModal,
    handleDuplicateQuestion,
    deleteModal,
    handleDeleteModal,
    handleDeleteQuestion,
    handleCreateQuestionModal,
    createQuestionModal,
    setSearchValue,
    tableData,
    isEditQuestion,
    tableId,
    singleData,
  } = useQuestion();

  return (
    <>
      <CustomCard
        subHeader
        cardProps={{ sx: { mb: "24px" } }}
        cardSubHeader={{
          title: "Questions",
          description:
            "Create your review templates here and assign them to employees.",
          actions: (
            <PermissionProtected permission={PERMISSION.CREATE}>
              <Button variant="contained" onClick={handleCreateQuestionModal}>
                Create Question
              </Button>
            </PermissionProtected>
          ),
        }}
      />
      <PermissionProtected permission={PERMISSION.VIEW}>
        <CustomTableWithHeader
          secondaryHeader
          secondaryHeaderProps={{
            handleSearch: (value) => setSearchValue(value),
          }}
          tableProps={tableData}
        />
      </PermissionProtected>

      {deleteModal && (
        <CustomModal
          open={deleteModal}
          onClose={handleDeleteModal}
          title="Are you sure?"
          message="Do you want to delete this question?"
          acceptButtonProps={{
            onClick: handleDeleteQuestion,
          }}
        />
      )}

      {duplicateModal && (
        <CustomModal
          open={duplicateModal}
          onClose={handleDuplicateModal}
          title="Are you sure?"
          message="Are you sure you want to duplicate this question?"
          acceptText="Confirm"
          acceptButtonProps={{
            onClick: handleDuplicateQuestion,
          }}
        />
      )}
      {createQuestionModal && (
        <NewQuestionModal
          open={createQuestionModal}
          isEdit={isEditQuestion}
          tableId={tableId}
          data={singleData}
          onClose={handleCreateQuestionModal}
          handleClose={handleCreateQuestionModal}
        />
      )}
    </>
  );
}
