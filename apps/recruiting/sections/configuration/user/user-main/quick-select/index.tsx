import { LoadingButton } from "@mui/lab";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { CustomModal } from "common";
import React, { useState } from "react";

function QuickSelectModal(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button
        size="small"
        sx={{ color: "neutral.500", borderColor: "neutral.500" }}
        variant="outlined"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Quick Select
      </Button>
      <CustomModal
        onClose={() => {
          setOpenModal(false);
        }}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Quick Select"
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <Box sx={{ maxHeight: { xs: 600, md: "unset" }, overflowY: "auto" }}>
          <Grid container>
            <Grid xs={12} mt={1} item>
              <TextField
                select
                variant="outlined"
                size="small"
                fullWidth
                label="Select a form to copy to selected job"
              >
                <MenuItem value="john doe">john doe</MenuItem>
                <MenuItem value="brooklyn simmons">brooklyn simmons</MenuItem>
              </TextField>
            </Grid>
            <Grid xs={12} mt={2} item display="flex">
              <Box
                ml="auto"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
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
                  size="small"
                  sx={{
                    height: 35,
                  }}
                  type="submit"
                >
                  Bulk Copy Form
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CustomModal>
    </>
  );
}

export default QuickSelectModal;
