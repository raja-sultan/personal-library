"use client";

import CustomCard from "@components/custom-card";
import { ThirdPartyCard } from "@components/third-party-card";
import { Button, Grid } from "@mui/material";
import { SlackIcon, TeamsIcon } from "@assets/images";
import Link from "next/link";
import Image from "next/image";
// import { styles } from "@components/custom-modal/modal.styles";
import { SettingsIcon } from "@assets/icons/settings-icon";
import type { Theme } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

export function Notifications(): JSX.Element {
  return (
    <CustomCard
      subHeader
      cardSubHeader={{
        title: "Notifications",
        description:
          "Configure how employees can choose to receive notifications",
        actions: (
          <Link href="/settings/notifications/setting">
            <Button
              variant="outlined"
              size="medium"
              sx={styles.cancelBtn}
              startIcon={<SettingsIcon height="20" />}
            >
              Settings
            </Button>
          </Link>
        ),
      }}
    >
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <ThirdPartyCard
            key="slack"
            icon={<Image src={SlackIcon} alt="icon" height={32} width={32} />}
            title="Slack"
            description="Send notifications to your employees directly in Slack."
            status="disconnect"
            // onClick={()=>{}}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <ThirdPartyCard
            key="Microsoft Teams"
            icon={<Image src={TeamsIcon} alt="icon" height={32} width={32} />}
            title="Microsoft Teams"
            description="Send notifications to your employees directly in teams."
            status="connect"
            // onClick={()=>{}}
          />
        </Grid>
      </Grid>
    </CustomCard>
  );
}

const styles = {
  cancelBtn: (theme: Theme) => ({
    width: { sm: "auto", xs: "100%" },
    p: "10px 20px",
    color: ThemeModeColor("#344054", "dark"),
    background: ThemeModeColor(
      theme.palette.primary.contrastText,
      "transparent"
    ),
    border: `1px solid ${theme.palette.neutral[300]}`,
    "&:hover": {
      borderColor: theme.palette.neutral[400],
    },
  }),
};
