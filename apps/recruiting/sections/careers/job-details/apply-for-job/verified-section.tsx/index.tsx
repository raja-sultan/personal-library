"use client";

import { bgImage } from "@assets/images";
import { Container, Typography, Box, Stack, Button } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";

export function GetVerifiedSection(): JSX.Element {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const initialTimerSeconds = 60;

  const { isRunning, seconds, restart }: any = useTimer({
    expiryTimestamp: new Date(),
    onExpire: () => {
      setIsButtonDisabled(false);
    },
  });

  const formattedSeconds = String(seconds).padStart(2, "0");

  const handleResendClick = useCallback(() => {
    setIsButtonDisabled(true);
    restart(new Date().getTime() + initialTimerSeconds * 1000);
  }, [restart]);

  useEffect(() => {
    startTimer();
  }, []);

  const startTimer = () => {
    setIsButtonDisabled(true);
    restart(new Date().getTime() + initialTimerSeconds * 1000);
  };

  return (
    <Box sx={{ background: "radial-gradient( #7555ef, #502fb4)" }}>
      <Box
        sx={{
          maxHeight: { xs: "95dvh", sm: "75dvh" },
          backgroundImage: `url(${bgImage.src})`,
          backgroundPosition: "right center",
          backgroundSize: 1000,
          backgroundRepeat: "no-repeat",
          pt: {
            sm: 25,
            xs: 20,
          },
          pb: {
            md: 10,
            xs: 3,
          },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: {
              md: "90%",
              xs: "100%",
            },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            alignItems="center"
            direction="column"
            spacing={0}
            textAlign="center"
          >
            <Stack
              direction="column"
              alignItems="center"
              spacing={3}
              sx={{
                pb: {
                  md: 20,
                  sm: 15,
                  xs: 10,
                },
              }}
            >
              <Typography
                variant="subtitle1"
                maxWidth={540}
                color="common.white"
                sx={{ lineHeight: "30px" }}
              >
                A Final Step before your application is submitted
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  letterSpacing: "-1.2px",
                  fontWeight: 600,
                }}
                color="common.white"
              >
                {`Let's Get You Verified`}
              </Typography>
              <Typography
                variant="subtitle1"
                maxWidth={540}
                color="common.white"
                sx={{ lineHeight: "30px" }}
              >
                A Verification link has been sent to your email account. Please
                click on that link to verify your email address.
              </Typography>
              {/* Timer component */}
              <Box
                sx={{
                  width: "95px",
                  height: "80px",
                  backgroundColor: "common.white",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 3,
                }}
              >
                <Typography
                  sx={{
                    color: "primary.main",
                    textAlign: "center",
                    fontSize: "48px",
                    fontWeight: 700,
                  }}
                >
                  {formattedSeconds}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Typography
                  variant="subtitle1"
                  maxWidth={540}
                  color="common.white"
                  sx={{ lineHeight: "30px" }}
                >
                  {`If you didn't get the verification email click on`}
                </Typography>
                <Button
                  variant="contained"
                  disabled={isButtonDisabled || isRunning}
                  onClick={handleResendClick}
                  sx={{
                    marginLeft: 2,
                    textDecoration: "none",
                    fontSize: "1.6rem",
                    fontWeight: 500,
                    backgroundColor: "primary.light",
                    color: "common.black",
                    "&:hover": {
                      backgroundColor: "primary.light",
                    },
                  }}
                >
                  resend link
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
