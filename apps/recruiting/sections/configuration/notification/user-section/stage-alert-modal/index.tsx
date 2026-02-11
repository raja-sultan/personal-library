import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { useStageAlertModal } from "./use-stage-alert-modal";
import { LoadingButton } from "@mui/lab";

export function StageAlertModal({
  setOpenStageAlertModal,
  openStageAlertModal,
  stageId,
  setStageId,
}: any): React.JSX.Element {
  const { methods, modalDataLoading, onSubmit, isLoading, reset, isFetching } =
    useStageAlertModal({
      setOpenStageAlertModal,
      stageId,
      setStageId,
    });
  const stageAlertData = [
    {
      id: 1,
      name: "Application Review",
      days: "0",
    },
    {
      id: 2,
      name: "Preliminary Phone Screen",
      days: "0",
    },
    {
      id: 3,
      name: "Phone Interview",
      days: "0",
    },
    {
      id: 4,
      name: "Hiring Manager Review",
      days: "0",
    },
    {
      id: 5,
      name: "Background Check",
      days: "0",
    },
    {
      id: 6,
      name: "Face To Face",
      days: "0",
    },

    {
      id: 7,
      name: "Offer",
      days: "0",
    },
  ];
  function onModalClose(): any {
    setOpenStageAlertModal(false);
    reset({
      "Application Review": "0",
      "Preliminary Phone Screen": "0",
      "Phone Interview": "0",
      "Hiring Manager Review": "0",
      "Background Check": "0",
      "Face To Face": "0",
      Offer: "0",
    });
    setStageId("");
  }
  return (
    <CustomModal
      onClose={onModalClose}
      rootSx={{
        maxWidth: { md: 700, xs: 350, sm: 600 },
        height: "86%",
        overflow: "scroll",
        "::-webkit-scrollbar": {
          width: "0px",
        },
      }}
      headerLabel="Stage Alert Settings"
      closeButtonProps={{
        onClick: onModalClose,
      }}
      isOpen={openStageAlertModal}
    >
      {modalDataLoading || isFetching ? (
        <Skeleton variant="rounded" width={650} height={700} />
      ) : (
        <>
          <Stack rowGap={1} my={3}>
            <Typography>
              Personnel Library can alert you when candidates are in a stage for
              too long, ensuring that no one fails through the cracks
            </Typography>
            <Typography>
              Alert when a candidate is in a stage longer than:
            </Typography>
          </Stack>
          <Stack rowGap={2} my={2}>
            {stageAlertData.map((item) => {
              return (
                <Stack
                  key={item?.id}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body1" fontWeight="bold">
                    {item?.name}
                  </Typography>

                  <FormProvider methods={methods}>
                    <Stack direction="row" columnGap={1} alignItems="center">
                      <RHFTextField name={item?.name} sx={{ width: 50 }} />
                      <Typography variant="body1">days</Typography>
                    </Stack>
                  </FormProvider>
                </Stack>
              );
            })}
          </Stack>
          <Stack direction="row" justifyContent="flex-end" columnGap={2} my={1}>
            <Button variant="outlined" color="primary" onClick={onModalClose}>
              Cancel
            </Button>

            <LoadingButton
              variant="contained"
              loading={isLoading}
              onClick={onSubmit}
            >
              Done
            </LoadingButton>
          </Stack>
        </>
      )}
    </CustomModal>
  );
}
