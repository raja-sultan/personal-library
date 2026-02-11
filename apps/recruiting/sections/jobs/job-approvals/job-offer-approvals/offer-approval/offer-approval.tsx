import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { HeadingWithIcon } from "../heading-with-icon";
import BasicMenu from "./options";
import { ApprovalStepModel } from "./approval-step-modal/approval-step-modal";
import { JobApprovalContext } from "../../use-job-approval-context";
import { DragAndDropItems } from "./drag-and-drop-items";

export function OfferApproval(): JSX.Element {
  const {
    jobApprovalInfoCon,
    openOfferStepModelToggle,
    dNdUsersForOfferApproval,
    setDNdUsersForOfferApproval,
    removeUserFromOfferApproval,
  } = useContext(JobApprovalContext);

  return (
    <Grid container>
      <Grid item lg={12}>
        <Typography variant="h4" sx={{ fontSize: "2rem" }}>
          Offer Approvals
        </Typography>
      </Grid>
      <Grid item lg={12} container justifyContent="center">
        <Grid
          item
          sx={{
            flexGrow: "1",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HeadingWithIcon label="To extend offers to candidates">
            <InfoOutlinedIcon sx={{ ml: "0.2em" }} />
          </HeadingWithIcon>
        </Grid>
        <Grid item>
          <BasicMenu />
        </Grid>
      </Grid>
      <Grid
        sx={{
          border: "1px solid #D0D5DD",
          borderRadius: "0.8em",
          margin: "0.5em 0",
          p: "0.5em",
        }}
        item
        lg={12}
      >
        <DragAndDropItems
          items={dNdUsersForOfferApproval}
          setItems={setDNdUsersForOfferApproval}
          removeUser={removeUserFromOfferApproval}
        />
      </Grid>
      <Grid item lg={12}>
        <Typography
          variant="body1"
          sx={{ color: "primary.main", cursor: "pointer" }}
          onClick={openOfferStepModelToggle}
        >
          Add approval step
        </Typography>
      </Grid>
      <ApprovalStepModel
        closeModel={openOfferStepModelToggle}
        isOpen={jobApprovalInfoCon.isOfferStepModelOpen}
      />
    </Grid>
  );
}
