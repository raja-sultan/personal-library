"use client";
import { useState } from "react";

import {
  useUploadProfileMutation,
  useUploadCoverMutation,
  useDeleteProfileMutation,
  useDeleteCoverMutation,
  useGetProfileQuery,
} from "@services/profile/profile-api";
import toast from "react-hot-toast";

export function useImageUpload(): any {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isUploading, setIsUploading] = useState<{ profile: boolean; cover: boolean }>({
    profile: false,
    cover: false,
  });

  const { data: getProfile, isLoading } = useGetProfileQuery({});
  const [uploadProfile] = useUploadProfileMutation();
  const [uploadCover] = useUploadCoverMutation();
  const [deleteProfile] = useDeleteProfileMutation();
  const [deleteCover] = useDeleteCoverMutation();

  function getInitials(firstName: string, lastName: string): string {
    const initials = firstName?.charAt(0) + lastName?.charAt(0);
    return initials;
  }

  const handleImageLoad = (): void => {
    setIsImageLoaded(true);
  };

  const handleUploadProfile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedImage = e.target.files ? e.target.files[0] : null;
    if (selectedImage) {
      const formData = new FormData();
      formData.append("profileImage", selectedImage);
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          setIsUploading({ ...isUploading, profile: true });
          await uploadProfile(formData).unwrap();
          toast.success("Image updated successfully!");
        } catch (error) {
          toast.error(error?.data?.message ?? "Size is too large");
        } finally {
          setIsUploading({ ...isUploading, profile: false });
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleUploadCover = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedImage = e.target.files ? e.target.files[0] : null;
    if (selectedImage) {
      const formData = new FormData();
      formData.append("coverImage", selectedImage);
      const reader = new FileReader();

      reader.onload = async (): Promise<void> => {
        try {
          setIsUploading({ ...isUploading, cover: true });
          await uploadCover(formData).unwrap();
          toast.success("Image updated successfully!");
        } catch (error) {
          toast.error(error.data.message);
        } finally {
          setIsUploading({ ...isUploading, cover: false });
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleImageRemove = async (type: string): Promise<void> => {
    const deleteFunction = type === "cover" ? deleteCover : deleteProfile;

    try {
      await deleteFunction({}).unwrap();
      toast.success("Image removed successfully!");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return {
    handleUploadProfile,
    handleUploadCover,
    handleImageRemove,
    handleImageLoad,
    getInitials,
    isImageLoaded,
    getProfile,
    isLoading,
    isUploading,
  };
}
