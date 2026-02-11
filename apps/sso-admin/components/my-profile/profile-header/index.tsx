import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Typography,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
} from "@mui/material";
import { styles } from "./style";
import { ProfilePicture } from "@components/profile-picture";
import { cameraIcon, coverImage as bg } from "@assets/images";
import Image from "next/image";
import {
  useDeleteCoverImageByIdMutation,
  useDeleteProfileImageMutation,
  usePutCoverImageMutation,
  usePutProfileImageMutation,
} from "@services/my-profile/my-profile-api";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { awsBaseUrl } from "@root/config";

export function ProfileHeader(props: any): JSX.Element {
  const {
    editFormState,
    setEditFormState,
    profilePicture,
    setProfilePicture,
    coverImage,
    setCoverImage,
    data,
    reset,
  } = props;
  const fullName = `${data?.data?.firstName} ${data?.data?.lastName}`;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [img, setImg] = useState<string | undefined>();

  const [putProfileImage] = usePutProfileImageMutation();
  const [deleteProfileImage] = useDeleteProfileImageMutation();
  const [putCoverImage, { isLoading }] = usePutCoverImageMutation();
  const [deleteCoverImage] = useDeleteCoverImageByIdMutation();

  function handleIconClick(event: React.MouseEvent<HTMLElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(): void {
    setAnchorEl(null);
  }

  /* Remove Picture */
  async function onSubmitProfileImage(profileImage: any): Promise<void> {
    try {
      const res: any = await putProfileImage({
        profileImage,
      }).unwrap();

      toast.success(res?.message ?? `Profile Image Updated Successfully!`);
    } finally {
      /* empty */
    }
  }
  async function onProfileImageDelete(): Promise<void> {
    try {
      const res: any = await deleteProfileImage(null).unwrap();
      toast.success(res?.message ?? `Profile Image Deleted Successfully!`);
    } finally {
      /* empty */
    }
  }
  async function onSubmitCoverImage(formData: any): Promise<void> {
    try {
      const res: any = await putCoverImage({
        coverImage: formData,
      }).unwrap();
      toast.success(res?.message ?? `Cover Image Updated Successfully!`);
    } finally {
      /* empty */
    }
  }
  async function onCoverImageDelete(): Promise<void> {
    try {
      const res: any = await deleteCoverImage(null).unwrap();
      toast.success(res?.message ?? `Cover Image Deleted Successfully!`);
    } finally {
      /* empty */
    }
  }

  /* Add Picture */
  function handleUpload(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result as string);
        setImg(reader.result as string);
        const formData = new FormData();
        formData.append("coverImage", file);
        void onSubmitCoverImage(formData);
      };
      reader.readAsDataURL(file);
    }
    setAnchorEl(null);
  }
  function handleRemove(): void {
    void onCoverImageDelete();
    setCoverImage(null);
    setAnchorEl(null);
  }

  //function to set cover image if its coming API or not
  function coverImg(): any {
    if (coverImage === img) {
      return img;
    } else if (coverImage) {
      return `${awsBaseUrl}${coverImage}`;
    }
    return bg.src;
  }

  return (
    <>
      {data ? (
        <Card
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          {/* cover image and upload icon */}
          <Box sx={{ position: "relative" }}>
            {isLoading ? (
              <CircularProgress
                size={100}
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ) : (
              <CardMedia
                sx={{ height: 200 }}
                image={coverImg()}
                // {`${awsBaseUrl}${coverImage}` ? coverImage : bg.src}
                title="green iguana"
              />
            )}
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

          {/* profile image molecule */}
          <Box
            sx={{
              position: "absolute",
              bottom: { md: "12.5%", xs: "18%" },
              left: "2%",
            }}
          >
            <ProfilePicture
              editFormState={editFormState}
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
              onProfileImageDelete={onProfileImageDelete}
              onSubmitProfileImage={onSubmitProfileImage}
            />
          </Box>

          {/* title  */}
          <Stack
            sx={{
              position: "absolute",
              left: { xl: "11%", lg: "15%", md: "20%", xs: "5%" },
              top: { md: "72%", xs: "82%" },
            }}
          >
            <Typography sx={{ fontWeight: 600 }} variant="h5">
              {fullName}
            </Typography>
            <Typography variant="subtitle1" color="text.disabled">
              {data?.data?.employeeTitle || "Title"}
            </Typography>
          </Stack>

          {/* buttons */}
          <Stack
            spacing={{ md: 2, xs: 1 }}
            direction={{ md: "row", xs: "column" }}
            sx={{ position: "absolute", right: "2%", top: "72%" }}
          >
            {editFormState && (
              <Button
                variant="contained"
                onClick={() => {
                  setEditFormState(false);
                  reset();
                }}
              >
                Back
              </Button>
            )}
            {!editFormState && (
              <Button
                variant="outlined"
                onClick={() => {
                  setEditFormState(true);
                }}
              >
                Edit Profile
              </Button>
            )}
          </Stack>
        </Card>
      ) : (
        <Skeleton variant="rounded" width="100%" height={200} />
      )}
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
        {coverImage && (
          <MenuItem sx={styles.menuItemStyling} onClick={handleRemove}>
            Remove Picture
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
