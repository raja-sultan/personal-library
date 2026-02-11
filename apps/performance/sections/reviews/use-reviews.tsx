// import { Typography } from "@mui/material";
import { useGetUserReviewQuery } from "@services/user-review/user-review-api";
import { CustomChip } from "common";
import type { Columns } from "./reviews-type";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { styles } from "./reviews-style";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";
import { useGetReviewCyclesQuery } from "@services/settings/review/review-cycle-api";
import { useGetProfileQuery } from "@services/profile/profile-api";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.REVIEWS.REVIEWS;


interface ReturnType {
  getReviewCycle?: any;
  tableId: any;
  columns: Columns[];
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  openSelectPeers: boolean;
  setOpenSelectPeers: any;
  peersNomination: boolean;
  setPeersNomination: any;
  onPageChange: any;
}

const renderStatusChip = {
  draft: "primary",
  ACTIVE: "success",
  ENDED: "started",
};


export function useReviews(): ReturnType {
  const [peersNomination, setPeersNomination] = useState(false);
  const [openSelectPeers, setOpenSelectPeers] = useState(false);
  const [tableId, setTableId] = useState();
  const [offset, setOffset] = useState<number>(0);

  const {
    data: getReviewCycle,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetUserReviewQuery({
    limit: 10,
    offset,
  });
  const { data: loggedInUserData } = useGetProfileQuery({});
const {data: getReviewCycleData } = useGetReviewCyclesQuery({ limit: 10,
  offset,})


  const reviewCycleCreatedBy = getReviewCycleData?.data?.Reviews?.map(reviewItem => reviewItem?.createdBy)
  const checkStatus = getReviewCycle?.data?.reviewCycle?.map(item => item?.launchStatus)
  const router = useRouter();
  function onPageChange(value: number): void {
    setOffset((value - 1) * 10);
  }

  const { data: reviewCyclesData } = useGetReviewCyclesQuery({ limit: 10000, offset: 0 });

  const peerReview = reviewCyclesData?.data?.Reviews?.map((data) => data?.peerReview)
  const usersReviewCount = reviewCyclesData?.data?.Reviews?.map((data) => data?.users_review_count)

  const shallToView = (userId)=> {
    if (reviewCycleCreatedBy === userId && checkStatus === "Active") {
      return false;
    } else {
      return true;
    }
  
  }
  // return (reviewCycleCreatedBy === userId && status === "Active") ? false : true;
  

  const columns: Columns[] = [
    {
      accessorFn: (row) => row?.name,
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <span>Cycle Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.stage,
      id: "stage",
      cell: ({ getValue }) => getValue(),
      header: () => <>Stage</>,

      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row?.launchStatus,
      id: "launchStatus",
      cell: ({ row: { original } }) => (
        <CustomChip
          variant={renderStatusChip[original?.launchStatus]}
          ChipProps={{ label: original?.launchStatus }}
        />
      ),
      header: () => <>status</>,
      isSortable: false,

    },
    {
      accessorFn: (row) => row?.stage,
      id: "stage",
      cell: ({ row }) => {
        const stage = row.original?.stage;
        const nominated = row.original?.nominated;
        const member = row.original?.member;
        // const isTrue = row?.original?.reviewees?.some((reviews) => reviews === user?.data?._id)
        return (
          <>
            {stage === "Write Review" && (
              <PermissionProtected permission={PERMISSION.PERFORM}>
                <Button
                  sx={styles.reviewsActionBtn}
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    router.push(
                      `/reviews/perform-reviews?id=${row?.original?._id}&action={row?.original.launchStatus}`
                    );
                  }}
                >
                  Perform reviews
                </Button>
              </PermissionProtected>
            )}
            {stage === "View Result" && shallToView(loggedInUserData?.data?._id) &&(
              <PermissionProtected permission={PERMISSION.VIEW}>
                <Button
                  sx={styles.reviewsActionBtn}
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    router.push(
                      `/reviews/perform-reviews?id=${row?.original?._id}`
                    );
                  }}
                >
                  View reviews
                </Button>
              </PermissionProtected>
            )}
            {stage === "Peer Selection" &&
              (() => {
                switch (true) {
                  case nominated === true:
                    return (
                      <Button
                        sx={styles.reviewsActionBtn}
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setPeersNomination(true);
                          setTableId(row?.original?._id);
                        }}
                      >
                        Review peers
                      </Button>
                    );
                  case nominated === false && member > 0:
                    return (
                      <PermissionProtected permission={PERMISSION.PERFORM}>
                        <Button
                          sx={styles.reviewsActionBtn}
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            router.push(
                              `/reviews/perform-reviews?id=${row?.original?._id}`
                            );
                          }}
                        >
                          Perform reviews
                        </Button>
                      </PermissionProtected>
                    );
                  case nominated === false && member === 0:
                    return (

                      // isTrue && "Peer Selection" ?
                      //   (

                      <PermissionProtected permission={PERMISSION.ENABLE_PEER_REVIEW}>
                        {peerReview === 'true' && usersReviewCount > 0 ?
                          (
                            <Button
                              sx={styles.reviewsActionBtn}
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                setOpenSelectPeers(true);
                                setTableId(row?.original?._id);
                              }}
                            >
                              Edit Select peers
                            </Button>
                          )
                          :
                          (
                            <Button
                              sx={styles.reviewsActionBtn}
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                setOpenSelectPeers(true);
                                setTableId(row?.original?._id);
                              }}
                            >
                              Select peers
                            </Button>
                          )
                        }
                      </PermissionProtected>
                    );
                  default:
                    return "";
                }
              })()}
          </>
        );
      },
      header: () => <div />,
      isSortable: false,
    },
  ];

  return {
    tableId,
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
    onPageChange,
  };
}
