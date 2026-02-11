"use client";
import CustomCard from "@components/custom-card";
import { PermissionAccordion } from "./permission-accordion";
import { PlanPermissions } from "./plan-component/plan-permission/plan-permission";
import { IndividualDevelopmentPlan } from "./plan-component/individual-development-plan";
import { AddCareerModal } from "./plan-component/add-career-modal";
import { usePermissions } from "./use-permissions";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CustomAlert } from "@components/alert";
import { AddNotificationModal } from "./plan-component/add-notification-modal";

export function CareerPermissions(): JSX.Element {
  const {
    careerModal,
    handleCareerModal,
    handleEditCareerModal,
    singleVisionData,
    handleNotificationModal,
    notificationModal,
    visionData,
    isLoading,
    isEdit,
  } = usePermissions();
  return (
    <>
      <CustomCard
        subHeader
        cardSubHeader={{
          title: "Permissions",
          description:
            "Set plan permissions and manage individual development plan for your people",
        }}
      />
      <PermissionAccordion title="Plan Permissions">
        <PlanPermissions />
      </PermissionAccordion>
      <PermissionAccordion title="Individual Development Plans">
        <IndividualDevelopmentPlan
          handleCareerModal={handleCareerModal}
          handleEditCareerModal={handleEditCareerModal}
          data={visionData?.data}
          isLoading={isLoading}
        />
      </PermissionAccordion>
      <PermissionAccordion title="Individual Development Plan Kickoff Notifications">
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="flex-start"
          gap="10px"
          mb="10px"
        >
          <Typography flex={1} variant="subtitle1" color="neutral.500">
            Prompt managers to facilitate career conversations with their direct
            reports. This notification gets sent to all managers, and will be
            sent across enabled channels (Email, Slack, Microsoft Teams).
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNotificationModal}
          >
            Add Notification
          </Button>
        </Box>
        <CustomAlert
          key="info_msg"
          message="You don't have any upcoming kickoff notifications scheduled."
        />
      </PermissionAccordion>

      {careerModal && (
        <AddCareerModal
          open={careerModal}
          onClose={handleCareerModal}
          data={isEdit ? singleVisionData?.data :null}
        />
      )}
      {notificationModal && (
        <AddNotificationModal
          open={notificationModal}
          onClose={handleNotificationModal}
        />
      )}
    </>
  );
}
