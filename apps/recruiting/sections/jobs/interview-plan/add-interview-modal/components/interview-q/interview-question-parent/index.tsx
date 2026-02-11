import { Button, Grid, InputLabel, TextField } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import React from "react";
import { InterviewQuestionChild } from "../interview-question-child";
import { RHFCheckbox, RHFCustomSelect } from "common";

export function InterviewQuestionParent({ control, register, watch }): any {
  const { fields, append } = useFieldArray({
    control,
    name: "interviewQuestion",
  });
  // console.log(watch("interviewQuestion"));
  
  return (
    <>
      {fields?.map((item: any, index: any) => {
        return (
          <Grid columnGap={3} container alignItems="start" key={item?.id}>
            <Grid item md={5.2} xs={12} my={1}>
              <InputLabel
                sx={{ mb: 0.5 }}
                id={`interviewQuestion.${index}.whatIsQuestion`}
              >
                What is your question
              </InputLabel>
              <TextField
                placeholder="What is your qualification?"
                {...register(`interviewQuestion.${index}.whatIsQuestion`)}
                type="text"
                variant="outlined"
                fullWidth
                multiline={
                  watch(`interviewQuestion.${index}.answerType`) === "longText"
                }
                rows={
                  watch(`interviewQuestion.${index}.answerType`) ===
                    "longText" && 4
                }
              />
              <RHFCheckbox
                name={`interviewQuestion.${index}.required`}
                label="Require"
              />
            </Grid>
            <Grid item md={5.2} xs={12} my={0.8}>
              <RHFCustomSelect
                options={[
                  { id: 1, label: "Short Text", value: "shortText" },
                  { id: 2, label: "Long Text", value: "longText" },
                  { id: 3, label: "Multi Select", value: "multiSelect" },
                  { id: 4, label: "Single Select", value: "singleSelect" },
                ]}
                outerLabel="Select an answer type"
                placeholder="Select"
                fullWidth
                {...register(`interviewQuestion.${index}.answerType`)}
              />
            </Grid>
            {watch(`interviewQuestion.${index}.answerType`) ===
              "multiSelect" && (
              <Grid>
                <InterviewQuestionChild
                  nestIndex={index}
                  {...{ control, register }}
                />
              </Grid>
            )}
            {watch(`interviewQuestion.${index}.answerType`) ===
              "singleSelect" && (
              <Grid>
                <InterviewQuestionChild
                  nestIndex={index}
                  {...{ control, register }}
                />
              </Grid>
            )}
          </Grid>
        );
      })}
      <Button
        onClick={() => {
          append({
            whatIsQuestion: "",
            answerType: "",
            required: false,
            options: [],
          });
        }}
        sx={{ fontSize: 14, color: "red", my: 0.5 }}
      >
        Add Another Question
      </Button>
    </>
  );
}
