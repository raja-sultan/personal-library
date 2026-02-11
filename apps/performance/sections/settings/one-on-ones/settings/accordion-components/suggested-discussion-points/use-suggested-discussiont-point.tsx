import { useEffect, useState } from "react";
import {
  useAddResourceMutation,
  useDeleteResourceMutation,
  useGetResourcesListQuery,
} from "@services/resources/resources-api";
import {
  useAddTemplateEventMutation,
  useGetTemplateEventsQuery,
  useDeleteTemplatesEventMutation,
  useUpdateTemplateEventMutation,
} from "@services/settings/one-on-ones/templetes-api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  suggestedDiscussionsPointsSchema,
  defaultData,
} from "./suggested-discussion-points-data";
import toast from "react-hot-toast";
import type { SuggestedDiscussions } from "./suggested-discussion-points-type";

export function useSuggestedDiscussionPoint(): SuggestedDiscussions {
  const [openCustomModal, setOpenCustomModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [relationshipOptions, setRelationshipOptions] = useState([]);
  const [activePointId, setActivePointId] = useState("");
  const [deleteResourceMutation] = useDeleteResourceMutation();
  const [addResourceMutation] = useAddResourceMutation();
  const [addDiscussionPoint] = useAddTemplateEventMutation();
  const [deleteDiscussionPoint] = useDeleteTemplatesEventMutation();
  const [updateDiscussionPoint] = useUpdateTemplateEventMutation();
  const { data: getRelationshipList } = useGetResourcesListQuery({
    type: "one_on_one_category",
  });
  const { data: getTemplateEvents } = useGetTemplateEventsQuery({
    recurring: false,
  });

  const methods = useForm({
    resolver: yupResolver(suggestedDiscussionsPointsSchema),
    defaultValues: defaultData({
      category: "Select",
      discussionPoint: "",
    }),
  });

  const discussionPoints = getTemplateEvents?.data;

  const { handleSubmit, reset } = methods;

  const onSubmit = (formData: any): void => {
    const data = {
      category: formData.category,
      text: formData.discussionPoint,
      type: "discussion_point",
      recurring: false,
    };
  
    isEdit
      ? updateDiscussionPoint({ id: activePointId, text: data?.text,category: data?.category })
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

  const handleOpenModal = (
    modalType: string,
    category?: string,
    text?: string
  ): void => {
    if (modalType === "Edit") {
      setIsEdit(true);
      methods.reset({
        category,
        discussionPoint: text,
      });
    } else {
      setIsEdit(false);
      methods.reset({
        category: "Select",
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

  async function addResource({
    name,
    type,
  }: {
    name: string;
    type: string;
  }): Promise<void> {
    const data = {
      name,
      type,
    };
    const response = await addResourceMutation(data).unwrap();
    return response;
  }

  async function deleteResource(id: string): Promise<any> {
    const response = await deleteResourceMutation({ id }).unwrap();
    return response;
  }

  useEffect(() => {
    if (getRelationshipList?.data?.length) {
      const options = getRelationshipList.data.map((item) => ({
        label: item.name,
        value: item.name.toLowerCase(),
        id: item._id,
        userId: item.userId,
      }));
      setRelationshipOptions(options);
    }
  }, [getRelationshipList?.data]);

  return {
    openCustomModal,
    setOpenCustomModal,
    openDeleteModal,
    isEdit,
    relationshipOptions,
    setActivePointId,
    deleteResource,
    addResource,
    methods,
    discussionPoints,
    handleSubmit,
    reset,
    onSubmit,
    handleOpenModal,
    handleOpenDeleteModal,
    handleDeleteDiscussion,
  };
}
