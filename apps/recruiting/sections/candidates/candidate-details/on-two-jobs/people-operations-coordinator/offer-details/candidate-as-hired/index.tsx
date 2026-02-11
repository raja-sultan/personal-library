import { Box, Grid, Typography, IconButton, useTheme } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { OfferDetailsButtons } from "./data";

export function CandidateAsHired(): JSX.Element {
  const theme = useTheme();

  return (
    <Box sx={{ px: 2 }}>
      {/* Offer Details */}
      <Box sx={{ mt: 2 }}>
        {OfferDetailsButtons.map((item: any) => (
          <Box key={item.id}>
            <Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2">{item.foundThrough}</Typography>
              </Box>
              <Grid container sx={{ mt: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.success.main }}
                >
                  Req ID:{" "}
                </Typography>
                <Typography variant="subtitle2"> {item.reqID}</Typography>
              </Grid>
              <Grid container>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.success.main }}
                >
                  Opening ID:{" "}
                </Typography>
                <Typography variant="subtitle2"> {item.openingId}</Typography>
              </Grid>
            </Box>
          </Box>
        ))}
        <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
          <IconButton
            size="small"
            // sx={{ px: 0 }}
            sx={{ color: theme.palette.error.main }}
            onClick={() => {
              //   setUpdateOfferDetails(true);
            }}
          >
            <ReplayOutlinedIcon />
            Unhire
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
