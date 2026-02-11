"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import RecommendedUsersCard from "../view-progress-components/user-card";
import { useRecommendations } from "./use-recommendations";
import { FormProvider } from "common";
import { CardWrapper } from "../view-progress-components/progress-bar-card/wrapper";
import { CustomLoader } from "@components/loader";
import { CompensatedFooter } from "../view-progress-components/footer";
import { CustomAlert } from "@components/alert";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

function Recommendations(): React.JSX.Element {
  const {
    recommendedCardsData,
    recommendationData,
    handleAddNote,
    isFetching,
    isLoading,
    handleSubmit,
    onSubmit,
    methods,
    isNotRecommendedLength,
    isEveryRecommended,
  } = useRecommendations();
  const { PERMISSION } =
    PERMISSIONS.PERFORMANCE.MODULE.COMPENSATION.COMPENSATION;
  return (
    <>
      {isEveryRecommended ? (
        <CustomAlert message="Recommendation have been approved for the employees within this cycle." />
      ) : (
        <>
          {isFetching || isLoading ? (
            <CustomLoader />
          ) : (
            <>
              <CardWrapper key="recommendation" data={recommendedCardsData} isApproved="" />
              {recommendationData?.length > 0 ? (
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Stack direction="column" spacing={2.5}>
                    {recommendationData?.map((obj: any) => (
                      <RecommendedUsersCard
                        key={obj._id}
                        handleAddNote={handleAddNote}
                        {...obj}
                      />
                    ))}
                  </Stack>
                  <PermissionProtected
                    permission={PERMISSION.GIVE_RECOMMENDATION}
                    disabled
                  >
                    <CompensatedFooter
                      key="recommendation"
                      title={`${isNotRecommendedLength}/${recommendationData?.length ?? 0} recommendations completed`}
                      btnProps={{
                        type: "submit",
                      }}
                      btnText="Confirm Recommendation"
                      message="The compensation admin is waiting for your recommendations"
                    />
                  </PermissionProtected>
                </FormProvider>
              ) : (
                <Typography>
                  No recommendation available right now...
                </Typography>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Recommendations;
