import React from "react";
import { Box, Stack, Typography, IconButton, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { type Card } from "./wrapper";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: theme.palette.mode === "light" ? "#7A5AF8" : "#EBE9FE",
  },
}));


function ProgressBarCard({ progressName, infoMessage, achievedProgress, totalProgress, barValue }: Card): JSX.Element {
  // const theme = useTheme();
  // const { palette: {  } } = theme;
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{
        width: "100%",
        height: 100,
        p: 1.6,
        pb: 2.4,
        backgroundColor: "#fff",
        borderRadius: 1.3,
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography variant="body2" color="#344054" sx={{ fontWeight: 600 }}>
          {progressName}
        </Typography>
        {infoMessage && (
          <Tooltip title={infoMessage} arrow>
            <IconButton
              aria-describedby="mouse-over-popover"
              sx={{ p: 0 }}
            >
              <InfoOutlinedIcon sx={{ color: "#667085", fontSize: 24 }} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <Stack spacing={0.2}>
        <Typography
          variant="body2"
          color="#9B8AFB"
          sx={{ fontWeight: 600, textAlign: "right" }}
        >
          {achievedProgress}/{totalProgress}
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <BorderLinearProgress variant="determinate" value={Number(barValue)} />
        </Box>
      </Stack>
    </Stack>
  );
}

export default ProgressBarCard;
