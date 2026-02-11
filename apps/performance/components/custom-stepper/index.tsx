import { Step, StepLabel, Stepper } from "@mui/material";
import type { StepIconProps } from "@mui/material";
import { ColorLibConnector, ColorLibStepIconRoot, styles } from "./custom-stepper.styles";

function ColorLibStepIcon(props: StepIconProps): JSX.Element {
    const { active, completed, className } = props;
    return (
        <ColorLibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        />
    );
}

export function CustomStepper({
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
                    <StepLabel
                        classes={{ label: '_label', completed: '_completed',alternativeLabel:'_alternativeLabel' }}
                        sx={styles.stepperLabel}
                        StepIconComponent={ColorLibStepIcon}
                    >
                        {label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}