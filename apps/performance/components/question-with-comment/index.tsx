"use client";
import React, { useState } from "react";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { alpha, Box, Button, Divider, MenuItem, TextField, Typography } from "@mui/material";
import { TableIconActions } from "@root/../../packages/common";
import { renderUserImage } from "@root/utils/render-user-image";
import EmojiList from "@components/emoji-reactions/emoji-list";
import { ThemeModeColor } from "@root/utils";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

interface Comment {
  _commentId: string;
  userInfo: {
    userId: string;
    profileImage: string;
    fullName: string;
  };
  time: string;
  comment: React.ReactNode;
}
interface Props {
  _id: string;
  srNo?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  hideDivider?: boolean;
  comments?: Comment[];
  removePadding?: boolean;
  handlePost: ({ _id, newComment }: { _id: string; newComment: string }) => void;
  handleDeleteComment: ({ _id, _commentId }: { _id: string; _commentId: string }) => void;
  requireReactionComponent?: boolean;
  hideComments?: boolean;
  handleReaction?: ({ _id, title }: { _id: string; title: string }) => void;
}

export function QuestionWithComment({
  _id,
  title,
  srNo,
  comments,
  description,
  hideDivider,
  removePadding,
  hideComments,
  requireReactionComponent,
  handlePost,
  handleDeleteComment,
  handleReaction = () => { },
}: Props): JSX.Element {
  const [newComment, setNewComment] = useState("");
  const [emoji, setEmoji] = useState("");

  function handleAddPost(): void {
    handlePost({ _id, newComment });
    setNewComment("");
  }

  function handleEmojiChange(value: string): void {
    setEmoji(value);
    handleReaction({ _id, title: value });
  }

  const maxWidth = { md: "500px", xs: "100%" };

  const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.UPDATES.UPDATES

  return (
    <Box sx={{ pl: { md: !removePadding ? "25px" : "0", xs: 0 } }}>
      <Box display="flex" gap="20px">
        {srNo && (
          <Typography variant="subtitle1" fontWeight={600}>
            {srNo}
          </Typography>
        )}
        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight={600} mb="16px">
            {title}
          </Typography>
          {description && (
            <Typography variant="subtitle1" fontWeight={400} color="neutral.500" mb="24px">
              {description}
            </Typography>
          )}

          <Box sx={{ "& .comment_wrapper:last-child": { mb: 0 } }}>
            {!hideComments &&
              comments?.map(({ _commentId, comment, time, userInfo }) => {
                const [firstName, lastName] = userInfo.fullName.split(" ");
                return (
                  <Box mb="24px" className="comment_wrapper" key={_commentId}>
                    <Box
                      p="14px"
                      mb="24px"
                      sx={({ palette: { primary, neutral } }) => ({
                        background: ThemeModeColor(
                          alpha(`${primary.lightest}`, 0.5),
                          "transparent"
                        ),
                        borderRadius: "8px",
                        maxWidth,
                        border: `1px solid ${ThemeModeColor("transparent", neutral[100])}`,
                      })}
                    >
                      <Box
                        display="flex"
                        alignItems="flex-start"
                        gap="16px"
                        mb="12px"
                        justifyContent="space-between"
                      >
                        <Box display="flex" alignItems="center" gap="16px" flexWrap="wrap">
                          {renderUserImage({
                            profileImage: userInfo?.profileImage,
                            firstName: firstName ?? "-",
                            lastName: lastName ?? "-",
                            height: 40,
                            width: 40,
                          })}
                          <Box display="flex" alignItems="center" gap="12px" flexWrap="wrap">
                            <Typography variant="subtitle1" fontWeight={700}>
                              {userInfo?.fullName}
                            </Typography>
                            <Typography
                              variant="caption"
                              fontWeight={600}
                              color="neutral.500"
                              mb="-3px"
                            >
                              {time}
                            </Typography>
                          </Box>
                        </Box>
                        <TableIconActions icon={<TableActionsIcon />}>
                          <PermissionProtected permission={PERMISSION.UPDATE_COMMENT}>
                            <MenuItem
                              onClick={() => {
                                handleDeleteComment({ _id, _commentId });
                              }}
                            >
                              Delete
                            </MenuItem>
                          </PermissionProtected>
                        </TableIconActions>
                      </Box>
                      <Typography variant="subtitle2" color="neutral.500">
                        {comment}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            {requireReactionComponent && (
              <EmojiList
                key="emoji"
                onEmojiClick={handleEmojiChange}
                selectedEmoji={emoji}
                rootSx={{
                  mb: "24px",
                  maxWidth,
                  flexWrap: "wrap",
                }}
              />
            )}
            {!hideComments && (
              <PermissionProtected permission={PERMISSION.ADD_COMMENT}>
                <Box display="flex" alignItems="center" gap="16px" sx={{ maxWidth }}>
                  <TextField
                    id={_id}
                    size="small"
                    variant="outlined"
                    sx={{ flex: 1 }}
                    placeholder="Add Comment"
                    value={newComment}
                    onChange={({ target }) => {
                      setNewComment(target.value);
                    }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ height: "36px" }}
                    disabled={!newComment}
                    onClick={handleAddPost}
                  >
                    Post
                  </Button>
                </Box>
              </PermissionProtected>
            )}
          </Box>
        </Box>
      </Box>
      {!hideDivider && (
        <Box my={hideComments ? "20px" : "42px"} maxWidth="1400px">
          <Divider />
        </Box>
      )}
    </Box>
  );
}
