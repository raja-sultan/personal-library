import { Box, Typography } from '@mui/material';
import { RHFRadioGroup, RHFTextField } from '@root/../../packages/common';
import * as Yup from 'yup';

export interface FormValues {
    appConnectToPL: string;
    integrationEnabled: string;
    dataSend: string;
    benefitAutomation: string;
    teamPeople: string;
};

export type FieldTypes = 'appConnectToPL' | 'integrationEnabled' | 'dataSend' | 'benefitAutomation' | 'teamPeople';

export const defaultValues = {
    appConnectToPL: '',
    integrationEnabled: '',
    dataSend: '',
    benefitAutomation: '',
    teamPeople: '',
};

export const formSchema = Yup.object().shape({
    appConnectToPL: Yup.string().required('Field is required'),
    integrationEnabled: Yup.string().required('Field is required'),
    dataSend: Yup.string().required('Field is required'),
    benefitAutomation: Yup.string().required('Field is required'),
    teamPeople: Yup.string().required('Field is required'),
})


export const renderFormFields = {
    0: (<>
        <Typography variant='h6' mb='24px'>Which app(s) would you like to connect to Personnel Library?</Typography>
        <RHFTextField name='appConnectToPL' placeholder='Type your answer...' fullWidth size='small' variant='outlined' />
    </>),
    1: (<>
        <Typography variant='h6' mb='24px'>Do you already have this integration enabled as part of your plan.</Typography>
        <RHFRadioGroup

            name='integrationEnabled'
            sx={{ pl: 2, flexDirection: 'column' }}
            options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'not sure', label: 'Not Sure' },
            ]}
        />
    </>),
    2: (<>
        <Typography variant='h6' mb='24px'>What data would you like to send to/from Personnel Library?</Typography>
        <RHFTextField name='dataSend' placeholder='Type your answer...' fullWidth size='small' variant='outlined' />
    </>),
    3: (<>
        <Typography variant='h6' mb='24px'>What would be the main benefit(s) of this automation?</Typography>
        {/* don't remove div from here  */}
        <div>
            <RHFTextField name='benefitAutomation' placeholder='Type your answer...' fullWidth size='small' variant='outlined' />
        </div>
    </>),
    4: (<>
        <Typography variant='h6' mb='24px'>Which team(s) or people would this have an impact on?</Typography>
        {/* don't remove Box from here  */}
        <Box>
            <RHFTextField name='teamPeople' placeholder='Type your answer...' fullWidth size='small' variant='outlined' />
        </Box>
    </>),
}