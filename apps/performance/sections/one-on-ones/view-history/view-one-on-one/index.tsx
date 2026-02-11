"use client";
import React from "react";
import { Box, Button, Grid } from "@mui/material";
import CustomCard from "@components/custom-card";
import ProfileInfo from "./profile-info/profile-info";
import { DiscussionPoints } from "./discussion-points";
import SharedNotes from "./shared-notes/shared-notes";
import { BrowseDiscussionPoints } from "./discussion-points/browse";
import { styles } from "@sections/one-on-ones/view-history/view-one-on-one/view-one-ones-styles";
import { useViewOneOnOne } from "./use-view-one-on-one";
import Link from "next/link";
import { OneOnOneDetails } from "./one-on-one-details";
import CustomModal from "@components/custom-modal";
import { LoadingButton } from "@mui/lab";
import { CustomLoader } from "@components/loader";

function ViewOneOnOne(): JSX.Element {
  const {
    handleBackRoute,
    oneOneOneCategoryList,
    handleDiscussionPointFilter,
    oneOnOneSuggestedDiscussionPoints,
    handleAddDiscussionPoint,
    oneOnOneDetailsData,
    handleEditOneOnOneDetail,
    handleOpenDiscussionDrawer,
    openDrawer,
    handleViewProfile,
    handleCancelOneOnOne,
    discussionPointData,
    newActionItems,
    actionItems,
    handleSaveClick,
    handleNotesAndRatingChange,
    notesRating,
    handleEndOneOnOne,
    handleDeletePoint,
    handleUpdateMeetingPoint,
    currentUser,
    actionType,
    cancelDialog,
    cancelOneOneOne,
    isCancelled,
    isCancelOneOnOneLoading,
    isNotesRatingLoading,
    isDiscussionPointLoading,
    isLoading,
    isUpdateMeetingLoading,
    isDeletePointLoading,
  } = useViewOneOnOne();

  return (
    <CustomCard
      header
      cardHeader={{
        title: `My 1-on-1 with ${currentUser?.firstName ?? "--"} ${currentUser?.lastName ?? "--"
          }`,
        onBack: handleBackRoute,
        actions: (
          <Link
            href="/one-on-ones/manage-templates"
            style={{ pointerEvents: isCancelled ? "none" : "auto" }}
          >
            {actionType !== "ended" && (
              <Button variant="outlined" disabled={isCancelled}>
                Manage Templates
              </Button>
            )}
          </Link>
        ),
        divider: true,
      }}
    >
      {(isLoading || isUpdateMeetingLoading || isDeletePointLoading || isDiscussionPointLoading) && <CustomLoader />}
      <Grid container spacing={2} sx={{ pt: 2 }}>
        <Grid item md={8} xs={12}>
          <ProfileInfo
            disabled={isCancelled || actionType === "ended"}
            actionType={actionType === "ended"}
            userDetails={currentUser}
            handleCancel={handleCancelOneOnOne}
            handleViewProfile={handleViewProfile}
          />
          <DiscussionPoints
            isAddPointLoading={isDiscussionPointLoading}
            heading="Discussion Points Comment"
            placeholder="Enter discussion point"
            title="Discussion points"
            disabled={isCancelled}
            data={discussionPointData}
            btnTitle="Add Discussion Point"
            handleCheckboxChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              id: string
            ) => {
              handleUpdateMeetingPoint(id, { checked: event.target.checked });
            }}
            handleAddNewPoint={(val: string) => {
              handleAddDiscussionPoint({ text: val }, "discussion_point");
            }}
            handleDeletePoint={handleDeletePoint}
            currentUser={currentUser}
            actionType={actionType === "ended"}
          />
          <DiscussionPoints
            isAddPointLoading={isDiscussionPointLoading}
            disabled={isCancelled}
            title="Previous action items"
            data={actionItems}
            hideBtn
            lockIcon
            handleCheckboxChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              id: string
            ) => {
              handleUpdateMeetingPoint(id, { checked: event.target.checked });
            }}
            handleAssignActionItem={(assigneeId: string, id: string) => {
              handleUpdateMeetingPoint(id, { assigneeId });
            }}
            handleAddNewPoint={(val: string) => {
              handleAddDiscussionPoint({ text: val }, "action_item");
            }}
            handleDeletePoint={handleDeletePoint}
            currentUser={currentUser}
            actionType={actionType === "ended"}
          />
          <DiscussionPoints
            isAddPointLoading={isDiscussionPointLoading}
            heading="Action Items Comment"
            placeholder="Enter Action Item"
            disabled={isCancelled}
            title="New action items"
            data={newActionItems}
            btnTitle="Add Action Item"
            lockIcon
            handleCheckboxChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              id: string
            ) => {
              handleUpdateMeetingPoint(id, { checked: event.target.checked });
            }}
            handleAssignActionItem={(assigneeId: string, id: string) => {
              handleUpdateMeetingPoint(id, { assigneeId });
            }}
            handleAddNewPoint={(val: string) => {
              handleAddDiscussionPoint({ text: val }, "action_item");
            }}
            handleDeletePoint={handleDeletePoint}
            currentUser={currentUser}
            actionType={actionType === "ended"}
          />
          <SharedNotes
            disabled={isCancelled}
            key="shared_notes"
            title="Shared notes"
            description={`These notes will be shared in real time with ${currentUser?.firstName}, even before the 1-on-1 is ended.`}
            fieldTitle="Your notes"
            inputProps={{
              placeholder: "Enter notes...",
              name: "sharedNotes",
              value: notesRating.sharedNotes,
              onChange: handleNotesAndRatingChange,
            }}
            subTitle1={`${currentUser?.firstName} ${currentUser?.lastName} Notes`}
            subTitle2={`${currentUser?.firstName} hasn’t taken any notes yet.`}
            actionType={actionType === "ended"}
          />
          <SharedNotes
            disabled={isCancelled}
            key="private_notes"
            title="My private notes"
            icon
            description="This is a space to organize your thoughts. Only visible to you."
            inputProps={{
              placeholder: "Enter a description...",
              name: "privateNote",
              value: notesRating.privateNote,
              onChange: handleNotesAndRatingChange,
            }}
            requireRating
            ratingProps={{
              name: "rating",
              value: notesRating.rating,
              onChange: handleNotesAndRatingChange,
            }}
            actionType={actionType === "ended"}
          />
          {actionType !== "ended" ? (
            <Box sx={styles.btnWrap}>
              <LoadingButton
                loading={isNotesRatingLoading}
                variant="outlined"
                disabled={isCancelled}
                onClick={handleSaveClick}
              >
                Save
              </LoadingButton>
              <Button
                variant="contained"
                disabled={isCancelled}
                onClick={handleEndOneOnOne}
              >
                End 1-on-1
              </Button>
            </Box>
          ) : (
            <Box sx={styles.btnWrap}>
              <Button
                variant="outlined"
                disabled={actionType === "ended" || isCancelled}
              >
                Ended
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item md={4} xs={12}>
          <OneOnOneDetails
            disabled={isCancelled}
            data={oneOnOneDetailsData}
            handleEdit={handleEditOneOnOneDetail}
            handleOpenDiscussionDrawer={handleOpenDiscussionDrawer}
            actionType={actionType === "ended"}
          />
        </Grid>
      </Grid>

      {openDrawer && (
        <BrowseDiscussionPoints
          openDrawer={openDrawer}
          setOpenDrawer={handleOpenDiscussionDrawer}
          oneOneOneCategoryList={oneOneOneCategoryList}
          suggestedPointsList={oneOnOneSuggestedDiscussionPoints}
          handleDiscussionPointFilter={handleDiscussionPointFilter}
          handleAddDiscussionPoint={handleAddDiscussionPoint}
        />
      )}

      {cancelDialog && (
        <CustomModal
          open={cancelDialog}
          isLoading={isCancelOneOnOneLoading}
          onClose={handleCancelOneOnOne}
          message="Are you sure you want to cancel this 1-on-1 meeting?"
          hideCancelBtn
          acceptText="Cancel"
          onAccept={cancelOneOneOne}
        />
      )}
    </CustomCard>
  );
}
export default ViewOneOnOne;
