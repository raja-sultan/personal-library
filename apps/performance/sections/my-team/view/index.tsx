"use client";
import CustomCard from "@components/custom-card";
import HorizontalTabs from "@components/horizontal-tab";
import { Box, Button, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Reviews } from "./review";
import { Update } from "./update";
import { OneOnOne } from "./one-on-one";
import { Overview } from "./overview";
import { CareerView } from "./career";
import Link from "next/link";
import { MyFeedbackSection } from "@sections/feedback";
import { useGetUserProfileQuery } from "@services/profile/profile-api";
import { GlobalAvatar } from "@components/global-avatar";

export function MyTeamViewDetails(): JSX.Element {
  const router = useRouter();
  const currentTab = useSearchParams().get("currTab");
  const tab = useSearchParams().get("tab");
  const memberId = useSearchParams().get("id");

  const { data: getProfileData } = useGetUserProfileQuery(memberId);

  return (
    <>
      <CustomCard
        cardProps={{ sx: { mb: "24px" } }}
        header
        cardHeader={{
          title: (
            <Box display="flex" alignItems="center" gap="24px">
              <GlobalAvatar
                width="68px"
                height="68px"
                imgUrl={getProfileData?.data?.profileImage}
                firstName={getProfileData?.data?.firstName}
                lastName={getProfileData?.data?.lastName}
              />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {`${getProfileData?.data?.firstName} ${getProfileData?.data?.lastName}`}
                </Typography>
                <Typography variant="subtitle1" color="neutral.500">
                  {getProfileData?.data?.employeeTitle}
                </Typography>
              </Box>
            </Box>
          ),
          onBack: () => {
            router.back();
          },
          actions: (
            <>
              <Link href="/one-on-ones/create?redirectTo=my-team">
                <Button variant="outlined">Setup 1-on-1</Button>
              </Link>
              <Link href="/feedback/add-feedback?hidePrivateNote=true&backPath=/my-team/view">
                <Button variant="outlined">Give or Request Feedback</Button>
              </Link>
            </>
          ),
        }}
      />

      <HorizontalTabs
        Index={Number(currentTab) || Number(tab)}
        tabsArray={[
          "Overview",
          "1 on 1s",
          "Updates",
          "Feedback",
          "Career",
          "Reviews",
        ]}
      >
        <Overview />
        <OneOnOne />
        <Update
          firstName={getProfileData?.data?.firstName}
          lastName={getProfileData?.data?.lastName}
        />
        <MyFeedbackSection
          key="team-view"
          hideHeader
          showRequest
          tabArray={["All", "Given", "Pending"]}
          backPath="/my-team/view?tab=3"
        />
        <CareerView />
        <Reviews />
      </HorizontalTabs>
    </>
  );
}
