import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropIcon } from "@assets/icons/drag-and-drop-icon";
import { EditIcon } from "@assets/icons/edit-icon";
import { DeleteIconCurrentColor } from "@assets/icons/delete-icon-current-color";
import CustomModal from "@components/custom-modal";
import DynamicDropdown from "@components/dynamic-dropdown";
import { FormProvider, RHFTextField } from "common";
import { useSuggestedDiscussionPoint } from "./use-suggested-discussiont-point";

export function SuggestedDiscussionPoints(): React.JSX.Element {
  const {
    openCustomModal,
    setOpenCustomModal,
    openDeleteModal,
    isEdit,
    relationshipOptions,
    setActivePointId,
    deleteResource,
    addResource,
    methods,
    discussionPoints,
    handleSubmit,
    reset,
    onSubmit,
    handleOpenModal,
    handleOpenDeleteModal,
    handleDeleteDiscussion,
  } = useSuggestedDiscussionPoint();
  
  return (
    <Box>
      <Stack direction="row">
        <Box sx={{ flex: "45%" }}>
          <Typography variant="subtitle2" fontWeight={400} color='neutral.500'>
            These discussion points will be shown as suggested Discussion points
            in every 1on 1
          </Typography>
        </Box>
        <Box sx={{ flex: "55%", textAlign: "right" }}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="medium"
            onClick={() => {
              handleOpenModal("Add");
            }}
          >
            Add Discussion Points
          </Button>
        </Box>
      </Stack>
      <Box>
        {discussionPoints?.map((item) => (
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
            <Box flex={1}>
              <Typography
                borderLeft="1px solid #EAECF0"
                py="0.7rem"
                pl="1.6rem"
                variant="subtitle1"
                fontWeight={700}
                style={{ wordBreak: "break-all" }}
              >
                {item.category}
              </Typography>
              <Typography
                borderLeft="1px solid #EAECF0"
                py="0.7rem"
                pl="1.6rem"
                variant="subtitle1"
                fontWeight={400}
                style={{ wordBreak: "break-all" }}
              >
                {item.text}
              </Typography>
            </Box>
            <Box pr="1.6rem" display="flex" gap="1.5rem">
              <EditIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("Edit", item.category, item.text);
                  setActivePointId(item._id);
                }}
              />

              <DeleteIconCurrentColor
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenDeleteModal();
                  setActivePointId(item._id);
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
                <Typography variant="subtitle2" fontWeight={600} color='neutral.700' mb="0.6rem">
                  Category *
                </Typography>
                <DynamicDropdown
                  name="category"
                  addButtonText="Create new category"
                  fieldType="one_on_one_category"
                  addOption={addResource}
                  deleteOption={deleteResource}
                  options={relationshipOptions}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={600} color='neutral.700' mb="0.6rem">
                  Discussion Point
                </Typography>
                <RHFTextField
                  name="discussionPoint"
                  type="text"
                  variant="outlined"
                  placeholder="Enter a description"
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
          message="This will be permanently deleted from Personnel Library .Are you sure you want to delete this 1-on-1 template"
          open={openDeleteModal}
          onClose={handleOpenDeleteModal}
          onAccept={handleDeleteDiscussion}
        />
      )}
    </Box>
  );
}
