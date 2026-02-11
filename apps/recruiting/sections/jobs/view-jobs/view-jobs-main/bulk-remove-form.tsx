import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Box } from "@mui/system";
import toast from "react-hot-toast";
import {
  useListFormDropDownQuery,
  usePatchCopyFromMutation,
} from "@services/jobs/viewJobMain/view-job-main";
import { LoadingButton } from "@mui/lab";

export function BulkRemoveForm({
  setShowRemoveForm,
  selectedRowJobs,
}: {
  setShowRemoveForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRowJobs: any;
}): JSX.Element {
  const { data } = useListFormDropDownQuery({});
  const [PatchCopyFrom, { isLoading }] = usePatchCopyFromMutation({});
  const [onSelected, setOnSelected] = useState<any>({});
  const OnChangeHandler = (event): any => {
    setOnSelected({ selectedValue: event.target.value });
  };
  const removeData = (): any => {
    const jobIds = selectedRowJobs.filter((rowData) =>
      onSelected.selectedValue.jobs.includes(rowData._id)
    );
    if (onSelected.selectedValue && jobIds.length > 0) {
      PatchCopyFrom({
        body: { jobIds },
        params: {
          formId: onSelected?.selectedValue?._id,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("Form removed successfully");
          setShowRemoveForm(false);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error(
        `The ${onSelected?.selectedValue?.formName} form is not in the selected jobs`
      );
    }
  };

  return (
    <>
      <Grid container>
        <Grid xs={12} mt={1} item>
          <TextField
            select
            variant="outlined"
            size="small"
            fullWidth
            label="Select a form to copy to selected job"
            onChange={OnChangeHandler}
          >
            {data?.data?.map((list: any) => (
              <MenuItem key={data._id} value={list}>
                {list?.formName ?? "-"}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid container>
        {onSelected.selectedValue && (
          <Grid mt={2} xs={12} item>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignContent="center"
              gap={1}
            >
              <Box>
                <Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle1" color="text.primary">
                      You are about to remove from
                    </Typography>
                    <Box fontWeight={800}>
                      {onSelected?.selectedValue?.formName}
                    </Box>
                    <Typography variant="subtitle1" color="text.primary">
                      {selectedRowJobs.length} job
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="flex-start"
              gap={1}
              flexDirection="column"
              sx={{
                overflowY: "auto",
                maxHeight: 100,
                py: 2,
                px: 2,
                "&::-webkit-scrollbar": {
                  width: "5px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#cacaca",
                  borderRadius: "10px",
                },
              }}
              mt={1}
            >
              {selectedRowJobs.map((stageList) => (
                <Typography key={stageList._id} variant="h6" color="primary">
                  {stageList?.jobInfo?.jobName ?? "-"} (
                  {stageList?.requisitionId ?? "-"})
                </Typography>
              ))}
            </Box>
          </Grid>
        )}

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
                setShowRemoveForm(false);
              }}
              size="small"
              variant="outlined"
            >
              Cancel
            </Button>
            <LoadingButton
              disabled={!onSelected.selectedValue}
              loading={isLoading}
              variant="contained"
              size="small"
              sx={{
                height: 35,
              }}
              type="submit"
              onClick={removeData}
            >
              Remove Bulk Form
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
