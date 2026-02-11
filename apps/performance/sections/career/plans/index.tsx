"use client";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { PlansSidebar } from "./plans-sidebar";
import { Plans } from "./plans-content";
import { usePlan } from "./use-plans-sidebar";

export function CareerPlans({ handleNextTab ,handleClickFromParent} : any): JSX.Element {
  const { PlansData, isLoading } = usePlan();

  const [value, setValue] = useState<any>(
    PlansData && PlansData.length > 0 && PlansData.data.careerPlan[0]
      ? PlansData.data.careerPlan[0]._id
      : null
  );

  useEffect(() => {
    if (PlansData?.data?.careerPlan?.length > 0 && value === null) {
      setValue(PlansData?.data?.careerPlan?.[0]?._id);
    }
  }, [PlansData, value]);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "500px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={1.5}>
          <Grid item xs={12} xl={2.3} lg={3} md={3} width="100%">
            <PlansSidebar
              sx={styles.common}
              key="tab"
              data={PlansData?.data?.careerPlan}
              handleTabChange={(tab) => {
                setValue(tab?._id);
              }}
            />
          </Grid>
          <Grid item xs={12} xl={9.7} lg={9} md={9} width="100%">
            <Box sx={{ pl: "10px", ...styles.common }}>
              <Plans
                _id={value}
                handleNextTab={handleNextTab}
                handleClickFromParent={handleClickFromParent}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );}


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
  },
};