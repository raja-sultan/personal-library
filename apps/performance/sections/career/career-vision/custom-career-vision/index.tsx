"use client";

import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { GlobalAvatar } from "@components/global-avatar";
import { TableIconActions } from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { useState } from "react";
import { ThemeModeColor } from "@root/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "@root/store";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";
const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.CAREER_OR_GROWTH.CAREER_VISION;


dayjs.extend(relativeTime);

interface CustomCareerVisionTypes {
  title: string;
  description: string;
  handlePost: (value: string) => void;
}

export function CustomCareerVision({
  title,
  description,
  handlePost,
}: CustomCareerVisionTypes): JSX.Element {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = ({ target }): void => {
    const { value } = target;
    setInputValue(value);
  };
  const onSubmit = (): void => {
    handlePost(inputValue);
    setInputValue("");
  };
  return (
    <Box sx={{ marginTop: "0px !important" }}>
      <Typography
        mb={1.4}
        variant="h5"
        fontWeight="600"
        color="text.primary"
        textTransform="capitalize"
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        textTransform="capitalize"
      >
        {description}
      </Typography>
      <Typography
        mt={4.4}
        mb={2}
        variant="h6"
        fontWeight="600"
        color="text.primary"
        textTransform="capitalize"
      >
        Response
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <TextField
          size="small"
          fullWidth
          onChange={handleInputChange}
          value={inputValue}
          placeholder="write a response..."
        />
        <PermissionProtected permission={PERMISSION.ADD_RESPONSE}>
          <Button
            variant="contained"
            disabled={!inputValue}
            sx={{ padding: "11px 22px" }}
            onClick={onSubmit}
          >
            Post
          </Button>
        </PermissionProtected>
      </Box>
    </Box>
  );
}

interface UserInfoWithActionProps {
  profileImage?: string;
  handleEdit: (text: string) => void;
  handleDelete: (text: string) => void;
  data?: any;
  isShownAction?: boolean;
}

export function RenderUserInfoWithAction(
  props: UserInfoWithActionProps
): JSX.Element {
  const { handleEdit, handleDelete, data } = props;
  const userId = useSelector((state: any) => state?.auth?.user?._id);
  return (
    <>
      {data?.data
        ?.map((item: any) => (
          <Box
            mt={2.6}
            p={2.4}
            sx={{
              borderRadius: "8px",
              background: ThemeModeColor("#FAFAFF", "#1D2939"),
            }}
            key={item}
          >
            <Box
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              <Box
                gap="1.5rem"
                display="flex"
                alignItems="center"
                flexWrap="wrap"
              >
                <GlobalAvatar
                  width="48px"
                  height="48px"
                  imgUrl={item.user?.profileImage}
                  firstName={item?.user?.firstName}
                  lastName={item?.user?.lastName}
                />
                <Typography
                  marginLeft="0.8rem"
                  variant="body2"
                  fontWeight="600"
                  color="text.primary"
                >
                  {item?.user?.firstName} {item?.user?.lastName}
                </Typography>
                <Typography
                  marginLeft="0.8rem"
                  variant="caption"
                  fontWeight="600"
                  color="text.secondary"
                >
                  {dayjs().to(dayjs(item?.createdAt))}
                </Typography>
              </Box>
              {item?.userId === userId && (
                <Box textAlign="end" justifyContent="flex-end">
                  <TableIconActions icon={<TableActionsIcon />}>
                    <MenuItem
                      onClick={() => {
                        handleEdit(item);
                      }}
                    >
                      Edit
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleDelete(item?._id);
                      }}
                    >
                      Delete
                    </MenuItem>
                  </TableIconActions>
                </Box>
              )}
            </Box>
            <Typography
              mt={1.6}
              variant="subtitle2"
              fontWeight="400"
              color="text.secondary"
              textAlign="start"
            >
              {item?.text}
            </Typography>
          </Box>
        ))
        .reverse()}
    </>
  );
}
