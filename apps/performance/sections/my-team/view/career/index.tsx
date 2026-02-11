"use client";
import CustomCard from "@components/custom-card";
import { Box, Tab, Tabs, Typography } from "@mui/material";
// import { ThemeModeColor } from "@root/utils";
import CareerVision from "@sections/career/career-vision";
import GrowthAreasLayout from "@sections/career/growth-areas";
import { CareerPlans } from "@sections/career/plans";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, value, index }: TabPanelProps): JSX.Element {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box marginTop="2rem">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function CareerView(): JSX.Element {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <CustomCard>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Plans" />
          <Tab label="Growth Areas" />
          <Tab label="Career Vision" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CareerPlans />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GrowthAreasLayout />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CareerVision />
      </CustomTabPanel>
    </CustomCard>
  );
}

// const styles = {
//     wrapper: ({ palette: { neutral, common } }) => ({
//         padding: '24px ',
//         borderRadius: '8px',
//         border: `1px solid ${neutral[200]}`,
//         minHeight: '65vh',
//         background: ThemeModeColor(common.white, 'transparent'),
//         '& > div': {
//             border: 'none'
//         }
//     })
// }
