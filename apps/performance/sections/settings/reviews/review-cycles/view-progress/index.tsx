'use client'
import { TableActionsIcon } from "@assets/icons/table-action-icon"
import CustomCard from "@components/custom-card"
import CustomModal from "@components/custom-modal"
import HorizontalTabs from "@components/horizontal-tab"
import { Button, DialogActions, MenuItem, Typography } from "@mui/material"
import { FormProvider, RHFTextField, TableIconActions } from "@root/../../packages/common"
import { ReviewCycleProgress } from "./progress"
import { Reviewees } from "./Reviewees"
import { useViewProgress } from "./use-view-progress"
import { Reviewers } from "./Reviewers"

export function ReviewViewProgress(): JSX.Element {
  const {
    progressData,
    reviewInfo,
    deleteModal,
    handleDeleteModal,
    handleDelete,
    handleEdit,
    onBack,
    handleEndReviewCycle,
    revieweesData,
    reviewersData,
    handleReminderModal,
    reminderModal,
    handleSubmit,
    onSubmit,
    methods,
    userInfo
  } = useViewProgress();

  return (
    <>
      <CustomCard
        header
        cardHeader={{
          title: reviewInfo?.title,
          onBack,
          divider: true,
          actions: <>
            {reviewInfo?.status !== 'ENDED' && <Button variant="contained" onClick={handleEndReviewCycle}>End Review Cycle</Button>}
            <TableIconActions
              icon={<TableActionsIcon />}
              selectButtonProps={{
                sx: (theme) => ({
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '4px',
                })
              }}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteModal}>Delete</MenuItem>
            </TableIconActions>
          </>
        }}
      >
        <HorizontalTabs tabsArray={['Progress', 'Reviewees', 'Reviewers']}>
          <ReviewCycleProgress data={progressData} />
          <Reviewees data={revieweesData} />
          <Reviewers data={reviewersData} />
        </HorizontalTabs>
      </CustomCard>

      {deleteModal && <CustomModal
        open={deleteModal}
        onClose={handleDeleteModal}
        title='Are you sure?'
        message='Are you sure you want to delete this?'
        acceptButtonProps={{
          onClick: handleDelete
        }}
      />}

      {reminderModal && <CustomModal
        open={reminderModal}
        onClose={handleReminderModal}
        title="Write Reminder Notification"
        headerIcon={false}
        message={false}
        hideFooter
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="subject"
            size='small'
            outerLabel="Subject"
            type="text"
            placeholder="Subject"
            sx={{ mb: 3 }}
          />
          <RHFTextField
            name="description"
            outerLabel="Description"
            type="text"
            size='small'
            placeholder="Description"
            mb="1rem"
            minRows={3}
            multiline
          />
          <Typography variant="subtitle2" sx={{ fontWeight: 400, pt: 1 }}>
            This notification will be sent to 1 employee: <b>{userInfo?.name}</b> who has <b>{userInfo?.nominationCount}</b> nominations to complete
          </Typography>
          <DialogActions>
            <Button variant="outlined" onClick={handleReminderModal}>Cancel</Button>
            <Button variant="contained" type="submit">Send Reminder</Button>
          </DialogActions>
        </FormProvider>
      </CustomModal>}
    </>
  )
}