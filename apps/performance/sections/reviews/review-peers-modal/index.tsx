import { Button, Typography, Stack, Avatar } from "@mui/material";
import CustomModal from "@components/custom-modal";
import { styles } from "@sections/reviews/review-peers-modal/review-peers-style";
import useReviewPeersModal from "@sections/reviews/review-peers-modal/use-review-peers-modal";
import { CustomChip } from "common";

export default function ReviewPeersModal(props): React.JSX.Element {
  const { open, setOpen, tableId } = props;
  const { nominateUser, HandlerApproved, HandlerReject, loginUser } = useReviewPeersModal({
    tableId,
  });
  const userName = `${nominateUser?.data[0]?.nominatedBy?.firstName} ${nominateUser?.data[0]?.nominatedBy?.lastName}  `;


  const renderButton = (
    reviewCycleId: string,
    _id: string,
    peerStatus: string | boolean
  ): JSX.Element | null => {
    switch (peerStatus) {
      case "pending":
        return (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            alignItems="center"
          >
            {nominateUser?.data[0]?.nominatedBy?.managerId === loginUser?.data?._id  || nominateUser?.data[0]?.nominatedBy?.managerId === null ?

              (
                <>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => {
                      HandlerReject(reviewCycleId, _id);
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      HandlerApproved(reviewCycleId, _id);
                    }}
                  >
                    Approve
                  </Button>
                </>
              )

              :

              (
                <>
                  <Button
                    disabled
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => {
                      HandlerReject(reviewCycleId, _id);
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                  disabled
                    variant="contained"
                    size="small"
                    onClick={() => {
                      HandlerApproved(reviewCycleId, _id);
                    }}
                  >
                    Approve
                  </Button>
                </>
              )


            }
          </Stack>
        )
      case "approve":
        return (
          <CustomChip variant="success" ChipProps={{ label: "Approved" }} />
        );
      case "reject":
        return (
          <CustomChip variant="danger" ChipProps={{ label: "Rejected" }} />
        );
      default: return null

    }
  };
  return (
    <CustomModal
      // maxWidth="lg"
      headerIcon=""
      message={false}
      open={open}
      onClose={() => {
        setOpen(!open);
      }}
      title="Peers Nomination"
      hideFooter
    >
      <Stack spacing={3}>
        {nominateUser?.data?.map((item) => {
          return (
            <Stack key={item._id}>
              <Stack spacing={2}>
                <Typography>
                  { }
                  Nominated by {userName}
                </Typography>

                {item?.user?.map((user) => {
                  return (
                    <Stack
                      key={user._id}
                      direction="row"
                      spacing={2}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Avatar
                          src={"@assets/common/person.png"}
                          sx={styles.avatarStyle}
                        />
                        <Typography variant="body2">
                          {user?.users?.firstName} {user?.users?.lastName}
                        </Typography>
                        {/* <CustomChip
                    variant={renderNominatioChip[item?.nominationStatus]}
                    ChipProps={{ label: item?.nominationStatus }}
                  /> */}
                      </Stack>
                      {renderButton(
                        item?.reviewCycleId,
                        user?.users?._id,
                        user?.peerStatus
                      )}
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </CustomModal>
  );
}
