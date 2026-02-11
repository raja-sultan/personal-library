import { FormProvider } from "common";
import { Typography, Box, Button, Grid } from "@mui/material";
import { useCreateTemplates } from "./use-create-template";
import { EmailTeam } from "./create-template.data";

export function CreateEmailTemplateSection(): JSX.Element {
  //Custom Hook
  const {
    handleSubmit,
    control,
    onSubmit,
    methods,
    reset,
    getParams,
    getSubParams,
    router,
    updateSubTemplate,
  } = useCreateTemplates();

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6">Email Templates</Typography>
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        Send a Job Kickoff form to a hiring manager for them to start
        brainstorming details about this job. This can also be created, edited,
        and sent in Job Setup.
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 3.5, ...styles.innerCardWrapper }}>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {EmailTeam()?.emailTeamDetails?.map((item) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component control={control} {...item.componentProps} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "start", sm: "end" },
            gap: 2,
            mt: 3,
          }}
        >
          <Box>
            <Button
              variant="contained"
              type="button"
              onClick={() => {
                router.push("/configuration/email-templates");
              }}
            >
              Back
            </Button>
          </Box>
          <Box>
            <Button
              sx={{ mr: 2 }}
              variant="outlined"
              onClick={() => {
                router.push("/configuration/email-templates");
                reset();
              }}
            >
              Cancel
            </Button>
            {getParams ||
            getParams === "add" ||
            getSubParams ||
            updateSubTemplate ? (
              <Button variant="contained" type="submit">
                {getParams === "add" || getSubParams || !updateSubTemplate
                  ? "Save"
                  : "update"}
              </Button>
            ) : null}
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
}

const styles = {
  innerCardWrapper: {
    maxHeight: { lg: 650 },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
    pr: 2,
  },
};
