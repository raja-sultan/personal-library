"use client";
import React from "react";
import CustomCard from "@components/custom-card";
import { Box, Divider, Grid, LinearProgress, Typography, AvatarGroup } from "@mui/material";
import { CustomChip } from "common";
import { keyResultsStyles } from "../key-results/key-results-styles";
import { useGetOwnerDetailsQuery } from "@services/goals/goals.api";
import dayjs from 'dayjs';
import { CustomLoader } from "@components/loader";
import { renderUserImage } from "@root/utils/render-user-image";

export function OwnerGoalsDetail({ goalId }: any): React.JSX.Element {
  const styles = keyResultsStyles()

  const { data: getGoalsData, isLoading } = useGetOwnerDetailsQuery({ id: goalId });
  const progressValue = getGoalsData?.data?.progress;
  const createdAt = dayjs(getGoalsData?.data?.createdAt).format('MMM D, YYYY');
  const startDate = dayjs(getGoalsData?.data?.startDate).format('MMM D, YYYY');
  const endDate = dayjs(getGoalsData?.data?.endDate).format('MMM D, YYYY');
  const goalType = getGoalsData?.data?.type;
  const goalCycle = getGoalsData?.data?.goalCycleData?.cycleName;
  const status = getGoalsData?.data?.status ? getGoalsData?.data?.status : 'N/A';

  const renderStatusChip = {
    "Completed": "success",
    "New": "started",
    "In Progress": "warning",
  };

  return (
    <Grid container spacing={2}>
      {isLoading && <CustomLoader />}
      <Grid item xs={12} md={3} lg={3}>
        <CustomCard cardProps={{ sx: { height: "100%" } }}>
          <Typography variant="body2" fontWeight="600" color='text.primary' marginBottom="1.4rem">
            Learn to Draw Shapes
          </Typography>
          <LinearProgress
            value={progressValue}
            variant="determinate"
            classes={{ bar: '_bar' }}
            sx={styles.wrap_progress_bar}
          />
          <Box display='flex' alignItems='center' justifyContent='space-between' flexWrap='wrap' gap='16px'>
            <Typography variant="subtitle2" fontWeight={400} color='text.secondary'>
              0
            </Typography>
            <Typography variant="subtitle2" fontWeight={400} color='text.secondary'>
              100%
            </Typography>
          </Box>
        </CustomCard>

      </Grid>
      <Grid item xs={12} md={9} lg={9}>
        <CustomCard cardProps={{ sx: { height: "100%" } }}>
          <Box display="flex" justifyContent={{ xs: "start", xl: "space-between" }} flexWrap="wrap" gap="1.5rem">
            <Box>
              <Typography variant="body2" color="text.primary" fontWeight="600">Owner</Typography>
              <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { marginLeft: "11px" } }}>
                {getGoalsData?.data?.ownersData?.map((owner) => {
                  return (
                    <Box display="flex" alignItems="center" flexWrap='wrap' gap={1} key={owner?._id}>
                      {renderUserImage({
                        width: "42px",
                        height: "42px",
                        profileImage: owner?.profileImage,
                        firstName: owner?.firstName,
                        lastName: owner?.lastName
                      })}
                      <Typography marginLeft="0.6rem" variant="body2" color="text.secondary">
                        {owner?.firstName ?? "-"} {owner?.lastName ?? "-"}
                      </Typography>
                    </Box>
                  )
                })}
              </AvatarGroup>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="body2" color="text.primary" fontWeight="600">Created</Typography>
              <Typography variant="body2" color="text.secondary">{createdAt}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="body2" color="text.primary" fontWeight="600">Start</Typography>
              <Typography variant="body2" color="text.secondary">{startDate}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="body2" color="text.primary" fontWeight="600">Due</Typography>
              <Typography variant="body2" color="text.secondary">{endDate}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="body2" color="text.primary" fontWeight="600">Type</Typography>
              <Typography variant="body2" color="text.secondary">{goalType}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="body2" color="text.primary" fontWeight="600">Cycle</Typography>
              <Typography variant="body2" color="text.secondary">{goalCycle}</Typography>

            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="body2" color="text.primary" fontWeight="600">Status</Typography>
              <CustomChip
                variant={renderStatusChip[status]}
                ChipProps={{ label: `${status}` }}
              />
            </Box>
          </Box>
        </CustomCard>
      </Grid>
    </Grid>
  );
}

