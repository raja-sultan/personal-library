import React from "react";
import { Grid } from "@mui/material";
import { ConnectedDeviceChart } from "@components/dashboard/connected-device";
import { AvailableServerSpaceChart } from "@components/dashboard/available-server-space";
// import { useGetTotalConnectedDevicesQuery } from "@services/sso-admin-dashboard-api";
// import { getSessionStorage } from "common";

export function ConnectAndServerSpaceChartSection(): React.JSX.Element {
  // const accessToken = getSessionStorage("accessToken");
  // const { data } = useGetTotalConnectedDevicesQuery({
  //   accessToken,
  //   limit: "10",
  // });
  interface DashboardItem {
    id: number;
    heading: string;
    component: React.ReactNode;
    padding: string;
  }
  const AdminDashboardPieChart: DashboardItem[] = [
    {
      id: 1,
      heading: "Connected Devices",
      component: <ConnectedDeviceChart />,
      padding: "20px 10px 25px 10px",
    },
    {
      id: 2,
      heading: "Available Server Space",
      component: <AvailableServerSpaceChart />,
      padding: "15px 10px 25px 10px",
    },
  ];
  return (
    <Grid
      px={{ xs: 0.5 }}
      py={{ md: 4, xs: 2 }}
      container
      item
      sx={{
        boxShadow: "0px 5px 25px 0px rgba(105, 105, 105, 0.10)",
        bgcolor: "white",
        borderRadius: "8px",
      }}
    >
      {AdminDashboardPieChart?.map((ele: DashboardItem) => (
        <Grid
          key={ele?.id}
          item
          container
          justifyContent={{ lg: "start", xs: "center" }}
          alignItems="center"
          sm={6}
          xs={12}
        >
          <span
            style={{
              fontWeight: 600,
              width: "100%",
              textAlign: "center",
              fontSize: 18,
              padding: ele?.padding,
            }}
          >
            {ele?.heading}
          </span>
          {ele?.component}
        </Grid>
      ))}
    </Grid>
  );
}
