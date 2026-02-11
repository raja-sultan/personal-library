import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDeleteUpdatesSettingQuestionsMutation,
  useGetUpdatesSettingQuestionsQuery,
  usePostUpdatesSettingQuestionsMutation,
  usePutUpdatesSettingQuestionsMutation,
} from "@services/settings/updates/settings-api";
import { useState } from "react";
import * as Yup from "yup";
import type { FormValues, ReturnType } from "./setting-type";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { usePostMyTeamUpdatesSettingMutation } from "@services/my-team/updates/updates-api";

export function useSetting(): ReturnType {
  const [addModal, setAddModal] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState<string | undefined>();

  const methods = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        updateSetting: Yup.string().required("Update setting is required"),
        enableUpdates: Yup.boolean().optional(),
        frequency: Yup.string().optional(),
        day: Yup.string().optional(),
        time: Yup.string().optional(),
      })
    ),
    defaultValues: {
      updateSetting: "custom team setting",
      enableUpdates: true,
      frequency: "weekly",
      day: "friday",
      time: "9:00am",
    },
  });

  const { data: questions, isLoading } = useGetUpdatesSettingQuestionsQuery({
    questionType: "custom",
  });
  const [postUpdateSetting] = usePostMyTeamUpdatesSettingMutation({});
  const [deleteQuestion] = useDeleteUpdatesSettingQuestionsMutation({});
  const [postQuestion] = usePostUpdatesSettingQuestionsMutation({});
  const [updateQuestion] = usePutUpdatesSettingQuestionsMutation({});
  

  function handleAddQuestionChange(event: any): void {
    setInputValue(event.target.value);
  }

  const handleOpenDeleteModal = (): void => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleInputChange = (event: any): void => {
    setInputValue(event.target.value);
  };

  const handleOpenModal = (modalType: string, text?: string): void => {
    if (modalType === "Edit") {
      setIsEdit(true);
      setInputValue(text);
    } else {
      setIsEdit(false);
      setInputValue("");
    }
    setAddModal(true);
  };

  const handleSubmitQuestion = async (): Promise<void> => {
    const payload = { text: inputValue, questionType: "custom" };

    try {
      if (isEdit) {
        await updateQuestion({ body: payload, id: editQuestionId }).unwrap();
        toast.success("Question updated successfully");
      } else {
        await postQuestion({ body: payload }).unwrap();
        toast.success("Question added successfully");
      }
    } catch (err) {
      toast.error(err);
    }
    setAddModal(false);
  };

  const { handleSubmit , reset} = methods;

  const onSubmit = async (data: FormValues): Promise<void> => {
    const customUpdatesEnabled = data.updateSetting === "custom team setting" 
    const payload = {
      customUpdatesEnabled,
      allowDirectReports: data.enableUpdates,
      schedule: {
        frequency: data.frequency,
        day: data.day,
        time: data.time,
      },
    };
     try {
       await postUpdateSetting({ body: payload }).unwrap();
       toast.success("Updates Setting is submitted successfully");
       reset();
     } catch (err) {
       toast.error(err);
     }
  }

  const handleDeleteQuestion = async (): Promise<void> => {
    try {
      await deleteQuestion({ id: editQuestionId }).unwrap();
      toast.success("Question deleted successfully");
    } catch (err) {
      toast.error(err);
    }
    setOpenDeleteModal(false);
    setAddModal(false);
  };

  return {
    handleSubmit,
    methods,
    onSubmit,
    addModal,
    setEditQuestionId,
    handleOpenDeleteModal,
    handleSubmitQuestion,
    handleAddQuestionChange,
    handleOpenModal,
    editQuestionId,
    handleInputChange,
    questions,
    inputValue,
    isLoading,
    openDeleteModal,
    isEdit,
    handleDeleteQuestion,
    setAddModal,
  };
}
