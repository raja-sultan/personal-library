"use client"
import { Box, Grid, Typography, Button, useTheme } from '@mui/material'
import React from 'react'
import { styles } from '../../sections/profile/profile.styles'
import Link from 'next/link'
import { ReviewIcon } from '@assets/icons/review-icon'
import { GoalsIcon } from '@assets/icons/goals-icon'
import { GrowthAreasIcon } from '@assets/icons/growth-areas-icon'
import { FeedBackIcon } from '@assets/icons/feedback-icon'
import { ProfileUpload } from './profile-upload'
import { ProfileCardWrapper } from './profile-card-wrapper'
import { PersonalInfo } from './personal-info'

export function ProfileComponent({ data, isUpload = true }): JSX.Element | null {
  const theme = useTheme()
  return (
    <Box >
      <ProfileUpload isUpload={isUpload} />
      <Grid container mt={2} spacing={3}>
        <Grid item lg={8} sm={12} sx={styles.gridWrapper}>
          {/* reviews */}
          <ProfileCardWrapper
            icon={<ReviewIcon sx={{ color: theme.palette.primary.main }} />}
            heading="My Reviews"
            linkComponent={<Typography variant='h5' sx={{ color: theme.palette.primary.main }}>View All</Typography>}
            isLinkComponent
            isReviewsBtn
            tableData={data.profileReviewsData}
          />
          <ProfileCardWrapper
            icon={<GoalsIcon sx={{ color: theme.palette.primary.main }} />}
            heading="Goals"
            linkComponent={<Button variant='contained' style={styles.goalsBtn}>Create Goals</Button>}
            isLinkComponent
            tableData={data.profileGoalsData}
          />
          <ProfileCardWrapper
            icon={<GrowthAreasIcon sx={{ color: theme.palette.primary.main }} />}
            heading="Growth Areas"
          >
            <Box sx={styles.profileData}>
              {data.profileGrowthAreas.map((item) => (
                <Box sx={styles.growth(theme)} key={item.id}>
                  <Box sx={styles.growthHeading}>
                    <Typography variant='h5'>{item.title}</Typography>
                    {item.status && <Typography variant='body2' sx={styles.status(item.status)}>{item.status}</Typography>}
                  </Box>
                  <Typography variant='body2' sx={{ pt: 1.3, color: '#667085' }}>{item.desc}</Typography>
                  <Link href="/">View Details</Link>
                </Box>
              ))}
            </Box>
          </ProfileCardWrapper>
          <ProfileCardWrapper
            icon={<FeedBackIcon sx={{ color: theme.palette.primary.main }} />}
            heading="Feedback"
          >
            <Box sx={styles.feedback(theme)}>
              <Typography variant='h5' sx={{ fontSize: '18px' }}>Ask, and you shall receive</Typography>
              <Typography variant='body1' sx={{ pt: 1.4 }}>Feedback is key for continuous self-improvement</Typography>
              <Link href="#" >Request feedback from a colleague</Link>
            </Box>
          </ProfileCardWrapper>
        </Grid>
        <Grid item lg={4} sm={12}>
          <PersonalInfo isLoading />
        </Grid>
      </Grid>
    </Box>
  )
}


