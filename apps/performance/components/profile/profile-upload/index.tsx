"use client";

import React from "react";
import { Box, Button, Typography, Avatar, Card, Skeleton } from "@mui/material";
import Image from "next/image";
import UploadButton from "../upload-button";
import { bgPlaceholderImage } from "@assets/images";
import { styles } from "./profile-upload.styles";
import { useImageUpload } from "./use-profile-upload";
import { useRouter } from "next/navigation";
import { awsBaseUrl } from "@root/config";

export function ProfileUpload({
  isUpload,
  data = {
    firstName: "N/A",
    lastName: "N/A",
    employeeTitle: "N/A",
  },
}): JSX.Element {
  const {
    handleUploadCover,
    handleImageRemove,
    handleUploadProfile,
    handleImageLoad,
    isImageLoaded,
    getProfile,
    isLoading,
    isUploading,
    getInitials,
  } = useImageUpload();

  const router = useRouter();

  return (
    <Card sx={styles.cardStyle}>
      <Box sx={{ position: "relative" }}>
        {(isUploading.cover || isLoading) && isImageLoaded ? (
          <Skeleton variant="rectangular" height={200} />
        ) : (
          <Image
            style={styles.uploadImg}
            height={200}
            width={1700}
            onLoad={handleImageLoad}
            src={
              getProfile?.data?.coverImage
                ? `${awsBaseUrl}${getProfile?.data?.coverImage}`
                : bgPlaceholderImage
            }
            alt="Cover Photo"
          />
        )}

        <Box sx={styles.uploadBtn}>
          {isUpload && (
            <UploadButton
              anchorPosition="right"
              disableBtnProps={{
                uploadBtn: isUploading.cover,
                removeBtn: !getProfile?.data?.coverImage,
              }}
              onUpload={handleUploadCover}
              handleRemove={() => {
                handleImageRemove("cover");
              }}
            />
          )}
        </Box>
      </Box>
      <Box sx={{ padding: "24px" }}>
        <Box sx={styles.flex}>
          <Box sx={{ marginTop: "-8.50rem" }}>
            <Box sx={styles.avatarWrapper}>
              <Box position="relative">
                {isLoading || isUploading.profile ? (
                  <Skeleton variant="circular" width={125} height={125} />
                ) : (
                  <Avatar
                    src={`${awsBaseUrl}${getProfile?.data?.profileImage}`}
                    sx={styles.avatarStyle}
                  >
                    {getInitials(getProfile?.data?.firstName, getProfile?.data?.lastName)}
                  </Avatar>
                )}

                <Box sx={styles.uploadBtnIcon}>
                  {isUpload && (
                    <UploadButton
                      onUpload={handleUploadProfile}
                      disableBtnProps={{
                        uploadBtn: isUploading.profile,
                        removeBtn: !getProfile?.data?.profileImage,
                      }}
                      anchorPosition="left"
                      handleRemove={() => {
                        handleImageRemove("profile");
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Box>
                <Typography component="h5" sx={{ fontWeight: 600 }}>
                  {data.firstName}&nbsp;
                  {data.lastName}
                </Typography>
                <Typography component="p" variant="body2" sx={{ color: "neutral.500" }}>
                  {data.employeeTitle}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={styles.buttonsWrapper}>
            <Button
              variant="outlined"
              onClick={() => {
                router.push(isUpload ? "/profile/edit" : "one-on-ones");
              }}
            >
              {isUpload ? "Edit Profile" : "Setup 1 on 1s"}
            </Button>
            <Button variant="outlined" onClick={() => { router.push(`/feedback/add-feedback?tab=0`) }}>
              Give or Request Feedback
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
