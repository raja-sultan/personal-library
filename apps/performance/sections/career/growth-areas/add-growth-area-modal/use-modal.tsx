"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { usePostCareerGrowthMutation } from "@services/career/growth-area-api";

const FormSchema = Yup.object().shape({
  title: Yup.string()
    .required("Field is required")
    .min(6, "Minimum 6 characters")
    .max(30, "Maximum 15 characters"),
  description: Yup.string().optional(),
  dueDate: Yup.date().required("Field is required"),
  growthPeriod: Yup.string().required("Field is required"),
});

interface FormValues {
  title: string;
  description?: string;
  dueDate: any;
  growthPeriod: string;
}

interface UseAddGrowthAreasType {
  onSubmit: (formData: FormValues) => void;
  handleSubmit: any;
  methods: any;
}

export function useModal({
  data,
  setOpenModal,
  skillId,
  planId,
}): UseAddGrowthAreasType {
  const [addCareerGrowth] = usePostCareerGrowthMutation();

  const methods = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: undefined,
      growthPeriod: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: FormValues): Promise<void> => {
    const body = {
      title: formData?.title,
      description: formData?.description,
      dueDate: new Date(formData?.dueDate),
      growthPeriod: formData?.growthPeriod,
      skillId,
      planId,
    };

    try {
      await addCareerGrowth({ payload: body })
        .unwrap()
        .then((res) => {
          if (res) {
            toast.success("Growth area added successfully");
            reset();
            setOpenModal(false);
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Error while adding growth area");
      reset();
      setOpenModal(false);
    }
  };

  useEffect(() => {
    reset({
      title: data?.title,
      description: data?.description,
      dueDate: new Date(data?.dueDate),
      growthPeriod: data?.growthPeriod,
    });
  }, [data, reset]);

  return {
    onSubmit,
    handleSubmit,
    methods,
  };
}
