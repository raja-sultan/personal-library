import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { OfferTemplatesTable } from "./offer-templates-table";
import { useState } from "react";
import { cardData, styles } from "./offer-template.data";

export function OfferTemplatesSection(): React.JSX.Element {
  const [openUploadModal, setOpenUploadModal] = useState(false);

  return (
    <Stack rowGap={1}>
      <Typography variant="h5">Offer Templates</Typography>
      <Paper>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={1}
        >
          <Typography variant="body1" fontWeight="bold">
            Offer Templates
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenUploadModal(true);
            }}
          >
            Upload
          </Button>
        </Stack>
        <OfferTemplatesTable
          setOpenUploadModal={setOpenUploadModal}
          openUploadModal={openUploadModal}
        />
      </Paper>
      <Paper sx={{ p: 1.5 }}>
        <Typography variant="subtitle2">
          Inclusive job descriptions motivate candidates from all backgrounds to
          apply, broadening your talent pool and making it more diverse.
          Consider:
        </Typography>
        {cardData.map((list) => (
          <Box key={list.id}>
            <Box component="ol" sx={styles.listStyling}>
              <Typography component="li" variant="subtitle2">
                {list.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Paper>
      <Typography variant="subtitle2" fontWeight="bold">
        All Available Tokens
      </Typography>
      <Paper sx={{ p: 1 }}>
        <Typography variant="subtitle2">
          Care Library is a staffing firm that specializes in putting together a
          high quality, well trained and compassionate healthcare workforce. If
          enabled, applicants will be asked optional questions about gender,
          race, veteran, and disability status to comply with certain EEOC
          reporting requirements applicable to US government contractors.
          <br />
          PLEASE NOTE: These questions are designed to collect demographic data
          about applicants in the format that is specifically required for
          federal contractors with affirmative action obligations to report it
          to the government. As such, the language cannot be altered.
        </Typography>
      </Paper>
      <Typography variant="subtitle2" fontWeight="bold">
        All Offers
      </Typography>
      <Paper sx={{ p: 1 }}>
        <Typography variant="subtitle2">
          Care Library is a staffing firm that specializes in putting together a
          high quality, well trained and compassionate healthcare workforce.
        </Typography>
      </Paper>
    </Stack>
  );
}
