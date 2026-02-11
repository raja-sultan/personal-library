import { InterviewDesk } from "@assets/icons";
import { ClockIcon } from "@assets/icons/clock-icon";
import CustomCard from "@components/custom-card";
import { NoDataFound } from "@components/no-data";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ThemeModeColor } from "@root/utils";
import { useEffect, useRef, useState } from "react";

import {
  useAddNewCommentMutation,
  useDeleteCommentMutation,
  useGetMemberUpdatesQuery,
  useGetSingleUpdateQuery,
} from "@services/updates/updates-api";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { QuestionWithComment } from "@components/question-with-comment";
import toast from "react-hot-toast";
import EmojiList from "@components/emoji-reactions/emoji-list";
import { useMarkUpdateMutation } from "@services/my-team/updates/updates-api";

export function Update({ firstName = "", lastName = "" }): JSX.Element {
  const [status, setStatus] = useState<any>("current");
  const searchParams = useSearchParams();
  const userID = searchParams.get("id");

  const [addComment] = useAddNewCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [markUpdates] = useMarkUpdateMutation({});

  const handlerMark = async (): Promise<void> => {
    try {
      await markUpdates({ id: active }).unwrap();
      toast.success("Review Updated");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "something went wrong");
    }
  };
  const { data: memberUpdatesData } = useGetMemberUpdatesQuery({
    memberId: userID,
  });

  const singleId =
    memberUpdatesData?.data?.[0]?.currentUpdates?.[0]?._id ||
    memberUpdatesData?.data?.[0]?.pastUpdates?.[0]?._id ||
    null;

  const [active, setActive] = useState<any>(
    singleId !== undefined ? singleId : null
  );

  const activeRef = useRef<any>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    setActive(singleId !== undefined ? singleId : null);
  }, [singleId]);

  const {
    data: singleData,
    isLoading,
    refetch,
  } = useGetSingleUpdateQuery({
    id: active,
  });

  const fromDate = dayjs(singleData?.data?.from).format("MMMM DD");

  const toDate = dayjs(singleData?.data?.to).format("DD");

  const emojiNumbersMap = {
    Terrible: 0,
    Bad: 1,
    Okay: 2,
    Good: 3,
    Great: 4,
  };

  const foundEntry: [string, number] | undefined = Object.entries(
    emojiNumbersMap
  ).find(([_key, value]) => singleData?.data?.sentimentScore === value);

  return (
    <Grid container spacing={2}>
      <Grid item md={2.2} xs={12}>
        <CustomCard cardProps={{ sx: { height: "100%" } }}>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="neutral.500"
              mb="16px"
              mt="16px"
            >
              Current
            </Typography>
            {memberUpdatesData?.data[0]?.currentUpdates?.map((item) => (
              <Box
                key={item?._id}
                sx={styles.items(
                  item?._id,
                  active === null ? item?._id : active
                )}
                onClick={() => {
                  setActive(item?._id);
                  setStatus("current");
                }}
              >
                <Typography
                  variant="body1"
                  className="title"
                  fontWeight={600}
                  color={ThemeModeColor("neutral.700", "neutral.50")}
                >
                  {dayjs(item?.from).format("MMM DD")} -{" "}
                  {dayjs(item?.to).format("MMM DD")}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="neutral.500"
              mb="16px"
              mt="16px"
            >
              Past
            </Typography>
            {memberUpdatesData?.data[0]?.pastUpdates?.map((item) => (
              <Box
                key={item?._id}
                sx={styles.items(item?._id, active)}
                onClick={() => {
                  setActive(item?._id);
                  setStatus("past");
                }}
              >
                <Typography
                  variant="body1"
                  className="title"
                  fontWeight={600}
                  color={ThemeModeColor("neutral.700", "neutral.50")}
                >
                  {dayjs(item?.from).format("MMM DD")} -{" "}
                  {dayjs(item?.to).format("MMM DD")}
                </Typography>
              </Box>
            ))}
          </Box>
        </CustomCard>
      </Grid>

      <Grid item md={9.8} xs={12}>
        <CustomCard
          cardProps={{ sx: { height: "100%" } }}
          subHeader
          cardSubHeader={{
            title: status === "current" ? "Current Update" : "Past Update",
            description: `${fromDate} - ${toDate}`,

            actions: (
              <>
                {singleData?.data?.status === "Reviewed" ? (
                  <Box>
                    <Typography
                      display="flex"
                      alignItems="center"
                      gap="25px"
                      variant="subtitle2"
                      color="neutral.500"
                    >
                      <ClockIcon />
                      Published publicly -
                      {dayjs(singleData?.data?.publishedAt).format(
                        "MMMM DD, YYYY @ h:mm A"
                      )}{" "}
                      | Reciewed -
                      {dayjs(singleData?.data?.reviewedAt).format(
                        "MMMM DD, YYYY @ h:mm A"
                      )}{" "}
                    </Typography>
                  </Box>
                ) : (
                  <Box display="flex" alignItems="center" gap="25px">
                    {
                      singleData?.data?.status === "Shared" && (<Typography
                        display="flex"
                        alignItems="center"
                        gap="25px"
                        variant="subtitle2"
                        color="neutral.500"
                      >

                        <ClockIcon />
                        Published publicly -
                        {dayjs(singleData?.data?.from).format(
                          "MMMM DD, YYYY @ h:mm A"
                        )}
                      </Typography>)
                    }

                    {
                      singleData?.data?.status === "Shared" && <Button onClick={handlerMark} variant="contained">
                        Mark as reviewed
                      </Button>
                    }


                  </Box>
                )}
              </>
            ),
          }}
        >
          <Box sx={isLoading ? loaderStyle : qusestion}>
            {singleData?.data?.status === "Draft" ? (
              <NoDataFound
                icon={<InterviewDesk sx={{ mb: "24px" }} />}
                description={`${firstName} ${lastName} hasn’t shared his update for this week just yet`}
              />
            ) : (
              <>
                {singleData?.data?.points?.map((obj, idx) => (
                  <QuestionWithComment
                    _id={obj?._id}
                    key={obj?._id}
                    handlePost={(comment) => {
                      addComment({
                        id: singleData?.data?._id,
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
                        id: singleData?.data?._id,
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
                      time: dayjs().to(dayjs(obj?.createdAt)),
                      userInfo: {
                        fullName: `${comment?.user?.firstName} ${comment?.user?.lastName}`,
                        profileImage: comment?.user?.profileImage,
                      },
                    }))}
                  />
                ))}
                {singleData?.data?.sentimentScoreEnabled && (
                  <Box sx={{ pl: "0px" }}>
                    <Box display="flex" gap="20px">
                      <Typography variant="subtitle1" fontWeight={600}>
                        Q{singleData?.data?.points.length + 1}: Challenges you
                        faced during this month?
                      </Typography>
                    </Box>
                    <EmojiList
                      key="emoji"
                      onEmojiClick={() => { }}
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
      </Grid >
    </Grid >
  );
}

const styles = {
  items:
    (id: string, activeId: string) =>
      ({ palette: { primary, neutral } }) => ({
        borderRadius: "8px",
        padding: "8px 24px",
        background: id === activeId ? primary.main : primary.lightest,
        mb: "16px",
        cursor: "pointer",
        "&:last-child": {
          mb: 0,
        },
        "& .title": {
          color: id === activeId ? neutral[50] : neutral[700],
        },
      }),
};

const loaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vh",
};

const qusestion = {
  overflowY: "scroll",
  height: { xs: "60rem", sm: "60vh", md: "58vh", lg: "65vh" },
  "&::-webkit-scrollbar": {
    width: "0px",
  },
};
