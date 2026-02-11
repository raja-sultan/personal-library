"use client";
import { CustomGridLayout } from "@components/custom-grid-layout/custom-grid-layout";
import { Typography } from "@mui/material";
import { usePlanPermission } from "./use-plan-permission";
import { FormProvider, RHFRadioGroup } from "common";

export function PlanPermissions(): JSX.Element {
  const { handleSubmit, methods, data, handleClick } = usePlanPermission();
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(() => {})}>
      <CustomGridLayout
        title="Plan Visibility"
        description="Choose whether employees can view all published plans or only their assigned plan. Managers can also view their direct reports’ plans."
      >
        <RHFRadioGroup
          name="planVisibilityForAllPlans"
          defaultValue={data?.data?.career?.planVisibilityForAllPlans?.toString()}
          row={false}
          options={[
            {
              label: (
                <Typography variant="body2">
                  Employees can view all published plans,
                </Typography>
              ),
              value: true,
            },
            {
              label: (
                <Typography variant="body2">
                  Employees can only view their assigned plans{" "}
                </Typography>
              ),
              value: false,
            },
          ]}
          onClick={(e) => {
            handleClick(e);
          }}
        />
      </CustomGridLayout>
      <CustomGridLayout
        title="Plan Publishing"
        description="Choose whether plan admins can publish their plans"
      >
        <RHFRadioGroup
          name="planPublishingForAdmins"
          defaultValue={data?.data?.career?.planPublishingForAdmins?.toString()}
          row={false}
          options={[
            {
              label: (
                <Typography variant="body2">
                  Plan admins cannot publish plans
                </Typography>
              ),
              value: false,
            },
            {
              label: (
                <Typography variant="body2">
                  Plan admins can published plans
                </Typography>
              ),
              value: true,
            },
          ]}
          onClick={(e) => {
            handleClick(e);
          }}
        />
      </CustomGridLayout>
    </FormProvider>
  );
}
