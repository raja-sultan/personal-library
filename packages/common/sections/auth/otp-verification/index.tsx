import React, { useState, useRef, useEffect } from "react";
import { PlLogoIcon } from "common/assets/logo";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, RHFTextField, StyledLink } from "common/components";
import { useForm } from "react-hook-form";
import {
  otpVerificationSchema,
  otpVerificationInitialValue,
} from "./otp-verification.schema";

const arrayVal = [
  { name: "fieldOne", value: "" },
  { name: "fieldTwo", value: "" },
  { name: "fieldThree", value: "" },
  { name: "fieldFour", value: "" },
];
export function OtpVerificationSection(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [otp, setOtp] = useState<any[]>(arrayVal);
  const [counter, setCounter] = useState<number>(59);
  const inputRefs: any = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  useEffect(() => {
    counter > 0 &&
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
  }, [counter]);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    digit
  ): void {
    const { value } = event.target;
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = { ...newOtp[index], value: value };
    setOtp(newOtp);
    setValue(digit?.name, value);
    if (index < 3 && value !== "") {
      inputRefs[index + 1].current?.focus();
    }
    return void 0;
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>): void {
    const pastedData = event.clipboardData.getData("Text");
    if (pastedData.length === 4 && /^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("").map(Number);
      setOtp([
        { name: "fieldOne", value: newOtp[0] },
        { name: "fieldTwo", value: newOtp[1] },
        { name: "fieldThree", value: newOtp[2] },
        { name: "fieldFour", value: newOtp[3] },
      ]);
      if (inputRefs === undefined) return;
      newOtp.forEach((value, index) => {
        if (inputRefs[index].current) {
          inputRefs[index].current.value = value.toString();
        }
      });
    }
  }

  const methods = useForm({
    resolver: yupResolver(otpVerificationSchema),
    defaultValues: otpVerificationInitialValue,
  });
  const { handleSubmit, setValue } = methods;

  const onSubmit = (formData): any => {
    router.push(`/otp-verification?id="RYMKBNJdtjWhnes7WcaEJ8&type=phone`);
    return formData;
  };

  return (
    <Stack spacing={5} sx={{ maxWidth: "500px", m: "auto", pt: 8 }}>
      <Box sx={{ textAlign: "center" }}>
        <PlLogoIcon />
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={4}
          justifyContent="center"
          direction="column"
          sx={{ pt: 4 }}
        >
          <Typography
            textAlign="center"
            variant="h2"
            color="neutral.900"
            fontWeight="600"
          >
            Verify Your
            <span style={{ paddingLeft: "8px" }}>
              {searchParams.get("type") === "email" ? "Email" : "Phone No"}
            </span>
          </Typography>
          <Box>
            <Typography textAlign="center" variant="body1" color="neutral.900">
              The authentication code has been sent to your email <br />
              <span style={{ color: "#6938EF" }}>
                {" "}
                {searchParams.get("type") === "email"
                  ? "john@ceative.co.uk"
                  : "+44 7911 123456"}
              </span>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {otp.map((digit, index) => (
                <RHFTextField
                  helperText=""
                  fullWidth
                  name={digit.name}
                  key={index}
                  inputRef={inputRefs[index]}
                  type="text"
                  value={digit.value}
                  onChange={(e) => {
                    handleInputChange(e, index, digit);
                  }}
                  sx={{
                    pt: 2,
                    width: "65px",
                    m: "0.5rem",
                    "& .MuiOutlinedInput-input": {
                      textAlign: "center",
                    },
                    "& .MuiOutlinedInput-root": {
                      textAlign: "center",
                      borderRadius: "8px",
                      fontSize: "16px",
                      py: "4px",
                    },
                  }}
                  onPaste={handlePaste}
                  variant="outlined"
                  size="small"
                  inputProps={{
                    maxLength: 1,
                    pattern: "[0-9]*",
                  }}
                />
              ))}
            </Box>
          </Box>
          <Stack spacing={4} direction="row">
            <Button
              variant="outlined"
              sx={{
                color: "black",
                borderColor: "neutral.400",
                borderRadius: "8px",
              }}
            >
              Back
            </Button>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ borderRadius: "8px" }}
            >
              Next
            </Button>
          </Stack>
          <Typography textAlign="center" variant="body1" color="neutral.900">
            The OTP will expire in
            <span
              style={{ color: "#6938EF", marginLeft: "5px", fontWeight: 700 }}
            >
              {counter > 9 ? `00:${counter}` : `00:0${counter}`}
            </span>
          </Typography>
          <Typography variant="body1" component="span" textAlign="center">
            Didn’t receive the code?
            <StyledLink
              href="#"
              style={{
                color: counter > 0 ? "#D2D6DB" : "",
              }}
            >
              Resend a new code
            </StyledLink>
          </Typography>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
