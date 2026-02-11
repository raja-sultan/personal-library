import { Card, Grid, Stack, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { descriptionIntroductionList } from "./post.description.data";
import Popover from "@mui/material/Popover";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useState } from "react";
import { RHFEditor, RHFTextField } from "common";

export function PostDescription(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function handlePopoverOpen(event: React.MouseEvent<HTMLElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handlePopoverClose(): void {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  return (
    <>
      <Card
        sx={{
          px: { md: 3, xs: 2 },
          py: 3,
          backgroundColor: "background.paper",
          borderRadius: "10px",
          boxShadow: "none !important",
          mt: 3,
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Post description</Typography>
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="postDescription.descriptionIntroduction"
              outerLabel="Description Introduction"
            />
          </Grid>
          <Grid item xs={12}>
            <Card
              sx={{
                px: 4,
                py: 3,
                backgroundColor: "success.lightest",
              }}
            >
              <Stack direction="row" columnGap={1}>
                <Typography
                  sx={{
                    color: "success.dark",
                  }}
                  variant="button"
                >
                  Description introduction
                </Typography>
                <Typography
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <ErrorOutlineIcon sx={{ color: "neutral.500" }} />
                </Typography>
              </Stack>

              {descriptionIntroductionList.map((item) => {
                return (
                  <Stack
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "success.main",
                      ml: 2,
                    }}
                    key={item}
                    direction="row"
                  >
                    <FiberManualRecordIcon sx={{ width: "10px", mr: 1 }} />
                    {item}
                  </Stack>
                );
              })}
            </Card>
          </Grid>
          <Grid item xs={12}>
            <RHFEditor
              name="body"
              outerLabel="Body"
              sx={{
                height: "40rem",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "primary.main",
                  borderRadius: "6px",
                },
                pr: 2,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="postDescription.descriptionConclusion"
              outerLabel="Description Conclusion"
            />
          </Grid>
        </Grid>
      </Card>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
          width: "800px",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }} textAlign="center">
          Who are you looking for? What is the most appealing part of the job?
          What is the work environment like? What are the required skills and
          experience?
        </Typography>
      </Popover>
    </>
  );
}
