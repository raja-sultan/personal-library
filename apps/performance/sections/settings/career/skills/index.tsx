"use client";
import CustomModal from "@components/custom-modal";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { CustomLoader } from "@components/loader";
import ViewPlansModal from "./view-plans-modal";
import { useSkillTable } from "./use-skill-table";
import NewSkillModal from "./new-skill-modal/new-skill-modal";
import CustomCard from "@components/custom-card";

export function CareerSkills(): JSX.Element {
  const {
    handleDeleteModal,
    handleCreateSkillModal,
    isEditSkill,
    createSkillModal,
    deleteModal,
    setDeleteModal,
    handleSearch,
    tableData,
    getCareerSkillsId,
    isDeleteLoading,
    viewPlansModal,
    handleModal,
  } = useSkillTable();
  return (
    <>
      <CustomCard
        cardProps={{ sx: { mb: "3rem" } }}
        subHeader
        cardSubHeader={{
          title: "Skills",
          description:
            "Create skills for your people that they need to embody to succeed in their role",
        }}
      />
      {tableData?.isLoading && <CustomLoader />}
      <CustomTableWithHeader
        secondaryHeader
        secondaryHeaderProps={{
          handleSearch,
        }}
        tableProps={tableData}
      />
      {deleteModal && (
        <CustomModal
          isLoading={isDeleteLoading}
          open={deleteModal}
          onClose={() => {
            setDeleteModal(!deleteModal);
          }}
          title="Are you sure?"
          message="Do you want to delete this Skill?"
          acceptButtonProps={{ onClick: handleDeleteModal }}
        />
      )}

      {createSkillModal && (
        <NewSkillModal
          open={createSkillModal}
          isEdit={isEditSkill}
          onClose={handleCreateSkillModal}
          handleClose={handleCreateSkillModal}
          getCareerSkillsId={getCareerSkillsId}
        />
      )}
      {viewPlansModal && (
        <ViewPlansModal
          handleModal={handleModal}
          getCareerSkillsId={getCareerSkillsId}
        />
      )}
    </>
  );
}
