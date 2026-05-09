import { Button, Grid, Stack, Typography } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import { useESignatureTemplateModal } from "./use-e-signature-template-modal";
import { eSignatureTemplateFormData } from "./e-signature-template.data";
import { LoadingButton } from "@mui/lab";

export function ESignatureTemplateModal({
  eSignatureModal,
  setESignatureModal,
  setPdfModal,
}: any): React.JSX.Element {
  const { methods, onSubmit } = useESignatureTemplateModal();
  return (
    <CustomModal
      onClose={() => {
        setESignatureModal(false);
      }}
      rootSx={{
        maxWidth: { md: 550, xs: 350, sm: 450 },
        height: { md: "50%", sm: "60%" },
        overflow: "scroll",
        "::-webkit-scrollbar": {
          width: "0px",
        },
      }}
      headerLabel="Create E-Signature Template"
      closeButtonProps={{
        onClick: () => {
          setESignatureModal(false);
        },
      }}
      isOpen={eSignatureModal}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container rowGap={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="neutral.500">
              Step 1 of 3
            </Typography>
            <Typography variant="subtitle2" color="neutral.500">
              Name and upload template
            </Typography>
          </Grid>
          {eSignatureTemplateFormData?.map((item) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} />
            </Grid>
          ))}
        </Grid>
        <Stack direction="row" justifyContent="flex-end" columnGap={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setESignatureModal(false);
            }}
          >
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            onClick={() => {
              setESignatureModal(false);
              setPdfModal(true);
            }}
          >
            Next
          </LoadingButton>
        </Stack>
      </FormProvider>
    </CustomModal>
  );
}
