import React from "react";
import CustomCard from "@components/custom-card";
import { Box, Grid, Typography } from "@mui/material";
import { type TeamSetupDataType } from "./overview-data";
import { CustomAlert } from "@components/alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReactApexChart from "react-apexcharts";
import { useOverview } from "./use-overview";
import { ThemeModeColor } from "@root/utils";
import { useTeamSetupData } from "./overview-data";
import { ComponentLoader } from "@components/component-loader";

export function Overview(): any {
  const { series, options, icons } = useOverview();
  const { teamSetupData, isLoading } = useTeamSetupData();
  return (
    <>
      <Typography variant="h4" mb="24px">
        How is your team feeling?
      </Typography>
      <CustomCard
        subHeader
        cardSubHeader={{
          title: "Sentiment From Updates",
          description:
            "Updates give an opportunity for employees to answer the question “How are you feeling this week?” on a scale 1-5.",
        }}
      >
        <>
          {isLoading ? <ComponentLoader /> :
            <Grid container spacing={2}>
              <Grid item md={9.5} xs={12}>
                <ReactApexChart
                  options={{
                    ...options,
                    chart: { zoom: false, toolbar: { tools: { zoom: false } } },
                    tooltip: { enabled: false },
                  }}
                  series={series}
                  type="bar"
                  height={405}
                />
              </Grid>
              <Grid item md={2.5} xs={12}>
                <Box sx={style.reactionBox}>
                  {series?.map((rec: any) => (
                    <Box
                      key={rec?.name}
                      sx={{ display: "flex", justifyContent: "space-between", mb: "24px" }}
                    >
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        {/* Display the icon based on the name */}
                        {rec?.name === 'Great' && icons.Great}
                        {rec?.name === 'Good' && icons.Good}
                        {rec?.name === 'Okay' && icons.Okay}
                        {rec?.name === 'Bad' && icons.Bad}
                        {rec?.name === 'Terrible' && icons.Terrible}
                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color={ThemeModeColor("neutral.700", "neutral.100")}
                          >
                            {rec?.name}
                          </Typography>
                          <Typography variant="subtitle2" fontWeight={400} color="neutral.500">
                            Score: {rec.data?.toString()}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          backgroundColor: `${rec?.color}`,
                          width: "18px",
                          height: "18px",
                          borderRadius: "4px",
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          }
        </>
      </CustomCard>

      <Typography variant="h4" my="24px">
        Is your team set up for success?
      </Typography>
      <Grid container spacing={2}>
        {teamSetupData?.map((obj: TeamSetupDataType) => (
          <Grid item key={obj?.id} lg={4} sm={6} xs={12}>
            <TeamCard {...obj} isLoading={isLoading} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function TeamCard({ id, icon, title, alert, progressComponent, isLoading }: TeamSetupDataType & { isLoading: boolean }): JSX.Element {
  return (
    <CustomCard key={id} cardProps={{ sx: { height: "100%" } }}>
      {isLoading ? (
        <ComponentLoader />
      ) : (
        <>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap="24px">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              height={48}
              width={48}
              sx={({ palette: { primary } }) => ({ background: primary.lightest })}
            >
              {icon}
            </Box>
            <Typography variant="h6" textTransform="capitalize">
              {title}
            </Typography>
          </Box>
          <Box my="24px">{progressComponent}</Box>
          {alert?.message && (
            <CustomAlert
              key={id}
              icon={<CheckCircleOutlineIcon color={alert?.color === "#FDF6B2" ? "error" : "success"} />}
              message={alert?.message}
              bgColor={alert?.color}
              removeMargin
            />
          )}
        </>
      )}
    </CustomCard>
  );
}

const style = {
  reactionBox: ({ palette: { neutral } }) => ({
    backgroundColor: ThemeModeColor(neutral[100], "transparent"),
    border: `1px solid ${neutral[100]}`,
    borderRadius: "8px",
    minHeight: "88%",
    padding: "2.4rem",
  }),
};
