import {
  Box,
  Button,
  Grid,
  Rating,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { FormProvider, RHFEditor } from "common";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useGetScoreCardDetailsQuery,
  useUpdateSubmitNewCardMutation,
} from "@services/candidate/stages/interview-stage";
import toast from "react-hot-toast";

const statusButton = ["definitely not", "no", "yes", "strong yes", "other"];

export function PreliminaryScoreCard(): JSX.Element {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const candidateId = searchParams.get("candidateId");
  const interviewId = searchParams.get("interviewId");
  const stageId = searchParams.get("stageId");
  const [status, setStatus] = useState<string>("");
  const [updateScoreCard] = useUpdateSubmitNewCardMutation();
  const { data: scoreCardDetails, isLoading }: any =
    useGetScoreCardDetailsQuery({
      candidateId,
      jobId,
      interviewId,
      stageId,
    });
  const methods = useForm({
    defaultValues: {
      keyTakeaways: "",
    },
  });
  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    if (!isLoading && scoreCardDetails) {
      // Populate form fields with fetched data
      setValue("keyTakeaways", scoreCardDetails?.data?.keyTakeaways);
      setStatus(scoreCardDetails?.data?.overallRecommendation || "");
    }
  }, [isLoading, scoreCardDetails, setValue]);

  const updateRecommendationHandler = (str) => {
    setStatus(str);
  };

  const capitalizeWords = (str): any => {
    return str.replace(/\b\w/g, (char) => {
      return char.toUpperCase();
    });
  };

  async function onSubmit(formData): Promise<void> {
    const finalPayload = {
      scorecardId: scoreCardDetails?.data?._id,
      body: {
        candidateId,
        jobId,
        interviewId,
        stageId,
        keyTakeaways: formData?.keyTakeaways,
        overallRecommendation: status,
      },
    };
    try {
      const res = await updateScoreCard({ finalPayload }).unwrap();
      toast.success(res.message ?? "Updated Successfully!");
      setStatus("");
      reset();
    } catch (err) {
      toast.error(err?.data?.message ?? "Something went wrong!");
    }
  }

  const handleRating = async (rating, attributes, feedBackId) => {
    const filteredArray = scoreCardDetails?.data?.feedback?.map((item) => {
      if (item._id === feedBackId) {
        return {
          ...item,
          attributes: item.attributes.map((attrItems) => {
            if (attrItems?._id === attributes?._id) {
              return {
                ...attrItems,
                rating,
              };
            }
            return attrItems;
          }),
        };
      }
      return item;
    });

    const finalPayload = {
      scorecardId: scoreCardDetails?.data?._id,
      body: {
        candidateId,
        jobId,
        interviewId,
        stageId,
        feedback: filteredArray,
      },
    };
    try {
      const res = await updateScoreCard({ finalPayload }).unwrap();
      toast.success(res.message ?? "Updated Successfully!");
    } catch (err) {
      toast.error(err?.data?.message ?? "Something went wrong!");
    }
  };
  if (isLoading) {
    return <Skeleton height={100} />;
  }

  return (
    <Box>
      {scoreCardDetails?.data?.assignedTo ? (
        <Grid
          container
          direction="column"
          bgcolor={theme.palette.background.paper}
          py={2}
          px={3.5}
        >
          <Typography variant="body1" pb={2} fontWeight={600}>
            Key Take-Away
          </Typography>{" "}
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFEditor
              outerLabel="Conclusions, pros, cons and things to follow up on "
              name="keyTakeaways"
            />
            <Grid
              container
              direction="column"
              py={2.5}
              px={1.5}
              borderRadius={1}
              my={2}
              bgcolor={theme.palette.background.default}
            >
              <Typography variant="body1">Attributes</Typography>
              <Typography variant="subtitle2" my={1}>
                Does the candidate show clear competence in the following areas?
              </Typography>
              <Typography
                variant="caption"
                mb={1}
                color={theme.palette.grey[400]}
              >
                *Remember, all fields are optional! Only rate attributes you
                have clear opinion on.
              </Typography>

              {scoreCardDetails?.data?.feedback?.map((ele) => (
                <Grid container direction="column" key={ele?._id} item xs={12}>
                  {" "}
                  <Typography variant="subtitle1" my={1.2} fontWeight={600}>
                    {ele?.stageName}
                  </Typography>
                  {ele?.attributes?.length > 0 &&
                    ele?.attributes?.map((attr) => (
                      <Grid
                        container
                        justifyContent="space-between"
                        key={attr?._id}
                      >
                        <Grid item sm={6} xs={12} my={0.8}>
                          <Typography
                            variant="subtitle1"
                            color={theme.palette.grey[500]}
                          >
                            {attr?.name}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          alignItems="center"
                          item
                          md={2}
                          sm={3}
                          xs={12}
                        >
                          <Rating
                            name="customized-10"
                            precision={0.5}
                            defaultValue={attr.rating}
                            onChange={async (e, rating) => {
                              await handleRating(rating, attr, ele?._id);
                            }}
                            sx={{
                              fontSize: 30,
                              color: theme.palette.warning.light,
                            }}
                          />
                        </Grid>
                      </Grid>
                    ))}
                </Grid>
              ))}
            </Grid>
            <Grid container gap={3} py={2} alignItems="start">
              <Grid container direction="column" gap={1}>
                <Typography variant="body2" fontWeight={600}>
                  Overall Recommendation
                </Typography>
                <Typography variant="subtitle2" color={theme.palette.grey[500]}>
                  Did the candidate pass the interview
                </Typography>
              </Grid>
              <Grid container gap={2.5}>
                {statusButton?.map((ele) => (
                  <Button
                    key={ele}
                    variant="outlined"
                    sx={{
                      width: 220,
                      border: ele === status ? "2px solid" : "",
                    }}
                    onClick={() => {
                      updateRecommendationHandler(ele);
                    }}
                  >
                    {capitalizeWords(ele)}
                  </Button>
                ))}
              </Grid>

              <Grid container justifyContent="end">
                <Button variant="contained" type="submit">
                  Submit Scorecard
                </Button>
              </Grid>
            </Grid>
          </FormProvider>
        </Grid>
      ) : (
        "No Schedule interview yet"
      )}
    </Box>
  );
}
