import { Grid, InputLabel } from "@mui/material";
import { FormProvider, NoContentFound, RHFTextField } from "common";
import StepperFormSkeleton from "@sections/jobs/stepper-form-skeleton";
import { useForm } from "react-hook-form";
import type { referralDetails } from "./referral-details.types";
import { schema, defaultValues } from "./referral-details.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetJobCandidateQuery } from "@services/candidate/candidate-tags/candidate-tags-api";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useLazyGetReferralDetailsQuery } from "@services/jobs/job-details/pipe-line/referral-details/referral-details-api";

export function ReferralDetails(): JSX.Element {
  const searchParams = useSearchParams();
  const candidateId = searchParams.get("candidateId");
  const { data: jobDetails } = useGetJobCandidateQuery({
    candidateId,
  });

  const [getReferralDetails, { isLoading }] = useLazyGetReferralDetailsQuery();
  const getDefaultValue = async () => {
    const { data, isError } = await getReferralDetails({
      referralId: candidateId,
    });
    if (isError) {
      toast.error("Error Occurred");
      return defaultValues;
    }
    const responseData = { ...data?.data?.detail };
    return responseData;
  };

  const methods = useForm<referralDetails>({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValue,
  });

  if (isLoading) {
    return <StepperFormSkeleton />;
  }

  return (
    <>
      {jobDetails?.data?.candidateType === "REFERRAL" ? (
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <InputLabel sx={styles.commonStyling}>Work History</InputLabel>
              <RHFTextField fullWidth type="text" name="workHistory" disabled />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel sx={styles.commonStyling}>Relationship</InputLabel>
              <RHFTextField
                fullWidth
                type="text"
                name="relationship"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel sx={styles.commonStyling}>Rating</InputLabel>
              <RHFTextField fullWidth type="text" name="rating" disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={styles.commonStyling}>
                When we react out
              </InputLabel>
              <RHFTextField fullWidth type="text" name="reachout" disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel
                sx={styles.commonStyling}
              >{`They know They're being referred`}</InputLabel>
              <RHFTextField
                fullWidth
                type="text"
                name="beingRefered"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel sx={styles.commonStyling}>Referral Notes</InputLabel>
              <RHFTextField
                fullWidth
                type="text"
                name="referalNotes"
                disabled
              />
            </Grid>
          </Grid>
        </FormProvider>
      ) : (
        <Grid container justifyContent="center">
          <Grid item width={200}>
            <NoContentFound />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export const styles = {
  commonStyling: {
    my: 1,
    color: "text.secondary",
  },
};
