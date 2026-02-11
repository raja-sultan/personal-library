import { RHFRadioGroup } from "@root/../../packages/common";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface FormValues {
    integrationEnabled: string,
    automationBenefit: string,
    integrationSetup: string,
}
export const FormData = {
    resolver: yupResolver(Yup.object().shape({
        integrationEnabled: Yup.string().required('Field is required'),
        automationBenefit: Yup.string().required('Field is required'),
        integrationSetup: Yup.string().required('Field is required'),
    })),
    defaultValues: {
        integrationEnabled: '',
        automationBenefit: '',
        integrationSetup: '',
    }
}

export const data = [
    {
        id: '1',
        title: 'Do you already have this integration enabled as part of your plan.',
        componentProps: {
            name: 'integrationEnabled',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
                { label: 'Not sure', value: 'not sure' },
            ]
        },
        component: RHFRadioGroup
    },
    {
        id: '2',
        title: 'What would be the main benefit(s) of this automation?',
        componentProps: {
            name: 'automationBenefit',
            options: [
                { label: 'Fewer errors', value: 'fewer errors' },
                { label: 'Less “boring” work', value: 'less boring work' },
                { label: 'Better communication', value: 'better communication' },
                { label: 'Faster execution', value: 'faster execution' },
                { label: 'Other', value: 'other' },
            ]
        },
        component: RHFRadioGroup
    },
    {
        id: '1',
        title: 'When would you prefer to have this integration set up?',
        componentProps: {
            name: 'integrationSetup',
            options: [
                { label: 'As soon as possible', value: 'as soon as possible' },
                { label: 'This month', value: 'this month' },
                { label: 'It is not urgent', value: 'it is not urgent' },
            ]
        },
        component: RHFRadioGroup
    },
]