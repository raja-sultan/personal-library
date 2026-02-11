import { Button, Grid, Typography, useTheme } from "@mui/material";

export function MainCard({
  title,
  desc,
  participantsList,
  clickHandler,
  children,
  btnText,
  jobId,
}: any): JSX.Element {
  const theme = useTheme();
  return (
    <Grid
      container
      py={1}
      sx={{ borderBottom: `.5px solid ${theme.palette.neutral[300]}` }}
    >
      <Grid xs={12} md={8} item>
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{ color: "text.primary" }}
        >
          {title}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {desc}
        </Typography>
        {!children ? (
          <Typography variant="caption">
            {participantsList < 1 ? "No Participants added" : participantsList}
          </Typography>
        ) : (
          <>{children}</>
        )}
      </Grid>
      <Grid
        xs={12}
        md={4}
        item
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={clickHandler}
          sx={{ width: 170 }}
          disabled={!jobId}
        >
          {btnText ? btnText : "Configure"}
        </Button>
      </Grid>
    </Grid>
  );
}
