import { useDeclineFeedbackMutation, useDeleteFeedbackMutation, useGetFeedbackListQuery, useGiveFeedbackReactionMutation } from "@services/feedbacks/feedbacks.api";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface ReturnType {
  handleTabChange: (value: number) => void;
  tabArr: string[];
  feedbackList: string[];
  handleFeedbackChange: (val: string) => void;
  feedBackData: {
    feedbacks: any,
    isLoading: boolean, isFetching: boolean, isSuccess: boolean,
    meta: {
      pages: number,
      page: number,
    }
  };
  onPageChange: (val: number) => void;
  handleEmojiClick: (id: string, reactions: string) => void,
  handleFeedbackDelete: (id: string) => void,
  handleFeedbackDecline: (id: string) => void,
  handleDateRangeChange: (val: string) => void,
  filters: Filters
}

interface Filters {
  limit: number,
  offset: number,
  feedbackListingType: any,
  dateRange?: string;
  memberId?: string | null;
}

export function useFeedback({filterByTeam, tabArray, backPath }): ReturnType {
  const router = useRouter();

  const tabArr = tabArray ?? ['All', 'Received', 'Given', 'Pending'];
  const feedbackList = ['Give Feedback', 'Request Feedback', 'Private Note'];

  const memberId = useSearchParams().get("id");

  const filterValues = { limit: 8, offset: 0, filterByTeam : filterByTeam , feedbackListingType: 'All', ...(memberId && { memberId }) };
  const [filters, setFilters] = useState<Filters>(filterValues);

  const { data: getFeedbackAllData, isLoading, isFetching, isSuccess } = useGetFeedbackListQuery(filters);
  const feedbacks = getFeedbackAllData?.data?.feedbacks;

  const [giveFeedbackReactionMutation] = useGiveFeedbackReactionMutation();
  const [deleteFeedbackMutation] = useDeleteFeedbackMutation();
  const [declineFeedbackMutation] = useDeclineFeedbackMutation();

  const feedBackData = {
    feedbacks,
    isLoading, isFetching, isSuccess,
    meta: {
      pages: getFeedbackAllData?.data?.meta?.pages,
      page: getFeedbackAllData?.data?.meta?.page,
    }
  }

  function handleTabChange(value: number = 0): void {
    setFilters({ ...filters, feedbackListingType: tabArr[value]?.toString() })
  }

  function handleFeedbackChange(value: string): void {
    router.push(`/feedback/add-feedback?tab=${feedbackList.indexOf(value)}${backPath ? `&backPath=${backPath}` : ''}`);
  }
  function handleDateRangeChange(value: string): void {
    setFilters({ ...filterValues, dateRange: value })
  }

  function onPageChange(offset: number): void {
    setFilters({ ...filters, offset: (offset - 1) * 8 });
  }

  const handleEmojiClick = (id: string, reactions: string): void => {
    giveFeedbackReactionMutation({
      id,
      reactions,
    })
      .unwrap()
      .then(() => {
        toast.success("Reaction updated successfully!");
        // setShowEmojiCard(false);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const handleFeedbackDelete = (id: string): void => {
    deleteFeedbackMutation({
      id,
    })
      .unwrap()
      .then(() => {
        toast.success("Feedback deleted successfully!");
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const handleFeedbackDecline = (id: string): void => {
    declineFeedbackMutation({
      id,
    })
      .unwrap()
      .then(() => {
        toast.success("Feedback declined successfully!");
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  return {
    filters,
    feedBackData,
    handleTabChange,
    tabArr,
    feedbackList,
    handleFeedbackChange,
    onPageChange,
    handleEmojiClick,
    handleFeedbackDelete,
    handleFeedbackDecline,
    handleDateRangeChange,
  };
}
