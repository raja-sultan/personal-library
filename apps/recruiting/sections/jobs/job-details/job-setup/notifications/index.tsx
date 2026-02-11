import { Box, Button, Stack } from "@mui/material";
import { CustomTabs } from "common";
import { ViewByJob } from "./view-by-job";
import { ViewByUser } from "./view-by-user";
import { useRouter } from "next/navigation";
import { JobDetailsHeader } from "../../job-details-header";

export function JobNotifications(): JSX.Element {
  const router = useRouter();

  return (
    <Box>
      <JobDetailsHeader mainTitle="Notifications" />
      <Stack rowGap={0.5}>
        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() => {
            router.push("/configuration/notification");
          }}
        >
          Manage All Notifications
        </Button>
        <CustomTabs tabsNameArray={["View by Job", "View by User"]}>
          <ViewByJob />
          <ViewByUser />
        </CustomTabs>
      </Stack>
    </Box>
  );
}
