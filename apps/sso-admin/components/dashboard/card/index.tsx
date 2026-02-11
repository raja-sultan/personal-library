import { Button, Grid, Typography, Box } from "@mui/material";
import type { HeaderProps, FooterProps, CardsProps } from "./types";
// import router from "next/router";
import { useRouter } from "next/navigation";


function Header({
  heading,
  activeUsers,
  inActiveUsers,
  HeadingIcon,
  BgIcon,
  isCompanyCard,
}: HeaderProps): JSX.Element {
  return (
    <Grid
      item
      container
      py={2}
      px={1}
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: "6rem",
          width: "6rem",
          position: "absolute",
          right: "0",
          bottom: "0",
        }}
      >
        {HeadingIcon}
      </Box>
      <Grid item xs={2.5} py={1} container justifyContent="center">
        <span
          style={{
            height: "65px",
            width: "80px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FCFCFC",
            filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.10))",
          }}
        >
          {BgIcon}
        </span>
      </Grid>
      <Grid item container direction="column" md={9} xs={12}>
        <Grid item sx={{ mb: 2.5 }}>
          <Typography variant="h4" my={1} ml={1}>
            {heading}
          </Typography>
        </Grid>
        <Grid item container justifyContent="center">
          <Grid
            item
            container
            justifyContent={{ md: "start", xs: "center" }}
            direction="column"
            md={6}
            xs={12}
            pb={2.5}
          >
            <Typography
              variant="body2"
              my={1}
              sx={{
                fontWeight: 600,
                color: "neutral.600",
              }}
            >
              {isCompanyCard ? "New Requests" : "Active Users"}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "32px",
                color: "success.main",
                fontWeight: 600,
              }}
            >
              {activeUsers}
            </Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent={{ md: "start", xs: "center" }}
            direction="column"
            md={6}
            xs={12}
          >
            <Typography
              variant="body2"
              my={1}
              sx={{
                // fontSize: "16px",
                fontWeight: 600,
                color: "neutral.600",
              }}
            >
              {isCompanyCard ? "Registered Companies" : "InActive Users"}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "32px",
                fontWeight: 600,
                color: "error.main",
              }}
            >
              {inActiveUsers}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function Footer({ navigationLink }: FooterProps): JSX.Element {
  const router = useRouter()

  return (
    <Button
      disableRipple
      variant="contained"
      fullWidth
      sx={{
        borderRadius: "0px 0px 13.75px 13.75px",
        fontWeight: "500",
        fontSize: 18,
        bgcolor: "primary.main",
      }}
      onClick={() => { router.push(navigationLink); }}
    >
      View All
    </Button>
  );
}

export function CardComponent({
  heading,
  activeUsers,
  inActiveUsers,
  HeadingIcon,
  BgIcon,
  navigationLink,
  isCompanyCard,
}: CardsProps): JSX.Element {
  return (
    <>
      <Header
        heading={heading}
        activeUsers={activeUsers}
        inActiveUsers={inActiveUsers}
        HeadingIcon={HeadingIcon}
        BgIcon={BgIcon}
        isCompanyCard={isCompanyCard}
      />
      <Footer navigationLink={navigationLink} />
    </>
  );
}
