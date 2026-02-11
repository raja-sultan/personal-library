"use client";
import React from "react";
import { useFeedback } from "@sections/feedback/use-feedback";
import CustomCard from "@components/custom-card";
import { Box, Button, DialogActions, Grid, Pagination, PaginationItem, Typography } from "@mui/material";
import HorizontalTabs from "@components/horizontal-tab";
import Link from "next/link";
import { CustomPopover } from "@components/custom-popover";
import { NoFeedbackRequest } from "./no-feedback-request";
import { CustomLoader } from "@components/loader";
import { FeedbackCard } from "@components/feedback-card";

interface Props {
  filterByTeam?: boolean;
  hideTeamBtn?: boolean;
  hideHeader?: boolean;
  showRequest?: boolean;
  showDateRange?: boolean;
  backPath?: string;
  tabArray?: string[];
}

export function MyFeedbackSection({
  filterByTeam,
  hideHeader,
  hideTeamBtn,
  tabArray,
  showDateRange,
  showRequest,
  backPath
}: Props): JSX.Element {
  const {
    filters,
    handleTabChange,
    feedbackList,
    tabArr,
    handleFeedbackChange,
    feedBackData,
    onPageChange,
    handleEmojiClick,
    handleFeedbackDecline,
    handleFeedbackDelete,
    handleDateRangeChange
  } = useFeedback({ filterByTeam, tabArray, backPath });

  return (
    <>
      <CustomCard
        subHeader={!hideHeader}
        cardSubHeader={{
          title: "My Feedback",
          description: `Shape a better experience with your valuable feedback and manage it seamlessly`,
          actions: (
            <>
              {!hideTeamBtn && (
                <Link href='/my-team?tab=3' style={{ all: 'unset' }}>
                  <Button variant="outlined">
                    Go to Team Feedback
                  </Button>
                </Link>
              )}
              <CustomPopover
                btnText="Feedback"
                btnProps={{ variant: 'contained' }}
                options={feedbackList}
                handleChange={handleFeedbackChange}
              />
              {showDateRange && <CustomPopover
                btnText={filters?.dateRange ?? 'Last 7 days'}
                options={['Last 7 days', 'Last 15 days', 'Last 30 days']}
                handleChange={handleDateRangeChange}
              />}
            </>
          ),
        }}
      />
      {feedBackData?.isLoading ? <CustomLoader /> :
        <>
          {showRequest && <DialogActions sx={{ p: 0 }}>
            <CustomPopover
              btnText="Feedback"
              btnProps={{ variant: 'contained' }}
              options={feedbackList}
              handleChange={handleFeedbackChange}
            />
          </DialogActions>}
          {!showRequest && <Box mt='24px' />}
          <HorizontalTabs tabsArray={tabArr} onChange={handleTabChange} />
          {feedBackData?.isSuccess && feedBackData?.feedbacks?.length > 0 ?
            <Grid container spacing={3}>
              {feedBackData?.isFetching && <CustomLoader />}
              {feedBackData?.feedbacks?.map((item: any) => (
                <Grid key={item?._id} item xs={12} md={6} lg={4} xl={3}>
                  <FeedbackCard
                    {...item}
                    {...{
                      handleEmojiClick,
                      handleFeedbackDecline,
                      handleFeedbackDelete
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sx={styles.currentPageBox}>
                <Typography sx={styles.currentPage}>Showing {feedBackData?.meta?.page} of {feedBackData?.meta?.pages}</Typography>
                <Pagination
                  sx={styles.pagination}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: () => <>Previous</>,
                        next: () => <>Next</>,
                      }}
                      {...item}
                    />
                  )}
                  size="small"
                  variant="outlined"
                  shape="rounded"
                  count={feedBackData?.meta?.pages}
                  page={feedBackData?.meta?.page}
                  onChange={(_, page) => {
                    onPageChange(page);
                  }}
                />
              </Grid>
            </Grid>
            :
            <NoFeedbackRequest />}
        </>
      }
    </>
  );
}


const styles = {
  pagination: ({ palette: { primary } }) => ({
    ".Mui-selected": {
      backgroundColor: `${primary.main} !important`,
      color: "#FFFFFF",
    },
  }),
  currentPageBox: {
    display: "flex",
    my: "15px",
    px: "25px",
    alignItems: "center",
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  currentPage: ({ palette, typography }) => ({
    color: palette.grey[600],
    fontSize: "12px",
    ml: '25px',
    fontFamily: typography.fontFamily,
  }),
}