'use client'
import { useEffect, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler, type UseFormHandleSubmit, type UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';
import { useAddCareerVisionMutation, useDeleteCareerVisionMutation, useGetCareerVisionByIdQuery, useGetCareerVisionQuery, usePutCareerVisionMutation } from "@services/career/career-vision/career-vision-api";
import toast from "react-hot-toast";
import type { Dispatch, SetStateAction } from "react"

interface FormValues {
    name: string,
    description?: string,
    enabled?: boolean,
}
interface ReturnType {
    careerVisionModal: boolean;
    handleCareerVisionModal: () => void;
    handleSubmit: UseFormHandleSubmit<FormValues>,
    onSubmit: SubmitHandler<FormValues>,
    methods: UseFormReturn<FormValues>,
    handleEditCareerVision: (_id: string) => void,
    careerVisionId: string,
    handleAddCareerVision: () => void,
    handleDeleteModal: (_id: string) => void,
    isOpenDeleteModal: boolean,
    setIsOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
    handleDeleteCareerVision: () => void
    getCareerVisionData: any;
    isGetCareerVisionDataLoading: boolean;
    isAddingLoading: boolean;
    isUpdateLoading: boolean;
    isGetCareerVisionLoading?: boolean;
    isDeleteLoading: boolean;
    actionType:string
}
export function useTeamCareer(): ReturnType {
    const [careerVisionModal, setCareerVisionModal] = useState(false);
    const [careerVisionId, setCareerVisionId] = useState('');
    const [actionType, setActionType] = useState('add');
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    // api call *********************
    const { data: getCareerVisionData, isLoading: isGetCareerVisionDataLoading } = useGetCareerVisionQuery({})
    const [addCareerVision, { isLoading: isAddingLoading }] = useAddCareerVisionMutation();
    const [updateCareerVision, { isLoading: isUpdateLoading }] = usePutCareerVisionMutation();
    const { data: getCareerVisionDataById, isLoading: isGetCareerVisionLoading } = useGetCareerVisionByIdQuery({ id: careerVisionId });
    const [deleteCareerVision, { isLoading: isDeleteLoading }] = useDeleteCareerVisionMutation();


const methods = useForm({
    resolver: yupResolver(Yup.object().shape({
        name: Yup.string().trim().required('Name is required'),
        description: Yup.string().trim().optional(),
        enabled: Yup.boolean().optional()
    })),
    defaultValues: {
        name: '',
        description: '',
        enabled: true,
    }
});
const { handleSubmit, reset, setValue } = methods;

function handleCareerVisionModal(): void {
    reset();
    if (!careerVisionModal) {
        reset();
    }
    setCareerVisionModal(!careerVisionModal);
}
function handleAddCareerVision(): void {
    setCareerVisionId('');
    setActionType('add')
    handleCareerVisionModal();
}
function handleEditCareerVision(_id: string): void {
    setCareerVisionId(_id);
    setActionType('edit')
    handleCareerVisionModal();
}
function handleDeleteModal(_id: string): void {
    setCareerVisionId(_id);
    setIsOpenDeleteModal(!isOpenDeleteModal);
}

useEffect(() => {
    if (careerVisionId && actionType === 'edit') {
        const careerVisionDataById = getCareerVisionDataById?.data;
        setValue("name", careerVisionDataById?.name);
        setValue("description", careerVisionDataById?.description);
        setValue("enabled", careerVisionDataById?.enabled);
    }
}, [careerVisionId, getCareerVisionDataById, actionType]);

async function onSubmit(values: FormValues): Promise<void> {
    const careerObj = {
        name: values?.name,
        description: values?.description,
        enabled: values?.enabled,
    };
    try {
        careerVisionId ? await updateCareerVision({
            id: careerVisionId, payload: {
                name: values?.name,
                description: values?.description,
                enabled: values?.enabled,
            }
        }).unwrap() : await addCareerVision(careerObj).unwrap();
        toast.success(`Career Vision is Added successfully`);
        reset();
    } catch (error) {
        toast.error(error?.data?.message ?? `Error while Adding`);
    }
    reset();
    handleCareerVisionModal();
}


async function handleDeleteCareerVision(): Promise<void> {
    try {
        await deleteCareerVision({ id: careerVisionId }).unwrap().then((res) => {
            if (res) {
                toast.success("Career Vision deleted successfully");
                setIsOpenDeleteModal(!isOpenDeleteModal);
            }
        });
    } catch (error) {
        toast.error(error?.data?.message || "Error While Deleting Career Vision");
    }
}


return {
    careerVisionModal,
    handleCareerVisionModal,
    handleSubmit, onSubmit, methods,
    handleEditCareerVision,
    careerVisionId,
    handleAddCareerVision,
    handleDeleteModal,
    isOpenDeleteModal,
    setIsOpenDeleteModal,
    handleDeleteCareerVision,
    getCareerVisionData,
    isGetCareerVisionDataLoading,
    isAddingLoading,
    isUpdateLoading,
    isGetCareerVisionLoading,
    isDeleteLoading,
    actionType
}
}