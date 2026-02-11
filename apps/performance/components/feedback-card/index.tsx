"use client";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
  AvatarGroup,
  Box,
  Button,
  Card,
  Stack,
  Typography,
} from "@mui/material";

import { styles } from "@components/feedback-card/feedback-card.styles";
import { GlobalAvatar } from "@components/global-avatar";
import { EmojiSmileIcon } from "@assets/icons/emoji-smile-icon";
import {
  emojiList,
  iconComponents,
  reactionIcons,
} from "@components/feedback-card/feedback-card.data";

export function FeedbackCard({
  viewOnly = false,
  handleEmojiClick,
  handleFeedbackDecline,
  handleFeedbackDelete,
  ...item
}: any): JSX.Element {
  const [showEmojiCard, setShowEmojiCard] = useState<boolean>(false);

  const myRef = useRef<HTMLDivElement>(null);

  const date = (item?.date && new Date(item.date)) || "";
  const userId = useSelector((state: any) => state?.auth?.user?._id);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (myRef.current && !myRef.current.contains(event.target as Node)) {
        setShowEmojiCard(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const openEmojiReactionCard = (): void => {
    !viewOnly && setShowEmojiCard(true);
  };

  const renderRatingIcon = (ratingKey: string): JSX.Element | null => {
    return iconComponents[ratingKey] || null;
  };

  const renderReactionIcon = (ratingKey: string): JSX.Element | null => {
    return reactionIcons[ratingKey] || null;
  };

  return (
    <Card sx={styles.cardWrapper} className="feedback_card">
      <Stack spacing={2.4} px="15px">
        <Box display="flex" alignItems="start" gap={1.6}>
          <AvatarGroup sx={styles.avatarGroup}>
            {item?.requester?._id && (
              <GlobalAvatar
                width="28px"
                height="28px"
                imgUrl={item?.requester?.profileImage}
                firstName={item?.requester?.firstName}
                lastName={item?.requester?.lastName}
              />
            )}
            {item?.sender?._id && !item?.requester?._id && (
              <GlobalAvatar
                width="28px"
                height="28px"
                imgUrl={item?.sender?.profileImage}
                firstName={item?.sender?.firstName}
                lastName={item?.sender?.lastName}
              />
            )}

            <GlobalAvatar
              width="28px"
              height="28px"
              sx={styles.avatar}
              imgUrl={item?.receiver?.profileImage}
              firstName={item?.receiver?.firstName}
              lastName={item?.receiver?.lastName}
            />
          </AvatarGroup>
          <Box>
            {item?.type === "Request Feedback" && (
              <Typography color="neutral.700" variant="body2">
                <Box component="span" color="neutral.800" fontWeight={600}>
                  {item?.requester?._id === userId
                    ? "You"
                    : `${item?.requester?.firstName} ${item?.requester?.lastName}`}
                </Box>
                &nbsp;requested feedback from&nbsp;
                <Box component="span" color="neutral.800" fontWeight={600}>
                  {item?.sender?.firstName} {item?.sender?.lastName}
                </Box>
                &nbsp;about&nbsp;
                <Box component="span" color="neutral.800" fontWeight={600}>
                  {item?.receiver?.firstName} {item?.receiver?.lastName}
                </Box>
              </Typography>
            )}
            {item?.type === "Give Feedback" &&
              item?.receiver?._id !== userId && (
                <Typography color="neutral.700" variant="body2">
                  <Box component="span" color="neutral.800" fontWeight={600}>
                    You
                  </Box>
                  {" gave feedback to "}
                  <Box component="span" color="neutral.800" fontWeight={600}>
                    {item?.receiver?.firstName} {item?.receiver?.lastName}
                  </Box>
                </Typography>
              )}
            {item?.type === "Private Note" && (
              <Typography color="neutral.700" variant="body2">
                <Box component="span" color="neutral.800" fontWeight={600}>
                  You
                </Box>
                {" saved private note about "}
                <Box component="span" color="neutral.800" fontWeight={600}>
                  {item?.receiver?.firstName} {item?.receiver?.lastName}
                </Box>
              </Typography>
            )}
            {item?.receiver?._id === userId && (
              <Typography color="neutral.700" variant="body2">
                <Box component="span" color="neutral.800" fontWeight={600}>
                  You
                </Box>
                {" recieved feedback from "}
                <Box component="span" color="neutral.800" fontWeight={600}>
                  {item?.sender?.firstName} {item?.sender?.lastName}
                </Box>
              </Typography>
            )}
            {date && (
              <Typography
                mt={0.2}
                variant="subtitle2"
                fontWeight={400}
                color="neutral.500"
              >
                {format(date, "MMMM d, yyyy")}
              </Typography>
            )}
          </Box>
        </Box>
        {(item?.senderFeedbackText || item?.requesterFeedbackText) && (
          <Box sx={styles.cardDescWrapper}>
            <Typography
              variant="subtitle2"
              fontWeight={400}
              color="neutral.700"
            >
              {item.senderFeedbackText || item.requesterFeedbackText}
            </Typography>
          </Box>
        )}
      </Stack>
      <Box>
        <Box
          mt={2.4}
          px="15px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap={1.6}>
            {item?.rating && (
              <>
                <Typography variant="body2" color="neutral.700">
                  Rating:
                </Typography>
                <Box display="flex" alignItems="center">
                  {renderRatingIcon(item.rating)}
                  <Typography ml={0.8} variant="body2" color="neutral.500">
                    ({item.rating})
                  </Typography>
                </Box>
              </>
            )}
          </Box>
          <Box sx={styles.privacyTextWrapper}>
            <Typography variant="subtitle2" fontWeight={600}>
              {item?.visibility ?? "N/A"}
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.reactionContainer}>
          {!item?.requester?._id &&
            item?.visibility !== "Private" &&
            Object.keys(item?.reactions).map((key) => {
              const values = item.reactions[key];
              if (Array.isArray(values) && values.length > 0) {
                return (
                  <Box
                    key={item?.requester?._id}
                    display="flex"
                    alignItems="center"
                    gap={0.4}
                    sx={styles.reactionEmojiWrapper(viewOnly)}
                  >
                    {renderReactionIcon(key)}

                    <Typography
                      variant="caption"
                      fontWeight={400}
                      color="neutral.500"
                    >
                      {values.length}
                    </Typography>
                  </Box>
                );
              }
              return null;
            })}

          {!item?.requester?._id && item?.visibility !== "Private" && (
            <Box position="relative">
              <Box
                sx={styles.reactionEmojiWrapper(viewOnly)}
                onClick={openEmojiReactionCard}
              >
                <EmojiSmileIcon height="16px" width="16px" />
              </Box>
              {showEmojiCard && (
                <Card sx={styles.emojiListWrapper} ref={myRef}>
                  <Box display="flex" gap={1.5}>
                    {emojiList.map((emoji) => (
                      <Box
                        key={emoji.id}
                        onClick={() => {
                          handleEmojiClick(item?._id, emoji.id);
                        }}
                        sx={styles.reactionEmoji}
                      >
                        {emoji.component}
                      </Box>
                    ))}
                  </Box>
                </Card>
              )}
            </Box>
          )}

          {item?.visibility === "Private" && (
            <Button
              onClick={() => {
                !viewOnly && handleFeedbackDelete(item?._id);
              }}
              variant="outlined"
              size="small"
              fullWidth
              sx={styles.deleteBtn}
            >
              Delete
            </Button>
          )}

          {item?.requester?._id && item?.visibility !== "Private" && (
            <Box display="flex" gap="12px" width="100%">
              <Button
                onClick={() => {
                  !viewOnly && handleFeedbackDecline(item?._id);
                }}
                size="small"
                variant="outlined"
                fullWidth
                sx={styles.deleteBtn}
              >
                Decline
              </Button>
              <Button
                disabled
                size="small"
                variant="outlined"
                fullWidth
                sx={styles.requestedBtn}
              >
                Feedback Requested
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
}
