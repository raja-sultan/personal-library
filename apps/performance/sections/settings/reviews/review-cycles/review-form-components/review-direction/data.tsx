import { Typography } from "@mui/material";
import { RHFCheckbox, RHFRadioGroup } from "@root/../../packages/common";


export const renderManager = {
    component: RHFRadioGroup,
    compProps: {
        name: 'downwardReviewType',
        row: false,
        sx: { '& .MuiFormControlLabel-root': { alignItems: 'center', '&:last-child': { alignItems: 'flex-start' } } },
        options: [
            {
                value: 'MANAGER_WRITES_SUMMARY',
                label: <Typography variant="subtitle1" fontWeight={400} color='neutral.800'>Manager only writes summary</Typography>
            },
            {
                value: 'MANAGER_COMPLETES_TEMPLATE',
                label: <Typography variant="subtitle1" fontWeight={400} color='neutral.800'>Manager only completes a review template</Typography>
            },
            {
                value: 'MANAGER_COMPLETES_TEMPLATE_AND_WRITES_SUMMARY',
                label: <>
                    <Typography variant="subtitle1" fontWeight={400} color='neutral.800'>Manager completes a review template and then writes a summary</Typography>
                    <Typography variant="caption" color='neutral.500'>Managers write reviews based on a template selected in the Configuration step. During the Sharing phase, they also write a summary of feedback submitted.</Typography>
                </>
            },
        ]
    },
}

export const formData = [
    {
        id: '1',
        componentProps: {
            name: 'downwardReview',
            label: <>
                <Typography variant="subtitle1" fontWeight={600} color='neutral.900'>Downward review</Typography>
                <Typography variant="subtitle2" color='neutral.500' mb='16px'>Downward reviews are written by managers about their direct reports. Use downward reviews to help reviewees set goals and understand their performance. Managers always participate in the review cycle.</Typography>
            </>,
        },
        component: RHFCheckbox,
    },
    {
        id: '3',
        componentProps: {
            name: 'selfReview',
            label: <>
                <Typography variant="subtitle1" fontWeight={600} color='neutral.900'>Self review</Typography>
                <Typography variant="subtitle2" color='neutral.500'>Reviewees write their self reviews. Use self reviews to give reviewees a chance to reflect on their performance and how they'd like to grow.</Typography>
                <br />
            </>
        },
        component: RHFCheckbox
    },
    {
        id: '4',
        componentProps: {
            name: 'upwardReview',
            label: <>
                <Typography variant="subtitle1" fontWeight={600} color='neutral.900'>Upward review</Typography>
                <Typography variant="subtitle2" color='neutral.500'>
                    Upward reviews are written by direct reports about their managers. Upward reviews give your employees the chance to help managers and leadership grow.
                </Typography>
                <br />
            </>,
        },
        component: RHFCheckbox
    },
    {
        id: '5',
        componentProps: {
            name: 'peerReview',
            label: <>
                <Typography variant="subtitle1" fontWeight={600} color='neutral.900'>Peer review</Typography>
                <Typography variant="subtitle2" color='neutral.500'>
                    Peer reviews are written by select teammates of each reviewee. Use peer reviews to help reviewees improve their collaboration skills.
                </Typography>
                <br />
            </>,
        },
        component: RHFCheckbox
    },
]