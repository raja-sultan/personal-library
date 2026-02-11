import { type SetStateAction, type Dispatch } from "react";
import { CustomModal } from "common";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { ManageOpeningsForm } from "../manage-openings-form";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export function ManageOpeningsModal({
  openCategory,
  setOpenCategory,
}: {
  openCategory: boolean;
  setOpenCategory: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const [value, setValue] = React.useState(0);
  const [tabCount, setTabCount] = React.useState(4); // Initialize with the existing tabs

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addNewTab = () => {
    setTabCount(tabCount + 1);
  };

  return (
    /*Custom Modal*/
    <CustomModal
      onClose={setOpenCategory}
      rootSx={{
        maxWidth: { xs: 350, sm: 900 },
      }}
      headerLabel="Openings"
      closeButtonProps={{
        onClick: () => {
          setOpenCategory(false);
        },
      }}
      isOpen={openCategory}
    >
      <Button variant="contained" onClick={addNewTab}>
        Add New Tab
      </Button>
      <Box sx={{ bgcolor: "background.paper", display: "flex" }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {Array.from(Array(tabCount).keys()).map((index) => (
            <Tab
              label={`Item ${index + 1}`}
              {...a11yProps(index)}
              key={index}
            />
          ))}
        </Tabs>
        <TabPanel value={value} index={value}>
          {value + 1}
          <ManageOpeningsForm />
        </TabPanel>
      </Box>
    </CustomModal>
  );
}
