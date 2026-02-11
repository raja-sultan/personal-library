"use client";
import CustomCard from "@components/custom-card";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { CustomChip } from "common";
import { useEffect, useRef, useState } from "react";
import { ViewDetails } from "@components/growth-area-view-details";

import {
  useGetCareerGrowthQuery,
  useGetCurrentLevelQuery,
} from "@services/career/growth-area-api";
import { AddGrowthAreaModal } from "../add-growth-area-modal";

const renderStatusChip: any = {
  Invited: "primary",
  "Current Level": "success",
  "Next Level": "primary",
  Completed: "success",
  Deactivated: "danger",
};

export function GrowthAreas({
  skillId,
  planId,
  openModal,
  setOpenModal,
}): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [viewId, setViewId] = useState("");
  const { data: careerGrowthData } = useGetCareerGrowthQuery({
    skillId,
    planId,
  });

  const { data: currentLevels } = useGetCurrentLevelQuery({ planId: planId });

  const growthArea = careerGrowthData?.data || null;

  const [growthAreaShow, setGrowthAreaShow] = useState(
    growthArea !== undefined ? growthArea : null
  );

  const showGrowthRef = useRef<any>(null);

  useEffect(() => {
    showGrowthRef.current = growthAreaShow;
  }, [growthAreaShow]);

  useEffect(() => {
    setGrowthAreaShow(growthArea !== undefined ? growthArea : null);
  }, [growthArea]);

  const handleDrawerClose = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box>
      <AddGrowthAreaModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        skillId={skillId}
        planId={planId}
      />
      <CustomCard>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="2.4rem"
        >
          <Typography variant="h6" fontWeight="600" color="text.primary">
            Design Principles
          </Typography>
          {skillId && planId && (
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Add Growth Area
            </Button>
          )}
        </Box>

        {currentLevels?.data.length ? (
          currentLevels?.data?.map((item) => (
            <Grid container spacing={2} key={item._id}>
              {item?.userLevels
                ?.slice()
                ?.reverse()
                ?.map(({ _id, description, currentLevel, levelName }) => (
                  <Grid item xs={12} md={6} key={_id}>
                    <CustomCard key={_id}>
                      {currentLevel ? (
                        <CustomChip
                          rootSx={{
                            backgroundColor: "neutral.100",
                            marginBottom: "1.6rem",
                          }}
                          variant={renderStatusChip["Current Level"]}
                          ChipProps={{ label: "Current Level" }}
                        />
                      ) : (
                        <CustomChip
                          rootSx={{
                            backgroundColor: "neutral.100",
                            marginBottom: "1.6rem",
                          }}
                          variant={renderStatusChip["Next Level"]}
                          ChipProps={{ label: "Next level" }}
                        />
                      )}

                      <Typography
                        variant="body2"
                        fontWeight="600"
                        color="text.primary"
                      >
                        {currentLevel ? levelName : levelName}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontWeight="400"
                        color="text.primary"
                      >
                        {currentLevel ? description : description}
                      </Typography>
                    </CustomCard>
                  </Grid>
                ))}
            </Grid>
          ))
        ) : (
          <Box>No Data Found</Box>
        )}

        {/* growth areas for principal start */}
        <Box margin="2.4rem 0rem">
          <Typography variant="body1" fontWeight="600" color="text.primary">
            Growth Areas for Design Principles
          </Typography>
        </Box>
        <Grid container spacing={1.2}>
          {growthAreaShow?.map(({ _id, title, description, level }) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={_id}>
              <CustomCard>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom="0.6rem"
                >
                  <Typography
                    variant="body1"
                    fontWeight="600"
                    color="text.primary"
                  >
                    {title}
                  </Typography>
                  {level && (
                    <CustomChip
                      variant={renderStatusChip[level]}
                      ChipProps={{ label: level }}
                    />
                  )}
                </Box>
                <Typography
                  variant="subtitle2"
                  fontWeight="400"
                  color="text.secondary"
                  marginBottom="1.6rem"
                >
                  {description}
                </Typography>
                <Link
                  variant="body2"
                  onClick={() => {
                    setIsDrawerOpen(true);
                    setViewId(_id);
                  }}
                  sx={{ cursor: "pointer", textDecoration: "none" }}
                >
                  View Details
                </Link>
              </CustomCard>

              <ViewDetails
                id={viewId}
                isDrawerOpen={isDrawerOpen}
                handleDrawerClose={handleDrawerClose}
              />
            </Grid>
          ))}
        </Grid>
      </CustomCard>
    </Box>
  );
}
