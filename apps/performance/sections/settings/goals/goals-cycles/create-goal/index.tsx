"use client";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { Box, Typography, Grid, Button } from "@mui/material";
import { CustomChip, FormProvider } from "@root/../../packages/common";

import CustomCard from "@components/custom-card";
import { useCreateGoal } from "./use-create-goal";
import { createGoalData } from "./create-goal.data";
import { renderChipStatus } from "../use-goal-cycles";

export function CreateGoal(): JSX.Element {
  const router = useRouter();

  const { handleSubmit, onSubmit, isCreated, methods, cycleId, cycleStatus } = useCreateGoal();

  function onBack(): void {
    router.push("/settings/goals/goals-cycles");
  }

  return (
    <CustomCard
      header
      cardHeader={{
        divider: true,
        title: (
          <Box display="flex" alignItems="center" gap="16px">
            <Typography variant="body2" fontWeight={400} color="text.primary">
              {cycleId ? "Edit" : "New "} Goal Cycle
            </Typography>
            <CustomChip
              variant={renderChipStatus[cycleStatus ?? "Draft"]}
              ChipProps={{ label: cycleStatus ?? "Draft" }}
            />
          </Box>
        ),
        onBack,
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {createGoalData.map(({ id, components, content: { title, desc }, gridItemSX }) => (
          <Grid container spacing={2} key={id}>
            <Grid item md={5} xs={12}>
              <Typography variant="body1" fontWeight={600}>
                {title}
              </Typography>
              <Typography variant="subtitle2" color="neutral.400" mt="6px">
                {desc}
              </Typography>
            </Grid>
            <Grid item md={5} xs={12} sx={gridItemSX}>
              {components.map(({ id: subId, componentProps, component: Component }) => (
                <Component key={subId} fullWidth size="small" {...componentProps} />
              ))}
            </Grid>
          </Grid>
        ))}
        <Box textAlign="end" mt="30px">
          <Button variant="outlined" sx={{ mr: 1 }} onClick={onBack}>
            Cancel
          </Button>
          <LoadingButton loading={isCreated} variant="contained" type="submit">
            {cycleId ? "Update" : "Save"}
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomCard>
  );
}
