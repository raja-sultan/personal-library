import { Box, Button, Grid, Rating, Skeleton, Typography } from "@mui/material";
import React, { useState } from "react";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useScoreCardDetailsQuery } from "@services/candidate/candidate-details/on-two-jobs/score-card/score-card-api";
import { NoContentFound } from "common";
import { useRouter, useSearchParams } from "next/navigation";

export function ScoreCardDetails({ items }: any): JSX.Element {
  const [toggle, setToggle] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const candidateId = searchParams.get("candidateID");

  const { data, isError, isLoading } = useScoreCardDetailsQuery({
    payload: {
      scorecardId: items._id,
    },
  });

  if (isLoading) {
    return <Skeleton animation="wave" sx={{ height: 200 }} />;
  }

  if (items?._id === data?.data?._id) {
    return (
      <>
        <Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}
          >
            {data?.data?.keyTakeaways || "-"}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {data?.data?.overallRecommendation || "-"}
          </Typography>
        </Box>
        <Button
          sx={{ p: 0, my: 1.5, mr: 2 }}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {toggle ? "Hide Scorecard" : "Show Scorecard"}
        </Button>
        <Button
          sx={{ p: 0, my: 1.5 }}
          onClick={() => {
            router.push(
              `/application-review?candidateId=${candidateId}&jobId=${jobId}&action=edit`
            );
          }}
        >
          Edit Scorecard
        </Button>
        {toggle && (
          <>
            <Typography variant="body1" sx={{ fontWeight: 700, mb: 1 }}>
              Scorecard Summary
            </Typography>
            <Box>
              {data?.data?.feedback.map((list, index) => (
                <Box key={index}>
                  <Typography variant="body1" sx={{ fontWeight: 600, my: 2 }}>
                    {list.stageName ?? "-"}
                  </Typography>
                  {list?.attributes?.map((attr) => (
                    <Box key={attr.__id} sx={styles.attributesWrapper}>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "text.secondary" }}
                      >
                        {attr.name}
                      </Typography>
                      <Rating
                        icon={<StarRoundedIcon sx={styles.iconStyling} />}
                        name="read-only"
                        value={attr.rating}
                        readOnly
                        emptyIcon={
                          <StarOutlineRoundedIcon sx={styles.iconStyling} />
                        }
                      />
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </>
        )}
        {isError || data?.data?.feedback.length === 0 ? (
          <Grid container justifyContent="center">
            <Grid item width={200}>
              <NoContentFound />
            </Grid>
          </Grid>
        ) : null}
      </>
    );
  }
  return (
    <Grid container justifyContent="center">
      <Grid item width={200}>
        <NoContentFound />
      </Grid>
    </Grid>
  );
}

const styles = {
  attributesWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    py: 0.5,
  },
  iconStyling: {
    width: "30px",
    height: "30px",
  },
};
