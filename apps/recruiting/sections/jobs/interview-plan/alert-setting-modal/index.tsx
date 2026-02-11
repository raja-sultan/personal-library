import { CustomModal } from "common";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  useAddAlertDaysMutation,
  useGetAlertSettingDataQuery,
  // useUpdateAlertDaysMutation,
} from "@services/jobs/create-jobs/interview-plan/interview-plan-api";
import { Edit, Save } from "@assets/common";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export function AlertSettingModal(props: any): JSX.Element {
  const { alertSetting, setAlertSetting } = props;
  const theme = useTheme();

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const { data, isLoading, isError, isSuccess }: any =
    useGetAlertSettingDataQuery({ jobId });
  const stagesData = data?.data?.stageAlertSetting;

  const [addAlertDays] = useAddAlertDaysMutation();

  const [showDays, setShowDays] = useState(true);

  const displayDays = () => {
    setShowDays(!showDays);
  };

  const [updateDays, setUpdateDays] = useState<any>(null);

  useEffect(() => {
    const stageAlertData = stagesData?.map((item) => {
      return { ...item, days: item?.days ?? "" };
    });
    setUpdateDays(stageAlertData);
  }, [stagesData]);
  const saveTitle = async () => {
    try {
      const { message }: any = await addAlertDays({
        jobId,
        payload: {
          stageAlertSetting: updateDays,
        },
      }).unwrap();
      toast.success(message || "Stage title updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "error occur");
    }
    setAlertSetting(false);
    setShowDays(true);
  };

  const changeHandler = (e, stageId, _) => {
    const desArray = [...updateDays];
    const index = updateDays?.findIndex((item) => item.stageId === stageId);
    desArray[index] = {
      ...desArray[index],
      days: e,
    };
    setUpdateDays(desArray);
  };

  return (
    <CustomModal
      onClose={setAlertSetting}
      rootSx={{
        maxWidth: 530,
        px: 3.5,
      }}
      footer={stagesData?.length}
      headerLabel="Stage Alert Settings"
      acceptButtonLabel="Save"
      cancelButtonsProps={{
        onClick: () => {
          setShowDays(true);
          setAlertSetting(false);
        },
      }}
      acceptButtonProps={{
        variant: "contained",
        onClick: () => {
          saveTitle().catch(() => {});
        },
      }}
      closeButtonProps={{
        onClick: () => {
          setShowDays(true);
          setAlertSetting(false);
        },
      }}
      isOpen={alertSetting}
    >
      {isLoading && (
        <Box>
          {" "}
          <Typography variant="h6" my={2} align="center">
            Loading
          </Typography>
        </Box>
      )}
      {isError && (
        <Box>
          {" "}
          <Typography variant="h6" my={2} align="center" color="error">
            Something went wrong
          </Typography>
        </Box>
      )}
      {isSuccess && (
        <Grid container flexWrap="nowrap" direction="column" mt={2}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
            }}
            mt={1}
          >
            Personnel Library Can Alert You When Candidates Are In A Stage For
            Too Long, Ensuring That No One Falls Through The Cracks
          </Typography>

          <Typography
            variant="body2"
            fontWeight={600}
            color={theme.palette.text.primary}
            my={2}
          >
            Alert When A Candidate Is In A Stage Longer Than:
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {showDays
              ? updateDays?.length > 0 && (
                  <IconButton
                    onClick={() => {
                      displayDays();
                    }}
                  >
                    <Edit />
                  </IconButton>
                )
              : updateDays?.length > 0 && (
                  <IconButton
                    onClick={() => {
                      displayDays();
                    }}
                  >
                    <Save />
                  </IconButton>
                )}
          </Box>
          {updateDays?.length ? (
            updateDays?.map((item: any) => {
              return (
                <Box
                  key={item?.stageId}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    color={theme.palette.text.primary}
                  >
                    {item?.stageName}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {showDays ? (
                      <Typography
                        variant="body2"
                        color="primary"
                        onClick={() => {
                          setShowDays(!showDays);
                        }}
                        sx={{ mr: 2 }}
                      >
                        {item?.days ? item?.days : 0} days
                      </Typography>
                    ) : (
                      <TextField
                        type="text"
                        variant="outlined"
                        value={item?.days}
                        size="small"
                        sx={{
                          bgcolor: theme.palette.background.paper,
                          width: 110,
                        }}
                        onChange={(e) => {
                          changeHandler(
                            e.target.value,
                            item?.stageId,
                            item?.stageName
                          );
                        }}
                      />
                    )}
                  </Box>
                </Box>
              );
            })
          ) : (
            <Typography
              align="center"
              color={theme?.palette?.warning?.light}
              fontWeight={600}
              variant="body1"
              sx={{ py: 2 }}
            >
              {" "}
              No Alerts Setting Found{" "}
            </Typography>
          )}
        </Grid>
      )}
    </CustomModal>
  );
}
