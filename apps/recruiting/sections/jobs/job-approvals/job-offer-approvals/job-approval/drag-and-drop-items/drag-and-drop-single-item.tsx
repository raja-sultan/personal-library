import { Grid, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ClearIcon from "@mui/icons-material/Clear";

export function DragAndDropSingleItemNew({ name = "Test", removeUser }) {
  return (
    <Grid container item lg={12} alignItems="center">
      <Grid item>
        <IconButton aria-label="delete" sx={{ cursor: "grab" }} disableRipple>
          <DragIndicatorIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">{name}</Typography>
      </Grid>
      <Grid item>
        <IconButton aria-label="delete" disableRipple onClick={removeUser}>
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
