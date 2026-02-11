import { Box } from "@mui/material";
import { candidatesStyle } from "./style";
import { CustomTabsIcon } from "common";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import InsertChartOutlinedTwoToneIcon from "@mui/icons-material/InsertChartOutlinedTwoTone";
import { OnTwoJobsTab } from "../on-two-jobs";
import { PrivateNote } from "../private-note";
import { DetailTab } from "../detail-tab";
import { ActivityFeedSection } from "../activity-feed";

export function ApplicationTabSection(): JSX.Element {
  return (
    <Box sx={candidatesStyle.tabsCardStyle}>
      <CustomTabsIcon
        tabRootSx={{ backgroundColor: "common.white" }}
        tabsNameArray={[
          {
            id: 1,
            title: "On 2 jobs",
            icon: <InsertChartOutlinedTwoToneIcon />,
          },
          {
            id: 2,
            title: "Activity Feed",
            icon: <BarChartRoundedIcon />,
          },
          {
            id: 3,
            title: "Details",
            icon: <AssignmentOutlinedIcon />,
          },
          {
            id: 4,
            title: "Private",
            icon: <GppGoodOutlinedIcon />,
          },
        ]}
      >
        <Box sx={{ p: 1 }}>
          <OnTwoJobsTab />
        </Box>
        <Box sx={{ p: 1 }}>
          {" "}
          <ActivityFeedSection />{" "}
        </Box>
        <Box sx={{ p: 1 }}>
          <DetailTab />
        </Box>
        <Box sx={{ p: 1 }}>
          <PrivateNote />
        </Box>
      </CustomTabsIcon>
    </Box>
  );
}
