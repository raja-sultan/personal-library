import React from "react";
import { InterviewQuestionParent } from "./interview-question-parent";

export function InterviewQuestion({ method }): any {
  const { control, register, getValues, errors, setValue, watch } = method;
  return (
    <InterviewQuestionParent
      {...{ control, register, getValues, setValue, errors, watch }}
    />
  );
}
