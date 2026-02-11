"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import CustomCard from "@components/custom-card";
import { Stack } from "@mui/system";
import { ClockIcon } from "@assets/icons/clock-icon";
import { GlobalAvatar } from "@components/global-avatar";
import { QuestionWithComment } from "@components/question-with-comment";
import { useGetSingleUpdateQuery } from "@services/updates/updates-api";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import EmojiList from "@components/emoji-reactions/emoji-list";

function PublicUpdates(): JSX.Element {
  const searchParams = useSearchParams();

  const updateId = searchParams.get("id");
  const { data: singleUpdate } = useGetSingleUpdateQuery({ id: updateId });
  const singleUpdateData = singleUpdate?.data;
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

  return (
    <CustomCard>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ backgroundColor: "#FAFAFF", padding: 3, marginBottom: 2 }}
      >
        <GlobalAvatar
          firstName="Ronald"
          lastName="Richards"
          imgUrl=""
          width={60}
          height={60}
        />
        <Box>
          <Typography variant="subtitle1" color="#101828" fontSize="18px">
            Ronald Richards
          </Typography>
          <Typography variant="subtitle2" color="#667085" fontSize="14px">
            Mid Business Analyst
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="space-between" height="90px">
        <Box>
          <Typography variant="subtitle1" color="#101828" fontSize="18px">
            Public Updates
          </Typography>
          <Typography variant="subtitle2" color="#667085" fontSize="14px">
            {dayjs(singleUpdateData?.from).format("MMM DD") +
              " - " +
              dayjs(singleUpdateData?.to).format("MMM DD")}
          </Typography>
        </Box>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <ClockIcon />
            <Typography variant="subtitle2" color="#667085" fontSize="14px">
              {`Published Publicly ${publishedDate} @ ${publishedAtFormatted}`}
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignContent="center"
        spacing={3}
      >
        {singleUpdateData?.points?.map((obj, idx) => (
          <QuestionWithComment
            key={obj?._id}
            removePadding
            hideComments
            handlePost={(comment) => {
              console.log(comment);
            }}
            handleDeleteComment={(commentId) => {
              console.log(commentId);
            }}
            handleReaction={(reaction) => {
              console.log(reaction);
            }}
            {...obj}
            title={`Q${idx + 1}: Is there any blocker you have for this week tasks?`}
            description={obj?.answer}
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
              onEmojiClick={() => {}}
              selectedEmoji={mood}
              rootSx={{
                mt: "24px",
                flexWrap: "wrap",
              }}
            />
          </Box>
        )}
      </Stack>
    </CustomCard>
  );
}

export default PublicUpdates;
