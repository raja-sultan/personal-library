"use client";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { Box, Stack } from "@mui/material";
import { ApproveDrawer } from "./drawer";
import CustomModal from "@components/custom-modal";
import { useApproves } from "./use-approvals";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CustomLoader } from "@components/loader";
import { CardWrapper } from "../view-progress-components/progress-bar-card/wrapper";
import { CompensatedFooter } from "../view-progress-components/footer";
import { CustomAlert } from "@components/alert";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

export function Approvals(): JSX.Element {
  const {
    tableData,
    approveDrawerData,
    toggleDrawer,
    handleModal,
    openConfirmApprovalsModal,
    handleConfirmApprove,
    confirmApproves,
    handleConfirmApprovesMutation,
    isCompleted,
    cardData,
    isApproved,
  } = useApproves();

  const isAllApproved = tableData?.data?.every((obj: { isApproved: boolean }) => obj?.isApproved);
  const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.COMPENSATION.COMPENSATION;
  return (
    <>
      {isAllApproved && (
        <CustomAlert message="Approvals have been approved for the employees within this cycle." />
      )}
      {tableData?.isLoading || tableData?.isFetching ? (
        <CustomLoader />
      ) : (
        <Stack direction="column" spacing={2.5}>
          <CardWrapper
            data={cardData}
            handleConfirmApprove={handleConfirmApprove}
            isApproved={isApproved}
          />

          <CustomTableWithHeader key="approvals" tableProps={tableData} />
          <PermissionProtected permission={PERMISSION.APPROVE_RECOMMENDATION} disabled>
            {!isAllApproved && <CompensatedFooter
              key='approvals'
              title={`${isCompleted}/${tableData?.data?.length} approvals completed`}
              message='The compensation admin is waiting for your approvals'
              btnText='Confirm Approvals'
              btnProps={{
                onClick: handleModal,
                disabled: confirmApproves
              }}
            />}
          </PermissionProtected>
          {approveDrawerData && <ApproveDrawer
            open={Boolean(approveDrawerData)}
            toggleDrawer={() => { toggleDrawer(false) }}
            data={approveDrawerData}
            handleApprove={handleConfirmApprovesMutation}
          />}

          {openConfirmApprovalsModal && (
            <CustomModal
              open={openConfirmApprovalsModal}
              onClose={handleModal}
              headerIcon={<InfoOutlinedIcon sx={{ color: "primary.main" }} />}
              message={false}
              title="Alert"
              acceptText="Submit"
              acceptButtonProps={{ color: "primary" }}
              onAccept={handleConfirmApprovesMutation}
            >
              <Box color="text.secondary">
                Once submitted, your approvals cannot be edited. Managers senior
                to you in your reporting line will be able to review your
                approvals.
              </Box>
            </CustomModal>
          )}
        </Stack>
      )}
    </>
  );
}
