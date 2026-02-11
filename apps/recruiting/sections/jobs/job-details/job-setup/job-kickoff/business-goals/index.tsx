import { EditKickOffQuestion, TickSquareQuestion } from "@assets/jobs";
import { Box, Typography, Grid, IconButton, Button } from "@mui/material";
import { FormProvider, IsFetching, RHFTextField } from "common";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/system";
import { useBusinessSetUp } from "./use-business-goals";
import { LoadingButton } from "@mui/lab";
import { styles } from "@sections/jobs/job-kick-off/business-goals/business-goals.style";

export function BusinessGoals({
  setShowBusinessModal,
  modalData,
}): JSX.Element {
  const {
    currentlyEdited,
    fields,
    isEditing,
    methods,
    isSubmitting,
    prepend,
    remove,
    handleEditQuestion,
    handleSaveQuestion,
    onSubmitHandler,
  } = useBusinessSetUp({ modalData, setShowBusinessModal });
  return (
    <>
      <Box sx={styles.mainBusinessGoal}>
      <IsFetching isFetching={isSubmitting} />
        <FormProvider methods={methods}>
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Grid item xs={12} md={6}>
              <RHFTextField outerLabel="Section Name" name="name"  placeholder='Section Name'/>
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                multiline
                rows={4}
                outerLabel="Section Description"
                name="description"
                fullWidth
                placeholder='Description'
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
                    name={`questions.${index}.question`}
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
        </FormProvider>
      </Box>
      <Box mt={1}>
        <Button
          variant="outlined"
          type="button"
          onClick={() => {
            setShowBusinessModal(false);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ ml: 1 }}
          loading={isSubmitting}
          onClick={onSubmitHandler}
        >
          Save
        </LoadingButton>
      </Box>
    </>
  );
}
