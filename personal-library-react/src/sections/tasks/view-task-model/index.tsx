import { Box } from "@mui/system";
import {
  CustomModal,
  FormProvider,
  RHFUploadSingleFileWithPreview,
} from "common";
import React, { useState } from "react";
import EditTaskModel from "../edit-task-model";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import person from "@assets/common/person.png";
import Image from "next/image";
import { LoadingButton } from "@mui/lab";
import { DefValue } from "../edit-task-model/edit-task-data";

import { useForm } from "react-hook-form";

function ViewTaskModel({ label }: { label: string }): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const methods = useForm({
    defaultValues: DefValue,
    // resolver: yupResolver(EditFormSchemaModel),
  });
  const onSubmit = () => {};
  const { control, handleSubmit } = methods;
  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
        }}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        {label}
      </Box>
      <CustomModal
        onClose={setOpenModal}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Task detail"
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid
            sx={{
              overflowY: "auto",
              maxHeight: 500,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "primary.main",
                borderRadius: "6px",
              },
            }}
            container
          >
            <Grid xs={12} px={1} pb={1} item>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" fontWeight={600} color="initial">
                  Task Name
                </Typography>
                <Box ml="auto">
                  <EditTaskModel />
                </Box>
              </Box>
              <Typography variant="subtitle2">
                You have a New Hire starting soon!
              </Typography>
            </Grid>
            <Grid xs={12} px={1} pb={1} item>
              <Typography variant="body1" fontWeight={600} color="primary">
                Details
              </Typography>
              <Typography variant="subtitle2">
                You have a New Hire, John Doe, starting on . Please complete the
                below steps to prepare for their first day. We’ve also included
                some information about the new hire below to help you get
                started:
              </Typography>
              <Typography variant="subtitle2">
                {">"} Reach out and send a welcome message to your new hire as
                soon as possible
              </Typography>
              <Typography variant="subtitle2">
                {">"} Prepare job training plan
              </Typography>
              <Typography variant="subtitle2">
                {">"} Schedule a team lunch
              </Typography>
            </Grid>
            <Grid xs={12} px={1} pb={1} item>
              <Typography variant="body1" fontWeight={600} color="primary">
                New Hire Information
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" fontWeight={600}>
                  Name:
                </Typography>
                <Typography variant="subtitle2">John Doe</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" fontWeight={600}>
                  Title:
                </Typography>
                <Typography variant="subtitle2">-</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" fontWeight={600}>
                  Location:
                </Typography>
                <Typography variant="subtitle2">-</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" fontWeight={600}>
                  Department:
                </Typography>
                <Typography variant="subtitle2">-</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" fontWeight={600}>
                  About:
                </Typography>
                <Typography variant="subtitle2">-</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" fontWeight={600}>
                  Personal Email:
                </Typography>
                <Typography variant="subtitle2">
                  personallibrary@ceative.co.uk
                </Typography>
              </Box>
            </Grid>
            <Grid xs={6} px={1} pb={1} item>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap={1}
              >
                <Typography variant="subtitle2">Due Date</Typography>
                <Typography variant="body2" fontWeight={600}>
                  Build Relationships
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap={1}
              >
                <Typography variant="subtitle2">Assigned To</Typography>
                <Typography variant="body2" fontWeight={600}>
                  (Manager)
                </Typography>
              </Box>
            </Grid>
            <Grid xs={6} px={1} pb={1} item>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap={1}
              >
                <Typography variant="subtitle2">Due Date</Typography>
                <Typography variant="body2" fontWeight={600}>
                  No Due Date
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap={1}
              >
                <Typography variant="subtitle2">Completing Task for</Typography>
                <Typography variant="body2" fontWeight={600}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Image src={person} alt="person" /> John Doe
                  </Box>
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} px={1} pb={1} item>
              <RHFUploadSingleFileWithPreview
                outerLabel="Attachment"
                name="attachment"
                accept={{ "text/csv": [".csv"] }}
                supportedFormats="CSV"
                type="csv"
              />
            </Grid>
            <Grid xs={12} item>
              <Box mt={1} display="flex">
                <Box
                  ml="auto"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                  px={2}
                >
                  <Button
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      height: 35,
                    }}
                    type="submit"
                  >
                    Mark complete
                  </LoadingButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </CustomModal>
    </>
  );
}

export default ViewTaskModel;
