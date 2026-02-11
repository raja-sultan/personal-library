import { ScoreCardSection } from "@sections/jobs/score-card";
import React from "react";

export function ViewScoreCard(): JSX.Element {
  return (
    <ScoreCardSection
      nextStepHandler={undefined}
      previousStepHandler={undefined}
      editButtons={false}
      title={false}
    />
  );
}
