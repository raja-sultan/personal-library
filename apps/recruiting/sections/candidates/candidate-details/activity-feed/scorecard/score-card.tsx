import React, { useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { WarningPrompt } from "common";
import { useRouter } from "next/navigation";
import { ScoreCardModalBox } from "./scorecard-modal/scorecard-modal";

import HeartIcon from "@assets/candidates/details/heart-icon";
import startIcon from "@assets/candidates/details/star-icon";
import warningIcons from "@assets/candidates/details/warning-icon";

export function Scorecard(props): JSX.Element {
  const { _id, interviewName, overallRecommendation, feedback } = props;
  const [openScoreCardModal, setOpenScoreCardModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const Icons: any = [startIcon, HeartIcon, warningIcons];

  return (
    <Grid key={_id} item xs={12} pb={1}>
      <Box display="flex" flexWrap="wrap" flexDirection="column">
        <Typography variant="body1" pb={0.5} fontWeight={600}>
          Scorecard
        </Typography>
        <Typography
          variant="subtitle2"
          pb={0.5}
          fontWeight={600}
          color={theme.palette.grey[600]}
        >
          {interviewName ?? "---"}
        </Typography>
        <Typography variant="body1" pb={0.5} fontWeight={600}>
          Overall Recommendation:
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.grey[600]}>
          {overallRecommendation ?? "---"}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1" pb={0.5} fontWeight={600}>
            Scorecard Summary:
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <Button
              variant="text"
              onClick={() => {
                setOpenScoreCardModal(true);
                setEdit(false);
              }}
              sx={{ fontSize: 13 }}
            >
              View Full Scorecard
            </Button>
            <Button
              variant="text"
              onClick={() => {
                router.push(`preliminary-screen-call?${_id}`);
              }}
              sx={{ fontSize: 13 }}
            >
              Edit
            </Button>
            <WarningPrompt
              mainColor="error.main"
              heading="Delete scorecard"
              subTitle="Are you sure you want to delete this scorecard?"
              modelOpenLabel={
                <Button variant="text" sx={{ fontSize: 13 }}>
                  Delete
                </Button>
              }
              acceptButtonLabel="Delete"
              acceptButtonProps={{
                onClick: () => {},
              }}
            />
          </Box>
        </Box>
        {feedback?.length > 0 && (
          <>
            {feedback.map((ele: any) => {
              return ele.attributes.map((attribute: any, index) => {
                const Icon = Icons[index % Icons.length];
                return (
                  <Box
                    key={attribute._id}
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Icon />
                    <Typography variant="subtitle2">
                      {attribute.name}
                    </Typography>
                  </Box>
                );
              });
            })}
          </>
        )}
      </Box>

      <ScoreCardModalBox
        openScoreCardModal={openScoreCardModal}
        setOpenScoreCardModal={setOpenScoreCardModal}
        edit={edit}
      />
    </Grid>
  );
}
