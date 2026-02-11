import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFRadioGroup,
} from "common";
import { useEffect } from "react";
import { useEmailTeamModal } from "./use-email-modal";
import { tableData } from "./email-modal.data";
import { PreviewModal } from "./preview-modal";
import { styles } from "./email-modal.styles";

export function EmailTeamModal(props): JSX.Element {
  const { open, setOpen, edit } = props;
  const [preview, setPreview] = useState(false);

  //Custom Hook
  const {
    handleSubmit,
    onSubmit,
    methods,
    reset,
    departmentList,
    emailTeamDetails,
  } = useEmailTeamModal();

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);

  return (
    <CustomModal
      onClose={() => {
        setOpen(false);
      }}
      rootSx={styles.modalStyling}
      headerLabel="Draft choreographed introductions template"
      headerSubLabel="This email template introduces a group of a new hires to the organization Choose the
      information you want to share about the new hires and customize the cadence abd recipients"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
      isOpen={open}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.innerCardWrapper}>
          <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
                Template setup
              </Typography>
            </Grid>
            {emailTeamDetails?.emailTeamDetail?.map((item) => (
              <>
                <Grid item xs={12} md={item?.md} key={item.id}>
                  <item.component
                    {...item.componentProps}
                    fullWidth
                    sx={{ py: 0 }}
                  >
                    {item?.componentProps?.options?.map((option: any) => (
                      <option key={option?.id} value={option?.value}>
                        {option?.name}
                      </option>
                    ))}
                  </item.component>
                  {item.id === 2 && (
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "text.secondary", mt: 1.5 }}
                    >
                      New hire cohort criteria
                    </Typography>
                  )}
                  {item.id === 7 && (
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "text.primary", mt: 2 }}
                    >
                      Email Content
                    </Typography>
                  )}
                </Grid>
                {item.id === 6 && (
                  <>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary" }}
                      >
                        Email template schedule
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        All new hires starting in the same week will be included
                        in the email. Weeks are Mon-Sun.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: { xs: "start", sm: "center" },
                          flexDirection: { xs: "column", sm: "row" },
                        }}
                      >
                        <Typography variant="caption">Send email on</Typography>
                        <Box sx={{ width: { xs: "100%", sm: "30%" } }}>
                          <RHFAutocompleteAsync
                            name="day"
                            getOptionLabel={(option: any) =>
                              option?.departmentName
                            }
                            disableCloseOnSelect={false}
                            apiQuery={departmentList}
                            placeholder="Monday"
                          />
                        </Box>
                        <Box sx={{ width: { xs: "100%", sm: "30%" } }}>
                          <RHFAutocompleteAsync
                            name="time"
                            getOptionLabel={(option: any) =>
                              option?.departmentName
                            }
                            disableCloseOnSelect={false}
                            apiQuery={departmentList}
                            placeholder="When"
                          />
                        </Box>
                        <Typography variant="caption">
                          {" "}
                          new hires start.
                        </Typography>
                      </Box>
                    </Grid>
                  </>
                )}
              </>
            ))}
          </Grid>
          <Grid item xs={12}>
            {/* Table Data */}
            <Box sx={styles.tableWrapper}>
              <Typography variant="body2">New Hire Details</Typography>
              <Box sx={{ display: "flex", gap: { xs: 2.5, sm: 8.5 } }}>
                <Typography variant="body2">Show</Typography>
                <Typography variant="body2" sx={{ marginRight: "13px" }}>
                  Hide
                </Typography>
              </Box>
            </Box>
            {tableData.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  px: 0.5,
                }}
              >
                <Typography variant="subtitle2">{item.hireDetails}</Typography>
                <RHFRadioGroup
                  name="customEmailReminder"
                  headerLabel=""
                  sx={{
                    gap: { xs: 2, sm: 8 },
                  }}
                  options={[
                    { value: "custom" },
                    {
                      value: "defaultReminder",
                    },
                  ]}
                />
              </Box>
            ))}
          </Grid>
          <Box sx={styles.buttonsWrapper}>
            <Button
              sx={{ mt: 2, sm: 0 }}
              variant="outlined"
              onClick={() => {
                setOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
            {edit === "edit" ? (
              <Button
                variant="outlined"
                onClick={() => {
                  setPreview(true);
                }}
              >
                Preview
              </Button>
            ) : (
              ""
            )}
            <Button variant="contained" type="submit">
              Save and Exit
            </Button>
          </Box>
        </Box>
      </FormProvider>
      {preview && <PreviewModal preview={preview} setPreview={setPreview} />}
    </CustomModal>
  );
}
