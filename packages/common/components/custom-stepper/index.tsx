import { Step, StepLabel, Stepper } from "@mui/material";
import type { StepIconProps } from "@mui/material";
import {
  ColorLibConnector,
  ColorLibStepIconRoot,
} from "./custom-stepper.style";

function ColorLibStepIcon(props: StepIconProps): JSX.Element {
  const { active, completed, className } = props;
  return (
    <ColorLibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    />
  );
}

export function CustomJobStepper({
  steps,
  active,
}: {
  steps: string[];
  active: number;
}): JSX.Element {
  return (
    <Stepper
      activeStep={active}
      alternativeLabel
      connector={<ColorLibConnector />}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={ColorLibStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
