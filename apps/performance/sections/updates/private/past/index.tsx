"use client";
import React, { useState } from "react";
import { Button, Typography, Stack, Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import CustomCard from "@components/custom-card";
import CustomModal from "@components/custom-modal";
import { ClockIcon } from "@assets/icons/clock-icon";
import { QuestionWithComment } from "@components/question-with-comment";
import {
  useGetSingleUpdateQuery,
  useAddNewCommentMutation,
  useDeleteCommentMutation,
  useClearUpdateMutation,
} from "@services/updates/updates-api";
import dayjs from "dayjs";
import EmojiList from "@components/emoji-reactions/emoji-list";
import toast from "react-hot-toast";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

function PrivatePastUpdates(): JSX.Element {
  const [openClearModal, setOpenClearModal] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const updateId = searchParams.get("id");
  const { data: singleUpdate } = useGetSingleUpdateQuery({ id: updateId });
  const singleUpdateData = singleUpdate?.data;

  const [addComment] = useAddNewCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [clearUpdate] = useClearUpdateMutation();

  const fromFormatted = dayjs(singleUpdateData?.publishedAt).format("MMM DD");
  const toFormatted = dayjs(singleUpdateData?.to).format("MMM DD");
  const publishedDate = dayjs(singleUpdateData?.publishedAt).format(
    "MMM DD YYYY"
  );

  const publishedAt = dayjs(singleUpdateData?.publishedAt);
  let hour = publishedAt.hour();
  const minute = publishedAt.minute();
  const amOrPm = hour < 12 ? "AM" : "PM";
  hour = hour % 12 || 12;

  const publishedAtFormatted = `${hour}:${minute.toString().padStart(2, "0")} ${amOrPm}`;

  function getMood(index) {
    const moods = ["Terrible", "Bad", "Okay", "Good", "Great"];
    if (index >= 0 && index < moods.length) {
      return moods[index];
    } else {
      return "Invalid index";
    }
  }
  const mood = getMood(singleUpdateData?.sentimentScore) as string | null;

  const handleClearUpdate = () => {
    clearUpdate({ id: updateId })
      .unwrap()
      .then(() => {
        toast.success("Update Cleared successfully!");
      })
      .catch(() => {
        toast.error("Error Clearing update!");
      });
  };

  const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.UPDATES.UPDATES





  return (
    <CustomCard
      subHeader
      cardSubHeader={{
        title: "Past Update",
        description: fromFormatted + " - " + toFormatted,
        actions: (
          <Stack direction="row" alignItems="center" spacing={1}>
            <ClockIcon />
            <Typography variant="subtitle2" color="#667085" fontSize="14px">
              {`Published Publicly ${publishedDate} @ ${publishedAtFormatted}`}
            </Typography>
            <PermissionProtected permission={PERMISSION.UPDATE}>
              <Button
                onClick={() => {
                  router.push(`?type=current&id=${updateId}&mode=edit`);
                }}
                variant="outlined"
                size="small"
                sx={{ padding: "7px 12px" }}
              >
                Edit
              </Button>
            </PermissionProtected>
            <Button
              onClick={() => {
                setOpenClearModal(true);
              }}
              variant="outlined"
              size="small"
              sx={{ padding: "7px 12px" }}
            >
              Clear
            </Button>
          </Stack>
        ),
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignContent="center"
        spacing={3}
      >
        {singleUpdateData?.points.map((obj, idx) => (
          <QuestionWithComment
            key={obj?._id}
            removePadding
            handlePost={(comment) => {
              addComment({
                id: singleUpdateData?._id,
                pointId: comment?._id,
                comment: comment.newComment,
              })
                .unwrap()
                .then(() => {
                  toast.success("Comment Added successfully!");
                })
                .catch(() => {
                  toast.error("Error posting comment!");
                });
            }}
            handleDeleteComment={(ids) => {
              const { _id, _commentId } = ids;

              deleteComment({
                id: singleUpdateData?._id,
                pointId: _id,
                _commentId,
              })
                .unwrap()
                .then(() => {
                  toast.success("Comment deleted successfully!");
                })
                .catch(() => {
                  toast.error("Error deleting comment!");
                });
            }}
            handleReaction={(reaction) => {
              console.log(reaction);
            }}
            {...obj}
            title={`Q${idx + 1}: ${obj?.question}`}
            description={
              obj?.answer === ""
                ? "Empty answer from API. API integrated"
                : obj?.answer
            }
            comments={obj?.comments.map((comment) => {
              return {
                commentId: comment?._id,
                comment: comment?.text,
                // time: new Date().toLocaleString(),
                userInfo: {
                  fullName: `${comment?.user?.firstName} ${comment?.user?.lastName}`,
                  profileImage: "url/to/profile/image.jpg",
                },
              };
            })}
          />
        ))}
        {singleUpdateData?.sentimentScoreEnabled && (
          <Box sx={{ pl: "0px" }}>
            <Box display="flex" gap="20px">
              <Typography variant="subtitle1" fontWeight={600}>
                Q{singleUpdateData?.points.length + 1}: Challenges you faced
                during this month?
              </Typography>
            </Box>
            <EmojiList
              key="emoji"
              onEmojiClick={() => { }}
              selectedEmoji={mood}
              rootSx={{
                mt: "24px",
                flexWrap: "wrap",
              }}
            />
          </Box>
        )}
      </Stack>
      {openClearModal && (
        <CustomModal
          open={openClearModal}
          title="Are you sure?"
          acceptText="Clear"
          onClose={() => {
            setOpenClearModal(!openClearModal);
          }}
          acceptButtonProps={{
            onClick: () => {
              handleClearUpdate();
              setOpenClearModal(!openClearModal);
            },
          }}
          message="Are you sure you want to clear your update? You will not be able to recover your responses and will need to re-submit your update."
        />
      )}
    </CustomCard>
  );
}

export default PrivatePastUpdates;
