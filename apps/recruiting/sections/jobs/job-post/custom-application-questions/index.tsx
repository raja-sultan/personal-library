import { EditKickOffQuestion, TickSquareQuestion } from "@assets/jobs";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { RHFTextField } from "common";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

export function CustomApplicationQuestions(): JSX.Element {
  const [currentlyEdited, setCurrentlyEdited] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  // const theme = useTheme();

  const { fields, append, remove } = useFieldArray({
    name: "customApplicationQuestions",
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
    <Card
      sx={{
        px: { md: 3, xs: 2 },
        py: 3,
        backgroundColor: "background.paper",
        borderRadius: "10px",
        boxShadow: "none !important",
        my: 3,
      }}
    >
      <Grid container rowSpacing={2} columnSpacing={{ md: 2, xs: 0 }}>
        <Grid item xs={12}>
          <Typography variant="h6">Custom application questions</Typography>
        </Grid>
        <Grid item md={3} xs={12}>
          <Stack gap="1rem">
            {fields.map((item: any, index: number) => {
              return (
                <Box
                  key={item?.id}
                  sx={{
                    position: "relative",
                    width: { md: "100%", xs: "75%" },
                  }}
                >
                  <RHFTextField
                    type="text"
                    name={`customApplicationQuestions.${index}`}
                    disabled={
                      (currentlyEdited !== null && currentlyEdited !== index) ||
                      !isEditing
                    }
                    sx={{
                      "&.MuiBox-root": {
                        position: "absolute",
                        width: "100%",
                      },
                      "&.MuiOutlinedInput-input": {
                        paddingLeft: "10rem",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "absolute",
                      right: "-8rem",
                      top: 0,
                    }}
                  >
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
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction={{ md: "row", xs: "column" }}
            columnGap={4}
            rowGap={2}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                append("");
              }}
            >
              Add Custom Question
            </Button>
            {/* <Button variant="contained" color="primary">
              Copy from another job
            </Button> */}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}
