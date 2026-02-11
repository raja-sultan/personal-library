import * as React from 'react';
import { Grid, Stepper, StepLabel, Box, Step, type StepIconProps } from '@mui/material';
import { useStepper } from './use-stepper';
import { ColorLibStepIconRoot, styles } from './styles';
import { CustomLoader } from '@components/loader';

function ColorLibStepIcon(props: StepIconProps): JSX.Element {
    const { active, completed, className } = props;
    return (
        <ColorLibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        />
    );
}

export default function CompensationCycleStepper(): JSX.Element {

    const { activeStep, steps, isCycleLoading, handleStepChange } = useStepper();

    return (
        <Grid container spacing={2}>
            {isCycleLoading && <CustomLoader />}
            <Grid item xl={2.5} lg={3} xs={12}>
                <Box sx={styles.stepperWrapper}>
                    <Stepper activeStep={activeStep} orientation="vertical" connector={null}>
                        {steps.map((step, i) => (
                            <Step key={step?.label} classes={{ completed: '_mui_complete' }}>
                                <StepLabel
                                    StepIconComponent={ColorLibStepIcon}
                                    classes={{ vertical: '_vertical', completed: '_completed' }}
                                    sx={styles.stepperLabel}
                                    onClick={() => { handleStepChange(i) }}
                                >
                                    {step?.label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Grid>
            <Grid item xl={9.5} lg={9} xs={12}>
                {steps[activeStep]?.component}
            </Grid>
        </Grid>
    );
}