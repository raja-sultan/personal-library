"use client";
import React from "react";
import { Button, DialogActions, MenuItem, Stack } from "@mui/material";
import { FormProvider, RHFTextField, } from "common";
import { useCreateTemplate } from "./use-create-template";
import CustomCard from "@components/custom-card";
import { CustomGridLayout } from "@components/custom-grid-layout/custom-grid-layout";
import Link from "next/link";
import { TemplatePoints } from "./template-points";

export function CreateTemplate({ edit, disabled }: { edit?: boolean, disabled?: boolean }): JSX.Element {
  const {
    onSubmit,
    onBack,
    methods,
    handleSubmit,
    handleGetDiscussionPoints,
    handleGetActionItems,
    getValues,
  } = useCreateTemplate();

  let title = 'Create';
  if (edit) {
    title = ' Edit'
  }
  if (disabled) {
    title = 'View'
  }

  return (
    <CustomCard header cardHeader={{
      title: `${title} 1 on 1 Template`,
      onBack,
      divider: true
    }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <CustomGridLayout title="Name" description="Name a template to streamline communication in individual
              meetings." childrenBreakPoints={{ xl: 4, lg: 6, xs: 12 }}>
          <Stack spacing={3}>
            <RHFTextField
              disabled={disabled}
              name="title"
              outerLabel="Title"
              placeholder="Enter title"
              size='small'
            />
            <TemplatePoints
              disabled={disabled}
              type='discussion_point'
              btnTitle="Discussion Points"
              getPoints={handleGetDiscussionPoints}
              pointsData={getValues('discussionPoint')}
            />
            <TemplatePoints
              disabled={disabled}
              type='action_item'
              btnTitle="Action Items"
              getPoints={handleGetActionItems}
              pointsData={getValues('actionItem')}
            />
          </Stack>
        </CustomGridLayout>

        <CustomGridLayout title="Template"
          description="Select a relevant category for your 1-on-1 template to ensure focused discussions."
          childrenBreakPoints={{ md: 4, xs: 12 }}>
          <Stack spacing={3}>
            <RHFTextField
              select
              disabled={disabled}
              name="visibility"
              outerLabel="Visibility"
              placeholder="Select"
              size='small'
            >
              {/* <MenuItem disabled selected value=''>Select</MenuItem> */}
              {[
                { label: "All", value: "All" },
                { label: "Admin only ", value: "Admin_Only" },
                { label: "Managers only", value: "Managers_Only" },
                { label: "Admin & Managers only", value: "Admin_And_Manager", },
              ]?.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </RHFTextField>
            <RHFTextField
              disabled={disabled}
              name="description"
              outerLabel="Description(Optional)"
              placeholder="Write something..."
              minRows={3}
              multiline
            />
          </Stack>
        </CustomGridLayout>

        <DialogActions sx={{ gap: '10px' }}>
          <Link href='/settings/one-on-ones/templates'>
            <Button type="button" variant="outlined">
              Cancel
            </Button>
          </Link>
          <Button disabled={disabled} type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </FormProvider>
    </CustomCard>
  );
}
