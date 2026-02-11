import {
  useGetScoreCardQuery,
  usePutFocusAttributesMutation,
} from "@services/jobs/create-jobs/score-card/score-card-api";
import { useSearchParams } from "next/navigation";
import { useGetStagesAndInterviewsQuery } from "@services/jobs/job-details/job-setup/score-card/score-card-api";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

export function useFocusAttributes(): any {
  const [payload, setPayload] = useState([]);
  const searchParams = useSearchParams();
  const theme: any = useTheme();
  const jobsId = searchParams.get("jobId");
  const {
    data: scoreCardData,
    isLoading: scoreCardLoading,
    isError,
  } = useGetScoreCardQuery({
    jobId: jobsId,
  });

  const { data: stagesAndInterviews, refetch } = useGetStagesAndInterviewsQuery(
    {
      jobId: jobsId,
    }
  );

  //PUT API FOR SCORECARD
  const [putFocusAttributes, { isLoading: PatchIsLoading }] =
    usePutFocusAttributesMutation();

  //ScoreCard Data
  const scoreCard = scoreCardData?.data?.scorecard;

  useEffect(() => {
    // Pre populate payload with API values
    if (stagesAndInterviews?.data) {
      const initialPayload = stagesAndInterviews?.data.flatMap((stage) =>
        stage.interviewPlan.flatMap((intPlan) =>
          intPlan.interviews.map((interview) => ({
            interviewId: interview._Id,
            stageId: intPlan._id,
            focusAttributes: interview?.focusAttributes?.map((focus) => ({
              stageName: focus.stageName,
              attributes: focus.attributes.map((attr) => ({
                name: attr.name,
                isSelected: attr.isSelected, // Prepopulate isSelected value
              })),
            })),
          }))
        )
      );
      setPayload(initialPayload);
    }
  }, [setPayload, stagesAndInterviews?.data]);

  return {
    scoreCard,
    stagesAndInterviews,
    refetch,
    putFocusAttributes,
    PatchIsLoading,
    scoreCardLoading,
    isError,
    theme,
    payload,
    setPayload,
  };
}
