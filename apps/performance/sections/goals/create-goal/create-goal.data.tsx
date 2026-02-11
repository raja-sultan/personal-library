import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { RHFDatePicker, RHFTextField, RHFAutocompleteSync } from "common";
 

export function useCreateFormData(): any[] {
    const { data: getOwner } = useGetReferenceDataLookupQuery({
        type: "employees",
    });
    const { data: goalCycles } = useGetReferenceDataLookupQuery({
        type: "goal_cycles",
    });


    return [
        {
            id: "1",
            head: "What do you want to accomplish?",
            subText: "Goals are objectives that set your direction and can be quantified with key results.",
            divider: true,
            fields: [
                {
                    id: "1",
                    componentProps: {
                        name: "goalName",
                        outerLabel: "Goal Name",
                        placeholder:"Enter goal name"
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
                        placeholder:"Enter a description...",
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
            head: "Settings",
            subText: "Goals are connected to the goal cycles created for your company.",
            divider: true,
            fields: [
                {
                    id: "1",
                    componentProps: {
                        name: "goalCycleId",
                        outerLabel: "Goal Cycle",
                        select: true,
                        placeholder:"Select",
                    },
                    options:  goalCycles?.data?.map((items) => ({
                        value: items?.value,
                        label: items?.text,
                    })) || [],
                    component: RHFTextField,
                    xl: 12,
                    lg: 12,
                    md: 12,
                    xs: 12,
                },
                {
                    id: "2",
                    componentProps: {
                        multiple: true,
                        name: "owners",
                        outerLabel: "Owners",
                        placeholder:"Select",
                        options:  getOwner?.data?.map((items) => ({
                            id: items?.value,
                            name: items?.text,
                        })) || [],
                    },
                    component: RHFAutocompleteSync,
                    xl: 12,
                    lg: 12,
                    md: 12,
                    xs: 12,
                },
                {
                    id: "3",
                    componentProps: {
                        name: "startDate",
                        outerLabel: 'Start Date',
                        autoConvert: true,
                    },
                    component: RHFDatePicker,
                    xl: 6,
                    lg: 6,
                    md: 6,
                    xs: 12,
                },
                {
                    id: "4",
                    componentProps: {
                        name: "endDate",
                        outerLabel: 'End Date',
                        autoConvert: true,
                    },
                    component: RHFDatePicker,
                    xl: 6,
                    lg: 6,
                    md: 6,
                    xs: 12,
                },

            ],
        },
        {
            id: "3",
            head: "Visibility",
            subText: "Select visibility for your goal.",
            fields: [
                {
                    id: "1",
                    componentProps: {
                        name: "type",
                        outerLabel: "Type",
                        select: true,
                        placeholder:"Select",
                    },
                    options: [
                        { value: "Individual", label: "Individual" },
                        { value: "Group", label: "Group" },
                        { value: "Department", label: "Department" },
                        { value: "Company", label: "Company" },
                    ],
                    component: RHFTextField,
                    xl: 12,
                    lg: 12,
                    md: 12,
                    xs: 12,
                },
                {
                    id: "2",
                    componentProps: {
                        name: "visibility",
                        outerLabel: "Visibility",
                        select: true,
                        placeholder:"Select",
                    },
                    optionsIndividual: [
                        { value: "Private", label: "Private" },
                        { value: "Public", label: "Public" },
                    ],
                    optionsGroup: [
                        { value: "Public", label: "Public" },
                        { value: "Selected Group", label: "Selected Group" }
                    ],
                    optionsDepartment: [
                        { value: "Public", label: "Public" },
                        { value: "Selected Department", label: "Selected Department" }
                    ],
                    optionsCompany: [
                        { value: "Public", label: "Public" },
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