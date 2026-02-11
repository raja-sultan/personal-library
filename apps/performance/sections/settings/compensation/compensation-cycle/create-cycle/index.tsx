"use client";
import CustomCard from "@components/custom-card";
import { LoadingButton } from "@mui/lab";
import CompensationCycleStepper from "./stepper";
import { useStepper } from "./stepper/use-stepper";

export function CreateCompensationCycle({ viewDetail = false }): JSX.Element {
  const { status, handleEndCycle, onBack, isEndCycleLoading } = useStepper();
  return (
    <>
      <CustomCard
        cardProps={{ sx: { mb: "24px " } }}
        header
        cardHeader={{
          title: `${viewDetail ? "View" : "Create"} compensation cycle`,
          onBack,
          actions: status === "active" && (
            <LoadingButton loading={isEndCycleLoading} variant="contained" onClick={handleEndCycle}>
              End Cycle
            </LoadingButton>
          ),
        }}
      />
      <CompensationCycleStepper />
    </>
  );
}
