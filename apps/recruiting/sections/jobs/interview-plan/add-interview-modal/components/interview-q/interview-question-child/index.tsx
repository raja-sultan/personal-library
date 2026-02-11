import { Button, Grid, IconButton, InputLabel, TextField } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear";

export function InterviewQuestionChild({ nestIndex, control, register }): any {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `interviewQuestion.${nestIndex}.options`,
  });

  return (
    <>
      <InputLabel>Selection Options</InputLabel>
      {fields.map((item, k) => {
        return (
          <Grid
            key={item.id}
            my={0.5}
            item
            xs={12}
            container
            alignItems="center"
          >
            <TextField
              {...register(`interviewQuestion.${nestIndex}.options.${k}.name`)}
              placeholder="Display Name"
              variant="outlined"
              sx={{ width: 300 }}
            />
            <IconButton
              onClick={() => {
                remove(k);
              }}
            >
              <ClearIcon />
            </IconButton>
          </Grid>
        );
      })}
      <Button
        type="button"
        variant="text"
        color="error"
        sx={{ my: 1 }}
        onClick={() => {
          append({ name: "" });
        }}
      >
        Add another Option
      </Button>
    </>
  );
}
