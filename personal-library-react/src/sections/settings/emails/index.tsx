import { Box, Card, Divider, Stack, Switch, Typography } from "@mui/material";
import { CreateEmailTemplate } from "./choreographed-intro";
import YourNextStep from "./next-step";
import WelcomeTeam from "./welcome-team";
import OnboardingCoreEmail from "./onboarding-core-email";

export function EmailsSection(): JSX.Element {
  return (
    <>
      <Stack rowGap={2}>
        <Typography variant="h6">Emails</Typography>
        <Card sx={{ p: 2 }}>
          <Typography variant="subtitle2">Global settings</Typography>
          <Stack direction="row" py={2} columnGap={2}>
            <Switch />
            <Box>
              <Typography variant="body2" fontWeight={600}>
                All emails for organization
              </Typography>
              <Typography variant="subtitle2" color="neutral.400">
                Turning off this will stop automatically generated emails from
                going out-including task assignments, employee notifications and
                summary reports
              </Typography>
            </Box>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" sx={{ mb: 2 }}>
            Email delivery Time zone
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            (GMT-07:00) Pacific Time (US & Canada)
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
            Email will be delivered in this time zone, unless an employee
            chooses a local time zone
          </Typography>
        </Card>
      </Stack>
      {/* Choeographed Introductons Modal */}
      <Box sx={{ mt: 2.5 }}>
        <CreateEmailTemplate />
      </Box>
      {/* Your Next Step Component */}
      <Box sx={{ mt: 2.5 }}>
        <YourNextStep />
      </Box>
      {/* Welcome Team Modal */}
      <Box sx={{ mt: 2.5 }}>
        <WelcomeTeam />
      </Box>
      {/* Onboarding Core Email Component */}
      <Box sx={{ mt: 2.5 }}>
        <OnboardingCoreEmail />
      </Box>
    </>
  );
}
