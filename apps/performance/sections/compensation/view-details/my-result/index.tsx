import CustomCard from "@components/custom-card";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { Box, Grid, Slider, Typography } from "@mui/material";
import { renderUserImage } from "@root/utils/render-user-image";
import { useMyResult } from "@sections/compensation/view-details/my-result/use-my-result";
import { styles } from "@sections/compensation/view-details/view-detail.style";

export function MyResult(): JSX.Element {
  const { businessTableData, salaryTableData } = useMyResult();

  const user = businessTableData?.data?.[0]?.user;
  const compensationBand = businessTableData?.data?.[0]?.user?.compensationBand;

  const currentSalary = salaryTableData?.data?.[0]?.currentSalary


  const marks = [
    {
      value: 0,
      label: compensationBand?.minBasePay,
    },
    {
      value: 50,
      label: compensationBand?.midBasePay,
    },
    {
      value: 100,
      label: compensationBand?.maxBasePay,
    },
  ];

  return (
    <CustomCard
      subHeader
      cardSubHeader={{
        title: (
          <Box display="flex" gap="10px" alignItems="center">
            {renderUserImage({
              profileImage: user?.profileImage,
              firstName: user?.firstName ?? '--',
              lastName: user?.lastName ?? '--',
              height: 48,
              width: 48,
            })}
            <Typography fontWeight={600}>{user?.firstName} {user?.lastName}</Typography>
          </Box>
        ),
      }}
    >
      <Grid container spacing={2} sx={{ mb: 2.4 }}>
        <Grid item md={9}>
          <CustomTableWithHeader
            primaryHeader
            primaryHeaderProps={{
              title: (
                <Typography variant="subtitle1" fontWeight={600}>
                  {user?.employeeTitle}
                </Typography>
              ),
            }}
            tableProps={businessTableData}
          />
        </Grid>
        <Grid item md={3}>
          <CustomCard
            subHeader
            cardSubHeader={{
              title: (
                <Typography variant="subtitle1">Compensation band</Typography>
              ),
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={600}
              mb="24px"
              color="neutral.500"
            >
              Current Salary £{currentSalary}
            </Typography>
            <Slider
              aria-labelledby="track-true-slider"
              disabled
              // getAriaValueText={valuetext}
              defaultValue={currentSalary}
              marks={marks}
              sx={styles.sliderStyle}
              classes={{
                track: "_track",
                rail: "_rail",
                markLabel: "_markLabel",
              }}
            />
          </CustomCard>
        </Grid>
      </Grid>
      <CustomTableWithHeader
        primaryHeader
        primaryHeaderProps={{
          title: (
            <Typography variant="subtitle1" fontWeight={600}>
              Salary Details
            </Typography>
          ),
        }}
        tableProps={salaryTableData}
      />
    </CustomCard>
  );
}
