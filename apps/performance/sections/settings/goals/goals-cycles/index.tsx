"use client";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import CustomModal from "@components/custom-modal";
import { Button } from "@mui/material";
import { MarkAsActive } from "./mark-as-active";
import { useGoalCycles } from "./use-goal-cycles";
import { useRouter } from "next/navigation";
import { PermissionProtected } from "@guards/permission-protected";

export function GoalsCycles(): JSX.Element {
  const route = useRouter();
  const {
    tableData,
    mutationLoading,
    handleMarkAsActive,
    markAsActiveModal,
    deleteModal,
    handleDeleteModal,
    handleDelete,
    handleMarkAsActiveChange,
    handleMarkAsActiveContinue,
    markAsActive,
    setSearch,
    PERMISSION,
  } = useGoalCycles();

  return (
    <>
      <PermissionProtected permission={PERMISSION.VIEW}>
        <CustomHeaderTableTabs
          table={{
            primaryHeader: true,
            primaryHeaderProps: {
              title: "Goal cycles",
              description: "Create Goals Cycles for your Company",
              actions: (
                <PermissionProtected permission={PERMISSION.CREATE}>
                  <Button
                    onClick={() => {
                      route.push("/settings/goals/goals-cycles/goal");
                    }}
                    variant="contained"
                  >
                    Create cycle
                  </Button>
                </PermissionProtected>
              ),
            },
            secondaryHeader: true,
            secondaryHeaderProps: {
              handleSearch: setSearch,
            },
            tableProps: tableData,
          }}
        />
      </PermissionProtected>

      {deleteModal && (
        <CustomModal
          open={deleteModal}
          isLoading={mutationLoading}
          onClose={handleDeleteModal}
          message="Are you sure you want to delete this goal cycle?"
          acceptButtonProps={{
            onClick: handleDelete,
          }}
        />
      )}

      {markAsActiveModal && (
        <MarkAsActive
          isLoading={mutationLoading}
          open={markAsActiveModal}
          onClose={handleMarkAsActive}
          values={markAsActive}
          handleMarkAsActiveChange={handleMarkAsActiveChange}
          handleMarkAsActiveContinue={handleMarkAsActiveContinue}
        />
      )}
    </>
  );
}
