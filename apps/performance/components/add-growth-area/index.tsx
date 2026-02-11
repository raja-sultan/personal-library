import { Box, Button, DialogActions, Grid, IconButton, TextField, Typography } from "@mui/material";
import { FormProvider, RHFDatePicker, RHFTextField } from "common";
import CustomModal from "@components/custom-modal";
import { useAddGrowthAreas } from "./use-add-growth-area";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { TrashIcon } from "@assets/icons/trash-icon";
import { LoadingButton } from "@mui/lab";
import { styles } from "./add-growth-areas-style";

export function AddGrowthAreas({ id: growthId, data, openAddGrowthModal, handleOpenAddGrowthModal }: any): JSX.Element {
  const {
    onSubmit,
    handleSubmit,
    methods,
    toggleInput,
    setToggleInput,
    handleClose,
    handleInputChange,
    handleDeleteGrowthActions,
    handleAddGrowthActions,
    inputValue,
    actionId,
    setActionId,
    isEditLoading
  } = useAddGrowthAreas({ growthId, data, handleOpenAddGrowthModal });

  return (
    <CustomModal open={openAddGrowthModal} onClose={handleOpenAddGrowthModal} message={false} title="Growth Area" headerIcon={false} hideFooter>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} marginBottom="4rem">
            <RHFTextField size="small" name="title" outerLabel="Title" placeholder="Enter name" />
          </Grid>

          <Grid item xs={12} marginBottom="4rem">
            <RHFTextField
              size="small"
              name="description"
              outerLabel="Description (Optional)"
              placeholder="Enter a description..."
              multiline
              rows={3}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} marginBottom="4rem">
            <RHFTextField size="small" name="growthPeriod" outerLabel="Growth Period" placeholder="0 month" />
          </Grid>

          <Grid item xs={12} md={6}>
            <RHFDatePicker size="small" name="dueDate" outerLabel="Due Date" />
          </Grid>

          <Grid item xs={12}>
            <Box sx={styles.scrollStyle}>
              {data?.actions?.length > 0 ? (
                data.actions.map((item) => (
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} gap={1} key={item._id}>
                    <TextField
                      size="small"
                      fullWidth
                      onChange={handleInputChange}
                      variant="outlined"
                      disabled
                      value={item?.actions}
                      sx={{ flex: 1 }}
                    />
                    <Box mt={0}>
                      <LoadingButton loading={item?._id === actionId} size="small" onClick={() => { handleDeleteGrowthActions(item?._id); setActionId(item?._id) }}>
                        <TrashIcon />
                      </LoadingButton>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" align="center">
                  No actions available yet.
                </Typography>
              )}
            </Box>
          </Grid>

          {toggleInput && (
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" justifyContent="space-between" gap='5px'>
                <TextField
                  size="small"
                  fullWidth
                  onChange={handleInputChange}
                  variant="outlined"
                  value={inputValue}
                  placeholder="Add question"
                  sx={{ flex: 1 }}
                />
                <Box mt={0}>
                  <IconButton size="small">
                    <CancelOutlinedIcon
                      onClick={handleClose}
                      sx={{
                        color: "#98A2B3",
                        cursor: "pointer",
                        fontSize: "28px",
                      }}
                    />
                  </IconButton>
                  <IconButton size="small" disabled={!inputValue}
                    onClick={() => {
                      handleAddGrowthActions(growthId);
                    }}>
                    <AddCircleOutlineOutlinedIcon
                      sx={{
                        color: "#98A2B3",
                        cursor: "pointer",
                        fontSize: "28px",
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} paddingTop="0px">
            <Box
              display="flex"
              gap="5px"
              onClick={() => {
                setToggleInput(true);
              }}
            >
              <AddCircleOutlineOutlinedIcon
                sx={{
                  color: "#98A2B3",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              />
              <Typography variant="body2" fontWeight="400" color="text.secondary" sx={{ cursor: "pointer" }}>
                Actions
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <DialogActions sx={{ mt: 2, gap: "10px", flexWrap: "wrap" }}>
              <Button variant="outlined" onClick={handleOpenAddGrowthModal}>
                Cancel
              </Button>
              <LoadingButton loading={isEditLoading} variant="contained" type="submit">
                Share
              </LoadingButton>
            </DialogActions>
          </Grid>
        </Grid>
      </FormProvider>
    </CustomModal>
  );
}
