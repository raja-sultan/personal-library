"use client";
import { Box, Grid, Typography, Button, useTheme } from "@mui/material";
import React from "react";
import { styles } from "../../../../../profile/profile.styles";
import Link from "next/link";
import { GoalsIcon } from "@assets/icons/goals-icon";
import { GrowthAreasIcon } from "@assets/icons/growth-areas-icon";
import { FeedBackIcon } from "@assets/icons/feedback-icon";
import { ProfileCardWrapper } from "@components/profile/profile-card-wrapper";
import { PersonalInfo } from "@components/profile/personal-info";
import CustomCard from "@components/custom-card";
import { CustomTable } from "common";
import { NoteSearchIcon } from "@assets/icons/note-search-icon";
import Image from "next/image";
import { feedbackImg } from "@assets/images";
import { FeedbackCard } from "@components/feedback-card";
import { ViewDetails } from "@components/growth-area-view-details";
import { useOverview } from "./use-overview";
import { ProfileUploadView } from "./profile-upload";

export function Overview(): JSX.Element | null {
  const theme = useTheme();

  const {
    handleDrawer,
    isDrawerOpen,
    getProfileData,
    reviewsTableData,
    goalsTableData,
    setGrowthId,
    growthId,
    isLoading,
   
  } = useOverview();

  return (
    <Box>
      <ProfileUploadView isLoading={isLoading} data={getProfileData?.data} />
      <Grid container mt={2} spacing={3}>
        <Grid item lg={8} sm={12} sx={styles.gridWrapper}>
          <ReviewAndGoal
            key="review"
            heading="Reviews"
            actions={
              <Link
                href="/reviews"
                style={{
                  color: theme.palette.primary.main,
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                View All
              </Link>
            }
            icon={<NoteSearchIcon />}
            tableData={reviewsTableData}
          />
          <ReviewAndGoal
            key="goal"
            heading="Goals"
            actions={
              <Link href="/goals/create-goal">
                <Button variant="contained" size="small">
                  Create Goal
                </Button>
              </Link>
            }
            icon={<GoalsIcon />}
            tableData={goalsTableData}
          />

          <ProfileCardWrapper icon={<GrowthAreasIcon />} heading="Growth Areas">
            <Box sx={styles.profileData}>
              {getProfileData?.data?.careerGrowth?.map((item) => (
                <Box sx={styles.growth(theme)} key={item.id}>
                  <Box sx={styles.growthHeading}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    {item?.isCompleted && (
                      <Typography
                        variant="caption"
                        sx={styles.status("active")}
                      >
                        Completed
                      </Typography>
                    )}
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#667085", fontWeight: 400 }}
                  >
                    {item.description}
                  </Typography>
                  <Box
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={() => {
                      handleDrawer();
                      setGrowthId(item?._id);
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      mt={1}
                      sx={({ palette: { primary, neutral } }) => ({
                        color:
                          theme.palette.mode === "dark"
                            ? neutral[400]
                            : primary.main,
                      })}
                    >
                      View Details
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </ProfileCardWrapper>

          <ProfileCardWrapper icon={<FeedBackIcon />} heading="Feedback">
            {getProfileData?.data?.feedbacks?.length ? (
              <Box sx={styles.feedbackWrapper}>
                {getProfileData?.data?.feedbacks?.map((item) => (
                  <FeedbackCard key={item._id} viewOnly {...item} />
                ))}
              </Box>
            ) : (
              <Box sx={styles.feedback(theme)}>
                <Box sx={{ pt: 2, pb: 1 }}>
                  <Image src={feedbackImg} width={120} height={120} alt="" />
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "600 !important" }}
                >
                  Ask, and you shall receive
                </Typography>
                <Typography variant="body2" sx={{ pt: 1.4, pb: 1 }}>
                  Feedback is key for continuous self-improvement
                </Typography>
                <Typography sx={{ pb: 4 }}>
                  <Link href="/feedback/add-feedback?tab=1">
                    Request feedback from a colleague
                  </Link>
                </Typography>
              </Box>
            )}
          </ProfileCardWrapper>
        </Grid>
        <Grid item lg={4} sm={12}>
          <PersonalInfo isLoading={isLoading} data={getProfileData?.data} />
        </Grid>
      </Grid>


      {isDrawerOpen && (
        <ViewDetails
          id={growthId}
          isDrawerOpen={isDrawerOpen}
          handleDrawerClose={handleDrawer}
        />
      )}
    </Box>
  );
}

function ReviewAndGoal({ heading, actions, icon, tableData }): JSX.Element {
  return (
    <CustomCard
      cardProps={{
        sx: ({ palette: { neutral } }) => ({
          mb: "24px",
          "& .custom_card_sub_header a": {
            textDecoration: "none",
          },
          "& .content_wrapper": {
            p: 0,
          },
          "& .MuiTableHead-root": {
            display: "none",
          },
          "& .MuiTableRow-root .MuiTableCell-root": {
            borderTop: `1px solid ${neutral[200]}`,
          },
          "& .MuiTableRow-root:last-child .MuiTableCell-root": {
            borderBottom: `1px solid ${neutral[200]}`,
          },
        }),
      }}
      subHeader
      cardSubHeader={{
        title: (
          <Box display="flex" alignItems="center" gap="10px">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={({ palette: { primary } }) => ({
                background: primary.lightest,
                borderRadius: "50px",
                padding: "8px",
              })}
            >
              {icon}
            </Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {heading}
            </Typography>
          </Box>
        ),
        actions,
      }}
    >
      <CustomTable {...tableData} />
    </CustomCard>
  );
}
