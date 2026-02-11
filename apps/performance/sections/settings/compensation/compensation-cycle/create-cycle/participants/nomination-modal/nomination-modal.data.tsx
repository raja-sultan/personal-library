import { useGetCompanyLocationQuery } from "@services/company-locations-api";
import { useGetUserPromotionDetailsQuery } from "@services/compensation/compensation-cycle/compensation-cycle-api";
import { RHFTextField } from "common";

export const defaultValues = {
    currentDepartment: '',
    promotionDepartment: '',
    currentTitle: '',
    promotionTitle: '',
    currentJobLevel: '',
    promotionJobLevel: '',
    currentLocation: '',
    promotionLocation: '',
}

export function useNominationModalData(): any[] {

    const { data: departments } = useGetUserPromotionDetailsQuery({ type: 'departments' });
    const { data: jobTitle } = useGetUserPromotionDetailsQuery({ type: 'job_title' });
    const { data: locationsData } = useGetCompanyLocationQuery({});

    function formatOptions(options: { text: string, value: string }[]): { value: string, label: string }[] {
        return options?.map(({ text, value }: { text: string; value: string; }) => ({ label: text, value })) ?? [];
    }

    const locations = locationsData?.data?.map(({ address }) => ({ value: address, label: address })) ?? []

    return [
        {
            id: 1,
            componentProps: {
                name: "currentDepartment",
                outerLabel: "Current Department",
                placeholder: "Current Department",
                disabled: true,
            },
            component: RHFTextField,
        },
        {
            id: 2,
            componentProps: {
                name: "promotionDepartment",
                outerLabel: "Promotion Department",
                placeholder: "Promotion Department",
                select: true,
                options: formatOptions(departments?.data)
            },
            component: RHFTextField,
        },
        {
            id: 3,
            componentProps: {
                name: "currentTitle",
                outerLabel: "Current Title",
                placeholder: "Current Title",
                disabled: true,
            },
            component: RHFTextField,
        },
        {
            id: 4,
            componentProps: {
                name: "promotionTitle",
                outerLabel: "Promotion Title",
                placeholder: "Promotion Title",
                select: true,
                options: formatOptions(jobTitle?.data)
            },
            component: RHFTextField,
        },
        {
            id: 5,
            componentProps: {
                name: "currentJobLevel",
                outerLabel: "Current Job level",
                placeholder: "Current Job level",
                disabled: true,
            },
            component: RHFTextField,
        },
        {
            id: 6,
            componentProps: {
                name: "promotionJobLevel",
                outerLabel: "Promotion Job level",
                placeholder: "Promotion Job level",
                select: true,
                options: [
                    { label: 'Junior', value: 'Junior' },
                    { label: 'Mid', value: 'Mid' },
                    { label: 'Senior', value: 'Senior' },
                ]
            },
            component: RHFTextField,
        },
        {
            id: 7,
            componentProps: {
                name: "currentLocation",
                outerLabel: "Current Location",
                placeholder: "Current Location",
                disabled: true,
            },
            component: RHFTextField,
        },
        {
            id: 8,
            componentProps: {
                name: "promotionLocation",
                outerLabel: "Promotion Location",
                placeholder: "Promotion Location",
                select: true,
                options: locations
            },
            component: RHFTextField,
        },
    ]
}