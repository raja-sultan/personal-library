import { Grid, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";

function Activity(props: any): JSX.Element {
  const theme = useTheme();
  const {  content, createdAt } = props;
  return (
    <Grid
      bgcolor={theme?.palette?.background?.default}
      container
      px={1.3}
      py={2}
      my={1.5}
      borderRadius={1}
    >
      <Grid item md={10} xs={12}>
        <Typography variant="body1" fontWeight={600}>
         Activity
        </Typography>

        <Typography variant="subtitle2" mt={1} color={theme.palette.grey[600]}>
          {content}
        </Typography>
      </Grid>
      <Grid container justifyContent="end" item md={2} xs={12}>
        <Typography variant="caption" color={theme.palette.grey[400]}>
          {dayjs(createdAt).format("MMM DD,YYYY hh:mm A")}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Activity;
