"use client";
import { ClockIcon } from "@assets/icons/clock-icon";
import CustomCard from "@components/custom-card";
import { QuestionWithComment } from "@components/question-with-comment";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { renderUserImage } from "@root/utils/render-user-image";
import { useRouter } from "next/navigation";
import { useViewSetting } from "./use-setting-view";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import EmojiList from "@components/emoji-reactions/emoji-list";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);

// Other imports remain the same

export function UpdatesView({ id }): JSX.Element {
  const {
    singleUpdate,
    user,
    addComment,
    refetch,
    deleteComment,
    isLoading,
    handlerMark,
  } = useViewSetting({ id });

  const router = useRouter();
  const emojiNumbersMap = {
    Terrible: 0,
    Bad: 1,
    Okay: 2,
    Good: 3,
    Great: 4,
  };

  const foundEntry: [string, number] | undefined = Object.entries(
    emojiNumbersMap
  ).find(([_key, value]) => singleUpdate?.data?.sentimentScore === value);

  return (
    <CustomCard
      header
      cardHeader={{
        title: (
          <Box display="flex" alignItems="center" gap="13.5px" flexWrap="wrap">
            <Typography variant="subtitle1" fontWeight={400}>
              Week of
              {dayjs(singleUpdate?.data?.updatedAt).format(" MMMM DD ")}
              Update Shared by
            </Typography>
            <Box display="flex" alignItems="center" gap="8px">
              {renderUserImage({
                profileImage: user?.[0]?.user?.profileImage,
                firstName: user?.[0]?.user?.firstName,
                lastName: user?.[0]?.user?.lastName,
              })}
              <Typography variant="subtitle1" fontWeight={400}>
                {user?.[0]?.user?.firstName} {user?.[0]?.user?.lastName}
              </Typography>
            </Box>
          </Box>
        ),
        divider: true,
        actions: (
          <>
            <Box display="flex" alignItems="center" gap="16px">
              <ClockIcon />
              <Typography
                color="neutral.500"
                variant="subtitle2"
                fontWeight={400}
              >
                Published publicly -
                {dayjs(singleUpdate?.data?.publishedAt).format(
                  " MMMM, DD ,YYYY @ HH:mm A"
                )}
              </Typography>
            </Box>

            {singleUpdate?.data?.reviewedAt ? (
              <Typography
                color="neutral.500"
                variant="subtitle2"
                fontWeight={400}
              >
                Reviewed -
                {dayjs(singleUpdate?.data?.reviewedAt).format(
                  " MMMM, DD ,YYYY @ HH:mm A"
                )}
              </Typography>
            ) : (
              <Button onClick={handlerMark} variant="contained" size="small">
                Mark as reviewed
              </Button>
            )}
          </>
        ),
        onBack: () => {
          router.push("/my-team?tab=2");
        },
      }}
    >
      <Box sx={isLoading ? loaderStyle : qusestion}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {singleUpdate?.data?.points?.map((obj, idx) => (
              <QuestionWithComment
                _id={obj?._id}
                key={obj?._id}
                handlePost={(comment) => {
                  addComment({
                    id: singleUpdate?.data?._id,
                    pointId: comment?._id,
                    comment: comment.newComment,
                  })
                    .unwrap()
                    .then(() => {
                      toast.success("Comment Added successfully!");
                      refetch();
                    })
                    .catch((error) => {
                      toast.error(
                        error?.data?.message || "Error posting comment!"
                      );
                    });
                }}
                handleDeleteComment={(ids) => {
                  const { _id, _commentId } = ids;
                  deleteComment({
                    id: singleUpdate?.data?._id,
                    pointId: _id,
                    commentId: _commentId,
                  })
                    .unwrap()
                    .then(() => {
                      toast.success("Comment deleted successfully!");
                      refetch();
                    })
                    .catch((error) => {
                      toast.error(
                        error?.data?.message || "Error deleting comment!"
                      );
                    });
                }}
                title={`Q${idx + 1}: ${obj?.question}`}
                description={
                  obj?.answer === ""
                    ? "Empty answer from API. API integrated"
                    : obj?.answer
                }
                comments={obj?.comments.map((comment) => ({
                  _commentId: comment?._id,
                  comment: comment?.text,
                  time: dayjs().to(dayjs(comment?.createdAt)),
                  userInfo: {
                    fullName: `${comment?.user?.firstName} ${comment?.user?.lastName}`,
                    profileImage: comment?.user?.profileImage,
                  },
                }))}
              />
            ))}
            {singleUpdate?.data?.sentimentScoreEnabled && (
              <Box sx={{ pl: "0px" }}>
                <Box display="flex" gap="20px">
                  <Typography variant="subtitle1" fontWeight={600}>
                    Q{singleUpdate?.data?.points.length + 1}: Challenges you
                    faced during this month?
                  </Typography>
                </Box>
                <EmojiList
                  key="emoji"
                  onEmojiClick={() => {}}
                  selectedEmoji={foundEntry?.[0]}
                  rootSx={{
                    mt: "24px",
                    ml: "35px",
                    flexWrap: "wrap",
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </CustomCard>
  );
}
const loaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vh",
};

const qusestion = {
  overflowY: "scroll",
  height: { xs: "60rem", sm: "60vh" ,md:"58vh",lg:"65vh"},
  "&::-webkit-scrollbar": {
    width: "0px",
  },
};
