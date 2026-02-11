import { MessageIcon } from "@assets/icons/message-icon";
import { TrashIcon } from "@assets/icons/trash-icon";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { ThemeModeColor } from "@root/utils";
import { CommentsModal } from "./comments-modal";
import { useState } from "react";
import { AddDiscussionModal } from "./add-discussion-modal";
import { renderUserImage } from "@root/utils/render-user-image";
import { LockOutlinedIcon } from "@assets/icons/lock-outlined-icon";
import dayjs, { extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { CustomPopover } from "@components/custom-popover";
// import { LoadingButton } from "@mui/lab";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE._1_ON_1S._1_ON_1S

interface User {
  userId?: string;
  profileImage?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
}
extend(relativeTime);
interface Points {
  _id: string;
  title: string;
  addedBy: string;
  date: string;
  checked: boolean;
  currentUser?: User;
  assigneeId?: string;
  users?: User[];
  firstName?: string;
  lastName?: string;
}
interface Props {
  title: string;
  data: Points[];
  btnTitle?: string;
  lockIcon?: boolean;
  hideBtn?: boolean;
  handleAddNewPoint?: (val: string) => void;
  handleDeletePoint?: (id: string) => void;
  handleCheckboxChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  handleAssignActionItem?: (assigneeId: string, id: string) => void;
  currentUser: User;
  actionType?: boolean;
  disabled?: boolean;
  placeholder?: string;
  heading?: string
  isAddPointLoading: boolean;
}

export function DiscussionPoints({
  placeholder,
  heading,
  title,
  btnTitle,
  data,
  lockIcon,
  hideBtn,
  handleAddNewPoint,
  currentUser,
  handleDeletePoint = () => { },
  handleCheckboxChange = () => { },
  handleAssignActionItem = () => { },
  disabled,
  actionType,
  isAddPointLoading
}: Props): JSX.Element {
  const [commentsModal, setCommentsModal] = useState<boolean>(false);
  const [pointId, setPointId] = useState<string | null>(null);
  const [showDiscussionPointModal, setShowDiscussionPointModal] =
    useState<boolean>(false);

  function handleToggleCommentModal(): void {
    setCommentsModal(!commentsModal);
  }
  function handleTogglePointModal(): void {
    setShowDiscussionPointModal(!showDiscussionPointModal);
  }

  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <Grid container spacing={2} mt={2}>
        <Box px={2} sx={styles.scrollWrapper}>
          {data?.length > 0 ? (
            data?.map((obj) => (
              <Grid item xs={12} mb={2} key={obj?._id}>
                <PointComponent
                  title={obj?.title}
                  addedBy={obj?.addedBy}
                  date={obj?.date}
                  users={obj?.users ?? []}
                  lockIcon={lockIcon}
                  checked={obj?.checked}
                  assigneeId={obj?.assigneeId}
                  currentUser={obj?.currentUser}
                  handleCheckboxChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    handleCheckboxChange(event, obj?._id);
                  }}
                  handleAssignActionItem={(assigneeId: string) => {
                    handleAssignActionItem(assigneeId, obj?._id);
                  }}
                  handleMessageClick={() => {
                    handleToggleCommentModal();
                    setPointId(obj?._id);
                  }}
                  handleDeletePoint={() => {
                    handleDeletePoint(obj?._id);
                  }}
                  actionType={actionType}
                  disabled={disabled}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                sx={styles.noData}
              >
                <FormatListBulletedIcon sx={styles.icon} />
                <Typography variant="subtitle2" color="text.secondary" mt={1}>
                  There is no item for this 1-on-1 Agenda
                </Typography>
              </Box>
            </Grid>
          )}
        </Box>
        <Grid item xs={12}>
          {!hideBtn && !actionType && (
            <Button
              sx={{ float: "right" }}
              variant="contained"
              onClick={handleTogglePointModal}
              disabled={disabled}
            >
              {btnTitle}
            </Button>
          )}
        </Grid>
      </Grid>

      {commentsModal && (
        <CommentsModal
          heading={heading}
          pointId={pointId}
          onOpen={commentsModal}
          onClose={handleToggleCommentModal}
          currentUser={currentUser}
        />
      )}
      {showDiscussionPointModal && (
        <AddDiscussionModal
          isLoading={isAddPointLoading}
          placeholder={placeholder}
          title={btnTitle}
          onOpen={showDiscussionPointModal}
          onClose={handleTogglePointModal}
          handleAddNewPoint={handleAddNewPoint}
        />
      )}
    </>
  );
}

function PointComponent({
  title,
  users,
  addedBy,
  date,
  handleCheckboxChange,
  handleMessageClick,
  lockIcon,
  checked,
  handleDeletePoint,
  handleAssignActionItem,
  currentUser,
  assigneeId,
  actionType,
  disabled,
}): JSX.Element {
  const assign = assigneeId
    ? users?.find((user: { userId: string }) => user?.userId === assigneeId)
      ?.fullName
    : addedBy;

  return (
    <Card sx={styles.cardWrapper}>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          pointerEvents: actionType || disabled ? "none" : "auto",
          opacity: actionType || disabled ? "0.5" : "1",
        }}
      >
        <Stack flex={1}>
          <Box display="flex" alignItems="center" gap="6px">
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
              disabled={disabled}
            />
            {users?.length > 0 && (
              <CustomPopover
                iconButton
                customIcon={renderUserImage({
                  profileImage: currentUser?.profileImage,
                  firstName: currentUser?.firstName,
                  lastName: currentUser?.lastName,
                })}
                customComponent={users?.map(
                  (user: {
                    userId: string;
                    profileImage: string;
                    firstName: string;
                    lastName: string;
                  }) => (
                    <MenuItem
                      key={user?.userId}
                      onClick={() => {
                        handleAssignActionItem(user?.userId);
                      }}
                    >
                      <Box display="flex" alignItems="center" gap="10px">
                        {renderUserImage({
                          profileImage: user?.profileImage,
                          firstName: user?.firstName,
                          lastName: user?.lastName,
                        })}
                        <Typography variant="subtitle1" fontWeight={500}>
                          Assign to {user?.firstName} {user?.lastName}
                        </Typography>
                      </Box>
                    </MenuItem>
                  )
                )}
              />
            )}
            <Typography variant="body2">{title}</Typography>
          </Box>
          {users?.length > 0 ? (
            <>
              <Typography
                ml="34px"
                fontWeight={600}
                color="text.secondary"
                variant="caption"
              >
                Added {dayjs(date)?.fromNow()}
              </Typography>
              <Typography ml="34px" color="text.secondary" variant="caption">
                Assigned to {assign}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                ml="34px"
                fontWeight={600}
                color="text.secondary"
                variant="caption"
              >
                Added by {addedBy}
              </Typography>
              <Typography
                ml="34px"
                fontWeight={500}
                color="text.secondary"
                variant="caption"
              >
                {dayjs(date)?.fromNow()}
              </Typography>
            </>
          )}
        </Stack>
        {!actionType && (
          <Box display="flex" alignItems="center">
            <PermissionProtected permission={PERMISSION.CREATE} disabled>
              <IconButton onClick={handleMessageClick} disabled={disabled}>
                <MessageIcon />
              </IconButton>
            </PermissionProtected>
            {lockIcon && (
              <IconButton>
                <LockOutlinedIcon />
              </IconButton>
            )}
            <PermissionProtected permission={PERMISSION.DELETE} disabled>
              <IconButton onClick={handleDeletePoint} disabled={disabled}>
                <TrashIcon />
              </IconButton>
            </PermissionProtected>
          </Box>
        )}
      </Box>
    </Card>
  );
}

const styles = {
  scrollWrapper: ({ palette: { neutral } }) => ({
    width: "100%",
    maxHeight: "450px",
    overflowY: "auto",
    paddingRight: "0px",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: neutral[300],
      borderRadius: "10px",
    },
  }),
  cardWrapper: ({ palette: { neutral } }) => ({
    p: "2.4rem",
    boxShadow: `0px 0px 4px 0px ${neutral[900]}`,
    backgroundColor: ThemeModeColor(neutral[100], "transparent"),
  }),
  noData: ({ palette: { neutral } }) => ({
    background: ThemeModeColor(neutral[100], "transparent"),
    borderRadius: "8px",
    py: "2.4rem",
    border: `1px solid ${neutral[100]}`,
  }),
  icon: ({ palette }) => ({ color: palette.neutral[400], fontSize: "4rem" }),
};
