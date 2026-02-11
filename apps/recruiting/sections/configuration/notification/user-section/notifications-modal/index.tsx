import { LoadingButton } from "@mui/lab";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { CustomModal, FormProvider, RHFSwitch } from "common";
import { useNotificationModal } from "./use-notifications-modal";
import Divider from "@mui/material/Divider";

export function NotificationsModal({
  setOpenNotificationsModal,
  openNotificationsModal,
  userId,
  setUserId,
}: any): React.JSX.Element {
  const { methods, data, modalDataLoading, onSubmit, isLoading, reset } =
    useNotificationModal({
      userId,
      setOpenNotificationsModal,
      setUserId,
    });

  const otherNotificationsData = [
    {
      id: 1,
      notificationsName: "New applicant emails :",
      name: "newApplicantEmails",
      value: data?.data[0]?.notifications?.newApplicantsCount,
    },
    {
      id: 2,
      notificationsName: "New internal applicant emails :",
      name: "newInternalApplicantEmails",
      value: data?.data[0]?.notifications?.newInternalApplicantsCount,
    },
    {
      id: 3,
      notificationsName: "New referral emails :",
      name: "newReferralEmails",
      value: data?.data[0]?.notifications?.newReferralsCount,
    },
    {
      id: 4,
      notificationsName: "New agency submission emails :",
      name: "newAgencySubmissionEmails",
      value: data?.data[0]?.notifications?.newApplicantsCount,
    },
    {
      id: 5,
      notificationsName: "Approved to start recruiting emails :",
      name: "approvedToStartRecruitingEmails",
      value: data?.data[0]?.notifications?.startRecruitingCount,
    },
    {
      id: 6,
      notificationsName: "offer fully approved emails :",
      name: "offerFullyApprovedEmails",
      value: data?.data[0]?.notifications?.offerFullyApprovedCount,
    },
  ];
  return (
    <CustomModal
      onClose={() => {
        setOpenNotificationsModal(false);
        reset();
        setUserId("");
      }}
      rootSx={{
        maxWidth: { md: 700, xs: 350, sm: 600 },
        height: "86%",
        overflow: "scroll",
        "::-webkit-scrollbar": {
          width: "0px",
        },
      }}
      headerLabel={`Notifications for ${
        !modalDataLoading ? data?.data[0]?.firstName : ""
      }`}
      closeButtonProps={{
        onClick: () => {
          setOpenNotificationsModal(false);
          reset();
          setUserId("");
        },
      }}
      isOpen={openNotificationsModal}
    >
      {modalDataLoading ? (
        <Skeleton variant="rounded" width={650} height={700} />
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack rowGap={2}>
            {/* <RHFCustomSelect
            name="jobWiseNotifications"
            outerLabel="Job Wise Notifications"
            options={[
              { id: 1, label: "Internal Boards", value: "internal boards" },
              {
                id: 2,
                label: "External Boards can be multiple",
                value: "external boards can be multiple",
              },
            ]}
          /> */}
            {/* {!data && (
            <>
              <Card sx={{ p: 2, bgcolor: "info.lightest", my: 1 }}>
                {notificationsOneData.map((items) => {
                  return (
                    <Stack
                      key={items?.id}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography variant="body1">
                        {items.notificationsName}
                      </Typography>

                      <Box>
                        <RHFCheckbox name={items.name} />
                      </Box>
                    </Stack>
                  );
                })}
              </Card>
              <Card
                sx={{
                  p: 2,
                  bgcolor: "info.lightest",
                  my: 1,
                }}
              >
                <Grid container>
                  <Grid item xs={12} container>
                    <Grid item xs={5}>
                      {" "}
                    </Grid>
                    <Grid item xs={3.5} textAlign="center">
                      <Typography variant="subtitle1" fontWeight="bold">
                        Stage Transition
                      </Typography>
                    </Grid>
                    <Grid item xs={3.5} textAlign="center">
                      <Typography variant="subtitle1" fontWeight="bold">
                        New Scorecards
                      </Typography>
                    </Grid>
                  </Grid>
                  {notificationsTwoData.map((items) => {
                    return (
                      <Grid item xs={12} container key={items?.id}>
                        <Grid item xs={5}>
                          <Typography variant="body1">
                            {items.notificationsName}
                          </Typography>
                        </Grid>
                        <Grid item xs={3.5} textAlign="center">
                          <RHFCheckbox name={items.name1} />
                        </Grid>
                        <Grid item xs={3.5} textAlign="center">
                          <RHFCheckbox name={items.name2} />
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Card>
            </>
          )} */}
            <Typography variant="h6">Other Notifications</Typography>

            {otherNotificationsData.map((items) => {
              return (
                <>
                  <Stack
                    key={items?.id}
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {items.notificationsName}
                      </Typography>
                      <Typography variant="body2">
                        {`(${items.value} jobs)`}
                      </Typography>
                    </Box>
                    <Box>
                      <RHFSwitch name={items.name} />
                    </Box>
                  </Stack>
                  <Divider />
                </>
              );
            })}
          </Stack>

          <Stack direction="row" justifyContent="flex-end" columnGap={2} my={1}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setOpenNotificationsModal(false);
                reset();
                setUserId("");
              }}
            >
              Back
            </Button>

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Done
            </LoadingButton>
          </Stack>
        </FormProvider>
      )}
    </CustomModal>
  );
}
