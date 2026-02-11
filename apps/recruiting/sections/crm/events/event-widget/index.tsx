import { Button, Grid, Typography, useTheme } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CustomChip, CustomModal } from "common";
import { MODALTOGGLER, useEventWidget } from "./use-event-widget";
import { ViewDetailModelContent } from "./view-detail-model-content";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import Link from "next/link";

export function EventWidget(): JSX.Element {
  const { widgetInfoCon, toggleViewDetailModel } = useEventWidget();

  const theme = useTheme();

  return (
    <>
      <Grid item container alignItems="center">
        <Grid item sx={{ flexGrow: "1" }}>
          <Typography variant="h5" fontWeight={600}>
            Events
          </Typography>
        </Grid>
        <Grid item>
          <Link href="/create-event">
            <Button size="small" variant="contained" sx={{ height: 30 }}>
              Create Event
            </Button>
          </Link>
          <Link href="/view-events">
            <Button
              size="small"
              variant="outlined"
              sx={{ ml: "0.5em", height: 30 }}
            >
              See All
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid item container direction="column">
        <Grid item container alignItems="center" sx={{ mt: "0.8em" }}>
          <Grid item sx={{ flexGrow: "1" }}>
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{ color: "primary.main" }}
            >
              New Hiring
            </Typography>
          </Grid>
          <Grid item>
            <CustomChip
              variant="success"
              ChipProps={{ label: "Open" }}
              rootSx={{ height: 28 }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" my={1}>
            Lorem ipsum dolor sit amet consectetur. Rutrum et odio.
          </Typography>
          <Typography variant="caption" color={theme.palette.grey[500]}>
            {" "}
            Jan 16 - May 16 - London
          </Typography>
        </Grid>
      </Grid>
      <Grid item container gap={1.5} sx={{ mt: "0.8em" }}>
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={() => {
              toggleViewDetailModel(MODALTOGGLER.DETAILVIEWMODAL);
            }}
            sx={{
              borderColor: "neutral.300",
              color: "neutral.500",
              p: 0.7,
              fontSize: 12,
            }}
          >
            View Details
          </Button>
        </Grid>
        <Grid item>
          <Link href="/create-event">
            <Button
              variant="outlined"
              startIcon={<ModeEditIcon />}
              sx={{
                borderColor: "neutral.300",
                color: "neutral.500",
                p: 0.7,
                fontSize: 12,
              }}
            >
              Edit Details
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            sx={{
              borderColor: "neutral.300",
              color: "neutral.500",
              p: 0.7,
              fontSize: 12,
            }}
            onClick={() => {
              toggleViewDetailModel(MODALTOGGLER.COPYLINKMODAL);
            }}
          >
            Copy Link
          </Button>
        </Grid>
      </Grid>
      <CustomModal
        isOpen={widgetInfoCon?.viewDetailModel}
        rootSx={{
          width: { xs: "90%", sm: "50%" },
          height: { xs: "90%", sm: "90%" },
          overflowY: "auto",
        }}
        onClose={() => {
          toggleViewDetailModel(MODALTOGGLER.DETAILVIEWMODAL);
        }}
        headerLabel="Event Summary"
        closeButtonProps={{
          onClick: () => {
            toggleViewDetailModel(MODALTOGGLER.DETAILVIEWMODAL);
          },
        }}
      >
        <ViewDetailModelContent />
      </CustomModal>
      <CustomModal
        isOpen={widgetInfoCon?.isEditDetailModalOpen}
        rootSx={{ width: { xs: "90%", sm: "50%" } }}
        onClose={() => {
          toggleViewDetailModel(MODALTOGGLER.DETAILEDITMODAL);
        }}
        headerLabel="Edit Detail"
        closeButtonProps={{
          onClick: () => {
            toggleViewDetailModel(MODALTOGGLER.DETAILEDITMODAL);
          },
        }}
      >
        Edit Detail
      </CustomModal>
      <CustomModal
        isOpen={widgetInfoCon?.isCopyLinkModalOpen}
        rootSx={{ width: { xs: "90%", sm: "50%" } }}
        onClose={() => {
          toggleViewDetailModel(MODALTOGGLER.COPYLINKMODAL);
        }}
        closeButtonProps={{
          onClick: () => {
            toggleViewDetailModel(MODALTOGGLER.COPYLINKMODAL);
          },
        }}
        cancelButtonsProps={{
          variant: "outlined",
          onClick: () => {
            toggleViewDetailModel(MODALTOGGLER.COPYLINKMODAL);
          },
        }}
        acceptButtonProps={{
          variant: "contained",
          onClick: () => {
            // accept copy mechanism here
          },
        }}
        footer
        acceptButtonLabel="Copy"
      >
        <Grid
          sx={{
            fontSize: 30,
            display: "flex",
            alignItems: "center",
            mb: 2,
            fontWeight: 900,
          }}
        >
          <WarningAmberRoundedIcon
            color="warning"
            sx={{ fontSize: 40, mr: 2 }}
          />
          Copy Event Link
        </Grid>
        <Typography sx={{ my: 1, color: "neutral.500" }}>
          You are about to copy Link. Are you sure you want to do that?
        </Typography>
      </CustomModal>
    </>
  );
}
