import {
  useDeleteCareerVisionCommentsMutation,
  useGetCareerVisionCommentsQuery,
  usePostCareerVisionCommentsMutation,
  usePutCareerVisionCommentsMutation,
} from "@services/career/career-vision/career-vision-api";
import { useState, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";

interface ReturnTypes {
  onSubmit: (value: string) => void;
  isOpenDeleteModal: boolean;
  onDeleteModalHandler?: () => void;
  getComments: any;
  inputValue: string | undefined;
  handleOpenModal: (text?: string, id?: string) => void;
  openCustomModal: boolean;
  setIsOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  setOpenCustomModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditSubmit: any;
  handleInputChange: (event: any) => void;
  handleDelete: (data: string) => void;
  isLoading: any;
}

export function useContent({ data }): ReturnTypes {
  const [openCustomModal, setOpenCustomModal] = useState(false);
  const [inputValue, setInputValue] = useState<string | undefined>();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [visionId, setVisionId] = useState<string>();

  const { data: getComments, isLoading } = useGetCareerVisionCommentsQuery({
    id: data._id,
  });
  const [deleteComments] = useDeleteCareerVisionCommentsMutation({});
  const [postComments] = usePostCareerVisionCommentsMutation({});
  const [putComments] = usePutCareerVisionCommentsMutation({});

  const onSubmit = async (value: string): Promise<void> => {
    const payload = { text: value, visionId: data?._id };
    try {
      await postComments({
        payload,
      }).unwrap();
      toast.success("Comment post successful!");
    } catch (error) {
      toast.error(error?.data?.message || "Error While Deleting Comment");
    }
  };

  const handleInputChange = (event: any): void => {
    setInputValue(event.target.value);
  };

  const handleEditSubmit = async (): Promise<void> => {
    try {
      await putComments({
        payload: { text: inputValue },
        id: visionId,
      }).unwrap();
      toast.success("Comment Edited successful!");
    } catch (error) {
      toast.error(error?.data?.message || "Error While Deleting Comment");
    }
    setOpenCustomModal(false);
  };

  const handleOpenModal = (item): void => {
    const { text, _id } = item;
    setInputValue(text);
    setOpenCustomModal(true);
    setVisionId(_id);
  };

  const handleDelete = (id: string): void => {
    setIsOpenDeleteModal(true);
    setVisionId(id);
  };

  const onDeleteModalHandler = async (): Promise<void> => {
    try {
      await deleteComments({
        id: visionId,
      }).unwrap();
      toast.success("Comment deleted successful!");
      setIsOpenDeleteModal(!isOpenDeleteModal);
    } catch (error) {
      toast.error(error?.data?.message || "Error While Deleting Comment");
    }
  };
  return {
    onSubmit,
    isOpenDeleteModal,
    onDeleteModalHandler,
    getComments,
    openCustomModal,
    inputValue,
    handleOpenModal,
    setOpenCustomModal,
    handleEditSubmit,
    handleInputChange,
    isLoading,
    setIsOpenDeleteModal,
    handleDelete,
  };
}
