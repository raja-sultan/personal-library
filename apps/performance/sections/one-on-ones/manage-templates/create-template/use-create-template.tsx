import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { UseFormHandleSubmit, SubmitHandler, UseFormReturn, UseFormGetValues } from 'react-hook-form';
import * as Yup from "yup";
import { useAddTemplatesMutation, useLazyGetTemplateDetailsByIdQuery, useUpdateTemplateMutation } from "@services/settings/one-on-ones/templetes-api";
import toast from "react-hot-toast";

interface FormValues {
  title: string;
  visibility: string;
  description?: string;
  actionItem?: Points[],
  discussionPoint?: Points[],
}

interface Points {
  id: string, point: string
}

interface ReturnType {
  methods: UseFormReturn<FormValues>,
  onSubmit: SubmitHandler<FormValues>,
  handleSubmit: UseFormHandleSubmit<FormValues>,
  onBack: () => void,
  handleGetActionItems: (points: Points[]) => void,
  handleGetDiscussionPoints: (points: Points[]) => void,
  getValues: UseFormGetValues<FormValues>,
  isAddLoading: boolean;
  isUpdateLoading: boolean;
  isLoading: boolean;
}

export function useCreateTemplate(): ReturnType {
  const router = useRouter();
  const templateId = useSearchParams().get('id');

  const [getTemplateDetailsById, { data: ApiData, isLoading }] = useLazyGetTemplateDetailsByIdQuery();
  const [addTemplateMutation, { isLoading: isAddLoading }] = useAddTemplatesMutation();
  const [updateTemplateMutation, { isLoading: isUpdateLoading }] = useUpdateTemplateMutation();


  const methods = useForm<FormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        title: Yup.string().required("Field is required"),
        visibility: Yup.string().required("Field is required"),
      })
    ),
    defaultValues: {
      title: '',
      visibility: '',
      discussionPoint: [],
      actionItem: []
    },
  });

  const { handleSubmit, reset, getValues, setValue } = methods;

  function onBack(): void {
    router.push('/one-on-ones/manage-templates')
  }

  function handleGetActionItems(points: Points[]): void {
    setValue("actionItem", points)
  }

  function handleGetDiscussionPoints(points: Points[]): void {
    setValue("discussionPoint", points)
  }

  const onSubmit: SubmitHandler<FormValues> = async (formData: FormValues): Promise<void> => {
    try {
      // Destructuring assignment to remove "discussionPoint" and "actionItem"
      const { discussionPoint, actionItem, ...restFormData } = formData;

      // Transforming discussionPoint and actionItem arrays
      const obj = {
        ...restFormData,
        discussionPoint: discussionPoint?.map(({ point }) => point),
        actionItem: actionItem?.map(({ point }) => point),
      };

      // Filtering out empty values
      const filteredObj = Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
          if (Array.isArray(value)) {
            return value.length > 0;
          } else if (typeof value === 'string') {
            return value.trim() !== '';
          }
          return true;
        })
      );

      templateId
        ? await updateTemplateMutation({ id: templateId, ...restFormData }).unwrap()
        : await addTemplateMutation(filteredObj).unwrap();

      toast.success(`Template ${templateId ? 'updated' : 'created'}  successfully`);
      onBack();
    } catch (error) {
      toast.error(error?.data?.message === 'Discussion Point must be an array'
        ? error?.data?.errors[1]
        : error?.data?.message === 'Action Item must be an array'
          ? error?.data?.errors[1]
          : null);
    }
  };

  function formatPointsData(data: { _id: string, text: string }[]): Points[] {
    return data?.map(({ _id, text }) => ({ id: _id, point: text })) ?? []
  }

  useEffect(() => {
    const data = ApiData?.data[0];
    reset({
      title: data?.title,
      description: data?.description,
      visibility: data?.visibility,
      discussionPoint: formatPointsData(data?.discussionPoint),
      actionItem: formatPointsData(data?.actionItem)
    });
  }, [setValue, ApiData, reset])

  useEffect(() => {
    if (templateId) {
      getTemplateDetailsById({ id: templateId })
    }
  }, [templateId, getTemplateDetailsById])



  return {
    onSubmit,
    handleSubmit,
    onBack,
    methods,
    handleGetActionItems,
    handleGetDiscussionPoints,
    getValues,
    isAddLoading,
    isUpdateLoading,
    isLoading
  };
}
