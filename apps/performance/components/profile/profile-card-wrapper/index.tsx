"use client";
import { Box, Typography, Card, Button } from "@mui/material";
import type { profileCardWrapperProps } from "./profile-card-wrapper.types";
import { styles } from "../../../sections/profile/profile.styles";
import { CustomChip, TableSkeleton } from "common";
import { useProfileCardWrapper } from "./use-profile-card-wrapper";
import { useRouter } from "next/navigation";
import ReviewPeersModal from "@sections/reviews/review-peers-modal";
import SelectPeersModal from "@sections/reviews/select-peers-modal";

const renderStatusChip = {
  "ACTIVE": "success",
  "ENDED": "danger",
  "Completed": "success",
  "New": "started",
  "In Progress": "warning",
};

export function ProfileCardWrapper({
  icon,
  heading,
  linkComponent,
  tableData,
  isReviewsBtn,
  children,
  isLoading,
}: profileCardWrapperProps): JSX.Element | null {
  const {
    theme,
    setPeersNomination,
    peersNomination,
    setOpenSelectPeers,
    openSelectPeers,
    // setTableId,
    tableId
  } = useProfileCardWrapper();

  const router = useRouter();


  return (
    <>
      <Card sx={styles.cardWrapper(heading, theme)}>
        <Box sx={styles.heading}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Box sx={styles.iconWrapper}>{icon}</Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.neutral[200]
                    : theme.palette.neutral[800],
              }}
            >
              {heading}
            </Typography>
          </Box>
          {linkComponent}
        </Box>
        {isLoading ? <Box sx={styles.skeleton}><TableSkeleton /></Box> : tableData?.map((item) => (
          <Box sx={styles.reviews(theme)} key={item.id}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.neutral[200]
                      : theme.palette.neutral[800],
                }}
              >
                {item?.goalName || item?.name}
              </Typography>
            </Box>
            {isReviewsBtn &&
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.neutral[200]
                        : theme.palette.neutral[800],
                  }}
                >
                  {item?.stage}
                </Typography>
              </Box>
            }
            <Box sx={{ display: "flex", flex: 1 }}>
              <CustomChip
                variant={renderStatusChip[item.status || item?.launchStatus]}
                ChipProps={{ label: item.status || item?.launchStatus }}
              />
            </Box>
            <Box>
              {isReviewsBtn ? (
                <>
                  {item.stage === "Write Review" && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        router.push(`/reviews/perform-reviews?id=${item?._id}&action=${item?.launchStatus}?back=profile`);
                      }}
                    >
                      Perform reviews
                    </Button>
                  )}
                  {item?.stage === "View Result" && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        router.push(`/reviews/perform-reviews?id=${item?._id}&redirectTo=profile`);
                      }}
                    >
                      View reviews
                    </Button>
                  )}
                  {/* {item?.stage === "Peer Selection" &&
                    (() => {
                      switch (true) {
                        case item?.nominated === true:
                          return (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                setPeersNomination(true);
                                setTableId(item?._id);
                              }}
                            >
                              Review peers
                            </Button>
                          );
                        case item?.nominated === false && item?.member > 0:
                          return (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                router.push(`/reviews/perform-reviews?id=${item?._id}`);
                              }}
                            >
                              Perform reviews
                            </Button>

                          );
                          // case item?.nominated === false && item?.member === 0:
                          //   return (
                          //     isTrue && "Peer Selection" ?
                          //       (
                          //         <Button
                          //           variant="outlined"
                          //           size="small"
                          //           onClick={() => {
                          //             setOpenSelectPeers(true);
                          //             setTableId(item?._id);
                          //           }}
                          //         >
                          //           Select peers
                          //         </Button>
                          //       )
                          //       :
                          //       (
                          //         <Button
                          //           disabled
                          //           variant="outlined"
                          //           size="small"
                          //           onClick={() => {
                          //             setOpenSelectPeers(true);
                          //             setTableId(item?._id);
                          //           }}
                          //         >
                          //           Select peers
                          //         </Button>
                          //       )
                          //   );
                          // default:
                          return "";
                      }
                    })()} */}
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.neutral[200]
                        : theme.palette.neutral[800],
                  }}
                >
                  {item?.progress}%
                </Typography>
              )}
            </Box>
          </Box>
        ))}
        {children}
      </Card>

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
