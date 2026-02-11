import type { SxProps } from "@mui/material";
import { Avatar } from "@mui/material";
import { awsBaseUrl } from "@root/config";
import React from "react";

interface GlobalAvatarProps {
  imgUrl: string;
  firstName: string;
  lastName: string;
  width?: number | string;
  height?: number | string;
  avatarBg?: string;
  sx?: SxProps;
}

export function GlobalAvatar({
  imgUrl,
  firstName,
  lastName,
  width = "32px",
  height = "32px",
  // Color should be used without #
  avatarBg = "F2F4F7",
  sx,
}: GlobalAvatarProps): JSX.Element {
  return (
    <Avatar
      sx={{ width, height, objectFit: "cover", ...sx }}
      src={
        imgUrl
          ? awsBaseUrl + imgUrl
          : `https://ui-avatars.com/api/?rounded=true&name=${firstName}+${lastName}&font-size=0.4&background=${avatarBg}&color=344054&bold=true`
      }
    >
      {firstName?.charAt(0)} {lastName?.charAt(0)}
    </Avatar>
  );
}
