import React from "react";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useMyTeamOverviewQuery } from "@services/my-team/my-team-api";
import { TeamBars, TeamChat, TeamRecycled, TeamThumbs, TeamTrophy } from "@assets/icons";

export interface TeamSetupDataType {
  id: string,
  icon: React.ReactNode,
  title: string,
  progressComponent: React.ReactNode,
  alert?: {
    color: string,
    message: string
  },
  isLoading?: boolean,
  isError?: boolean
}

export const useTeamSetupData = (): { teamSetupData: TeamSetupDataType[], isLoading: boolean, isError?: boolean } => {
  const { data, isLoading, isError } = useMyTeamOverviewQuery({});

  // feedback data
  const feedbackSent = data?.data?.feedback?.sent ?? 0;
  const totalFeedbackUsers = data?.data?.feedback?.totalUsers ?? 0;
  const feedbackReceived = data?.data?.feedback?.received ?? 0;
  const percentageFeedBack = totalFeedbackUsers === 0 ? 0 : (feedbackSent / totalFeedbackUsers) * 100

  // update data
  const submitted = data?.data?.updates?.submitted ?? 0;
  const totalSubmitted = data?.data?.updates?.totalSubmitted ?? 0;
  const totalReviewed = data?.data?.updates?.totalReviewed ?? 0;
  const reviewed = data?.data?.updates?.reviewed ?? 0;
  const submittedPercentage = submitted === 0 ? 0 : (submitted / totalSubmitted) * 100;
  const updateUpdatedMessage = `${submitted}/${totalSubmitted} reports haven’t submitted an update.`;


  // 1-on-1s data
  const totalOneOnOne = data?.data?.oneOnOne?.totalOneOnOne ?? 0;
  const usedOneOnOne = data?.data?.oneOnOne?.usedOneOnOne ?? 0;
  const percentageUsed = totalOneOnOne === 0 ? 0 : (usedOneOnOne / totalOneOnOne) * 100;

  // goals data
  const totalSubordinates = data?.data?.goals?.totalSubordinates ?? 0;
  const subordinatesHaveGoals = data?.data?.goals?.subordinatesHaveGoals ?? 0;
  const completedGoals = data?.data?.goals?.completedGoals ?? 0;
  const updatedGoalsPercentage = totalSubordinates === 0 ? 0 : (completedGoals / totalSubordinates) * 100
  const goalsUpdatedMessage = `${completedGoals}/${totalSubordinates} reports updated their goals last week`;

  // career data
  const totalCount = data?.data?.careers?.totalCount ?? 0;
  const updatedGrowths = data?.data?.careers?.updatedGrowths ?? 0;
  const totalCareerGrowths = data?.data?.careers?.totalCareerGrowths ?? 0;
  const updatedCareerPercentage = totalCareerGrowths === 0 ? 0 : (updatedGrowths / totalCareerGrowths) * 100



  const teamSetupData = [
    {
      id: '1',
      icon: <TeamThumbs />,
      title: 'feedback',
      alert: {
        color: percentageFeedBack >= 50 ? '#DEF7EC' : '#FDF6B2',
        message: percentageFeedBack >= 50 ? 'Nice work! Your direct reports are actively giving and requesting feedback.' :
          'Your team isn’t using feedback consistently. Continuous feedback is essential to any healthy and productive work environment.'
      },
      progressComponent: <Stack gap='24px'>
        <ProgressComponent
          key='feedback'
          title='Direct reports sent feedback'
          progressBarValues={{
            title: `${feedbackSent} out of ${totalFeedbackUsers}`,
            value: totalFeedbackUsers === 0 ? '0%' : `${((feedbackSent / totalFeedbackUsers) * 100).toFixed(1)}%`,
            progressValue: totalFeedbackUsers === 0 ? 0 : (feedbackSent / totalFeedbackUsers) * 100
          }}
        />
        <ProgressComponent
          key='feedback1'
          title='Direct reports received feedback'
          progressBarValues={{
            title: `${feedbackReceived} out of ${totalFeedbackUsers}`,
            value: totalFeedbackUsers === 0 ? '0%' : `${((feedbackReceived / totalFeedbackUsers) * 100).toFixed(1)}%`,
            progressValue: percentageFeedBack
          }}
        />
      </Stack>
    },
    {
      id: '2',
      icon: <TeamRecycled />,
      title: 'updates',
      alert: {
        color: submittedPercentage >= 50 ? '#DEF7EC' : '#FDF6B2',
        message: submittedPercentage >= 50 ? 'Nice work! Your direct reports are actively submitting and reviewing updates.' :
          'Your team isn’t using updates consistently.Weekly updates allow you to stay connected with your direct report'
      },
      progressComponent: <Stack gap='24px'>
        <ProgressComponent
          key='updates'
          title={updateUpdatedMessage}
          progressBarValues={{
            title: 'Submitted',
            value: `${submitted}`,
            progressValue: submittedPercentage
          }}
        />
        <ProgressComponent
          key='updates1'
          title=''
          progressBarValues={{
            title: 'Reviewed',
            value: `${reviewed}`,
            progressValue: reviewed === 0 ? 0 : (reviewed / totalReviewed) * 100
          }}
        />
      </Stack>
    },
    {
      id: '3',
      icon: <TeamChat />,
      title: '1-on-1s',
      alert: {
        color: percentageUsed >= 50 ? '#DEF7EC' : '#FDF6B2',
        message: percentageUsed >= 50 ? 'Nice work ! Your direct reports are actively using 1-on-1' :
          'You’re not getting the most out of the personnel library.Health 1-on-1 supports strong collaboration with your team'
      },
      progressComponent: <Stack gap='24px'>
        <ProgressComponent
          key='1-on-1s'
          title='You don’t have 1:1’s set up.'
          progressBarValues={{
            title: 'Set up 1:1',
            value: `${totalOneOnOne}`,
            progressValue: totalOneOnOne === 0 ? 0 : (totalOneOnOne / totalOneOnOne) * 100
          }}
        />
        <ProgressComponent
          key='Set up 1:12'
          title=''
          progressBarValues={{
            title: 'Used 1:1',
            value: `${usedOneOnOne}`,
            progressValue: totalOneOnOne === 0 ? 0 : (usedOneOnOne / totalOneOnOne) * 100
          }}
        />
      </Stack>
    },
    {
      id: '4',
      icon: <TeamTrophy />,
      title: 'goals',
      alert: {
        color: updatedGoalsPercentage >= 50 ? '#DEF7EC' : '#FDF6B2',
        message: updatedGoalsPercentage >= 50 ? 'Nice work ! Your direct reports are actively using 1-on-1' :
          'Your Team isn’t using the personnel library to create goal. Help your reports to create goals.'
      },
      progressComponent: <Stack gap='24px'>
        <ProgressComponent
          key='goals'
          title={goalsUpdatedMessage}
          progressBarValues={{
            title: 'Have a goal',
            value: `${subordinatesHaveGoals}`,
            progressValue: totalSubordinates === 0 ? 0 : (subordinatesHaveGoals / totalSubordinates) * 100
          }}
        />
        <ProgressComponent
          key='goals1'
          title=''
          progressBarValues={{
            title: 'Updated',
            value: `${completedGoals}`,
            progressValue: updatedGoalsPercentage
          }}
        />
      </Stack>
    },
    {
      id: '5',
      icon: <TeamBars />,
      title: 'career',
      alert: {
        color: updatedCareerPercentage >= 50 ? '#DEF7EC' : '#FDF6B2',
        message: updatedCareerPercentage >= 50 ? 'Nice work ! Your direct reports are actively managing and updating career growth' :
          'Your Team isn’t using the personnel library to manage their growth. Help your reports actively plan and work towards career goals'
      },
      progressComponent: <Stack gap='24px'>
        <ProgressComponent
          key='career'
          title={`${totalCount} of your reports haven’t created a growth area.`}
          progressBarValues={{
            title: 'Have a growth area',
            value: `${totalCareerGrowths}`,
            progressValue: totalCareerGrowths === 0 ? 0 : (updatedGrowths / totalCareerGrowths) * 100
          }}
        />
        <ProgressComponent
          key='career1'
          title=''
          progressBarValues={{
            title: 'Updated',
            value: `${updatedGrowths}`,
            progressValue: updatedCareerPercentage
          }}
        />
      </Stack>
    },
  ]
  return {
    teamSetupData,
    isLoading,isError
  }
}

function ProgressComponent({ title, progressBarValues }): JSX.Element {
  return (
    <Box>
      {title && <Typography variant="subtitle2" fontWeight={700} mb='24px'>{title}</Typography>}
      <ProgressBar {...progressBarValues} />
    </Box>
  )
}

function ProgressBar({ value, title, progressValue }): JSX.Element {
  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='space-between' flexWrap='wrap' gap='10px'>
        <Typography variant="caption" color='neutral.500'>{title}</Typography>
        <Typography variant="caption" color='primary.main'>{value}</Typography>
      </Box>
      <LinearProgress variant="determinate" value={progressValue} classes={{ bar: '_bar' }} sx={styles.wrap_progress_bar} />
    </>
  )
}

const styles = {
  wrap_progress_bar: {
    height: '12px',
    mb: '8px',
    borderRadius: '50px', '& ._bar': { borderRadius: '5px' }
  },
}