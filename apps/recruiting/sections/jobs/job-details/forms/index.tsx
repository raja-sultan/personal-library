import { Box } from "@mui/material";
import { jobActions } from "@root/slices/jobs/reducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { JobDetailsHeader } from "../job-details-header";
import FormDetailsTable from "./form-details-table";
import CreateForm from "./form-fields-section/create-form";

export default function FormsSection(): JSX.Element {
  const editMode = useSelector((state: any) => state.jobs.editMode);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(jobActions.reset());
  }, [dispatch]);

  return (
    <Box>
      <JobDetailsHeader mainTitle="Forms" />
      {editMode ? <CreateForm route /> : <FormDetailsTable />}
    </Box>
  );
}
