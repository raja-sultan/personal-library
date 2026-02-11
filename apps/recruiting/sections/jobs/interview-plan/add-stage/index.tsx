import { Delete, Edit, Save } from "@assets/common";
import {
  Grid,
  Typography,
  IconButton,
  useTheme,
  TextField,
} from "@mui/material";
import { WarningPrompt } from "common";
import React, { useState } from "react";
import { stage } from "../style";
import { useUpdateStageMutation } from "@services/jobs/create-jobs/interview-plan/interview-plan-api";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export function AddStage(props): JSX.Element {
  const [updateStageTitle] = useUpdateStageMutation();
  const [showTitle, setShowTitle] = useState(true);

  const displayTitle = () => {
    setShowTitle(!showTitle);
  };

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const {
    stageInfo: { stageName, _id },
    deleteStage,
  } = props;

  const [updateTitle, setUpdateTitle] = useState(stageName);

  const saveTitle = async () => {
    try {
      const { message }: any = await updateStageTitle({
        jobId,
        stageId: _id,
        payload: {
          stageName: updateTitle,
        },
      }).unwrap();
      toast.success(message || "Stage title updated successfully");
      displayTitle();
    } catch (error) {
      toast.error(error?.data?.message || "error occur");
    }
  };

  const theme = useTheme();

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="start"
    >
      <Grid item md={8}>
        {showTitle ? (
          <Typography variant="h6" fontWeight={500} sx={stage(theme)}>
            {stageName}
          </Typography>
        ) : (
          <TextField
            type="text"
            variant="outlined"
            value={updateTitle}
            size="small"
            sx={{ bgcolor: theme.palette.background.paper }}
            onChange={(e) => {
              setUpdateTitle(e.target.value);
            }}
          />
        )}
      </Grid>
      <Grid container item md={4}>
        {showTitle ? (
          <IconButton
            onClick={() => {
              displayTitle();
            }}
          >
            <Edit />
          </IconButton>
        ) : (
          <IconButton
            onClick={async () => {
              await saveTitle();
            }}
          >
            <Save />
          </IconButton>
        )}

        <WarningPrompt
          mainColor="error.main"
          heading="Delete Stage"
          subTitle="Are you sure you want to delete this Stage?"
          modelOpenLabel={
            <IconButton>
              <Delete />
            </IconButton>
          }
          acceptButtonLabel="Delete"
          acceptButtonProps={{
            onClick: () => {
              deleteStage(_id);
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
