import type { ReactNode } from "react";
import { Grid, Typography, Box, Stack } from "@mui/material";
import { AuthSlider } from "./auth-slider";
import { CompanyLogoIcon } from "common/assets/logo";
import { Footer } from "./footer";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export function AuthLayout(props: LayoutProps): JSX.Element {
  const { children } = props;
  const pathName = usePathname();
  const isNotSignUp =
    pathName === "/sign-in" || pathName === "/forgot-password";
  return (
    <Grid container sx={{ p: "2rem" }}>
      <Grid
        item
        xs={4}
        sx={{
          display: { xs: "none", lg: "block" },
          backgroundColor: "primary.main",
          p: "6rem",
          borderRadius: "1rem",
          minHeight: "95vh",
        }}
      >
        <Stack rowGap={12}>
          <CompanyLogoIcon />
          <Box>
            <Typography
              variant="h2"
              sx={{
                color: "common.white",
              }}
            >
              {isNotSignUp ? "Let’s sign you in" : "Start Your Journey With Us"}
            </Typography>
            {isNotSignUp ? (
              <Typography
                variant="h5"
                sx={{
                  color: "common.white",
                  fontWeight: 400,
                  py: 4,
                }}
              >
                Welcome back!
                <Typography
                  variant="h5"
                  sx={{
                    color: "common.white",
                    fontWeight: 400,
                  }}
                >
                  Manage you teams effectively.
                </Typography>
              </Typography>
            ) : (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    color: "common.white",
                    fontWeight: 400,
                    py: 4,
                  }}
                >
                  Unlock the potential of your people and help them grow with
                  you
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "common.white",
                    fontWeight: 400,
                  }}
                >
                  Book a demo today to get started!
                </Typography>
              </>
            )}
          </Box>
          <AuthSlider />
        </Stack>
      </Grid>
      <Grid item xs={12} lg={8}>
        <Stack
          sx={{
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ m: 4.5 }}>{children}</Box>
          <Footer />
        </Stack>
      </Grid>
    </Grid>
  );
}
