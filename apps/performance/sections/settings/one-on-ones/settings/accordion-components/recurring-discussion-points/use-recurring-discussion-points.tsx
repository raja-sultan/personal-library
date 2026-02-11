import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddTemplateEventMutation,
  useDeleteTemplatesEventMutation,
  useGetTemplateEventsQuery,
  useUpdateTemplateEventMutation,
} from "@services/settings/one-on-ones/templetes-api";
import toast from "react-hot-toast";
import {
  defaultData,
  recurringDiscussionsPointsSchema,
} from "./recurring-discussion-points-data";
import type { UseRecurringDiscussionPoints } from "./recurring-discussion-points-type";

export function useRecurringDiscussionPoints(): UseRecurringDiscussionPoints {
  const [openCustomModal, setOpenCustomModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activePointId, setActivePointId] = useState("");
  const [addDiscussionPoint] = useAddTemplateEventMutation();
  const [deleteDiscussionPoint] = useDeleteTemplatesEventMutation();
  const [updateDiscussionPoint] = useUpdateTemplateEventMutation();

  const { data: getTemplateEvents } = useGetTemplateEventsQuery({
    recurring: true,
  });

  const discussionPoints = getTemplateEvents?.data;
  const handleOpenModal = (modalType: string, text?: string): void => {
    if (modalType === "Edit") {
      setIsEdit(true);
      methods.reset({
        discussionPoint: text,
      });
    } else {
      setIsEdit(false);
      methods.reset({
        discussionPoint: "",
      });
    }
    setOpenCustomModal(true);
  };

  const handleOpenDeleteModal = (): void => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleDeleteDiscussion = (): void => {
    deleteDiscussionPoint({ id: activePointId })
      .unwrap()
      .then((response) => {
        toast.success(response?.message);
      })
      .catch(() => {
        toast.error("error");
      });
    setOpenDeleteModal(false);
  };

  const methods = useForm({
    resolver: yupResolver(recurringDiscussionsPointsSchema),
    defaultValues: defaultData({
      discussionPoint: "sdgas",
    }),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (formData: any): void => {
    const data = {
      text: formData?.discussionPoint,
      type: "discussion_point",
      recurring: true,
    };
    isEdit
      ? updateDiscussionPoint({ id: activePointId, ...data })
        .unwrap()
        .then((response) => {
          toast.success(response?.message);
        })
        .catch(() => {
          toast.error("error");
        })
      : addDiscussionPoint(data)
        .unwrap()
        .then((response) => {
          toast.success(response?.message);
        })
        .catch(() => {
          toast.error("error");
        });
    setOpenCustomModal(false);
    reset();
  };



  return {
    openCustomModal,
    setOpenCustomModal,
    openDeleteModal,
    isEdit,
    setActivePointId,
    discussionPoints,
    handleOpenModal,
    handleOpenDeleteModal,
    handleDeleteDiscussion,
    methods,
    handleSubmit,
    reset,
    onSubmit,
  };
}
