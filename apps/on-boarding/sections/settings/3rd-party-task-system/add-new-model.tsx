import { RHFCustomSelect,  RHFEditor,  RHFTextField } from "common";
import * as Yup from "yup";

export const InitialValue = {
    name:"",
    system: "",
    emailAddress:"",
    viewableFields: "",
};
export const schema: any = Yup.object({
    name: Yup.string().required("Name to is required"),
    emailAddress: Yup.string().required("Email Address to is required"),
    system: Yup.string().required("system to is required"),
});
export const addNewFormData = [
    {
        id: 1,
        componentProps: { name: "name", outerLabel: "name" },
        component: RHFTextField,
        md: 4,
    },
    {
        id: 2,
        componentProps: {
            name: "system",
            outerLabel: "System",
            options: [
                {
                    id: 1,
                    label: "Faisal Naeem",
                    value: "Faisal Naeem",
                },
                {
                    id: 2,
                    label: "Muneeb Afzal",
                    value: "Muneeb Afzal",
                },
                {
                    id: 3,
                    label: "Faisal Naeem",
                    value: "Faisal Naeem",
                },
                {
                    id: 4,
                    label: "Muneeb Afzal",
                    value: "Muneeb Afzal",
                },

            ],
        },
        component: RHFCustomSelect,
        md: 4,
    },
    {
        id: 3,
        componentProps: { name: "emailAddress", outerLabel: "Email Address" },
        component: RHFTextField,
        md: 9,
    },
    {
        id: 3,
        componentProps: { name: "viewableFields", outerLabel: "Viewable Fields(Optional)" },
        component: RHFTextField,
        md: 9,
    },
   
   
];
