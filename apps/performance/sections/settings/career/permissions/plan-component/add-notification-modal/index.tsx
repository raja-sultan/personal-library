import CustomModal from "@components/custom-modal";
import {
  Box,
  Button,
  DialogActions,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  FormProvider,
  RHFDatePicker,
  RHFSwitch,
  RHFTextField,
  RHFTimePicker,
} from "common";
import { useAddNotificationModal } from "./use-add-notification-modal";

const options = [
  {
    value: "UTC (Coordinated Universal Time)",
    label: "UTC (Coordinated Universal Time) ",
  },
  {
    value: "GMT (Greenwich Mean Time)",
    label: "GMT (Greenwich Mean Time)",
  },
  {
    value: "EST (Eastern Standard Time)",
    label: "EST (Eastern Standard Time)",
  },
  {
    value: "CST (Central Standard Time)",
    label: "CST (Central Standard Time)",
  },
  {
    value: "MST (Mountain Standard Time)",
    label: "MST (Mountain Standard Time)",
  },
  {
    value: "PST (Pacific Standard Time)",
    label: "PST (Pacific Standard Time)",
  },
];

export function AddNotificationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): JSX.Element {
  const { handleSubmit, methods, onSubmit } = useAddNotificationModal({
    onClose,
  });
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      headerIcon={false}
      message={false}
      title="Notification"
      hideFooter
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack px="10px" gap="2rem">
          <RHFTextField
            name="subject"
            fullWidth
            outerLabel="Subject"
            size="small"
            placeholder="Enter subject..."
          />
          <Box>
            <RHFTextField
              name="body"
              fullWidth
              outerLabel="Body"
              multiline
              minRows={3}
              placeholder="Enter a body..."
            />
            <Typography variant="caption" color="neutral.500">
              Notification will be sent to all managers with Career enabled
            </Typography>
          </Box>
          <RHFSwitch
            name="reminder"
            label="Send reminder to managers"
            size="small"
            sx={{ pl: 1, gap: "24px", "& ._label": { fontSize: "1.4rem" } }}
            classes={{ label: "_label" }}
          />
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              <RHFDatePicker
                name="sendDate"
                size="small"
                outerLabel="Send date"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <RHFTimePicker name="timePicker" size="small" outerLabel="Time" />
            </Grid>
            <Grid item md={4} xs={12}>
              <RHFTextField
                select
                name="timezone"
                size="small"
                outerLabel="Timezone"
              >
                {options?.map((option: { value?: string; label?: string }) => (
                  <MenuItem value={option.value} key={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFTextField>
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </Stack>
      </FormProvider>
    </CustomModal>
  );
}
