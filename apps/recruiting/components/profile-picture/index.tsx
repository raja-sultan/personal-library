"use client";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Box } from "@mui/material";
import { awsBaseUrl } from "@root/config";
import { styles } from "./style";
import Image from "next/image";
import { cameraIcon } from "@assets/images";

export function ProfilePicture(props: any): JSX.Element {
  const {
    editFormState,
    profilePicture,
    setProfilePicture,
    onProfileImageDelete,
    onSubmitProfileImage,
  } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [img, setImg] = useState<string | undefined>();

  function handleIconClick(event: React.MouseEvent<HTMLElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(): void {
    setAnchorEl(null);
  }

  /* Add Picture */
  function handleUpload(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result as string);
        setImg(reader.result as string);
        const formData = new FormData();
        formData.append("profileImage", file);
        onSubmitProfileImage(formData);
      };
      reader.readAsDataURL(file);
    }
    setAnchorEl(null);
  }

  /* Remove Picture */
  function handleRemove(): void {
    onProfileImageDelete();
    setProfilePicture(null);
    setAnchorEl(null);
  }

  //function to set profile picture if its coming API or not

  function profileImg(): any {
    if (profilePicture === img) {
      return img;
    } else if (profilePicture) {
      return `${awsBaseUrl}${profilePicture}`;
    }
    return "";
  }

  return (
    <>
      <Box sx={styles.mainWrapper}>
        {/* Importing Avatar From Atoms */}
        <Avatar
          sx={styles.avatarStyling}
          alt="User Avatar"
          src={profileImg()}
        />
        {editFormState && (
          <IconButton
            aria-label="Avatar Actions"
            aria-controls="avatar-menu"
            aria-haspopup="true"
            onClick={handleIconClick}
            sx={styles.iconButtonStyling}
          >
            <Image src={cameraIcon} alt="Camera-Icon" />
          </IconButton>
        )}
      </Box>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={styles.menuStyling}
      >
        <MenuItem sx={styles.menuItemStyling}>
          <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
            Upload Picture
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </MenuItem>
        {profilePicture && (
          <MenuItem sx={styles.menuItemStyling} onClick={handleRemove}>
            Remove Picture
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
