'use client';

import React from 'react';
import { Button, Grid, Typography, DialogActions } from '@mui/material';
import CustomModal from '@components/custom-modal';
import { useForm } from 'react-hook-form';
import { FormProvider } from '@root/../../packages/common';
import { data, FormData } from './detail-modal.data';
import type { FormValues } from './detail-modal.data';
import { styles } from '@components/custom-modal/modal.styles';

interface Props {
    open?: boolean;
    onClose?: () => void;
    handleSubmitClick?: (obj: FormValues) => void;
}

export function DetailModal(props: Props): JSX.Element {
    const {
        open,
        onClose,
        handleSubmitClick = () => { },
    } = props;

    const methods = useForm<FormValues>(FormData);
    const { handleSubmit } = methods;

    return (
        <CustomModal
            open={open}
            onClose={onClose}
            headerIcon={false}
            title={false}
            message={false}
            hideFooter
        >
            <FormProvider methods={methods} onSubmit={handleSubmit(handleSubmitClick)}>
                <Grid container spacing={2}>
                    {data.map((obj) => (
                        <Grid item key={obj.id}>
                            <Typography variant='h6' mb='24px'>{obj.title}</Typography>
                            <obj.component
                                sx={{ pl: '10px', flexDirection: 'column' }}
                                {...obj.componentProps}
                            />
                        </Grid>
                    ))}
                </Grid>
                <DialogActions sx={{ mt: 2, gap: "10px" }}>
                    <Button variant="outlined" onClick={onClose} sx={styles.cancelBtn}>
                        Cancel
                    </Button>
                    <Button type='submit' variant='contained'>Submit</Button>
                </DialogActions>
            </FormProvider>
        </CustomModal>
    )
} 