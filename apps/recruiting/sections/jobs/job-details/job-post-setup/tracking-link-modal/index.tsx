import { Box, Button } from "@mui/material";
import { CustomModal, FormProvider, RHFTextField } from "common";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { defaultValues, schema } from "./tracking-link.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetJobBoardsByIdQuery } from "@services/configuration/job-boards/job-boards-api";
import StepperFormSkeleton from "@sections/jobs/stepper-form-skeleton";
import copy from "copy-to-clipboard";
import { LoadingButton } from "@mui/lab";

export function TrackingLinkModal(props): JSX.Element {
  const { open, setOpen, jobBoardUrl, setJobBoardUrl } = props;
  const [copied, setCopied] = useState(false);

  //Job Boards GET BY ID API
  const { data: jobDetails, isLoading } = useGetJobBoardsByIdQuery(
    jobBoardUrl,
    {
      skip: jobBoardUrl === null,
    }
  );

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset, getValues } = methods;

  //Handling GET BY ID API to show url in input field
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...jobDetails?.data,
      url:
        jobDetails?.data?.type === "internal"
          ? `https://recruiting-pl.apiswagger.co.uk/careers?companyName=${jobDetails?.data?.domain}`
          : `${jobDetails?.data?.url}`,
    }));
  }, [jobBoardUrl, reset, jobDetails?.data]);

  const onSubmit = (data) => {
    console.log("data", data);
  };

  //Clip Board Function
  const handleCopy = () => {
    const inputField = getValues("url");
    copy(inputField);
    setCopied(true);
    // Reset the copied state after a short delay
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  //Showing Loader on Edit API
  if (isLoading) {
    return <StepperFormSkeleton />;
  }

  return (
    <CustomModal
      onClose={() => {
        setOpen(false);
        setJobBoardUrl(null);
      }}
      rootSx={{ maxWidth: { xs: 350, sm: 700 } }}
      headerLabel="Get a Tracking Link"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
          setJobBoardUrl(null);
        },
      }}
      isOpen={open}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "", sm: "center" },
            gap: 2,
            mt: 1.5,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <RHFTextField
              disabled
              name="url"
              placeholder="Board Name"
              sx={{
                border: copied ? "2px solid" : "",
                borderColor: copied ? "primary.main" : "",
                borderRadius: copied ? "8px" : "",
              }}
            />
          </Box>
          <Button variant="contained" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setOpen(false);
              reset(defaultValues);
              setJobBoardUrl(null);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            size="small"
            variant="contained"
            onClick={() => {
              setOpen(false);
              setJobBoardUrl(null);
            }}
          >
            Ok
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
