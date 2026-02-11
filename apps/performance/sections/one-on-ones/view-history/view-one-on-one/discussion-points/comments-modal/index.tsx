import React from "react";
import dayjs, { extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CustomModal from "@components/custom-modal";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import useCommentModal from "./use-comment-modal";
import { type Theme } from "@mui/material";
import { CustomPopover } from "@components/custom-popover";
import { GlobalAvatar } from "@components/global-avatar";
import CommentSkelton from "./comment-skelton";
import { useGetProfileQuery } from "@services/profile/profile-api";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { CustomLoader } from "@components/loader";

extend(relativeTime);

export function CommentsModal({
  onOpen,
  onClose,
  pointId,
  currentUser,
  heading,
}): JSX.Element {
  const { data: profileData } = useGetProfileQuery({});
  const {
    comment,
    inputRef,
    commentValue,
    allComments,
    isLoading,
    commentToEdit,
    editHandler,
    handleCommentActions,
    handleChange,
    addNewComment,
    isAddLoading,
    isDeleteLoading,
    isUpdatedCommentLoading,
  } = useCommentModal(pointId);

  return (
    <CustomModal
      title={heading}
      headerIcon={false}
      message={false}
      open={onOpen}
      onClose={onClose}
      onAccept={addNewComment}
      isLoading={isAddLoading}
      acceptButtonProps={{ color: "primary", disabled: !commentValue }}
      acceptText="Post Comment"
    >
      {(isDeleteLoading || isUpdatedCommentLoading) && <CustomLoader />}
      <Box sx={styles.commentsSection}>
        {isLoading ? (
          <CommentSkelton />
        ) : (
          allComments?.data?.map((item: any) => (
            <Box sx={styles.commentWrapper} key={item?._id}>
              <Box display="flex" alignItems="flex-start">
                <Box
                  display="flex"
                  flex={1}
                  gap="10px"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <GlobalAvatar
                    imgUrl={item?.user?.profileImage ?? ""}
                    firstName={item?.user?.firstName}
                    lastName={item?.user?.lastName}
                  />
                  <Box sx={styles.userInfo}>
                    <Typography
                      variant="body2"
                      color="neutral.700"
                      fontWeight={700}
                    >
                      {item?.user?.firstName} {item?.user?.lastName}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="neutral.500"
                      fontWeight={600}
                    >
                      {dayjs(item?.createdAt).fromNow()}
                    </Typography>
                  </Box>
                </Box>

                <CustomPopover
                  iconButton
                  options={["Edit", "Delete"]}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  handleChange={(type: string) => {
                    handleCommentActions(item, type);
                  }}
                />
              </Box>
              {commentToEdit !== item?._id ? (
                <Typography
                  fontWeight={400}
                  variant="subtitle2"
                  color="neutral.500"
                  mt="12px"
                >
                  {item?.text}
                </Typography>
              ) : (
                <Box
                  display="flex"
                  gap="12px"
                  mt="12px"
                  sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
                >
                  <TextField
                    name="editComment"
                    value={comment}
                    size="small"
                    inputRef={inputRef}
                    onChange={(event) => {
                      handleChange(event, true);
                    }}
                    variant="outlined"
                    fullWidth
                  />
                  <Box display="flex" gap="12px">
                    <IconButton
                      size="small"
                      onClick={() => {
                        editHandler("Submit", item?._id);
                      }}
                      disabled={!comment}
                    >
                      <CheckCircleOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        editHandler("Cancel", item?._id);
                      }}
                    >
                      <HighlightOffOutlinedIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Box>
          ))
        )}
      </Box>
      <Box display="flex" alignItems="flex-start" gap="10px">
        <GlobalAvatar
          imgUrl={profileData?.data?.profileImage}
          firstName={profileData?.data?.firstName}
          lastName={profileData?.data?.lastName}
        />
        <Box flex={1}>
          <TextField
            name="comment"
            value={commentValue}
            onChange={(event) => {
              handleChange(event, false);
            }}
            variant="outlined"
            multiline
            minRows={3}
            fullWidth
            placeholder="Enter a description..."
          />
          <Typography variant="subtitle2" fontWeight={400} color="neutral.500">
            These comments will be shared with {currentUser?.firstName}{" "}
            {currentUser?.lastName}
          </Typography>
        </Box>
      </Box>
    </CustomModal>
  );
}

const styles = {
  commentsSection: {
    maxHeight: "250px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#CACACA",
      borderRadius: "10px",
    },
  },
  commentWrapper: {
    background: "#FAFAFF",
    borderRadius: "8px",
    padding: "14px 24px",
    mb: "24px",
  },
  userInfo: (theme: Theme) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    [theme.breakpoints.down(384)]: {
      gap: "5px",
    },
  }),
};
