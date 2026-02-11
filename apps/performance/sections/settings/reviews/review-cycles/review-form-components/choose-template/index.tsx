import { Button, Grid, MenuItem } from "@mui/material";
import { RHFTextField } from "@root/../../packages/common";
import { useGetReviewTemplatesQuery } from "@services/settings/review/review-cycle-api";
import { CustomGridLayout } from "../../../../../../components/custom-grid-layout/custom-grid-layout";

export function ChooseTemplate({ watch, handlePreviewModal }): JSX.Element {
  const { data: templates } = useGetReviewTemplatesQuery({});
  const options = templates?.data?.map(({ text, value }) => ({ label: text, value }));

  return (
    <CustomGridLayout
      title="Choose Template"
      description="Choose a template for each reviewer to complete in this review direction."
    >
      <CustomSelectWithButton
        options={options}
        name="downwardReviewTemplate"
        disabled={!watch("downwardReview")}
        btnClick={() => {
          handlePreviewModal(watch("downwardReviewTemplate"));
        }}
        outerLabel="Downward Review"
        btnDisabled={!watch("downwardReview") || !watch("downwardReviewTemplate")}
        removeMarginTop
      />
      <CustomSelectWithButton
        options={options}
        name="selfReviewTemplate"
        disabled={!watch("selfReview")}
        btnClick={() => {
          handlePreviewModal(watch("selfReviewTemplate"));
        }}
        outerLabel="Self Review"
        btnDisabled={!watch("selfReview") || !watch("selfReviewTemplate")}
      />
      <CustomSelectWithButton
        options={options}
        name="upwardReviewTemplate"
        disabled={!watch("upwardReview")}
        btnClick={() => {
          handlePreviewModal(watch("upwardReviewTemplate"));
        }}
        outerLabel="Upward Review"
        btnDisabled={!watch("upwardReview") || !watch("upwardReviewTemplate")}
      />
      <CustomSelectWithButton
        options={options}
        name="peerReviewTemplate"
        disabled={!watch("peerReview")}
        btnClick={() => {
          handlePreviewModal(watch("peerReviewTemplate"));
        }}
        outerLabel="Peer Review"
        btnDisabled={!watch("peerReview") || !watch("peerReviewTemplate")}
      />
    </CustomGridLayout>
  );
}

function CustomSelectWithButton({
  options,
  name,
  btnClick,
  disabled,
  outerLabel,
  btnDisabled,
  removeMarginTop,
}: {
  options: { label: string, value: string }[],
  name: string,
  btnClick: () => void,
  disabled: boolean,
  outerLabel: string,
  btnDisabled: boolean,
  removeMarginTop?: boolean,
}): JSX.Element {
  return (
    <Grid container spacing={2} alignItems="flex-end">
      <Grid item md={6} xs={12} mt={removeMarginTop ? '0px' : '10px'} mb="10px">
        <RHFTextField
          select
          variant="outlined"
          outerLabel={outerLabel}
          size="small"
          name={name}
          disabled={disabled}
          SelectProps={{
            displayEmpty: true
          }}
        >
          <MenuItem disabled selected value="" sx={{ display: "none" }}>
            Select
          </MenuItem>
          {options?.map((option: { value: string; label: string }) => (
            <MenuItem key={option?.value} value={option?.value} sx={{ fontSize: '16px' }}>
              {option?.label}
            </MenuItem>
          ))}
        </RHFTextField>
      </Grid>
      <Grid item xs={3} my="10px">
        <Button variant="outlined" disabled={btnDisabled} size="small" onClick={btnClick}>
          Preview
        </Button>
      </Grid>
    </Grid>
  );
}
