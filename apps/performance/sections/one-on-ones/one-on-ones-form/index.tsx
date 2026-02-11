"use client";
import React from "react";
import CustomCard from "@components/custom-card";
import { Box, Button, CircularProgress, DialogActions, Grid, MenuItem, Stack, Typography } from "@mui/material";
import {
  FormProvider,
  RHFCustomSelect,
  RHFDatePicker,
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFTextField,
  RHFTimePicker,
} from "common";
import { styles } from "@sections/one-on-ones/one-on-ones-form/one-on-ones-form.styles";
import LinkIcon from "@mui/icons-material/Link";
import { BrowseOneOnOneTemplatesDrawer } from "@layouts/dashboard/drawer/browse-one-on-one-templates";
import CustomModal from "@components/custom-modal";
import { TickIconOutlined } from "@assets/icons/tick-icon-outlined";
import { useOneOnOnesForm } from "@sections/one-on-ones/one-on-ones-form/use-one-on-ones-form";
import { LoadingButton } from "@mui/lab";
import { CustomGridLayout } from "@components/custom-grid-layout/custom-grid-layout";
import { daysList, frequencyOptions, onTheList, weekDaysList } from "./one-on-ones-form.data";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export function OneOnOnesForm(): JSX.Element {
  const {
    methods,
    router,
    handleSubmit,
    onSubmit,
    watch,
    openTemplatesDrawer,
    toggleDrawerNotifications,
    handleDetailModal,
    detailModal,
    redirectTo,
    employeesList,
    oneOnOneDetails,
    isLoading,
    isFetching,
    selectedTemplate,
    handleSelectTemplate,
    isCreateLoading,
  } = useOneOnOnesForm();

  const breakPoints = { xs: 12, md: 8, lg: 4 };

  const { formState: { isSubmitted }, setValue } = methods;

  return (
    <CustomCard
      header
      cardHeader={{
        title: "Create 1 on 1",
        divider: true,
        onBack: () => {
          redirectTo ? router.push("/my-team/view") : router.back();
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

        <CustomGridLayout
          title='Create new 1:1 Meeting Agenda'
          description="Choose anyone in your organization to create a new 1:1 agenda with."
          childrenBreakPoints={breakPoints}
        >
          <Stack spacing={4.2}>
            <RHFTextField
              size="small"
              name="title"
              placeholder="Agenda of meeting"
              outerLabel="Agenda"
            />
            <RHFCustomSelect
              size="small"
              name="attendeeId"
              outerLabel="Who is your 1:1 with?"
              options={employeesList}
              placeholder="Select a user"
            />
          </Stack>
        </CustomGridLayout>

        <CustomGridLayout
          title='1-on-1 settings'
          description="Schedule your 1:1 meeting"
          childrenBreakPoints={breakPoints}
        >
          <Stack spacing={4.2}>
            <RHFTimePicker
              name="time"
              outerLabel="Time"
              size="small"
            />
            <Grid container justifyContent='space-between'>
              <Grid item md={5.5} xs={12}>
                <RHFDatePicker
                  name="startDate"
                  outerLabel="Date From"
                  size="small"
                  fullWidth
                  disablePast
                />
              </Grid>
              <Grid item md={5.5} xs={12}
                sx={{ mt: { md: 0, xs: '30px' } }}
              >
                <RHFDatePicker
                  name="endDate"
                  outerLabel="Date To"
                  size="small"
                  fullWidth
                  disablePast
                />
              </Grid>
            </Grid>

            <RHFTextField
              name='frequency'
              outerLabel='Frequency'
              select
              fullWidth
              size='small'
            >
              {frequencyOptions?.map((option) => (
                <MenuItem
                  key={option?.value}
                  value={option?.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </RHFTextField>

            {(watch('frequency') !== 'Does not repeat' && watch('frequency') !== 'Daily') &&
              <Box>
                <Box display='flex' alignItems='center' gap='16px'>
                  <RHFTextField
                    outerLabel='Repeat every'
                    name='repeatInterval'
                    size='small'
                    placeholder='0'
                    type='number'
                    sx={styles.repeatEvery}
                    inputProps={{
                      min: 0
                    }}
                    EndIcon={<Box sx={styles.repeatEveryIcon}>
                      <KeyboardArrowUp
                        onClick={() => {
                          setValue('repeatInterval', Number(watch('repeatInterval') + 1))
                        }}
                      />
                      <KeyboardArrowDown
                        onClick={() => {
                          Number(watch('repeatInterval')) > 0 && setValue('repeatInterval', Number(watch('repeatInterval') - 1))
                        }}
                      />
                    </Box>}
                  />
                  <Typography mt='25px' fontWeight={600} variant='subtitle2' color='text.secondary'>
                    {watch('frequency') === 'Every weekday(Mon-Fri)' && 'Week(s)'}
                    {watch('frequency') === 'Weekly' && 'Week(s) on'}
                    {watch('frequency') === 'Monthly' && 'Month(s)'}
                    {watch('frequency') === 'Yearly' && 'Year(s)'}
                  </Typography>
                </Box>
                {(watch('frequency') === 'Monthly' || watch('frequency') === 'Yearly') &&
                  <Box sx={styles.monthly}>
                    <RHFRadioGroup
                      name='onDayMonth'
                      sx={styles.radioGroup}
                      row={false}
                      options={[
                        { value: 'onDay', label: 'On day' },
                        { value: 'onThe', label: 'On the' }
                      ]}
                    />
                    <Box sx={styles.monthlyInput}>
                      <RHFTextField
                        sx={{ width: 165 }}
                        name='day'
                        size='small'
                        defaultValue={1}
                        disabled={watch('onDayMonth') === 'onThe'}
                      />
                      <Box display='flex' alignItems='center' gap='10px' sx={{ flexWrap: { md: 'nowrap', xs: 'wrap' } }}>
                        <RHFTextField
                          name='week'
                          size='small'
                          sx={{ width: 165 }}
                          select
                          disabled={watch('onDayMonth') === 'onDay'}
                        >
                          {onTheList.map((list) => (<MenuItem key={list.value} value={list.value}>{list.label}</MenuItem>))}
                        </RHFTextField>
                        {watch('frequency') === 'Yearly' && <Box display='flex' alignItems='center' gap='10px' sx={{ flexWrap: { md: 'nowrap', xs: 'wrap' } }}>
                          <RHFTextField
                            sx={{ width: 165, textTransform: "capitalize" }}
                            name='weekDay'
                            size='small'
                            select
                            disabled={watch('onDayMonth') === 'onDay'}
                          >
                            {weekDaysList.map((list) => (<MenuItem
                              key={list.value}
                              value={list.value}
                            >
                              {list.label}
                            </MenuItem>
                            ))}
                          </RHFTextField>
                          <Typography variant="subtitle2" fontWeight={600}>of</Typography>
                          <RHFDatePicker
                            sx={{ width: 165 }}
                            size='small'
                            name='month'
                            disablePast
                            disabled={watch('onDayMonth') === 'onDay'}
                            views={['month']}
                          />
                        </Box>}
                      </Box>
                    </Box>
                  </Box>}
                <Box sx={styles.frequencyWrapper}>
                  {watch('frequency') !== 'Yearly' && <RHFMultiCheckbox
                    className='_custom_checkbox'
                    name='weekDays'
                    options={daysList}
                  />}
                </Box>
              </Box>}

            <Stack spacing={1.6}>
              <RHFRadioGroup
                name="locationType"
                outerLabel="Location"
                defaultValue="Virtual"
                sx={{
                  gap: 3,
                }}
                options={[
                  { label: "Virtual", value: "Virtual" },
                  { label: "On site", value: "On Site" },
                ]}
              />
              {watch("locationType") === "Virtual" ? (
                <RHFTextField
                  size="small"
                  name="path"
                  StartIcon={<LinkIcon sx={{ mr: 1 }} />}
                  placeholder="https://zoom.com/call/0234"
                />
              ) : (
                <RHFTextField size="small" name="path" placeholder="Enter location" />
              )}
            </Stack>

          </Stack>
        </CustomGridLayout>

        <CustomGridLayout
          title='Default 1:1 template'
          description="Choose a template for effective meetings that foster tailored solutions."
          childrenBreakPoints={breakPoints}
        >
          <Button
            size="small"
            variant="outlined"
            sx={styles.browseTemplateBtn}
            fullWidth
            onClick={toggleDrawerNotifications}
          >
            Browse templates
          </Button>
          {isSubmitted && Boolean(!selectedTemplate) &&
            <Typography variant="caption" color='error' ml={1.2}>
              Field is required
            </Typography>}
        </CustomGridLayout>

        <DialogActions sx={{ gap: 1.8 }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              redirectTo ? router.push("/my-team/view") : router.back();
            }}
          >
            Cancel
          </Button>
          <LoadingButton loading={isCreateLoading} type="submit" variant="contained">
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>

      {openTemplatesDrawer && <BrowseOneOnOneTemplatesDrawer
        handleDetailModal={handleDetailModal}
        openDrawer={openTemplatesDrawer}
        toggleDrawer={toggleDrawerNotifications}
        handleSelect={handleSelectTemplate}
        selectedTemplate={selectedTemplate}
      />}

      {Boolean(detailModal) && <CustomModal
        title={(isLoading || isFetching) ? 'Loading...' : oneOnOneDetails?.title}
        headerIcon={false}
        message={false}
        hideFooter
        open={Boolean(detailModal)}
        onClose={() => { handleDetailModal(null) }}
      >
        {(isLoading || isFetching) ? <Box my={5} textAlign='center'>
          <CircularProgress />
        </Box> :
          <Stack spacing={2.1}>
            <Stack spacing={1.6}>
              <Typography>Discussion Points</Typography>
              <Stack spacing={0.8}>
                {oneOnOneDetails?.discussionPoint?.length > 0 ? oneOnOneDetails?.discussionPoint?.map((point: { _id: string, text: string }) => (
                  <Box display="flex" gap={0.8} key={point?._id}>
                    <TickIconOutlined />
                    <Typography variant="subtitle2" fontWeight={400} color="neutral.800">
                      {point?.text}
                    </Typography>
                  </Box>
                ))
                  :
                  <Typography variant="subtitle2" fontWeight={400} color="neutral.800">
                    No Discussion point available
                  </Typography>
                }
              </Stack>
            </Stack>

            <Stack spacing={1.6}>
              <Typography>Action Items</Typography>
              <Stack spacing={0.8}>
                {oneOnOneDetails?.actionItem?.length > 0 ? oneOnOneDetails?.actionItem?.map((item: { _id: string, text: string }) => (
                  <Box display="flex" gap={0.8} key={item?._id}>
                    <TickIconOutlined />
                    <Typography variant="subtitle2" fontWeight={400} color="neutral.800">
                      {item?.text}
                    </Typography>
                  </Box>
                ))
                  :
                  <Typography variant="subtitle2" fontWeight={400} color="neutral.800">
                    No Action item available
                  </Typography>
                }
              </Stack>
            </Stack>
          </Stack>}
      </CustomModal>}
    </CustomCard>
  );
}