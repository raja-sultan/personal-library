import { RHFCustomSelect,  RHFEditor,  RHFTextField } from "common";
import * as Yup from "yup";

export const taskInitialValue = {
    email_to: "",
    subject: "",
    body: "",
};
export const schema: any = Yup.object({
    email_to: Yup.string().required("Email to is required"),
    subject: Yup.string().required("Subject is required"),
    body: Yup.string().required("Body is required"),
});
export const ShareFormData = [
    {
        id: 1,
        componentProps: {
            name: "email_to",
            outerLabel: "Email to",
            placeholder: " Select",
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
        md: 9,
    },
    {
        id: 2,
        componentProps: { name: "subject", outerLabel: "Subject" },
        component: RHFTextField,
        md: 9,
    },
   
    {
        id: 3,
        componentProps: {
            name: "body",
            outerLabel: "Body",
        },

        component: RHFEditor,
        md: 11,
    },
];
