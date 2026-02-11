import CustomModal from "@components/custom-modal";
import { Grid, FormLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export function MarkAsActive({
  open,
  isLoading,
  onClose,
  values,
  handleMarkAsActiveContinue,
  handleMarkAsActiveChange,
}): JSX.Element {
  return (
    <CustomModal
      open={open}
      isLoading={isLoading}
      onClose={onClose}
      title={values.status === "Active" ? "Mark as Inactive" : "Mark as Active"}
      headerIcon={false}
      message={false}
      acceptText="Continue"
      acceptButtonProps={{
        color: "primary",
        onClick: handleMarkAsActiveContinue,
      }}
    >
      <Grid container spacing={2} sx={{ pb: 1 }}>
        <Grid item xs={6}>
          <DatePickerComp
            value={dayjs(values?.cycleStartDate).toDate()}
            label="Cycle Start Date"
            name="cycleStartDate"
            onChange={(e) => {
              handleMarkAsActiveChange(e, "cycleStartDate");
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePickerComp
            value={dayjs(values?.cycleDueDate).toDate()}
            label="Cycle Due Date"
            name="cycleDueDate"
            onChange={(e) => {
              handleMarkAsActiveChange(e, "cycleDueDate");
            }}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

function DatePickerComp({ label, ...rest }): JSX.Element {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <DatePicker
        slotProps={{
          textField: {
            variant: "outlined",
            fullWidth: true,
            size: "small",
          },
        }}
        {...rest}
      />
    </>
  );
}
