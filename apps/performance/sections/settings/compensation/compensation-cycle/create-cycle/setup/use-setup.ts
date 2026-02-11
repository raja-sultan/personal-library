import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { UseFormHandleSubmit, SubmitHandler, UseFormReturn } from 'react-hook-form'
import * as Yup from 'yup';
import { useAddNewCycleMutation, useLazyGetSingleCompensationCycleQuery, useUpdateCycleMutation } from '@services/compensation/compensation-cycle/compensation-cycle-api';
import { toast } from 'react-hot-toast';
import { useGetEmployeesQuery } from '@services/login-as';
import { useRouter } from 'next/navigation';

interface FormValues {
    name: string;
    adminIds: { id: string, name: string }[];
}

interface ReturnType {
    methods: UseFormReturn<FormValues>;
    handleSubmit: UseFormHandleSubmit<FormValues>;
    onSubmit: SubmitHandler<FormValues>;
    employeesList: { id: string, name: string }[] | [];
    isLoading: boolean;
    isSingleCycleLoading: boolean
}

export function useSetup({ handleNext, viewDetailId }): ReturnType {
    const router = useRouter();
    const [addNewCycleMutation, { isLoading: isNewCycleLoading }] = useAddNewCycleMutation();
    const [getCompensationCycle, { isLoading: isSingleCycleLoading }] = useLazyGetSingleCompensationCycleQuery();
    const [updateCycleMutation, { isLoading: isUpdateCycleLoading }] = useUpdateCycleMutation();
    const { data: employees } = useGetEmployeesQuery({ type: 'employees' });

    const isLoading = isNewCycleLoading || isUpdateCycleLoading;

    const employeesList = employees?.data?.map(({ text, value }: { text: string, value: string }) => ({ id: value, name: text })) ?? []

    const methods = useForm<FormValues>({
        resolver: yupResolver(Yup.object().shape({
            name: Yup.string().required('Cycle name is required'),
            adminIds: Yup.array().min(1, "Select atLeast one option").required("Field is required")
        })),
        defaultValues: {
            name: '',
            adminIds: []
        }
    });

    const { handleSubmit, reset } = methods

    async function onSubmit(values: FormValues): Promise<void> {
        const obj = {
            name: values.name,
            adminIds: values.adminIds.map(({ id }) => id),
            stage: 'setup'
        }
        try {
            viewDetailId ?
                await updateCycleMutation({ id: viewDetailId, body: obj }).unwrap().then((data) => {
                    if (data?.data?._id) {
                        handleNext();
                    }
                })
                : await addNewCycleMutation({ body: obj }).unwrap().then((data) => {
                    if (data?.data?._id) {
                        router.push(`?id=${data?.data?._id}`);
                        handleNext();
                    }
                });
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong please try again');
        }
    };

    useEffect(() => {
        if (viewDetailId) {
            const id = viewDetailId;
            getCompensationCycle({ id }).unwrap().then((data) => {
                const includesAdmin = employees?.data?.filter((emp: { value: string }) =>
                    data?.data?.adminIds?.includes(emp?.value))?.map(({ text, value }: { text: string, value: string }) =>
                        ({ id: value, name: text }));
                reset({
                    name: data?.data?.name,
                    adminIds: includesAdmin
                })
            })
        }
    }, [viewDetailId, getCompensationCycle, reset, employees?.data])

    return {
        methods,
        handleSubmit,
        onSubmit,
        employeesList,
        isLoading,
        isSingleCycleLoading
    }
}