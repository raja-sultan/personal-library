import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  personalDetailSchema,
  companyDetailTwoSchema,
  companyDetailOneSchema,
  signUpInitialValue,
} from "./sign-up.schema";
import type { SignUpFormTypes, StepsTypes } from "./sign-up-form.types";
import { PlLogoIcon } from "common/assets";
import { FormProvider, StyledLink } from "common/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormPersonalInformation } from "./personal-information";
import { SignUpCompanyFormOne } from "./company-one";
import { SignUpCompanyFormTwo } from "./company-two";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

export function SignUpForm({
  useLazyGetCompaniesQuery,
  useSignUpMutation,
  setShowForm,
  hcmCardData,
}: any): JSX.Element {
  const [steps, setSteps] = useState<number>(1);
  const [mutation, { isLoading }] = useSignUpMutation();
  const [stepsData, setStepsData] = useState<StepsTypes>({
    label: "Personal Information  (1/3)",
    component: <SignUpFormPersonalInformation />,
    schema: personalDetailSchema,
  });

  useEffect(() => {
    if (steps === 2) {
      setStepsData({
        label: "Company Details (2/3)",
        component: (
          <SignUpCompanyFormOne
            useLazyGetCompaniesQuery={useLazyGetCompaniesQuery}
          />
        ),
        schema: companyDetailOneSchema,
      });
    } else if (steps === 3) {
      setStepsData({
        label: "Company Details (3/3)",
        component: <SignUpCompanyFormTwo />,
        schema: companyDetailTwoSchema,
      });
    } else {
      setStepsData({
        label: "Personal Information  (1/3)",
        component: <SignUpFormPersonalInformation />,
        schema: personalDetailSchema,
      });
    }
  }, [steps, useLazyGetCompaniesQuery]);

  const method = useForm<any>({
    resolver: yupResolver(stepsData?.schema),
    defaultValues: signUpInitialValue,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit } = method;

  async function formSubmitHandler(payload: SignUpFormTypes): Promise<any> {
    if (steps < 3) {
      setSteps((step) => step + 1);
      return;
    }
    if (hcmCardData.length > 0) {
      payload.allowedCompany = hcmCardData.map((c) => c.value);
    }

    try {
      const result = await mutation({
        ...payload,
        companyName: payload?.companyName?.company_name,
      }).unwrap();
      toast.success(result?.message || "User Create Successfully!");
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <Stack sx={{ alignItems: "center", p: 2 }}>
      <Stack spacing={2}>
        <Box sx={{ textAlign: "center" }}>
          <PlLogoIcon />
        </Box>
        <FormProvider
          methods={method}
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <Typography textAlign="center" variant="h4">
            {stepsData?.label}
          </Typography>
          <Stack
            spacing={4}
            direction="column"
            sx={{ maxWidth: "550px", margin: "auto", pt: 4 }}
          >
            {stepsData?.component}
            <Stack spacing={4} direction="row">
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "8px",
                }}
                onClick={() => {
                  steps > 1 ? setSteps(steps - 1) : setShowForm(false);
                }}
              >
                Back
              </Button>
              <LoadingButton
                fullWidth
                variant="contained"
                type="submit"
                sx={{ borderRadius: "8px" }}
                loading={isLoading}
              >
                Continue
              </LoadingButton>
            </Stack>
            <Typography variant="body2" component="span" textAlign="center">
              By submitting your information, you agree to Personnel Library’s
              <StyledLink href="#">Terms of Service</StyledLink>
              and
              <StyledLink href="#">Privacy Policy</StyledLink>. You can opt out
              at anytime.
            </Typography>
            <Typography variant="body2" component="span" textAlign="center">
              Already have an account?
              <StyledLink href="/sign-in">Sign In</StyledLink>
            </Typography>
          </Stack>
        </FormProvider>
      </Stack>
    </Stack>
  );
}
