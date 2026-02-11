"use client";
import React from "react";
import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css/skyblue";
import { ArrowBackIcon } from "@assets/icons/arrow-back-icon";
import { ThemeModeColor } from "@root/utils";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { GlobalAvatar } from "@components/global-avatar";

import {
  AvatarGroup,
  IconButton,
  Box,
  Card,
  Stack,
  Typography,
} from "@mui/material";
import {
  AngryIconActive,
  BadActiveIcon,
  GoodActiveIcon,
  GreatActiveIcon,
  HeartIconActive,
  OkayActiveIcon,
  ShockIconActive,
  TerribleActiveIcon,
  ThumbsUpIconActive,
} from "@assets/icons";
import type {
  LaunchPraiseWallProps,
  LaunchPraiseWallTypes,
} from "@sections/settings/feedback/settings/launch-praise-wall/launch-praise-wall-types";
import { styles } from "@sections/settings/feedback/settings/launch-praise-wall/launch-praise-wall.style";
import { useLaunchPraiseWall } from "./use-launch-praise-wall";
import dayjs from "dayjs";
import { EmojiSmileIcon } from "@assets/icons/emoji-smile-icon";

export function LaunchPraiseWall(props: LaunchPraiseWallProps): JSX.Element {
  const {
    viewOnly = false,
    startDate,
    endDate,
    slidesCount,
    isRedirect,
  } = props;
  const { launchPraiseWallData, router, slide } = useLaunchPraiseWall({
    startDate,
    endDate,
    slidesCount,
    isRedirect,
  });
  const time: any = Number(slidesCount) * 1000;
  const splideOptions: LaunchPraiseWallTypes = {
    type: "loop",
    autoplay: true,
    arrows: false,
    rewind: true,
    pagination: false,
    gap: "1rem",
    interval: time,
    mouse: false,
    drag: false,
  };

  const renderRatingIcon = (ratingKey: string): JSX.Element | null => {
    switch (ratingKey) {
      case "Good":
        return <GoodActiveIcon width="24px" height="24px" />;
      case "Great":
        return <GreatActiveIcon width="24px" height="24px" />;
      case "Bad":
        return <BadActiveIcon width="24px" height="24px" />;
      case "Okay":
        return <OkayActiveIcon width="24px" height="24px" />;
      case "Terrible":
        return <TerribleActiveIcon width="24px" height="24px" />;
      default:
        return null;
    }
  };

  const renderReactionIcon = (ratingKey: string): JSX.Element | null => {
    switch (ratingKey) {
      case "THUMBS_UP":
        return <ThumbsUpIconActive height="16px" width="16px" />;
      case "HEART":
        return <HeartIconActive width="16px" height="16px" />;
      case "HAPPY":
        return <GoodActiveIcon width="16px" height="16px" />;
      case "ANGRY":
        return <AngryIconActive width="16px" height="16px" />;
      case "SHOCK":
        return <ShockIconActive width="16px" height="16px" />;

      default:
        return null;
    }
  };

  return (
    <Box sx={styles.launchPraiseWall}>
      <Box display="flex" alignItems="center" gap="15px" sx={{ py: 5, px: 7 }}>
        <Box
          onClick={() => {
            if (isRedirect) {
              router.push(`/settings/feedback/settings`);
            } 
            else {router.push(`/dashboard`)};
          }}
        >
          <IconButton size="small">
            <ArrowBackIcon sx={{ color: ThemeModeColor() }} />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={400} sx={styles.typography}>
            Back
          </Typography>
        </Box>
      </Box>

      {slide && (
        <Box sx={styles.card}>
          <Splide options={splideOptions}>
            {launchPraiseWallData?.data?.feedbacks.map((item) => (
              <SplideSlide key={item._id}>
                <Card sx={styles.cardWrapper}>
                  <Stack spacing={2.4}>
                    <Box display="flex" gap={1.6}>
                      <AvatarGroup sx={styles.avatarGroup}>
                        <GlobalAvatar
                          width="28px"
                          height="28px"
                          imgUrl=""
                          firstName="John"
                          lastName="Smith"
                        />
                        <GlobalAvatar
                          width="28px"
                          height="28px"
                          sx={styles.avatar}
                          imgUrl=""
                          firstName="D"
                          lastName="D"
                        />
                      </AvatarGroup>
                      <Box>
                        <Typography sx={styles.typography} variant="body2">
                          <Box
                            component="span"
                            sx={styles.typography}
                            fontWeight={600}
                          >
                            You
                          </Box>
                          &nbsp;received feedback from&nbsp;
                          <Box
                            component="span"
                            sx={styles.typography}
                            fontWeight={600}
                          >
                            {item.name}
                          </Box>
                        </Typography>
                        <Typography
                          mt={0.2}
                          variant="subtitle2"
                          fontWeight={400}
                          color="neutral.500"
                        >
                          {dayjs(item.createdAt)
                            .format("MMMM DD YYYY")
                            .toString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={400}
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === "dark"
                            ? "neutral.400"
                            : "neutral.700",
                      }}
                    >
                      {item.senderFeedbackText}
                    </Typography>
                    <Box sx={styles.cardFooterWrapper}>
                      <Box display="flex" alignItems="center" gap={1.6}>
                        <Typography variant="body2" sx={styles.typography}>
                          Rating:
                        </Typography>
                        <Box display="flex" alignItems="center">
                          {renderRatingIcon(item.rating)}
                          <Typography
                            ml={0.8}
                            variant="body2"
                            sx={styles.cardFooterContent}
                          >
                            {item?.rating?.length > 0 && item.rating}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={styles.privacyTextWrapper}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          sx={{
                            color: "neutral.700",
                          }}
                        >
                          {item.feedbackVisibility}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                  <Box display="flex" gap={1} sx={styles.reactionContainer}>
                    {Object.keys(item?.reactions).map((key, index) => {
                      const values = item.reactions[key];
                      if (Array.isArray(values) && values.length > 0) {
                        return (
                          <Box
                            key={index}
                            display="flex"
                            gap={0.4}
                            alignItems="center"
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

                    <Box position="relative">
                      <Box
                        display="flex"
                        gap={0.4}
                        alignItems="center"
                        sx={styles.reactionEmojiWrapper(viewOnly)}
                      >
                        <EmojiSmileIcon height="16px" width="16px" />
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </SplideSlide>
            ))}
          </Splide>
        </Box>
      )}
    </Box>
  );
}
