import { useState } from "react";
import type { UseQustionsTypes } from "./questions.types";
import {
  useDeleteUpdatesSettingQuestionsMutation,
  useGetUpdatesSettingQuestionsQuery,
  usePostUpdatesSettingQuestionsMutation,
  usePutUpdatesSettingQuestionsMutation,
} from "@services/settings/updates/settings-api";
import toast from "react-hot-toast";

export function useQuestions(): UseQustionsTypes {
  const [openCustomModal, setOpenCustomModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [inputValue, setInputValue] = useState<string | undefined>();
  const [isEdit, setIsEdit] = useState(false);
  const [questionId, setQuestionId] = useState("");

  const handleInputChange = (event:any):void => {
    setInputValue(event.target.value);
  };

  const { data: questions, isLoading } = useGetUpdatesSettingQuestionsQuery({
    questionType: "default",
  });

  const [deleteQuestion] = useDeleteUpdatesSettingQuestionsMutation({});
  const [postQuestion] = usePostUpdatesSettingQuestionsMutation({});
  const [updateQuestion] = usePutUpdatesSettingQuestionsMutation({});

  const handleOpenModal = (modalType: string, text?: string): void => {
    if (modalType === "Edit") {
      setIsEdit(true);
      setInputValue(text);
    } else {
      setIsEdit(false);
      setInputValue("");
    }
    setOpenCustomModal(true);
  };

  const handleOpenDeleteModal = (): void => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleSubmit = async (): Promise<void> => {
    const payload = { text: inputValue, questionType: "default" };

    try {
      if (isEdit) {
        await updateQuestion({ body: payload, id: questionId }).unwrap();
        toast.success("Question updated successfully");
      } else {
        await postQuestion({ body: payload }).unwrap();
        toast.success("Question added successfully");
      }
    } catch (err) {
      toast.error(err);
    }
    setOpenCustomModal(false);
  };

  const handleDeleteDiscussion = async (): Promise<void> => {
    try {
      await deleteQuestion({ id: questionId }).unwrap();
      toast.success("Question deleted successfully");
    } catch (err) {
      toast.error(err);
    }
    setOpenDeleteModal(false);
    setOpenCustomModal(false);
  };

  return {
    openCustomModal,
    setOpenCustomModal,
    openDeleteModal,
    isEdit,
    setQuestionId,
    questions,
    handleOpenModal,
    handleOpenDeleteModal,
    handleDeleteDiscussion,
    handleSubmit,
    questionId,
    inputValue,
    handleInputChange,
    isLoading,
  };
}
