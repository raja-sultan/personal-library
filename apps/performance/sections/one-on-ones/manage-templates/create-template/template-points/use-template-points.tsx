import { useAddTemplateEventMutation, useDeleteTemplatesEventMutation, useUpdateTemplateEventMutation } from "@services/settings/one-on-ones/templetes-api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ReturnType {
  handleAction: (item: { id?: string, point?: string, action: string }) => void;
  pointsDataArr: Points[];
  openModal: boolean;
  pointId: string | undefined;
  handleToggleModal: () => void;
  pointValue: string | undefined;
  handleAddPoint: () => void;
  handleEditPoint: () => void;
  handleDeletePoint: () => void;
  handleToggleDeleteModal: () => void;
  deleteModal: boolean;
  handlePointChange: (val: string) => void;
}

interface Points {
  id: string | undefined, point: string | undefined
}

export function useTemplatePoints({ pointsData, getPoints, type }): ReturnType {

  const templateId = useSearchParams().get('id');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [pointValue, setPointValue] = useState<string | undefined>('');
  const [pointId, setPointId] = useState<string | undefined>('');
  const [pointsDataArr, setPointsDataArr] = useState<Points[]>(pointsData);

  const [addTemplateEvent] = useAddTemplateEventMutation();

  const [updateTemplateEvent] = useUpdateTemplateEventMutation();
  const [deleteTemplateEvent] = useDeleteTemplatesEventMutation();

  function handleToggleModal(): void {
    setOpenModal(!openModal);
  }

  function handleToggleDeleteModal(): void {
    setDeleteModal(!deleteModal);
  }

  function handlePointChange(val: string): void {
    setPointValue(val);
  }

  function handleAction(item: { id?: string, point?: string, action: string }): void {
    switch (item.action) {
      case 'edit':
        setPointId(item.id);
        setPointValue(item.point);
        handleToggleModal();
        break;
      case 'delete':
        setPointId(item.id);
        handleToggleDeleteModal();
        break;
      case 'add':
        setPointId('');
        setPointValue('');
        handleToggleModal();
        break;
      default:
        break;
    }
  }

  function handleAddPoint(): void {
    if (templateId) {
      void addPointWithAPi()
    }
    else {
      setPointsDataArr([...pointsDataArr, {
        id: (pointsDataArr.length + 1).toString(),
        point: pointValue
      }]);
    }
    handleToggleModal();
  }

  function handleUpdatePoint(id: string): void {
    const updatedPoints = pointsDataArr.map((obj: { id: string, point: string }) =>
      obj.id === id ? { ...obj, point: pointValue } : obj
    );
    setPointsDataArr(updatedPoints);
    handleToggleModal();
  }

  async function updatePointWithAPi(): Promise<void> {
    try {
      await updateTemplateEvent({ id: pointId, text: pointValue }).unwrap().then((_) => {
        handleToggleModal();
      });
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }
  async function addPointWithAPi(): Promise<void> {
    try {
      await addTemplateEvent({ text: pointValue, templateId, type }).unwrap().then((_) => {
        handleToggleModal();
      });
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  function handleEditPoint(): void {
    if (templateId && pointId) {
      void updatePointWithAPi();
    }
    if (pointId) {
      handleUpdatePoint(pointId)
    }
  }

  async function deleteEventWithApi(): Promise<void> {
    await deleteTemplateEvent({ id: pointId }).unwrap().then((_) => {
      handleToggleDeleteModal();
    })
  }

  function handleDeletePoint(): void {
    if (templateId && pointId) {
      void deleteEventWithApi();
    }
    if (pointId) {
      setPointsDataArr(pointsDataArr.filter((p) => p.id !== pointId));
      handleToggleDeleteModal();
    }
  }

  useEffect(() => {
    getPoints(pointsDataArr)
  }, [pointsDataArr])

  useEffect(() => {
    if (pointsData) setPointsDataArr(pointsData)
  }, [pointsData])


  return {
    handleAction,
    pointsDataArr,
    openModal,
    pointId,
    handleToggleModal,
    pointValue,
    handleAddPoint,
    handleEditPoint,
    handleDeletePoint,
    handleToggleDeleteModal,
    deleteModal,
    handlePointChange
  }
}