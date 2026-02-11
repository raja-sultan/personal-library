import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { candidatesStyle } from "./style";
import { CustomTabs } from "common";
import { JobCandidate } from "./job-candidate";
import { Prospect } from "./prospect";
import { useRouter } from "next/navigation";

export function AddCandidateSection(): JSX.Element {
  const router = useRouter();
  return (
    <Card sx={{ height: "76vh", p: { md: 3, xs: 2 } }}>
      <Stack direction="row" sx={candidatesStyle.tabsCardStyle}>
        <Box sx={{ width: "90%" }}>
          <Box>
            <Button
              sx={{ p: 0 }}
              onClick={() => {
                router.push("candidates");
              }}
            >
              Back to search results
            </Button>
            <Typography variant="h5" sx={{ my: 2 }}>
              Add a Candidate
            </Typography>
          </Box>
          <Box>
            <CustomTabs tabsNameArray={["Job Candidate", "Prospect"]}>
              <JobCandidate />
              <Prospect />
            </CustomTabs>
          </Box>
        </Box>
        {/* <Box sx={{ width: "10%" }}>Resume</Box> */}
      </Stack>
    </Card>
  );
}
