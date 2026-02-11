"use client";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import { CustomChildRenderer } from "common";
import PreviewWelcomeStepOne from "./preview-welcome-step-one";
import PreviewWelcomeStepTwo from "./preview-welcome-step-two";
import PreviewWelcomeStepThree from "./preview-welcome-step-three";
import PreviewWelcomeStepFour from "./preview-welcome-step-four";

export default function PreviewWelcomeExperienceSection(): JSX.Element {
  const [active, setActive] = useState(0);

  const nextStepHandler = (): void => {
    setActive(active < steps.length - 1 ? active + 1 : 0);
  };
  const previousStepHandler = (): void => {
    setActive(active > 0 ? active - 1 : 0);
  };

  const steps = ["Job Information", "Hiring Team", "Job Kickoff", "Scorecard"];
  return (
    <Grid
      container
      justifyContent="center"
      px={{ md: 2, xs: 0 }}
    >
      <CustomChildRenderer index={active}>
        <PreviewWelcomeStepOne nextStepHandler={nextStepHandler} />

        <PreviewWelcomeStepTwo
          nextStepHandler={nextStepHandler}
          previousStepHandler={previousStepHandler}
        />
        <PreviewWelcomeStepThree
          nextStepHandler={nextStepHandler}
          previousStepHandler={previousStepHandler}
        />
        <PreviewWelcomeStepFour previousStepHandler={previousStepHandler} />
      </CustomChildRenderer>
    </Grid>
  );
}
