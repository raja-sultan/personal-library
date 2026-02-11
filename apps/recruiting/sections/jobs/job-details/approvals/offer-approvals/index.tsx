import {
  Box,
  Button,
  Grid,
  Tooltip,
  Typography,
  Card,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  CustomChip,
  FormProvider,
  NoContentFound,
  RHFCustomSelect,
  WarningPrompt,
} from "common";
import { SendReminderModal } from "./send-reminder-modal";
import { AddApprovalStepModal } from "./add-approval-step-modal";
import dayjs from "dayjs";
import { UseOfferApprovals } from "./use-offer-approval";
import { styles } from "./styles";


export function OfferApprovals({ refetch }: any): JSX.Element {
  const {
    method,
    isLoading,
    addApproval,
    MarkAsApproved,
    approvalData,
    getIconBasedOnStatus,
    getColorBasedOnName,
    getColorBasedOnIconName,
  } = UseOfferApprovals({ refetch });

  const theme = useTheme();
  const [approvalsReminderData, setApprovalsReminderData] = useState("");
  const [openReminder, setOpenReminder] = useState<boolean>(false);
  const [openCategory, setOpenCategory] = useState<boolean>(false);

  if (isLoading) return <Box> loading ...</Box>;

  return (
    <Grid
      item
      container
      sm={12}
      sx={{ p: { xs: "20px 0 20px 10px", sm: "20px 20px" } }}
    >
      <Grid item sm={12} container>
        <Grid item sm={12}>
          <Typography variant="h6">Offer Approvals</Typography>
        </Grid>
      </Grid>
      <Grid item sm={12} container>
        <Grid item sm={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 1,
              alignItems: "center",
            }}
          >
            <Box display="flex">
              <Typography variant="subtitle2">
                To extend offers to candidates
              </Typography>
              <Tooltip
                title="Approval needed for details of individual offer(salary,benefits etc), The details must be approved before the offer can be extended to each candidate"
                placement="top"
              >
                <InfoOutlinedIcon sx={{ ml: "0.2em" }} />
              </Tooltip>
            </Box>
            <Box>
              <FormProvider methods={method}>
                <RHFCustomSelect
                  fullWidth
                  name="order"
                  placeholder="Select Option"
                  options={[
                    { id: 1, label: "In Order", value: "in_order" },
                    { id: 2, label: "All at Once", value: "all_at_once" },
                  ]}
                />
              </FormProvider>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {addApproval?.approvalSteps ? (
        <Card sx={styles.mainCardStyling}>
          {addApproval?.approvalSteps?.map((approvals) => {
            return (
              <Box
                key={approvals?.userId}
                sx={{ display: "flex", mb: 1, alignItems: "center" }}
              >
                <Box sx={{ mr: 0.5 }}>
                  <Tooltip
                    title={
                      <>
                        {getColorBasedOnIconName(approvals?.status)}

                        {approvals?.status === "Rejected" &&
                          approvals?.status && (
                            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                              Reason: {approvals.rejectionReason ?? " null "}
                            </Typography>
                          )}
                      </>
                    }
                    placement="top"
                    arrow
                  >
                    {getIconBasedOnStatus(approvals?.status, theme).icon}
                  </Tooltip>
                </Box>
                <CustomChip
                  ChipProps={{ label: approvals?.fullName }}
                  variant={getColorBasedOnName(approvals?.status)}
                />

                {approvals?.status !== "Pending" && (
                  <>
                    <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
                      {dayjs(approvals?.approvalDate).format("MMMM D") ?? "-"}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
                      {addApproval?.numOfApprovalRequired} of{" "}
                      {approvalData?.length} required
                    </Typography>
                  </>
                )}
                {approvals?.status === "Pending" && (
                  <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
                    <Button sx={{ p: "2px 7px" }}>
                      <WarningPrompt
                        mainColor="warning.main"
                        heading="Alert"
                        subTitle="Are you sure you want to Mark this as Approved?"
                        modelOpenLabel="Mark as Approved"
                        acceptButtonLabel="Yes,sure!"
                        acceptButtonProps={{
                          onClick: () => {
                            MarkAsApproved(approvals);

                            refetch();
                          },
                          variant: "contained",
                          sx: { backgroundColor: "success.main" },
                        }}
                      />
                    </Button>
                    <Button
                      sx={{ p: "2px 7px" }}
                      onClick={() => {
                        setOpenReminder(true);
                        setApprovalsReminderData(approvals);
                      }}
                    >
                      Send Reminder
                    </Button>
                  </Typography>
                )}
              </Box>
            );
          })}
        </Card>
      ) : (
        <Grid container>
          <Grid
            xs={12}
            item
            sx={{
              display: "flex",
              justifyContent: "Center",
            }}
          >
            <NoContentFound />
          </Grid>
        </Grid>
      )}

      <Box>
        <Button
          onClick={() => {
            setOpenCategory(true);
          }}
        >
          Add approval step
        </Button>
      </Box>
      <SendReminderModal
        approvalsReminderData={approvalsReminderData}
        openReminder={openReminder}
        setOpenReminder={setOpenReminder}
      />
      <AddApprovalStepModal
        addApprovalData={addApproval}
        openCategory={openCategory}
        setOpenCategory={setOpenCategory}
        approvals={approvalData}
        refetch={refetch}
      />
    </Grid>
  );
}
