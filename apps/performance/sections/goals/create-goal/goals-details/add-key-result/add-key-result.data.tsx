
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { RHFTextField } from "common";

export function useAddKeyResultFormData(): any[] {
    const { data: getOwner } = useGetReferenceDataLookupQuery({
        type: "employees",
    });
    return [
        {
            id: "1",
            head: "Target name",
            subText: "Break your Goal down into pieces. Targets are measurable results, that, when completed, will also complete the Goal.",
            divider: true,
            fields: [
                {
                    id: "1",
                    componentProps: {
                        name: "name",
                        outerLabel: "Key Result Name",
                        placeholder: "Enter key result name"
                    },
                    component: RHFTextField,
                    xl: 12,
                    lg: 12,
                    md: 12,
                    xs: 12,

                },
                {
                    id: "2",
                    componentProps: {
                        name: "description",
                        outerLabel: "Description (optional)",
                        placeholder: "Enter a description",
                        multiline: true,
                        minRows: 4,
                    },
                    component: RHFTextField,
                    xl: 12,
                    lg: 12,
                    md: 12,
                    xs: 12,
                },


            ],
        },
        {
            id: "2",
            head: "Owner",
            subText: "This is optional. Who is responsible for this Target?",
            divider: true,
            fields: [
                {
                    id: "1",
                    componentProps: {
                        name: "ownerId",
                        outerLabel: "Key Result Owner",
                        select: true,
                        placeholder: "Select",
                    },
                    options:  getOwner?.data?.map((items) => ({
                        value: items?.value,
                        label: items?.text,
                    })) || [],
                    component: RHFTextField,
                    xl: 12,
                    lg: 12,
                    md: 12,
                    xs: 12,
                },


            ],
        },
        {
            id: "3",
            head: "Type of Target",
            subText: "How do you want to measure this result?",
            fields: [
                {
                    id: "1",
                    componentProps: {
                        name: "type",
                        outerLabel: "Type",
                        select: true,
                        placeholder: "Select",
                    },
                    options: [
                        { value: "Number", label: "Number" },
                        { value: "Binary", label: "Binary" },
                        { value: "Currency", label: "Currency" },
                        { value: "Percentage", label: "Percentage" },
                    ],
                    component: RHFTextField,
                    xl: 12,
                    lg: 12,
                    md: 12,
                    xs: 12,
                },

            ],
        },
    ];
}