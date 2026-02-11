"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { styles } from "./profile.styles";
import { GoalsIcon } from "@assets/icons/goals-icon";
import { GrowthAreasIcon } from "@assets/icons/growth-areas-icon";
import { FeedBackIcon } from "@assets/icons/feedback-icon";
import { ProfileUpload } from "@components/profile/profile-upload";
import { Box, Grid, Typography, Button, useTheme } from "@mui/material";
import { ProfileCardWrapper } from "@components/profile/profile-card-wrapper";
import { PersonalInfo } from "@components/profile/personal-info";
import { useProfile } from "./use-profile";
import { feedbackImg } from "@assets/images";
import { FeedbackCard } from "@components/feedback-card";
import { NoteSearchIcon } from "assets/icons/note-search-icon";
import { ViewDetails } from "@components/growth-area-view-details";
import { ComponentLoader } from "@components/component-loader";

export function Profile({ isUpload = true }): JSX.Element | null {
  const theme = useTheme();
  const { getProfileData, router, isDrawerOpen, handleDrawer, isLoading } = useProfile();

  return (
    <>
      <ProfileUpload isUpload={isUpload} data={getProfileData?.data} />
      <Grid container mt={0} spacing={3}>
        <Grid item lg={8} sm={12} sx={styles.gridWrapper}>
          <ProfileCardWrapper
            icon={<NoteSearchIcon />}
            heading="My Reviews"
            isLoading={isLoading}
            isLinkComponent
            linkComponent={
              <Link href='/reviews' style={{ color: theme.palette.primary.main, fontSize: '16px', fontWeight: 400, textDecoration: 'none' }}>
                View All
              </Link>
            }
            isReviewsBtn
            tableData={getProfileData?.data?.reviews}
          >
            {!isLoading && getProfileData?.data?.reviews?.length === 0 && (
              <Typography variant="body1" color="primary.main" textAlign='center'>
                No Data
              </Typography>
            )}
          </ProfileCardWrapper>
          <ProfileCardWrapper
            icon={<GoalsIcon />}
            heading="Goals"
            isLoading={isLoading}
            linkComponent={
              <Button
                variant="contained"
                onClick={() => router.push("/goals/create-goal?back=profile")}
                style={styles.goalsBtn}
              >
                Create Goals
              </Button>
            }
            isLinkComponent
            tableData={getProfileData?.data?.goals}
          >
            {!isLoading && getProfileData?.data?.goals?.length === 0 && (
              <Typography variant="body1" color="primary.main" textAlign='center'>
                No Data
              </Typography>
            )}
          </ProfileCardWrapper>
          <ProfileCardWrapper icon={<GrowthAreasIcon />} heading="Growth Areas">
            {isLoading ? (
              <ComponentLoader />
            ) : (
              <>
                {getProfileData?.data?.careerGrowth?.length > 0 ? (
                  <Box sx={styles.scrollStyle}>
                    <Grid container spacing={2} sx={{ px: '20px' }}>
                      {getProfileData?.data?.careerGrowth?.map((item) => (
                        <Grid item key={item._id} lg={4} md={4} sm={6} xs={12}>
                          <Box sx={styles.growth(theme)}>
                            <Box sx={styles.growthHeading}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {item.title}
                              </Typography>
                              {item?.isCompleted && (
                                <Typography variant="caption" sx={styles.status('active')} >
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
                            <Box mt={1}>
                              <Button variant="text" onClick={() => { handleDrawer(item._id) }} size='small'>View Details</Button>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  <Typography variant="body1" color="primary.main" textAlign='center'>
                    No Data
                  </Typography>
                )}
              </>
            )}
          </ProfileCardWrapper>
          <ProfileCardWrapper icon={<FeedBackIcon />} heading="Feedback">
            {
              isLoading ? <ComponentLoader /> :
                <>
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
                      <Typography variant="body1" sx={{ fontWeight: "600 !important" }}>
                        Ask, and you shall receive
                      </Typography>
                      <Typography variant="body2" sx={{ pt: 1.4, pb: 1 }}>
                        Feedback is key for continuous self-improvement
                      </Typography>
                      <Typography sx={{ pb: 4 }}>
                        <Link href="/feedback/add-feedback?tab=1">Request feedback from a colleague</Link>
                      </Typography>
                    </Box>
                  )}
                </>
            }
          </ProfileCardWrapper>
        </Grid>
        <Grid item lg={4} sm={12}>
          <PersonalInfo isLoading={isLoading} data={getProfileData?.data} />
        </Grid>
      </Grid>

      {isDrawerOpen && <ViewDetails
        id={isDrawerOpen}
        isDrawerOpen={isDrawerOpen}
        handleDrawerClose={() => { handleDrawer(null) }}
      />}
    </>
  );
}
