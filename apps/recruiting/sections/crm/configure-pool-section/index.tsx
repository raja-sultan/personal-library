import { CustomTabs } from "common";
import { ActivePools } from "./active-pool";
import { ArchivedPools } from "./archived-pool";
import { Button, Card, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ConfigurePoolSection(): JSX.Element {
  const [prospectPoolModal, setProspectPoolModal] = useState(false);
  const router = useRouter();
  return (
    <Card sx={{ height: "76vh", p: 1 }}>
      <Button
        startIcon={
          <ArrowBackIcon sx={{ borderRadius: "50%", border: "1px solid " }} />
        }
        sx={{
          color: "text.primary",
        }}
        onClick={() => {
          router.push("crm");
        }}
      >
        Back
      </Button>
      <Stack direction="row" justifyContent="space-between" my={0.5}>
        <Typography variant="h5">Configure Pools</Typography>
      </Stack>
      <CustomTabs tabsNameArray={["Active Pools", "Archive Pools"]}>
        <ActivePools
          setProspectPoolModal={setProspectPoolModal}
          prospectPoolModal={prospectPoolModal}
        />
        <ArchivedPools setProspectPoolModal={setProspectPoolModal} />
      </CustomTabs>
    </Card>
  );
}
