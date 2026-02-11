import {
  useDeleteCareerVisionCommentsMutation,
  useGetCareerVisionCommentsQuery,
  usePostCareerVisionCommentsMutation,
} from "@services/career/career-vision/career-vision-api";
import { useState, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";

interface ReturnTypes {
  onSubmit: (value: string) => void;
  isOpenDeleteModal: boolean;
  onDeleteModalHandler?: () => void;
  careerVisionComments: any;
  inputValue: string | undefined;
  handleOpenModal: (text?: string) => void;
  openCustomModal: boolean;
  setIsOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  setOpenCustomModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditSubmit: any;
  handleInputChange: (event: any) => void;
  isLoading: any;
} 

export function useCostumContent({ data }): ReturnTypes {
  const [openCustomModal, setOpenCustomModal] = useState(false);
  const [inputValue, setInputValue] = useState<string | undefined>();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
 
  const { data: careerVisionComments, isLoading } =
    useGetCareerVisionCommentsQuery({
      id: data._id,
    });

  const [deleteComments] = useDeleteCareerVisionCommentsMutation({});
  const [postComments] = usePostCareerVisionCommentsMutation({});

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

  const handleEditSubmit = (): any => {};

  const handleOpenModal = (text?: string): void => {
    setInputValue(text);
    setOpenCustomModal(true);
  };

  const onDeleteModalHandler = async (): Promise<void> => {
    try {
      await deleteComments({
        id: careerVisionComments?.data[0]?._id,
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
    setIsOpenDeleteModal,
    onDeleteModalHandler,
    careerVisionComments,
    openCustomModal,
    inputValue,
    handleOpenModal,
    setOpenCustomModal,
    handleEditSubmit,
    handleInputChange,
    isLoading,
  };
}
