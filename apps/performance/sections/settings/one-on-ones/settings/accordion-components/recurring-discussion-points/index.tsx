import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropIcon } from "@assets/icons/drag-and-drop-icon";
import { EditIcon } from "@assets/icons/edit-icon";
import { DeleteIconCurrentColor } from "@assets/icons/delete-icon-current-color";
import CustomModal from "@components/custom-modal";
import { FormProvider, RHFTextField } from "common";
import { useRecurringDiscussionPoints } from "./use-recurring-discussion-points";

export function RecurringDiscussionPoints(): React.JSX.Element {
  const {
    openCustomModal,
    setOpenCustomModal,
    openDeleteModal,
    isEdit,
    setActivePointId,
    discussionPoints,
    handleOpenModal,
    handleOpenDeleteModal,
    handleDeleteDiscussion,
    methods,
    handleSubmit,
    reset,
    onSubmit,
  } = useRecurringDiscussionPoints();
  
  return (
    <Box>
      <Stack direction="row">
        <Box sx={{ flex: "45%" }}>
          <Typography variant="subtitle2" fontWeight={400} color="neutral.500">
            These discussion points will be added to every future 1 on 1
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
            Add Discussion Points
          </Button>
        </Box>
      </Stack>
      <Box>
        {discussionPoints?.map((item) => (
          <Box
            key={item.id}
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
              variant="subtitle2"
              fontWeight={400}
              color="neutral.500"
              style={{ wordBreak: "break-all" }}
            >
              {item.text}
            </Typography>
            <Box pr="1.6rem" display="flex" gap="1.5rem">
              <EditIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("Edit", item?.text);
                  setActivePointId(item?._id);
                }}
              />

              <DeleteIconCurrentColor
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenDeleteModal();
                  setActivePointId(item?._id);
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {openCustomModal && (
        <CustomModal
          open={openCustomModal}
          onClose={() => {
            setOpenCustomModal(false);
            reset();
          }}
          title={isEdit ? "Edit Discussion Point" : "Add Discussion Point"}
          hideFooter
          headerIcon={false}
          message={false}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={2}>
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="neutral.700"
                  mb="0.6rem"
                >
                  Discussion Point
                </Typography>
                <RHFTextField
                  name="discussionPoint"
                  type="text"
                  variant="outlined"
                  placeholder="Enter a description"
                  defaultValue="new edit"
                  fullWidth
                  multiline
                  rows={3}
                />
              </Box>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenCustomModal(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  {isEdit ? "Update" : "Add"}
                </Button>
              </Stack>
            </Stack>
          </FormProvider>
        </CustomModal>
      )}

      {openDeleteModal && (
        <CustomModal
          message=" This will be permanently deleted from Personnel Library .Are you sure you want to delete this 1-on-1 template"
          open={openDeleteModal}
          onClose={handleOpenDeleteModal}
          onAccept={handleDeleteDiscussion}
        />
      )}
    </Box>
  );
}
