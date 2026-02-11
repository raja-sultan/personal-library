"use client";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  CustomCareerVision,
  // RenderUserInfo,
  RenderUserInfoWithAction,
} from "../custom-career-vision";
import { useContent } from "./use-career-vision-content";
import CustomModal from "@components/custom-modal";
import { NoDataFound } from "@components/no-data";
import { NoContent } from "common";

export function CareerVisionContent({ data }): JSX.Element {
  const {
    onSubmit,
    isOpenDeleteModal,
    onDeleteModalHandler,
    setIsOpenDeleteModal,
    getComments,
    handleEditSubmit,
    handleInputChange,
    handleOpenModal,
    setOpenCustomModal,
    handleDelete,
    openCustomModal,
    inputValue,
    isLoading,
  } = useContent({ data });

  return (
    <>
      <Box mt={0}>
        <CustomCareerVision
          title={data?.name}
          description={data?.description}
          handlePost={onSubmit}
        />
        <Box mt={2.4} mb={2.4}>
          <Box sx={isLoading ? loaderStyle : null}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {getComments?.data?.length > 0 ? (
                  <RenderUserInfoWithAction
                    data={getComments}
                    handleEdit={handleOpenModal}
                    handleDelete={handleDelete}
                  />
                ) : (
                  <NoDataFound
                    isCustomCard
                    sx={{ height: "40vh", marginTop: "2rem" }}
                    icon={<NoContent />}
                  />
                )}
                <CustomModal
                  open={isOpenDeleteModal}
                  onClose={() => {
                    setIsOpenDeleteModal(!isOpenDeleteModal);
                  }}
                  onAccept={onDeleteModalHandler}
                />
              </>
            )}
          </Box>
        </Box>
      </Box>
      {openCustomModal && (
        <CustomModal
          open={openCustomModal}
          onClose={() => {
            setOpenCustomModal(false);
          }}
          title="Edit Comment"
          hideFooter
          headerIcon={false}
          message={false}
        >
          <Stack direction="column" spacing={2}>
            <Box>
              <Typography variant="body2" mb="0.6rem" fontWeight={600}>
                comment
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
            <Box display="flex" justifyContent="flex-end">
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
                  onClick={handleEditSubmit}
                >
                  Save
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CustomModal>
      )}
    </>
  );
}

const loaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "40vh",
};
