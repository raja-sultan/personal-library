"use client";
import React from "react";
import CustomCard from "@components/custom-card";
import HorizontalTabs from "@components/horizontal-tab";
import { Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { GiveFeedback } from "./give-feedback";
import { RequestFeedback } from "./request-feedback";
import { PrivateNote } from "./private-note";

export function AddFeedbackSection(): JSX.Element {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");
  const hidePrivateNote = searchParams.get("hidePrivateNote");
  const backPath = searchParams.get('backPath');
  const router = useRouter();

  const tabArray = ["Give Feedback", "Request Feedback", "Private Note"];
  const tabArrFromTeam = ["Give Feedback", "Request Feedback"];

  const tabToRender = hidePrivateNote ? tabArrFromTeam : tabArray;
  return (
    <>
      <CustomCard
        cardProps={{ sx: { mb: '24px' } }}
        header
        cardHeader={{
          title: (
            <Typography variant="h5" fontWeight={600}>
              Feedback
            </Typography>
          ),
          description: `Shape a better experience with your valuable feedback and manage it seamlessly`,
          onBack: () => {
            router.push(backPath ?? '/feedback');
          },
        }}
      />
      <HorizontalTabs Index={activeTab ? Number(activeTab) : 0} tabsArray={tabToRender}>
        <GiveFeedback key='given' backPath={backPath} />
        <RequestFeedback key='request' backPath={backPath} />
        <PrivateNote key='private' backPath={backPath} />
      </HorizontalTabs>
    </>
  );
}
