import { Card, Grid, Typography } from "@mui/material";
import { RHFCheckbox, RHFTextField } from "common";
import Link from "next/link";

export function FreeJobBoard(): JSX.Element {
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
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Publish to free job boards</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            It can take up to 48 hours for new posts and updates to appear on
            these boards.{" "}
            <Link href="" style={{ textDecoration: "underline" }}>
              Learn more.
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <RHFCheckbox name="publishToFreeJobBoards.indeed" label="Indeed" />
        </Grid>
        <Grid item md={3} xs={12}>
          <RHFTextField
            name="publishToFreeJobBoards.location"
            outerLabel="Location"
          />
        </Grid>
        <Grid
          item
          md={9}
          xs={12}
          sx={{ display: "flex", alignItems: "flex-end" }}
        >
          <RHFCheckbox name="publishToFreeJobBoards.remote" label="Remote" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Card
            sx={{
              px: 4,
              py: 3,
              backgroundColor: "success.lightest",
              color: "success.main",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            {`Some job Boards don't support Remote ads in certain countries. Learn
        more`}
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
}
