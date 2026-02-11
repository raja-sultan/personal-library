"use client";
import { DragDropIcon } from "@assets/icons/drag-and-drop-icon";
import { EditIcon } from "@assets/icons/edit-icon";
import { CustomAlert } from "@components/alert";
import CustomCard from "@components/custom-card";
import { CustomGridLayout } from "@components/custom-grid-layout/custom-grid-layout";
import CustomModal from "@components/custom-modal";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  FormLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
} from "@root/../../packages/common";
import { useRouter } from "next/navigation";
import { useSetting } from "./use-setting";
import { CircleDeleteIcon } from "@assets/icons";

export function UpdateSetting(): JSX.Element {
  const router = useRouter();
  const {
    handleSubmit,
    methods,
    onSubmit,
    addModal,
    setEditQuestionId,
    handleSubmitQuestion,
    handleOpenModal,
    inputValue,
    openDeleteModal,
    handleInputChange,
    handleOpenDeleteModal,
    handleDeleteQuestion,
    setAddModal,
    editQuestionId,
    questions,
    isEdit,
    isLoading,
  } = useSetting();

  const selectProps = {
    select: true,
    size: "small",
    SelectProps: { displayEmpty: true },
    sx: { maxWidth: "500px" },
  };

  return (
    <>
      <CustomCard
        header
        cardHeader={{
          divider: true,
          title: "Settings",
          onBack: () => {
            router.push("/my-team?tab=2");
          },
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <CustomGridLayout title="Updates settings">
            <RHFTextField name="updateSetting" {...selectProps}>
              <MenuItem selected value="custom team setting">
                Custom Team Settings
              </MenuItem>
              <MenuItem value="company default setting">
                Company Default Settings
              </MenuItem>
            </RHFTextField>
          </CustomGridLayout>

          <CustomGridLayout
            title="Enable Updates for all direct reports"
            description="Your direct reports will receive reminders to write updates at the set cadence. This will include new direct reports, who will have Updates turned on automatically when they start."
          >
            <RHFSwitch name="enableUpdates" sx={{ ml: 0.2 }} />
          </CustomGridLayout>

          <CustomGridLayout
            title="Questions"
            description="These questions are always asked to your reports"
          >
            <Button
              startIcon={<Add />}
              variant="contained"
              size="small"
              onClick={() => {
                handleOpenModal("");
              }}
              sx={{ mb: "28px" }}
            >
              Add Question
            </Button>
            <Box sx={isLoading ? styles.loaderStyle : null}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                questions?.data?.map((item) => (
                  <Box
                    key={item._id}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    width="100%"
                    mt="1.6rem"
                    sx={{ border: "1px solid #EAECF0", borderRadius: "8px" }}
                  >
                    <Box p="2.4rem 1.6rem" pr={0}>
                      <DragDropIcon />
                    </Box>
                    <Typography
                      flex={1}
                      minHeight="80px"
                      borderLeft="1px solid #EAECF0"
                      py="2.4rem"
                      pl="1.6rem"
                      variant="subtitle1"
                      fontWeight={400}
                      style={{ wordBreak: "break-all" }}
                    >
                      {item.text}
                    </Typography>
                    <Box pr="1.6rem" display="flex" gap="1.5rem">
                      <EditIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          handleOpenModal("Edit", item.text);
                          setEditQuestionId(item?._id);
                        }}
                      />
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </CustomGridLayout>

          <CustomGridLayout
            title="Schedule"
            description="When and how often Updates reminders are sent out"
            childrenBreakPoints={{ md: 5.5, xs: 12 }}
          >
            <Stack gap="24px">
              <Stack gap="42px">
                <RHFTextField
                  name="frequency"
                  outerLabel="Frequency"
                  {...selectProps}
                >
                  {[
                    { value: "weekly", label: "Weekly" },
                    { value: "bi-weekly", label: "Bi-Weekly" },
                    { value: "monthly", label: "Monthly" },
                    { value: "quarterly", label: "Quarterly" },
                  ].map((option) => (
                    <MenuItem key={option?.value} value={option?.value}>
                      {option?.label}
                    </MenuItem>
                  ))}
                </RHFTextField>

                <RHFTextField name="day" outerLabel="Day" {...selectProps}>
                  {[
                    { value: "monday", label: "Monday" },
                    { value: "tuesday", label: "Tuesday" },
                    { value: "wednesday", label: "Wednesday" },
                    { value: "thursday", label: "Thursday" },
                    { value: "friday", label: "Friday" },
                    { value: "saturday", label: "Saturday" },
                    { value: "sunday", label: "Sunday" },
                  ].map((option) => (
                    <MenuItem key={option?.value} value={option?.value}>
                      {option?.label}
                    </MenuItem>
                  ))}
                </RHFTextField>

                <RHFTextField name="time" outerLabel="Time" {...selectProps}>
                  {[
                    { value: "9:00am", label: "9:00 AM" },
                    { value: "9:30am", label: "9:30 AM" },
                    { value: "10:00am", label: "10:00 AM" },
                    { value: "10:30am", label: "10:30 AM" },
                    { value: "11:00am", label: "11:00 AM" },
                    { value: "11:30am", label: "11:30 AM" },
                    { value: "12:00am", label: "12:00 AM" },
                  ].map((option) => (
                    <MenuItem key={option?.value} value={option?.value}>
                      {option?.label}
                    </MenuItem>
                  ))}
                </RHFTextField>
              </Stack>
              <CustomAlert message="Reminder will be sent out at 9:00 AM in each employees's set timezone. If no timezone is set, it will default to the company's set time zone london." />
            </Stack>
          </CustomGridLayout>

          <DialogActions>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </FormProvider>
      </CustomCard>

      {addModal && (
        <CustomModal
          open={addModal}
          onClose={() => {
            setAddModal(false);
          }}
          title={isEdit ? "Edit Question" : "Add Question"}
          hideFooter
          headerIcon={false}
          message={false}
        >
          <Stack direction="column" spacing={2}>
            <Box>
              <FormLabel>Question</FormLabel>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                name="question"
                fullWidth
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            </Box>
            <Box
              display="flex"
              justifyContent={isEdit ? "space-between" : "flex-end"}
            >
              {isEdit && (
                <CircleDeleteIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    handleOpenDeleteModal();
                    setEditQuestionId(editQuestionId);
                  }}
                />
              )}
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setAddModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmitQuestion}>
                  {isEdit ? "Save" : "Add"}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CustomModal>
      )}
      {openDeleteModal && (
        <CustomModal
          message=" This will be permanently deleted from Personnel Library .Are you sure you want to delete this question"
          open={openDeleteModal}
          onClose={handleOpenDeleteModal}
          onAccept={handleDeleteQuestion}
        />
      )}
    </>
  );
}

const styles = {
  questionWrapper: ({ palette: { neutral } }) => ({
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    border: `1px solid ${neutral[200]}`,
    borderRadius: "8px",
    mb: "12px",
  }),
  questionIcon: ({ palette: { neutral } }) => ({
    borderRight: `1px solid ${neutral[200]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
  }),
  loaderStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100px",
  },
};
