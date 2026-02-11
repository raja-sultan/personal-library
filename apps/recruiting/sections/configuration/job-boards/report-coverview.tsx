import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function SavedReports() {
  return (
    <Box>
      <Typography variant="h5" sx={{ my: 1 }}>
        Saved Reports
      </Typography>
      <Grid container sx={{ bgcolor: "neutral.200", p: 1, borderRadius: 1 }}>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ color: "neutral.500" }}>
            Name{" "}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ color: "neutral.500" }}>
            Saved{" "}
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          maxHeight: "50vh",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#cacaca",
            borderRadius: "10px",
          },
        }}
      >
        <Grid
          container
          sx={{
            bgcolor: "neutral.200",
            p: 1,
            border: "1px solid",
            borderColor: "neutral.300",
            borderRadius: 1,
            my: 1,
            alignItems: "center",
          }}
        >
          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              Offers and Hiring
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.main" }}>
              Dashboard
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ color: "text.main" }}>
              2 weeks ago
            </Typography>
          </Grid>
        </Grid>
        {/* {[1, 2, 3, 4, 5, 6, 7].map((_) => (
          <ReportCard />
        ))} */}
      </Box>
    </Box>
  );
}
// function ReportCard() {
//   return (
//     <Grid
//       container
//       sx={{
//         bgcolor: "neutral.200",
//         p: 1,
//         border: "1px solid",
//         borderColor: "neutral.300",
//         borderRadius: 1,
//         my: 1,
//         alignItems: "center",
//       }}
//     >
//       <Grid item xs={6}>
//         <Typography
//           variant="body2"
//           sx={{ color: "primary.main", fontWeight: 600 }}
//         >
//           Offers and Hiring
//         </Typography>
//         <Typography variant="subtitle1" sx={{ color: "text.main" }}>
//           Dashboard
//         </Typography>
//       </Grid>
//       <Grid item xs={6}>
//         <Typography variant="body1" sx={{ color: "text.main" }}>
//           2 weeks ago
//         </Typography>
//       </Grid>
//     </Grid>
//   );
// }
