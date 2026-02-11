import { Box } from "@mui/material";
import { useState } from "react";
import { DeleteFormModal } from "./delete-form-modal";
import { EmailNotification } from "./email-notification";
import { Interview } from "./interview";
import { JobInfo } from "./job-info";
import { JobPosts } from "./job-posts";
import { OverviewForm } from "./overview-form";
import { JobDetailsHeader } from "../job-details-header";

export function OverviewSection(): JSX.Element {
  const [deleteForm, setDeleteForm] = useState<boolean>(false);
  return (
    <Box>
      <JobDetailsHeader mainTitle="Overview" />
      <JobInfo />

      <JobPosts />

      <OverviewForm />

      <Interview />

      <EmailNotification />
      <DeleteFormModal deleteForm={deleteForm} setDeleteForm={setDeleteForm} />
    </Box>
  );
}
