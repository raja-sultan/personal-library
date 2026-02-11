"use client";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import DashboardStarIcon from "@assets/icons/dashboard-star-icon";
import { DashboardCard } from "@components/dashboard/dashboard-card";
import { myOneOnOneStyles } from "./my-one-on-ones.styles";
import { useReviews } from "./use-my-one-on-ones";
import dayjs from "dayjs";
import { NoDataFound } from "@components/no-data";
import { ComponentLoader } from "@components/component-loader";
import { renderUserImage } from "@root/utils/render-user-image";

export function MyOneOnOnes(): JSX.Element {
  const styles = myOneOnOneStyles();
  const { data, isLoading, handleCreateOneOnOne } = useReviews();

  return (
    <DashboardCard>
      {isLoading ? <ComponentLoader /> :
        <>
          {data?.data?.length === 0 ? (
            <NoDataFound heading="No One On One Found"
              buttonText="Create New 1-on-1"
              onButtonClick={handleCreateOneOnOne}
              sx={{
                pt: 2,
              }}
            />
          ) :
            <Box sx={styles.wrapper}>
              <Box sx={styles.textWrap}>
                <Typography variant="h5" fontWeight={600} color="text.primary" sx={styles.topTitle}>
                  My 1-on-1s
                </Typography>
                <Link href="/one-on-ones" style={styles.linkStyle}>
                  <Typography variant="body2" sx={styles.linkText}>
                    View All
                  </Typography>
                </Link>
              </Box>

              <Grid container spacing={2} sx={styles.cardGridWrapper}>
                {data?.data?.map((item: any) => {
                  return (
                    <Grid item xs={12} xl={6} lg={12} key={item.id} mt={2}>
                      <Box sx={styles.innerCardWrap}>
                        <Link href="/one-on-ones" style={styles.linkStyle}>
                          <Grid container spacing={2} sx={styles.innerCardContentWrap}>
                            <Grid item xs={12} xl={12} mb={3.25} mt={0.6}>
                              <Typography variant="body1" color="text.primary" sx={styles.listTitle}>
                                {`${item?.status} 1-on-1`}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} xl={12} sx={styles.cardImgTitleWrap}>
                              <Box key={item?.id} display="flex" alignItems="center" marginBottom="1rem" gap="25px">
                                {renderUserImage({
                                  firstName: item?.userDetail?.firstName,
                                  lastName: item?.userDetail?.lastName,
                                  profileImage: item?.userDetail?.profileImage,
                                  height: 42, width: 42
                                })}
                                <Box>
                                  <Typography variant='body2' color="text.primary" sx={styles.avatarTitle}>{item?.userDetail.fullName}</Typography>
                                  <Typography variant='subtitle2' fontWeight={400} color="text.secondary" sx={styles.innerCardAvatarSubTitle}>{item?.userDetail?.email}</Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid mt={3.25} item xs={5} xl={6.6} lg={4.5} md={5.7} sm={3.5} sx={styles.dateRatingWrap}>
                              <Typography variant="subtitle2" fontWeight={400} color="text.secondary" sx={styles.dateText}>
                                {dayjs(item?.date).format('D MMM YYYY')}
                              </Typography>
                              {item.organizerRating && (
                                <Box sx={styles.starIconWrap}>
                                  <DashboardStarIcon />
                                  <Typography variant="subtitle2" fontWeight={600} color="text.primary" sx={styles.feedbackValue}>
                                    {" "}
                                    &nbsp;{item.organizerRating}
                                  </Typography>
                                </Box>
                              )}
                            </Grid>
                          </Grid>
                        </Link>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>}
        </>
      }
    </DashboardCard>
  );
}
