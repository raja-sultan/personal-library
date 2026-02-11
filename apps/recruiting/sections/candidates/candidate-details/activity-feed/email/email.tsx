import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { WarningPrompt } from "common";
import dayjs from "dayjs";

function Email(props: any): JSX.Element {
  const theme = useTheme();
  const { form, createdAt } = props;
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
          Email
        </Typography>

        <Box display="flex" flexWrap="wrap" alignItems="start">
          <Typography
            variant="subtitle2"
            mt={1}
            sx={{ display: "flex" }}
            color={theme.palette.grey[600]}
          >
            To: &nbsp;
            <Typography
              fontWeight={600}
              color={theme.palette.grey[800]}
              variant="subtitle2"
            >
              {form?.to ?? "---"}
            </Typography>
          </Typography>

          <WarningPrompt
            mainColor="error.main"
            heading="Delete email"
            subTitle="Are you sure you want to delete this email?"
            modelOpenLabel={
              <Button variant="text" sx={{ fontSize: 13 }}>
                Delete
              </Button>
            }
            acceptButtonLabel="Delete"
            acceptButtonProps={{
              onClick: () => {},
            }}
          />
        </Box>
        <Typography
          variant="subtitle2"
          mt={1}
          sx={{ display: "flex" }}
          color={theme.palette.grey[600]}
        >
          Subject: &nbsp;
          <Typography
            fontWeight={600}
            color={theme.palette.grey[800]}
            variant="subtitle2"
          >
            {form?.subject}
          </Typography>
        </Typography>
        <Typography
          variant="subtitle2"
          mt={1}
          overflow="hidden"
          color={theme.palette.grey[600]}
        >
          {form?.message ?? "---"}
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

export default Email;
