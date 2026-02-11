import {
  Button,
  MenuItem,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Box } from "@mui/system";
import { CustomModal } from "common";
import { FilterByJobsModal } from "./filter-by-jobs-modal";
import { stage } from "../../filter.data";
import { useFilterJobSubmitDropDownQuery } from "@services/candidate/candidate-main/candidate-main-api";

export function Jobs(props: any): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const { params, changeHandler } = props;
  const { data: JobSubmit, isError: JobSubmitError } =
    useFilterJobSubmitDropDownQuery({});

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      gap={1}
    >
      <Button
        startIcon={<FilterAltIcon />}
        size="small"
        variant="outlined"
        sx={{
          color: params.jobIds !== "" ? "primary.main" : "neutral.500",
          borderColor: params.jobIds !== "" ? "primary.main" : "neutral.500",
        }}
        disableRipple
        disableElevation
        disableFocusRipple
        disableTouchRipple
        onClick={() => {
          if (params.jobIds === "") {
            setOpenModal(true);
          } else {
            changeHandler({
              target: {
                name: "jobIds",
                value: "",
              },
            });
          }
        }}
      >
        {params.jobIds !== "" ? "Reset Jobs" : "Filter By Job"}
      </Button>
      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        Stage
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Stage"
        name="jobStage"
        value={params.jobStage}
        onChange={(e) => changeHandler(e, "select")}
      >
        {stage.map((data) => (
          <MenuItem key={data} value={data}>
            {data}
          </MenuItem>
        ))}
      </TextField>
      <Divider variant="fullWidth" orientation="horizontal" />

      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        Job Post Submitted
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Job Post Submitted"
        name="jobPostSubmitted"
        value={params.jobPostSubmitted}
        onChange={(e) => changeHandler(e, "select")}
        disabled={JobSubmitError}
      >
        {JobSubmit?.data.map((data) => (
          <MenuItem key={data._id} value={data._id}>
            {data?.postDetails?.jobName ?? "-"}
          </MenuItem>
        ))}
      </TextField>
      {/* <Divider variant="fullWidth" orientation="horizontal" />
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="To be sent"
        name="toBeSent"
        checked={params.toBeSent}
        onChange={(e) => changeHandler(e, "checkbox")}
        disabled
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Pending submission"
        name="pendingSubmission"
        checked={params.pendingSubmission}
        onChange={(e) => changeHandler(e, "checkbox")}
        disabled
      /> */}
      <CustomModal
        onClose={() => {
          setOpenModal(false);
        }}
        rootSx={{
          maxWidth: 700,
        }}
        headerLabel="Filter jobs"
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <Box
          sx={{
            maxHeight: { xs: 600 },
            pr:2,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: "6px",
            },
          }}
        >
          <FilterByJobsModal
            changeHandlerMain={changeHandler}
            setOpenModal={setOpenModal}
            MainParams={params}
          />
        </Box>
      </CustomModal>
    </Box>
  );
}
