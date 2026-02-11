import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropIcon } from "@assets/icons/drag-and-drop-icon";
import { EditIcon } from "@assets/icons/edit-icon";
import CustomModal from "@components/custom-modal";
import { useQuestions } from "./use-questions";
import { CircleDeleteIcon } from "@assets/icons";

export function Questions(): React.JSX.Element {
  const {
    openCustomModal,
    setOpenCustomModal,
    openDeleteModal,
    isEdit,
    setQuestionId,
    questions,
    handleOpenModal,
    handleOpenDeleteModal,
    handleDeleteDiscussion,
    questionId,
    isLoading,
    inputValue,
    handleSubmit,
    handleInputChange,
  } = useQuestions();
  return (
    <>
      <Stack direction="row" my={1}>
        <Box sx={{ flex: "45%" }}>
          <Typography variant="body2" fontWeight={600}>
            Questions
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            The default questions for the company
          </Typography>
        </Box>
        <Box sx={{ flex: "55%", textAlign: "right" }}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="medium"
            onClick={() => {
              handleOpenModal("");
            }}
          >
            Add Question
          </Button>
        </Box>
      </Stack>
      <Box sx={isLoading ? loaderStyle : null}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          questions?.data
            .map((item) => (
              <Box
                key={item._id}
                display="flex"
                alignItems="center"
                gap={2}
                width="100%"
                mt="1.6rem"
                sx={{ border: "1px solid #EAECF0", borderRadius: "8px" }}
              >
                <Box p="2.4rem 1.6rem" pr={0}>
                  <DragDropIcon />
                </Box>
                <Typography
                  flex={1}
                  minHeight="80px"
                  borderLeft="1px solid #EAECF0"
                  py="2.4rem"
                  pl="1.6rem"
                  variant="subtitle1"
                  fontWeight={400}
                  style={{ wordBreak: "break-all" }}
                >
                  {item.text}
                </Typography>
                <Box pr="1.6rem" display="flex" gap="1.5rem">
                  <EditIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleOpenModal("Edit", item.text);
                      setQuestionId(item._id);
                    }}
                  />
                </Box>
              </Box>
            ))
            .reverse()
        )}
      </Box>

      {openCustomModal && (
        <CustomModal
          open={openCustomModal}
          onClose={() => {
            setOpenCustomModal(false);
          }}
          title={isEdit ? "Edit Question" : "Add Question"}
          hideFooter
          headerIcon={false}
          message={false}
        >
          <Stack direction="column" spacing={2}>
            <Box>
              <Typography variant="body2" mb="0.6rem" fontWeight={600}>
                Question
              </Typography>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                name="question"
                fullWidth
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            </Box>
            <Box
              display="flex"
              justifyContent={isEdit ? "space-between" : "flex-end"}
            >
              {isEdit && (
                <CircleDeleteIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    handleOpenDeleteModal();
                    setQuestionId(questionId);
                  }}
                />
              )}
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenCustomModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!inputValue}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  {isEdit ? "Save" : "Add"}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CustomModal>
      )}

      {openDeleteModal && (
        <CustomModal
          message=" This will be permanently deleted from Personnel Library .Are you sure you want to delete this question"
          open={openDeleteModal}
          onClose={handleOpenDeleteModal}
          onAccept={handleDeleteDiscussion}
        />
      )}
    </>
  );
}
const loaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
};