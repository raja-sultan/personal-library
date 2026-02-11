"use client";

import { Grid } from "@mui/material";
import {
  MyDashboard,
  // CompanyGoals,
  MyGoals,
  Tasks,
  CompanyIntro,
  ApplicationReview,
  SocialNetwork,
  JobsPosted,
} from "@sections/dashboard";
import { AddReferral } from "@sections/dashboard/add-referral";
import { Events } from "@sections/dashboard/events";
import { FollowPeople } from "@sections/dashboard/follow-people";
import { HelpfulLinks } from "@sections/dashboard/helpful-links";
import { JobsFollowings } from "@sections/dashboard/jobs-followings";
import { MyInterviews } from "@sections/dashboard/my-interviews";
import { MyReferral } from "@sections/dashboard/my-referral";
import { useGetPersonalizedDashboardQuery } from "@services/dashboard/personalized-dashboard-api";

function Dashboard(): JSX.Element {
  const { data } = useGetPersonalizedDashboardQuery({});
  const dashBoardMainView = data?.data?.mainView;
  const dashBoardRightView = data?.data?.rightRail;

  return (
    <Grid
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        p: 2.5,
      }}
      justifyContent="center"
      flexDirection="column"
      container
    >
      <Grid item container spacing={4}>
        <Grid item xl={8} lg={12} md={12} xs={12}>
          <MyDashboard />
          {/* <CompanyGoals /> */}
          {dashBoardMainView?.myGoals?.isActive && <MyGoals />}
          {dashBoardMainView?.addReferral?.isActive && <AddReferral />}
          {dashBoardMainView?.myReferrals?.isActive && <MyReferral />}
        </Grid>
        <Grid item xl={4} lg={12} md={12} xs={12}>
          <CompanyIntro />
          {dashBoardRightView?.myTask?.isActive && <Tasks />}
          {dashBoardRightView?.peopleFollowing?.isActive && <FollowPeople />}
          {dashBoardRightView?.myInterviews?.isActive && <MyInterviews />}
          {dashBoardRightView?.events?.isActive && <Events />}
        </Grid>
        <Grid item xl={6} lg={12} md={12} xs={12}>
          {dashBoardMainView?.applicationToReview?.isActive && (
            <ApplicationReview />
          )}
        </Grid>
        <Grid item xl={6} lg={12} md={12} xs={12}>
          <SocialNetwork />
        </Grid>
        <Grid item xl={8} lg={12} md={12} xs={12}>
          {dashBoardMainView?.jobPosted?.isActive && <JobsPosted />}
        </Grid>
        <Grid item xl={4} lg={12} md={12} xs={12}>
          <HelpfulLinks />
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <JobsFollowings />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
