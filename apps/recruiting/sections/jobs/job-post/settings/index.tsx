import { Card, Grid, Typography } from "@mui/material";
import { RHFCheckbox, RHFCustomSelect, RHFRadioGroup } from "common";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import { autoReplyDropdownList } from "./setting.data";

export function Settings(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // function handlePopoverOpen(event: React.MouseEvent<HTMLElement>): void {
  //   setAnchorEl(event.currentTarget);
  // }

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
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Settings</Typography>
          </Grid>
          <Grid item xs={12}>
            <RHFCheckbox
              name="setting.confirmationEmailToCandidates"
              label="Send confirmation email to candidates"
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <RHFCustomSelect
              name="setting.defaultCandidateAutoReplyEmail"
              options={autoReplyDropdownList}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFRadioGroup
              name="setting.defaultConfirmationPage"
              outerLabel="Application Confirmation Page"
              options={[
                { label: "Default", value: true },
                { label: "Customize", value: false },
              ]}
            />
          </Grid>
          {/* <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <RHFCheckbox
              name="setting.includeDemographicQuestions"
              label="Include demographic questions"
            />
            <Typography
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <ErrorOutlineIcon sx={{ color: "#667085" }} />
            </Typography>
          </Grid> */}
          <Grid item md={3} xs={12}>
            <RHFCustomSelect
              name="setting.defaultCandidateAutoReplyDemographics"
              options={autoReplyDropdownList}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <RHFCheckbox
              name="setting.includeEEOCQuestions"
              label="Include EEOC questions"
            />
            <Typography color="neutral.400" variant="subtitle1" sx={{ ml: 4 }}>
              If enabled, applicants will be asked optional questions about
              gender, race, veteran, and disability status to comply with
              certain EEOC reporting requirements applicable to US government
              contractors.
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 4 }} color="neutral.400">
              <Typography component="span" variant="body1" fontWeight="bold">
                PLEASE NOTE:{" "}
              </Typography>
              These questions are designed to collect demographic data about
              applicants in the format that is specifically required for federal
              contractors with affirmative action obligations to report it to
              the government. As such, the language cannot be altered.
            </Typography>
          </Grid> */}
          {/* <Grid item xs={12}>
            <RHFCheckbox
              name="setting.includeApplyWithSeekButton"
              label="Include 'Apply with SEEK' button"
            />
            <Typography variant="subtitle1" color="neutral.400" sx={{ ml: 4 }}>
              This will only appear for external job boards with a saved SEEK
              Client ID.
            </Typography>
          </Grid> */}
        </Grid>
      </Card>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
          width: "1000px",
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
          {` This question set is based on Personnel Library's own practices to
          collect demographic information for U.S.-based applicants. This
          question set does not replace the standard EEOC questions for
          companies that are required by law to report on candidate demographic
          data. Please consult with your company’s own legal counsel before
          enabling this question set, as there are risks inherent to collecting
          demographic data where it is not required to do so, and Personnel
          Library disclaims any legal responsibility for the wording of the
          questions themselves. In addition, Personnel Library will not be
          responsible for any liability that may arise out of your use of this
          question set.`}
        </Typography>
      </Popover>
    </>
  );
}
