"use client";
import React from "react";
import CustomCard from "@components/custom-card";
import HorizontalTabs from "@components/horizontal-tab";
import { useRouter, useSearchParams } from "next/navigation";
import Recommendations from "./recommendations";
import { Approvals } from "./approvals";

function ViewProgress(): React.JSX.Element {
  const router = useRouter();
  const title = useSearchParams().get('title');
  return <>
    <CustomCard
      cardProps={{ sx: { mb: '24px' } }}
      header
      cardHeader={{
        title,
        sx: { textTransform: 'capitalize' },
        onBack() {
          router.push('/compensation')
        },
      }}
    />
    <HorizontalTabs tabsArray={['Recommendations', 'Approvals']}>
      <Recommendations />
      <Approvals />
    </HorizontalTabs>
  </>
}

export default ViewProgress;
