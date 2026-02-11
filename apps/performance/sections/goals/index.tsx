"use client";
import { Button } from "@mui/material";
import HorizontalTabs from "@components/horizontal-tab";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { CustomPopover } from "@components/custom-popover";
import { useGoals } from "./use-goals";
import CustomCard from "@components/custom-card";
import Link from "next/link";
import { CustomLoader } from "@components/loader";
import CustomModal from "@components/custom-modal";
import { NoDataFound } from "@components/no-data";
import { NoGoalIcon } from "@assets/icons/no-goal-icon";
import { PermissionProtected } from "@guards/permission-protected";

export function Goals(): JSX.Element {
  const {
    ownersOptions,
    tabArray,
    tableData,
    isOpenDeleteModal,
    handleOwnersFilter,
    handleSearch,
    handleTabChange,
    handleDeleteModal,
    handleDeleteGoal,
    isDeleteLoading,
    initialData,
    PERMISSION,
  } = useGoals();

  return (
    <>
      {tableData?.isLoading && <CustomLoader />}
      <CustomCard
        subHeader
        cardProps={{ sx: { mb: "24px" } }}
        cardSubHeader={{
          title: "Goals",
          description: "Manage your personal goals and team goals ",
          actions: (
            <Link href="/goals/create-goal">
              <PermissionProtected permission={PERMISSION.CREATE}>
                <Button variant="contained">Create Goal</Button>
              </PermissionProtected>
            </Link>
          ),
        }}
      />

      <HorizontalTabs
        key="goals"
        tabsArray={tabArray}
        onChange={handleTabChange}
      />
      {!initialData?.length && !tableData?.data && tableData?.isError ? (
        <NoDataFound
          isCustomCard
          sx={{ height: "54vh", marginTop: "2rem" }}
          icon={<NoGoalIcon sx={{ marginBottom: "20px" }} />}
          heading="There are no goals created."
          description="Create goals that help you learn new skills and achieve new milestones without missing on them."
        />
      ) : (
        <CustomTableWithHeader
          secondaryHeader
          secondaryHeaderProps={{
            handleSearch,
            actions: (
              <CustomPopover
                btnText="Owners"
                checkboxOptions={ownersOptions}
                checkboxChangeHandler={handleOwnersFilter}
                transformOrigin={{
                  horizontal: "right",
                  vertical: "top",
                }}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "bottom",
                }}
              />
            ),
          }}
          tableProps={tableData}
        />
      )}
      {Boolean(isOpenDeleteModal) && (
        <CustomModal
          isLoading={isDeleteLoading}
          open={Boolean(isOpenDeleteModal)}
          onClose={() => {
            handleDeleteModal(null);
          }}
          acceptButtonProps={{ onClick: handleDeleteGoal }}
          message="Are you sure you want to delete Goal? Your Goal and Targets will be permanently deleted forever and cannot be recovered"
        />
      )}
    </>
  );
}
