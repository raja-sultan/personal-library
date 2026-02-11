"use client";
import React, { useState } from "react";
import { CustomModal } from "common";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Performance } from "./performance";
import { tabs } from "./user-management.data";
import { ClockLog } from "./clock-log";
import { OnBoarding } from "./onboarding";
import { Recruiting } from "./recruiting";

function TabPanel(props: any): JSX.Element {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export function RoleAndRightForm({ rowId }: any): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log("rowId", rowId);

  return (
    <>
      <MenuItem
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Role & Rights
      </MenuItem>
      <CustomModal
        onClose={setOpenModal}
        rootSx={{
          maxWidth: { xs: 350, sm: 800 },
        }}
        headerLabel="Role & Rights"
        headerTypographyProps={{
          color: "primary.main",
        }}
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <Box sx={styles.modalBody}>
          <Grid container columnSpacing={3} rowSpacing={4}>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" sx={styles.commonStyles}>
                Products
              </Typography>
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                sx={styles.tabsStyling}
              >
                {tabs.map((tab) => (
                  <Tab label={tab.label} key={tab.id} sx={styles.tabStyling} />
                ))}
              </Tabs>
            </Grid>
            {/* Tab Panel Grid */}
            <Grid item xs={12} sm={9}>
              <Typography variant="body2" sx={styles.commonStyles}>
                Menu
              </Typography>
              <TabPanel value={value} index={0}>
                <Performance performance="performance" />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Recruiting />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ClockLog />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <OnBoarding />
              </TabPanel>
            </Grid>
          </Grid>
        </Box>
      </CustomModal>
    </>
  );
}

const styles = {
  commonStyles: {
    fontWeight: 700,
    color: "text.secondary",
    mb: 1.5,
  },
  modalBody: {
    height: "min(80vh, 60rem)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },

    mt: 2,
  },
  tabsStyling: {
    borderRight: 1,
    borderColor: "divider",
    "& .MuiTabs-indicator": {
      left: 0,
    },
  },
  tabStyling: {
    "&.Mui-selected": {
      backgroundColor: "primary.lightest",
    },
    "&.MuiButtonBase-root": {
      m: 0,
    },
    alignItems: "flex-start",
    mb: 0.5,
    p: 1,
  },
};
