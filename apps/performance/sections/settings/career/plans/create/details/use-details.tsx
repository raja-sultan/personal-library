import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme, type Theme } from "@mui/material";
import { useCreateCareerPlanMutation, useGetSingleCareerPlanQuery, useUpdateCareerPlanMutation } from "@services/career/plans/plans-api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { UseFormReturn, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from 'yup';
interface FormValues {
    title: string;
    description: string;
}

interface ReturnType {
    onSubmit: SubmitHandler<FormValues>;
    methods?: UseFormReturn<FormValues>;
    handleSubmit: UseFormHandleSubmit<FormValues>;
    theme: Theme;
    handleAddAdminModal: () => void;
    isAddAdminModalOpen: boolean;
    handleGetAdminIds: (id: string[]) => void;
    getAdminIds: string[];
}

export function useDetails({ id }: { id: string | undefined }): ReturnType {
    const theme = useTheme();
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
    const [createCareerPlan] = useCreateCareerPlanMutation();
    const [updateCareerPlan] = useUpdateCareerPlanMutation();
    const [getAdminIds, setGetAdminIds] = useState<string[]>([]);
    const actionType = useSearchParams().get("actionType");
    const planId = useSearchParams().get("id");
    const { data } = useGetSingleCareerPlanQuery({ _id: planId });
    const planValues = data?.data;
    // console.log(data);
    const router = useRouter();

    const methods = useForm<FormValues>({
        resolver: yupResolver(
            Yup.object().shape({
                title: Yup.string().required("Field is required."),
                description: Yup.string().required("Field is required.").max(100, "Description must be at most 100 characters long"),
            })
        ),
        defaultValues: { title: "", description: "" },
    });

    const { handleSubmit, formState: { isSubmitting }, setValue } = methods;

    async function onSubmit(values: FormValues): Promise<void> {
        if (!isSubmitting && actionType === 'add') {
            try {
                const response = await createCareerPlan({
                    title: values?.title,
                    description: values?.description,
                    adminIds: getAdminIds
                }).unwrap();
                router.push(`?tab=1&id=${response?.data?._id}&status=draft`);
            } catch (error) {
                toast.error("Please select one admin");
            }
        } else if (actionType === 'edit') {
            try {
                const response = await updateCareerPlan({
                    id: planId,
                    title: values?.title,
                    description: values?.description,
                    adminIds: getAdminIds

                }).unwrap();
                router.push(`?tab=1&id=${response?.data?._id}&status=draft`);
            } catch (error) {
                toast.error("Please select one admin");
            }
        }
    };

    function handleAddAdminModal(): void {
        setIsAddAdminModalOpen(!isAddAdminModalOpen);
    }

    function handleGetAdminIds(ids: string[]): void {
        setGetAdminIds(ids)
    }

    useEffect(() => {
        if (actionType === 'view' || actionType === 'edit') {
            setValue("title", planValues?.title);
            setValue("description", planValues?.description);
        };
    }, [planValues?.title, planValues?.description, actionType])

    return {
        methods,
        handleSubmit,
        onSubmit,
        theme,
        isAddAdminModalOpen,
        handleAddAdminModal,
        handleGetAdminIds,
        getAdminIds,
    };
}
