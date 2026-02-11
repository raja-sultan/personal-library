import {
  useGetMyTeamUpdatesQuery,
  useMarkUpdateMutation,
} from "@services/my-team/updates/updates-api";
import { useGetUpdateByIdQuery } from "@services/settings/updates/updates-log/updates-api";
import {
  useAddNewCommentMutation,
  useDeleteCommentMutation,
} from "@services/updates/updates-api";
import toast from "react-hot-toast";
import type{ ReturnType } from "./view-types";


export function useViewSetting({ id }): ReturnType {
  const filterValue = { limit: 1000, offset: 0 };
  const { data, isLoading } = useGetMyTeamUpdatesQuery(filterValue);
  const [addComment] = useAddNewCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const user = data?.data?.updates.filter((item) => item?._id === id);
  const { data: singleUpdate, refetch } = useGetUpdateByIdQuery(
    { id },
    { skip: id === null || id === undefined }
  );

  const [markUpdates] = useMarkUpdateMutation({});

  const handlerMark = async (): Promise<void> => {
    try {
      await markUpdates({ id }).unwrap();
      toast.success("Review Updated");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "something went wrong");
    }
  };

  return {
    singleUpdate,
    user,
    addComment,
    refetch,
    deleteComment,
    isLoading,
    handlerMark,
  };
}
