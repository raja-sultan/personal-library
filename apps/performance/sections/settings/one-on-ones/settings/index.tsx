"use client";
import {
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Switch,
  Stack,
  DialogActions,
} from "@mui/material";
import { FormProvider, RHFCustomSelect, RHFTextField } from "common";
import CustomModal from "@components/custom-modal";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
// import { InputArrowDownIcon } from "@assets/icons/input-arrow-down-icon";
import { monthList } from "@components/custom-appointment-repeat/custom-appointment-repeat.data";
import CustomCard from "@components/custom-card";
import { settingsStyles } from "./setting.styles";
import { useSetting } from "./use-setting";
import { settingsData } from "./setting.data";
import { PermissionProtected } from "@guards/permission-protected";

export function Settings(): JSX.Element {
  const {
    openCustomModal,
    setOpenCustomModal,
    modalFilledData,
    expandedAccordion,
    handleAccordionChange,
    methods,
    handleSubmit,
    // setValue,
    reset,
    // repeatReminder,
    onSubmit,
    confirmMail,
    meetingMail,
    handleToggleMailModal,
    modalType,
  } = useSetting();
  const styles = settingsStyles();
  return (
    <>
      <CustomCard
        subHeader
        cardSubHeader={{
          title: "Settings",
          description:
            "Allow your teams to have effective in person conversation",
        }}
      />
      {settingsData.map((accordion) => {
        return (
          <PermissionProtected permission={accordion.permission} key={accordion.name} disabled>
            <Accordion
              expanded={expandedAccordion === accordion?._id}
              onChange={() => {
                handleAccordionChange(accordion?._id);
              }}
              sx={{ borderRadius: 1 }}
            >
              <AccordionSummary
                aria-controls="accordion-content"
                id="accordion-header"
                sx={styles.accordionMainBox}
              >
                <Box sx={styles.childBox}>
                  <Box sx={styles.firstChildBox}>
                    <ExpandCircleDownOutlinedIcon
                      sx={expandedAccordion === accordion?._id && styles.myMuiIcon}
                    />
                    <Typography variant="h6" fontWeight="600" color="text.primary">
                      {accordion.name}
                    </Typography>
                  </Box>
                  {accordion.switch && (
                    <Box sx={styles.secondChildBox}>
                      <Switch
                        checked={
                          accordion?.type === "confirm"
                            ? confirmMail
                            : meetingMail
                        }
                        inputProps={{ "aria-label": "controlled" }}
                        onChange={({ target }) => {
                          handleToggleMailModal(target?.checked, accordion?.type);
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={styles.accordionDetails}>
                <accordion.component />
              </AccordionDetails>
            </Accordion>
          </PermissionProtected>
        );
      })}
      <CustomModal
        open={openCustomModal}
        onClose={() => {
          setOpenCustomModal(false);
          reset();
        }}
        title={modalFilledData.name}
        hideFooter
        headerIcon={false}
        message={false}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Stack direction="column" spacing={2}>
              {modalType === "meeting" && (
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    color="neutral.700"
                    mb="0.6rem"
                  >
                    Scheduled Reminder email
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1.9}>
                    <RHFTextField
                      size="small"
                      name="limitOneOnOne"
                      variant="outlined"
                      type="number"
                      fullWidth
                      InputProps={{
                        inputProps: {
                          min: 1,
                        },
                      }}
                    />
                    <RHFCustomSelect
                      name="reminderMailSchedule"
                      placeholder="Select month"
                      options={monthList}
                      size="small"
                    />
                  </Box>
                </Box>
              )}
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="neutral.700"
                  mb="0.6rem"
                >
                  Subject
                </Typography>
                <RHFTextField
                  size="small"
                  name="subjectField"
                  variant="outlined"
                  fullWidth
                  defaultValue=""
                  placeholder={modalFilledData.subject}
                />
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="neutral.700"
                  mb="0.6rem"
                >
                  Body
                </Typography>
                <RHFTextField
                  size="small"
                  name="bodyField"
                  variant="outlined"
                  fullWidth
                  defaultValue=""
                  multiline
                  rows={3}
                  placeholder={modalFilledData.body}
                />
              </Box>
            </Stack>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenCustomModal(false);
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </DialogActions>
          </Stack>
        </FormProvider>
      </CustomModal>
    </>
  );
}
