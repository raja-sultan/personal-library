import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { GrowthAreasSidebar } from "./growth-areas-sidebar";
import { GrowthAreas } from "./growth-areas-content";

import { useGetCareerGrowthSkillsQuery } from "@services/career/growth-area-api";

function GrowthAreasLayout({ id }: any): JSX.Element {
  const { data: getCareerGrowthSkills } = useGetCareerGrowthSkillsQuery({});

  const [value, setValue] = useState(getCareerGrowthSkills?.data[0]?._id);
  const [planId, setPlanId] = useState("");
  const [skillId, setSkillId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  
  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} xl={2.3} lg={3} md={3} width="100%">
        <GrowthAreasSidebar
          sx={styles.common}
          key="tab"
          data={getCareerGrowthSkills?.data}
          handleTabChange={(tab) => {
            setValue(tab?.id);
          }}
          setPlanId={setPlanId}
          setSkillId={setSkillId}
        />
      </Grid>
      <Grid item xs={12} xl={9.7} lg={9} md={9} width="100%">
        <Box sx={{ pl: "10px", ...styles.common }}>
          <GrowthAreas
            setOpenModal={setOpenModal}
            openModal={openModal}
            planId={planId}
            skillId={skillId}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default GrowthAreasLayout;

const styles = {
  common: {
    py: "5px",
    height: "calc(100vh - 230px)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#cacaca",
      borderRadius: "10px",
    },
    "MuiBackdrop-root-MuiModal-backdrop:not(.MuiBackdrop-invisible)": {
      backgroundColor: "red",
    },
  },
};
