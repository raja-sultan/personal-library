"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import {
  useAddGrowthActionMutation,
  useDeleteGrowthActionMutation,
  useEditGrowthDetailsMutation,
} from "@services/settings/career/plans/plans-api";
import dayjs from "dayjs";

// Assume you have an 'options' state for the growth areas
const initialOptions: string[] = [];

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
  toggleInput: boolean;
  setToggleInput: Dispatch<SetStateAction<boolean>>;
  onSubmit: (formData: FormValues) => void;
  handleDeleteOption?: (index: number) => void;
  handleClose: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: any;
  methods: any;
  inputValue?: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  options?: string[];
  handleDeleteGrowthActions: (id: string) => void;
  handleAddGrowthActions: (id: string) => void;
  isDeleteActionLoading: boolean;
  isEditLoading: boolean;
  setActionId: any;
  actionId: string;
}

export function useAddGrowthAreas({ growthId, data, handleOpenAddGrowthModal }): UseAddGrowthAreasType {
  const [toggleInput, setToggleInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(initialOptions);
  const [actionId, setActionId] = useState("");

  const [deleteGrowthAction, { isLoading: isDeleteActionLoading }] =
    useDeleteGrowthActionMutation();
  const [addGrowthAction] = useAddGrowthActionMutation();
  const [editGrowthDetails, { isLoading: isEditLoading }] =
    useEditGrowthDetailsMutation();

  const handleDeleteOption = (index: number): void => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleInputChange = ({ target }): void => {
    const { value } = target;
    setInputValue(value);
  };

  const handleClose = (): void => {
    setToggleInput(false);
    setInputValue("");
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: undefined,
      growthPeriod: "",
    },
  });

  const handleDeleteGrowthActions = async (id: string): Promise<void> => {
    try {
      await deleteGrowthAction(id)
        .unwrap()
        .then((res) => {
          if (res) {
            toast.success("action deleted successfully");
            setActionId("");
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Error while deleting action");
    }
  };

  const handleAddGrowthActions = async (id: string): Promise<void> => {
    try {
      await addGrowthAction({ id, body: { actions: inputValue } })
        .unwrap()
        .then((res) => {
          if (res) {
            toast.success("action add successfully");
            setInputValue("");
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Error while add action");
    }
  };

  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: FormValues): Promise<void> => {
    formData.dueDate = dayjs(formData.dueDate).toISOString();
    const careerGrowthObj = { planId: data?.planId, skillId: data?.skillId, ...formData };
    try {
      await editGrowthDetails({ growthId, body: careerGrowthObj }).unwrap()
      toast.success('Growth area updated successfully');
      reset();
      handleOpenAddGrowthModal();
    } catch (error) {
      toast.error(error?.data?.message || "Error while updating growth area");
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
    toggleInput,
    setToggleInput,
    handleClose,
    handleInputChange,
    inputValue,
    setInputValue,
    options,
    handleDeleteOption,
    handleDeleteGrowthActions,
    setActionId,
    actionId,
    handleAddGrowthActions,
    isDeleteActionLoading,
    isEditLoading,
  };
}
