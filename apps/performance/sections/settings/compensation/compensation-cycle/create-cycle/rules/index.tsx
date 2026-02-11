import { CustomAlert } from "@components/alert";
import CustomCard from "@components/custom-card";
import { CustomGridLayout } from "@components/custom-grid-layout/custom-grid-layout";
import { CustomLoader } from "@components/loader";
import { LoadingButton } from "@mui/lab";
import { DialogActions, FormHelperText, MenuItem, Stack, Typography } from "@mui/material";
import { FormProvider, RHFCheckbox, RHFDatePicker, RHFSelect } from "@root/../../packages/common";
import { ThemeModeColor } from "@root/utils";
import { useRules } from "./use-rules";

export function Rules({ handleNext, currency, viewDetailId }): JSX.Element {
  const {
    handleSubmit,
    methods,
    onSubmit,
    formSubmitted,
    anyChecked,
    totalEmployees,
    isSuccess,
    watch,
    isCycleLoadingById,
    isGenerateListLoading,
  } = useRules({ handleNext, currency, viewDetailId });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <CustomCard
        cardProps={{
          sx: {
            height: "65vh",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "0px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
          },
        }}
      >
        {isCycleLoadingById && <CustomLoader />}
        <CustomGridLayout
          title="Eligibility rules"
          description="Decide which employees are eligible to receive a compensation adjustment."
          childrenBreakPoints={{ md: 5.5, xs: 12 }}
          rootTitleSx={{ color: ThemeModeColor("neutral.700"), fontSize: "20px" }}
        >
          <Stack gap="2.5rem">
            <Stack gap="1.5rem">
              <RHFCheckbox
                name="tenure"
                label=<>
                  <Typography variant="subtitle1" fontWeight={400} color={ThemeModeColor("neutral.800")}>
                    Tenure
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color="neutral.500">
                    Only include employees who started before
                  </Typography>
                </>
              />

              <RHFDatePicker
                size="small"
                name="tenureDate"
                disabled={!watch("tenure")}
                sx={{ width: "100%", maxWidth: "320px" }}
              />
            </Stack>
            <Stack gap="1.5rem">
              <RHFCheckbox
                name="lastCompensationChange"
                label=<>
                  <Typography variant="subtitle1" fontWeight={400} color={ThemeModeColor("neutral.800")}>
                    Last compensation change
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color="neutral.500">
                    Only include employees who haven’t had a compensation change since
                  </Typography>
                </>
              />

              <RHFDatePicker size="small" name="lastCompensationChangeDate" disabled={!watch("lastCompensationChange")} sx={{ width: "100%", maxWidth: "320px" }} />
            </Stack>
          </Stack>
          {formSubmitted && !anyChecked && (
            <FormHelperText sx={({ palette: { error } }) => ({ mt: 1, color: error.main })}>Either tenure or last compensation change should be selected</FormHelperText>
          )}
        </CustomGridLayout>
        {isSuccess && (
          <CustomAlert
            message={`${totalEmployees}/${totalEmployees} employees will be eligible based on the eligibility rules defined above. You’ll be able to adjust individual eligibility on the next page (Participants).`}
          />
        )}
        <CustomGridLayout
          childrenBreakPoints={{ md: 5.5, xs: 12 }}
          hideDivider
          title="Currency"
          description="Manage the currencies you’ll use for this cycle. Only employees who are compensated in one of these currencies will be eligible."
          rootTitleSx={{ color: ThemeModeColor("neutral.700"), fontSize: "20px" }}
        >
          <Typography variant="subtitle1" fontWeight={400} color={ThemeModeColor("neutral.700")}>
            Company currency
          </Typography>
          <Typography variant="subtitle2" fontWeight={400} color={ThemeModeColor("neutral.500")} mb="24px">
            This currency will be used to set, calculate, and track budgets. Employees will view their compensation in their local currency.
          </Typography>
          <RHFSelect name="companyCurrency" select size="small" disabled placeholder="GBP £" sx={{ width: "100%", maxWidth: "320px" }}>
            {[
              { value: "GBP £", label: "GBP £" },
              { value: "AED", label: "AED" },
              { value: "all", label: "ALL" },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </CustomGridLayout>
        <DialogActions sx={{ mt: "15px" }}>
          <LoadingButton loading={isGenerateListLoading} variant="contained" type="submit">
            Generate List
          </LoadingButton>
        </DialogActions>
      </CustomCard>
    </FormProvider>
  );
}
