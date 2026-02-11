"use client";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { useReviews } from "@sections/reviews/use-reviews";
import ReviewPeersModal from "@sections/reviews/review-peers-modal";
import SelectPeersModal from "@sections/reviews/select-peers-modal";

export function ReviewsSection(): JSX.Element {
  const {
    getReviewCycle,
    columns,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    openSelectPeers,
    setOpenSelectPeers,
    peersNomination,
    setPeersNomination,
    tableId,
    onPageChange,
  } = useReviews();

  return (
    <>
      <CustomTableWithHeader
        primaryHeader
        primaryHeaderProps={{
          title: "Reviews",
          description:
            "The review cycle enables feedback and improvement in work life.",
        }}
        tableProps={{
          // data: getReviewCycle?.data,
          // columns,
          // isLoading,
          // isFetching,
          // isError,
          // isPagination: true,
          // onPageChange,
          // totalPages: getReviewCycle?.data?.meta?.pages,
          // currentPage: getReviewCycle?.data?.meta?.page,
          // isSuccess,

          data:  getReviewCycle?.data?.reviewCycle,
          columns,
          isError, isLoading, isSuccess, isFetching,
          isPagination: true,
          onPageChange,
          totalPages: getReviewCycle?.data?.meta?.pages,
          currentPage: getReviewCycle?.data?.meta?.page,
        }}
      />
      {openSelectPeers && <SelectPeersModal
        open={openSelectPeers}
        setOpen={setOpenSelectPeers}
        tableId={tableId}
      />}
      {peersNomination && <ReviewPeersModal
        open={peersNomination}
        setOpen={setPeersNomination}
        tableId={tableId}
      />}
    </>
  );
}
