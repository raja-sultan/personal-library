import { EditKickOffQuestion, TickSquareQuestion } from "@assets/jobs";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { RHFTextField } from "common";
import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/system";
import { styles } from "./business-goals.style";

export function BusinessGoals(): JSX.Element {
  const [currentlyEdited, setCurrentlyEdited] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { fields, prepend, remove } = useFieldArray({
    name: "section.questions",
  });
  const handleEditQuestion = (index: number): void => {
    setCurrentlyEdited(index);
    setIsEditing(true);
  };

  const handleSaveQuestion = (): void => {
    setCurrentlyEdited(null);
    setIsEditing(false);
  };
  return (
    <Box sx={styles.mainBusinessGoal}>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Grid item xs={12} md={6}>
          <RHFTextField
            outerLabel="Section Name"
            name="section.name"
            placeholder="Section Name"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField
            multiline
            rows={4}
            outerLabel="Section Description"
            name="section.description"
            fullWidth
            placeholder="Description"
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Typography variant="body1">Section Question</Typography>
        <Typography
          variant="body1"
          sx={{ color: "primary.main", cursor: "pointer" }}
          onClick={() => {
            prepend({
              question: "",
              answer: "",
            });
          }}
        >
          Add Question
        </Typography>
      </Box>
      <Stack gap="1rem">
        {fields.map((item: any, index: number) => {
          return (
            <Box
              key={item?.id}
              sx={{
                position: "relative",
              }}
            >
              <RHFTextField
                type="text"
                name={`section.questions.${index}.question`}
                disabled={
                  (currentlyEdited !== null && currentlyEdited !== index) ||
                  !isEditing
                }
                sx={styles.textFieldStyle}
              />
              <Box sx={styles.iconsBox}>
                <IconButton
                  onClick={() => {
                    if (!isEditing) {
                      handleEditQuestion(index);
                    } else {
                      handleSaveQuestion();
                    }
                  }}
                >
                  {isEditing && currentlyEdited === index ? (
                    <TickSquareQuestion
                      width="3rem"
                      sx={{ color: "color.primary" }}
                    />
                  ) : (
                    <EditKickOffQuestion width="3rem" />
                  )}
                </IconButton>
                <IconButton
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
