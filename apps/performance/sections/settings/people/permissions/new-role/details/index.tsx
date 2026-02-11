import CustomCard from "@components/custom-card";
import { Grid, Stack, Typography } from "@mui/material";
import { RHFTextField } from "common";

export function NewRoleDetails(): JSX.Element {
  return (
    <CustomCard
      cardProps={{ sx: { padding: "16px", height: "calc(100vh - 405px)" } }}
    >
      <Grid container spacing={2}>
        <Grid item md={5} xs={12}>
          <Typography variant="subtitle1" fontWeight={600}>
            Role Details
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight={400}
            color="neutral.500"
            mt={0.6}
          >
            Create a company wide goal setting practice. You will have the
            ability to send notifications and monitor progress through the term
            of the goal cycle.
          </Typography>
        </Grid>
        <Grid item md={5} xs={12}>
          <Stack spacing={4}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" mb={0.6}>
                Name
              </Typography>
              <RHFTextField name="name" fullWidth placeholder="Employee" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" mb={0.6}>
                Description <span style={{ opacity: 0.5 }}>(Optional)</span>
              </Typography>
              <RHFTextField
                name="description"
                fullWidth
                multiline
                minRows={3}
                maxRows={3}
                placeholder="This role defined the access of employees within the system."
                sx={styles.description}
              />
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </CustomCard>
  );
}

const styles = {
  description: {
    "& ::-webkit-scrollbar": {
      width: "5px",
    },
    "& ::-webkit-scrollbar-thumb": {
      backgroundColor: "#cacaca",
      borderRadius: "10px",
    },
    "& ::-webkit-scrollbar-track": {
      borderRadius: "10px",
    },
  },
};
