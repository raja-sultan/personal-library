import { Button, Grid, Stack, Typography } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import { LoadingButton } from "@mui/lab";
import { useSetRulesModal } from "./use-set-rules-modal";

export function SetRulesModal({
  rulesModal,
  setRulesModal,
}: any): React.JSX.Element {
  const { methods, onSubmit, CreateSetRulesFormData } = useSetRulesModal();
  return (
    <CustomModal
      onClose={() => {
        setRulesModal(false);
      }}
      rootSx={{
        maxWidth: { md: 550, xs: 350, sm: 450 },
        height: { md: "62%", sm: "55%", xs: "70%" },
        overflow: "scroll",
        "::-webkit-scrollbar": {
          width: "0px",
        },
      }}
      headerLabel="Create E-Signature Template"
      closeButtonProps={{
        onClick: () => {
          setRulesModal(false);
        },
      }}
      isOpen={rulesModal}
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
          {CreateSetRulesFormData?.first?.map((item) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="neutral.500">
              Applies to new hires whose:
            </Typography>
          </Grid>
          {CreateSetRulesFormData?.whose?.map((item) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} />
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" justifyContent="flex-end" columnGap={2} pt={1}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setRulesModal(false);
            }}
          >
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained">
            Next
          </LoadingButton>
        </Stack>
      </FormProvider>
    </CustomModal>
  );
}
