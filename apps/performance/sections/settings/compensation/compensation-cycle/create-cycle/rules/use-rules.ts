import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { UseFormHandleSubmit, SubmitHandler, UseFormReturn, UseFormWatch } from 'react-hook-form'
import * as Yup from 'yup';
import { useLazyGetParticipantsQuery, useUpdateCycleMutation, useLazyGetSingleCompensationCycleQuery } from '@services/compensation/compensation-cycle/compensation-cycle-api';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';

interface FormValues {
    tenure?: boolean;
    tenureDate?: any;
    lastCompensationChange?: boolean;
    lastCompensationChangeDate?: any;
    companyCurrency?: string;
}

interface ReturnType {
    methods: UseFormReturn<FormValues>;
    handleSubmit: UseFormHandleSubmit<FormValues>;
    formSubmitted: boolean;
    anyChecked: boolean;
    onSubmit: SubmitHandler<FormValues>;
    totalEmployees: number | null;
    isSuccess: boolean;
    watch: UseFormWatch<FormValues>;
    isGenerateListLoading: boolean;
    isCycleLoadingById: boolean;
}

export function useRules({ handleNext, currency, viewDetailId }): ReturnType {
    const [updateCycleMutation, { isLoading: isGenerateListLoading }] = useUpdateCycleMutation();
    const [getLazyParticipant, { isSuccess }] = useLazyGetParticipantsQuery();
    const [getCycleById, { isLoading: isCycleLoadingById }] = useLazyGetSingleCompensationCycleQuery();

    const [totalEmployees, setTotalEmployees] = useState<number | null>(null);

    const methods = useForm<FormValues>({
        resolver: yupResolver(Yup.object().shape({
            tenure: Yup.boolean().optional(),
            tenureDate: Yup.date().when('tenure', ([tenure], field) => tenure === true ?
                field.required('Tenure date is required') : field.optional()),
            lastCompensationChange: Yup.boolean().optional(),
            lastCompensationChangeDate: Yup.date().when('lastCompensationChange', ([lastCompensationChange], field) =>
                lastCompensationChange === true ? field.required('Last compensation change date is required') : field.optional()),
            companyCurrency: Yup.string().optional()
        })),
        defaultValues: {
            tenure: false,
            tenureDate: undefined,
            lastCompensationChange: false,
            lastCompensationChangeDate: undefined,
            companyCurrency: '',
        }
    });

    const { handleSubmit, watch, formState, clearErrors, setValue, reset } = methods;

    const anyChecked = Boolean(watch('tenure') || watch('lastCompensationChange'));

    useEffect(() => {
        if (watch('tenure') === false) {
            clearErrors('tenureDate');
            setValue('tenureDate', '');
        }
        if (watch('lastCompensationChange') === false) {
            clearErrors('lastCompensationChangeDate');
            setValue('lastCompensationChangeDate', '')
        }
    }, [watch, setValue, clearErrors]);

    const tenureStartDate = watch('tenureDate');
    const lastRaiseDate = watch('lastCompensationChangeDate');
    useEffect(() => {
        const tenureDate = tenureStartDate ? dayjs(tenureStartDate).format('YYYY-MM-DD') : undefined;
        const lastDate = lastRaiseDate ? dayjs(lastRaiseDate).format('YYYY-MM-DD') : undefined;
        if (tenureStartDate || lastRaiseDate) {
            getLazyParticipant({
                tenureStartDate: tenureDate,
                lastRaiseDate: lastDate,
                compensationCycleId: viewDetailId
            }).unwrap().then((data) => {
                setTotalEmployees(data?.data?.length);
            })
        }
    }, [tenureStartDate, lastRaiseDate, getLazyParticipant, viewDetailId])

    useEffect(() => {
        if (currency)
            setValue('companyCurrency', currency)
    }, [currency, setValue])

    async function onSubmit(values: FormValues): Promise<void> {
        if (anyChecked) {
            const obj = {
                tenureStartDate: values.tenureDate ? dayjs(values.tenureDate).format('YYYY-MM-DD') : '',
                lastRaiseDate: values.lastCompensationChangeDate ? dayjs(values.lastCompensationChangeDate).format('YYYY-MM-DD') : '',
                stage: 'rules'
            }
            const filteredObj = Object.fromEntries(Object.entries(obj).filter(([_, value]) =>
                value !== "Invalid Date" && value !== ''));

            try {
                await updateCycleMutation({ id: viewDetailId, body: filteredObj }).unwrap().then((data) => {
                    if (data?.data) {
                        handleNext();
                    }
                });
            } catch (error) {
                toast.error(error?.data?.message || 'Error while adding rules')
            }
        }
    };

    useEffect(() => {
        if (viewDetailId) {
            getCycleById({ id: viewDetailId }).unwrap().then((data) => {
                if (data?.data?._id) {
                    const obj = data?.data
                    reset({
                        tenure: Boolean(obj?.tenureStartDate),
                        tenureDate: obj?.tenureStartDate ? dayjs(obj?.tenureStartDate).toDate() : undefined,
                        lastCompensationChange: Boolean(obj?.lastRaiseDate),
                        lastCompensationChangeDate: obj?.lastRaiseDate ? dayjs(obj?.lastRaiseDate).toDate() : undefined,
                        companyCurrency: obj?.currency
                    })
                }
            })
        }
    }, [viewDetailId, getCycleById, reset])

    return {
        methods,
        handleSubmit,
        formSubmitted: formState.isSubmitted,
        anyChecked,
        onSubmit,
        totalEmployees,
        isSuccess,
        watch,
        isCycleLoadingById,
        isGenerateListLoading,
    }
}