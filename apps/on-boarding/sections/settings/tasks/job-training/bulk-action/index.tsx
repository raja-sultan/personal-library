import { Box, Button, Typography } from "@mui/material";
//import { yupResolver } from "@hookform/resolvers/yup";
import { CustomModal, WarningPrompt } from "common";
import { useState } from "react";
import { CategoryModal, ResignModal } from "./re-assign-and-category-modal";
import { EditRulesModal, TaskModal } from "./rules-and-task-modal";
import toast from "react-hot-toast";
import { useDeleteTaskMutation } from "@services/settings/tasks/tasks-api";

export function BulkActions({
  open,
  setOpen,
  selectedRowJobs,
}: any): JSX.Element {
  const [reAssignModal, setReAssignModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [rulesModal, setRulesModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);

  //Delete Api
  const [deleteTask] = useDeleteTaskMutation();

  //Extracting the IDS from an array
  const rowsIds = selectedRowJobs.map((item) => item._id);

  async function onCriteriaDelete(id): Promise<void> {
    try {
      await deleteTask({ tasksIds: id }).unwrap();
      toast.success(`Task Deleted Successfully!`);
      setOpen(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  }

  return (
    <CustomModal
      isOpen={open}
      rootSx={{
        width: "35%",
        mt: 2,
      }}
      headerLabel="Bulk Actions"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
    >
      <Box
        sx={{
          maxWidth: { md: 650, xs: 350, sm: 450 },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: "6px",
          },
          pr: 2,
          mt: 1.5,
        }}
      >
        <Typography variant="body1" sx={{ mb: 1.5 }}>
          Edit
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Button
            onClick={() => {
              setReAssignModal(true);
            }}
            variant="contained"
            sx={{ fontSize: "12px", width: { xs: "100%", lg: "auto" } }}
          >
            Reassign
          </Button>
          <Button
            onClick={() => {
              setCategoryModal(true);
            }}
            variant="contained"
            sx={{ fontSize: "12px", width: { xs: "100%", lg: "auto" } }}
          >
            Change Task Category
          </Button>
          <Button
            onClick={() => {
              setRulesModal(true);
            }}
            variant="contained"
            sx={{ fontSize: "12px", width: { xs: "100%", lg: "auto" } }}
          >
            Update Rules
          </Button>
          <Button
            onClick={() => {
              setTaskModal(true);
            }}
            variant="contained"
            sx={{ fontSize: "12px", width: { xs: "100%", lg: "auto" } }}
          >
            Update Task Due Date
          </Button>
        </Box>
        <Typography variant="body1" sx={{ my: 1.5 }}>
          Action
        </Typography>
        <Box sx={{ display: "inline-block" }}>
          <WarningPrompt
            mainColor="error.main"
            heading="Alert"
            subTitle="Are you sure you want to delete this task?"
            acceptButtonProps={{
              onClick: () => {
                void onCriteriaDelete(rowsIds);
              },
              variant: "contained",
              color: "error",
              sx: {
                color: "white",
              },
            }}
            modelOpenLabel={
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "error.main",
                  fontSize: "12px",
                  ":hover": {
                    backgroundColor: "error.main",
                  },
                }}
              >
                Delete
              </Button>
            }
            acceptButtonLabel="Delete"
          />
        </Box>
      </Box>
      {/* Resign Modal */}
      {reAssignModal && (
        <ResignModal
          rowsIds={rowsIds}
          reAssignModal={reAssignModal}
          setReAssignModal={setReAssignModal}
        />
      )}
      {categoryModal && (
        <CategoryModal
          categoryModal={categoryModal}
          setCategoryModal={setCategoryModal}
          rowsIds={rowsIds}
        />
      )}
      {rulesModal && (
        <EditRulesModal
          rulesModal={rulesModal}
          setRulesModal={setRulesModal}
          rowsIds={rowsIds}
        />
      )}
      {taskModal && (
        <TaskModal
          taskModal={taskModal}
          setTaskModal={setTaskModal}
          rowsIds={rowsIds}
        />
      )}
    </CustomModal>
  );
}
