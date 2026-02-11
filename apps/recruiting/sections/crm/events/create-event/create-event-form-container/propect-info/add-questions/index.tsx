import React from "react";
import { RHFTextField } from "common";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useFieldArray } from "react-hook-form";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

function AddQuestions(params: any): JSX.Element {
  const { control, isDisabled } = params;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  return (
    <>
      {fields.map((item, index) => (
        <Box key={index} display="flex" flexDirection="row-reverse">
          <HighlightOffRoundedIcon
            sx={{ color: "primary.main", mb: 2 }}
            onClick={() => {
              remove(index);
            }}
          />
          <Grid container>
            <Grid xs={12} item sx={{ py: 1, px: 1 }}>
              <RHFTextField
                name={`questions.${index}.question`}
                fullWidth
                label="Question"
                disabled={isDisabled}
              />
            </Grid>
            <Grid xs={12} item sx={{ py: 1, px: 1 }}>
              <RHFTextField
                name={`questions.${index}.answerType`}
                fullWidth
                label="Answer"
                disabled={isDisabled}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button
        variant="outlined"
        fullWidth
        onClick={() => {
          append({
            question: "",
            answerType: "",
          });
        }}
        disabled={isDisabled}
      >
        Add a Question
      </Button>
    </>
  );
}

export default AddQuestions;
