import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import createEventExample from "@assets/images/create-event-example.png";
import { Box, useTheme } from "@mui/system";
import type { Theme } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Image from "next/image";

import { RHFUploadSingleFileWithPreview } from "common";
import AddQuestions from "./add-questions";

export function ProspectInfo(props: any): JSX.Element {
  const { show, setShow, showUpload, setShowUpload, control, isDisabled } = props;
  const theme: Theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid container flexDirection="column">
      <Grid
        xs={12}
        sm={12}
        md={6}
        sx={{ p: "0.5em" }}
        mb={!showUpload ? 0 : 5}
        item
      >
        <Box display="flex" flexWrap="wrap">
          <Box>
            <Typography variant="body2" sx={{ fontWeight: "bold", my: 1 }}>
              Required Details
            </Typography>
            <ul>
              <li>
                <Typography sx={{ color: "neutral.500" }}>
                  First Name
                </Typography>
              </li>
              <li>
                <Typography sx={{ color: "neutral.500" }}>Last Name</Typography>
              </li>
              <li>
                <Typography sx={{ color: "neutral.500" }}>
                  E-mail Address
                </Typography>
              </li>
            </ul>
          </Box>
          <Box
            ml="auto"
            mb={1}
            display={!media ? "flex" : "none"}
            alignItems="flex-start"
          >
            <Button
              variant="outlined"
              onClick={() => {
                setShow(true);
              }}
            >
              View Example
            </Button>
            <Box
              position="absolute"
              ml={16}
              display="flex"
              sx={{
                transition: theme.transitions.create("opacity", {
                  easing: theme.transitions.easing.easeInOut,
                  duration: "0.4s",
                }),
                opacity: show ? "1" : "0",
              }}
            >
              <Image src={createEventExample} alt="" />
              <HighlightOffRoundedIcon
                sx={{ color: "primary.main" }}
                onClick={() => {
                  setShow(false);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid sm={12} md={6} sx={{ p: "0.5em" }} mb={!showUpload ? 0 : 5} item>
        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
          Additional Information to Capture
        </Typography>
        <AddQuestions control={control} isDisabled={isDisabled}/>

        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
          Event Image or Logo
        </Typography>
        {!showUpload && (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              setShowUpload(true);
            }}
            disabled={isDisabled}
          >
            Select
          </Button>
        )}

        {showUpload && (
          <Box>
            <RHFUploadSingleFileWithPreview
              name="eventImage"
              accept={{ "image/*": [], "video/*": [] }}
              type="image"
            />
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setShowUpload(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
