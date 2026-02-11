'use client';

import React from 'react';
import CustomModal from '@components/custom-modal';
import { useRequestModal } from './use-request-modal';
import { CustomStepper } from '@components/custom-stepper';
import { Box, DialogActions, Button } from '@mui/material';
import { FormProvider } from '@root/../../packages/common';
import { useForm } from 'react-hook-form';
import { formSchema, defaultValues, renderFormFields } from './request-modal.data';
import type { FormValues } from './request-modal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { styles } from '@components/custom-modal/modal.styles';

interface Props {
    open?: boolean;
    onClose?: () => void;
    handleSubmitClick?: (obj: FormValues) => void;
}

export function RequestModal(props: Props): JSX.Element {
    const {
        open,
        onClose,
        handleSubmitClick = () => { },
    } = props;

    const {
        steps = [],
        active = 0,
        nextStepHandler,
        previousStepHandler,
        rejectText,
    } = useRequestModal();

    const handleReject = active === 0 ? onClose : previousStepHandler;

    const methods = useForm<FormValues>({
        resolver: yupResolver(formSchema),
        defaultValues
    });

    const { handleSubmit } = methods;

    function isValid(formField): boolean {
        return Boolean(methods.watch(formField));
    }

    return (
        <CustomModal
            open={open}
            onClose={onClose}
            headerIcon={false}
            title='Request'
            message={false}
            hideFooter
        >
            <Box my='48px'>
                <CustomStepper active={active} steps={steps.map(({ name }) => name)} />
            </Box>
            <FormProvider methods={methods} onSubmit={handleSubmit(handleSubmitClick)}>
                {renderFormFields[active]}
                <DialogActions sx={{ mt: 2, gap: "10px" }}>
                    <Button variant="outlined" onClick={handleReject} sx={styles.cancelBtn}>
                        {rejectText}
                    </Button>
                    <Button
                        type={active === steps.length - 1 ? 'submit' : 'button'}
                        variant='contained'
                        onClick={active === steps.length - 1 ? () => { } : nextStepHandler}
                        disabled={!isValid(steps[active]?.formField)}
                    >
                        {active === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                </DialogActions>
            </FormProvider>
        </CustomModal>
    )
} 