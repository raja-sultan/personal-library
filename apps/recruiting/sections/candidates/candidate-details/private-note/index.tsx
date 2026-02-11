import { FormProvider, RHFTextField } from "common";
import { GetPrivateNote } from "./get-private-note";
import { UsePrivateNote } from "./use-private-note";
import { Box, Button, Typography, Stack, useTheme } from "@mui/material";

export function PrivateNote(): JSX.Element {
  const theme = useTheme();
  const {
    showForm,
    methods,
    showUpdateButton,
    onSubmit,
    handleSubmit,
    addPrivateNoteHandler,
    editPrivateNoteHandler,
    CloseHandler,
    getPrivateNote,
    isLoading,
  } = UsePrivateNote();

  if (isLoading) {
    return <>Loading..</>;
  }
  return (
    <Box
      sx={{
        overflowX: "auto",
        [theme.breakpoints.down("md")]: {
          maxHeight: "200px",
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
          flexWrap="wrap"
          justifyContent="space-between"
          marginTop="20px"
        >
          <Typography variant="h6" color="primary" marginY="15px">
            Private Note
          </Typography>

          <Button variant="outlined" onClick={addPrivateNoteHandler}>
            Add Private Note
          </Button>
        </Stack>

        {!showForm && (
          <GetPrivateNote
            getPrivateNote={getPrivateNote}
            editPrivateNoteHandler={editPrivateNoteHandler}
          />
        )}

        {(showForm || showUpdateButton) && (
          <>
            <RHFTextField
              name="privateNote"
              outerLabel="Note"
              placeholder="Write your note"
              minRows={3}
              multiline
            />
            <Stack
              flexDirection="row"
              justifyContent="end"
              marginTop="30px"
              gap={1.6}
            >
              <Button type="button" variant="outlined" onClick={CloseHandler}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {showUpdateButton ? "update" : "Save"}
              </Button>
            </Stack>
          </>
        )}
      </FormProvider>
    </Box>
  );
}
