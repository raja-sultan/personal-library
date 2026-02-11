import {
  useGetCareerVisionQuery,
  useLazyGetSingleCareerVisionQuery,
} from "@services/settings/career/permissions/permission-api";
import { useState } from "react";
import toast from "react-hot-toast";

interface ReturnType {
  singleVisionData: any;
  careerModal: boolean;
  notificationModal: boolean;
  handleCareerModal: () => void;
  handleNotificationModal: () => void;
  handleEditCareerModal: (id: string) => void;
  visionData: any;
  isLoading: any;
  isEdit: boolean;
}

export function usePermissions(): ReturnType {
  const [careerModal, setCareerModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  const { data: visionData, isLoading } = useGetCareerVisionQuery({});
  const [trigger, { data: singleVisionData }] =
    useLazyGetSingleCareerVisionQuery({});

  function handleCareerModal(): void {
    setIsEdit(false);
    setCareerModal(!careerModal);
  }
  function handleNotificationModal(): void {
    setNotificationModal(!notificationModal);
  }

  const handleEditCareerModal = async (id: string): Promise<void> => {
    setIsEdit(true);
    try {
      if (id) {
        await trigger({ id });
      } else {
        null;
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
    setCareerModal(!careerModal);
  };

  return {
    visionData,
    isLoading,
    singleVisionData,
    careerModal,
    notificationModal,
    handleCareerModal,
    handleEditCareerModal,
    handleNotificationModal,
    isEdit,
  };
}
