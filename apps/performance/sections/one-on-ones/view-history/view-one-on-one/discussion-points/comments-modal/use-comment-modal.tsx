import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentsQuery,
  useUpdateCommentMutation,
} from "@services/one-on-ones/one-on-ones-api";
import { useSearchParams } from "next/navigation";
import {
  type ChangeEvent,
  useState,
  type Dispatch,
  type SetStateAction,
  useRef,
  useEffect,
} from "react";
import toast from "react-hot-toast";

interface ReturnTypes {
  comment: string;
  commentValue: string;
  isLoading: boolean;
  allComments: any;
  inputRef: any;
  commentToEdit: string;
  editHandler: (type: string, id: string) => void;
  handleCommentActions: (value: string, type: string) => void;
  setCommentValue: Dispatch<SetStateAction<string>>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isEditAble?: boolean
  ) => void;
  addNewComment: () => void;
  isAddLoading: boolean;
  isUpdatedCommentLoading: boolean;
  isDeleteLoading: boolean;
}

export default function useCommentModal(pointId: string): ReturnTypes {
  const [comment, setComment] = useState<string>("");
  const [commentValue, setCommentValue] = useState<string>("");
  const [commentToEdit, setCommentToEdit] = useState<string>("");

  const inputRef: any = useRef();
  const id = useSearchParams().get("id");
  const meetingId = useSearchParams().get("meetingId");

  const { data: allComments, isLoading } = useGetAllCommentsQuery({ id, meetingId, pointId });
  const [addComment, { isLoading: isAddLoading }] = useAddCommentMutation();
  const [updateComment, { isLoading: isUpdatedCommentLoading }] = useUpdateCommentMutation();
  const [deleteComment, { isLoading: isDeleteLoading }] = useDeleteCommentMutation();

  function handleChange(e: ChangeEvent<HTMLInputElement>, isEditAble: boolean): void {
    if (isEditAble) {
      setComment(e.target.value);
    } else {
      setCommentValue(e.target.value);
    }
  }

  async function handleCommentActions(item: any, type: string): Promise<void> {
    if (type === "Edit") {
      setCommentToEdit(item?._id);
      setComment(item?.text);
    } else {
      try {
        await deleteComment({ id, meetingId, pointId, commentId: item?._id })
          .unwrap()
          .then((data) => {
            if (data) toast.success("Comment Deleted Successfully");
          });
      } catch (err) {
        toast.error(err?.message);
      }
    }
  }

  async function editHandler(type: string, commentId: string): Promise<void> {
    if (type === "Cancel") {
      setCommentToEdit("");
    } else {
      const body = { text: comment };
      try {
        await updateComment({ id, meetingId, pointId, commentId, body })
          .unwrap()
          .then((data) => {
            setCommentToEdit("");
            if (data) toast.success("Comment Updated successfully");
          });
      } catch (err) {
        toast.error(err?.message);
      }
    }
  }

  async function addNewComment(): Promise<void> {
    const body = { text: commentValue };
    try {
      await addComment({ id, meetingId, pointId, body })
        .unwrap()
        .then((data) => {
          setCommentValue("");
          if (data) toast.success("Comment added successfully");
        });
    } catch (err) {
      toast.error(err?.message);
      setCommentValue("");
    }
  }

  useEffect(() => {
    if (commentToEdit) {
      inputRef.current.focus();
    }
  }, [commentToEdit]);

  return {
    comment,
    inputRef,
    isLoading,
    allComments,
    commentValue,
    commentToEdit,
    setCommentValue,
    editHandler,
    handleCommentActions,
    handleChange,
    addNewComment,
    isAddLoading,
    isDeleteLoading,
    isUpdatedCommentLoading
  };
}
