import React, { useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import { IOSSwitch, switchComponentData } from "./data";
import type { AddInterviewSwitchComponentTypes } from "./types";

export function AddInterviewModal(props: any): JSX.Element {
  const theme = useTheme();
  const {
    openInterviewModal,
    setOpenInterviewModal,
    methods,
    onSubmitAddInterview,
    setInterviewDetails,
    isEditOrSave,
    scoreCardAttributes,
    loadingAttr,
    successAttr,
    errorAttr,
  } = props;
  const [switchStates, setSwitchStates] = useState<any>({});
  const { handleSubmit } = methods;
  const handleChange = (id: any): void => {
    setSwitchStates((prevSwitchStates: any) => ({
      ...prevSwitchStates,
      [id]: !prevSwitchStates[id],
    }));
  };
  return (
    <CustomModal
      onClose={setOpenInterviewModal}
      rootSx={{
        width: "58%",
        maxHeight: 900,
        overflowY: "scroll",
      }}
      closeButtonProps={{
        onClick: () => {
          setOpenInterviewModal(false);
          setInterviewDetails({});
        },
      }}
      isOpen={openInterviewModal}
    >
      <Box px={3}>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmitAddInterview)}
        >
          {switchComponentData({
            methods,
            scoreCardAttributes,
            loadingAttr,
            successAttr,
            errorAttr,
          })?.map((ele: AddInterviewSwitchComponentTypes) => (
            <Grid key={ele?.id} container p={1.2}>
              <Grid item container mb={2} alignItems="center">
                <Typography
                  fontWeight={600}
                  variant="h6"
                  sx={{
                    marginRight: 5,
                  }}
                >
                  {ele?.label}
                </Typography>
                <IOSSwitch
                  checked={switchStates[ele?.id] || false}
                  onChange={() => {
                    handleChange(ele?.id);
                  }}
                />
              </Grid>
              <Grid
                pb={3}
                item
                xs={12}
                borderBottom={`1px solid ${theme.palette.neutral[300]}`}
              >
                <Typography variant="body2">{ele?.heading}</Typography>
              </Grid>
              {switchStates[ele?.id] && (
                <Grid item xs={12} py={1}>
                  {ele?.component}
                </Grid>
              )}
            </Grid>
          ))}
          <Box>
            <Button
              sx={{ px: 7.5, my: 2, py: 1 }}
              variant="contained"
              type="submit"
            >
              {isEditOrSave === "Edit" ? "Update" : "Save"}
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}
