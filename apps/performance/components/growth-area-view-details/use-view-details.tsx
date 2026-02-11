"use client";

import { useGetProfileQuery } from "@services/profile/profile-api";
import {
  useCareerViewCommentQuery,
  useDeleteGrowthMutation,
  useGrowthActionsMutation,
  useGrowthPostCommentMutation,
  useGrowthStatusChangeMutation,
  useSingleCareerGrowthQuery,
} from "@services/settings/career/plans/plans-api";
import { useState } from "react";
// import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ApiReturnType {
  comment: string;
}

interface UseViewDetailsReturnType {
  handleStatusChange?: () => void;
  handleDeleteModal?: () => void;
  handleOpenAddGrowthModal?: () => void;
  openDeleteModal?: boolean;
  openAddGrowthModal?: boolean;
  // setOpenAddGrowthModal?: Dispatch<SetStateAction<boolean>>;
  onSubmit: (formData: ApiReturnType) => Promise<void>;
  handleSubmit: any;
  methods: any;
  growthData: any;
  isLoading: boolean;
  isStatusLoading: boolean;
  handleDeleteGrowth: () => void;
  isDeleteLoading: boolean;
  isActionLoading: boolean;
  isCommentLoading: boolean;
  isViewCommentLoading: boolean;
  viewComment: any;
  handleActionChange: (id: string, checked: boolean) => void;
  currentUser: {
    img: string;
    firstName: string;
    lastName: string;
  };
}

// Define the useGroups custom hook
export function useViewDetails({
  id,
  handleDrawerClose,
}): UseViewDetailsReturnType {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddGrowthModal, setOpenAddGrowthModal] = useState(false);

  const { data, isLoading } = useSingleCareerGrowthQuery({ growthId: id });
  const { data: viewComment, isLoading: isViewCommentLoading } =
    useCareerViewCommentQuery({ growthId: id });
  const [growthStatusChangeMutation, { isLoading: isStatusLoading }] =
    useGrowthStatusChangeMutation();
  const [deleteGrowthMutation, { isLoading: isDeleteLoading }] =
    useDeleteGrowthMutation();
  const [growthActionsMutation, { isLoading: isActionLoading }] =
    useGrowthActionsMutation();
  const [growthPostCommentMutation, { isLoading: isCommentLoading }] =
    useGrowthPostCommentMutation();
  const { data: userProfile } = useGetProfileQuery({});

  const currentUser = {
    img: userProfile?.data?.profileImage,
    firstName: userProfile?.data?.firstName,
    lastName: userProfile?.data?.lastName,
  };

  const handleStatusChange = async (): Promise<void> => {
    try {
      await growthStatusChangeMutation({ id, body: { completed: true } })
        .unwrap()
        .then((res) => {
          if (res) {
            toast.success("Status updated successfully");
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Error while updating status");
    }
  };

  const handleDeleteGrowth = async (): Promise<void> => {
    try {
      await deleteGrowthMutation({ growthId: id })
        .unwrap()
        .then((res) => {
          if (res) {
            toast.success("Growth deleted successfully");
            handleDeleteModal();
            handleDrawerClose();
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Error while deleting growth");
    }
  };

  const handleActionChange = async (
    actionId: string,
    checked: boolean
  ): Promise<void> => {
    try {
      await growthActionsMutation({
        id: actionId,
        body: { completed: checked },
      })
        .unwrap()
        .then((res) => {
          if (res) {
            toast.success("Growth action updated successfully");
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Error while updating growth action");
    }
  };

  const handleDeleteModal = (): void => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleOpenAddGrowthModal = (): void => {
    setOpenAddGrowthModal(!openAddGrowthModal);
  };

  const methods = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: { comment: string }): Promise<void> => {
    try {
      await growthPostCommentMutation({
        body: { text: formData.comment, growthId: id },
      })
        .unwrap()
        .then((res) => {
          if (res) {
            toast.success("Comment posted successfully");
            reset();
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Error while posting comment");
    }
  };

  return {
    handleStatusChange,
    handleDeleteModal,
    handleOpenAddGrowthModal,
    openDeleteModal,
    onSubmit,
    handleSubmit,
    methods,
    openAddGrowthModal,
    growthData: data?.data,
    isLoading,
    isStatusLoading,
    handleDeleteGrowth,
    isDeleteLoading,
    handleActionChange,
    isActionLoading,
    isCommentLoading,
    isViewCommentLoading,
    viewComment,
    currentUser,
  };
}
