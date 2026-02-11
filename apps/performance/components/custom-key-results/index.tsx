import { TableActionsIcon } from "@assets/icons/table-action-icon";
import CustomCard from "@components/custom-card";
import { Box, Button, Divider, LinearProgress, MenuItem, Typography } from "@mui/material";
import { renderUserImage } from "@root/utils/render-user-image";
import { TableIconActions } from "common";
import type { CustomKeyResultsProps } from "./custom-key-results-types";
import { customKeyResultsStyles } from "./custom-key-results-styles";

export function CustomKeyResults(props: CustomKeyResultsProps): React.JSX.Element {
  const {
    title,
    // currency,
    // binary,
     percentage,
    // Usd,
    // number,
    progress,
    startValue,
    targetValue,
    handleCheckIn,
    onEditClick,
    onDeleteClick,
    owner,
  } = props
  const styles = customKeyResultsStyles();

  console.log("owner",owner)

  return (
    <CustomCard cardProps={{ sx: { height: "100%" } }}>
      <Box display='flex' flexWrap='wrap' gap='8px' minHeight="10rem" mb={1}>
        <Typography variant="body2" fontWeight="600" color='text.primary' flex={1}>
          {title}
        </Typography>
        <Typography variant="subtitle2" fontWeight={600} color='text.secondary'>
          {/* {currency || percentage || binary || Usd || number} */}
          {percentage}
        </Typography>
      </Box>

      <LinearProgress
        value={progress}
        variant="determinate"
        classes={{ bar: '_bar' }}
        sx={styles.wrap_progress_bar}
      />
      <Box display='flex' alignItems='center' justifyContent='space-between' flexWrap='wrap' gap='16px' >
        <Typography variant="subtitle2" fontWeight={400} color='text.secondary'>
          {startValue}
        </Typography>
        <Typography variant="subtitle2" fontWeight={400} color='text.secondary'>
          {targetValue}
        </Typography>
      </Box>
      <Divider sx={styles.divider_style} />
      <Box display="flex" alignItems='center' flex='wrap' gap='10px'>
        {renderUserImage({ profileImage: owner?.profileImage, firstName: owner?.firstName, lastName: owner?.lastName, height: "48px", width: '48px' })}
        <Button
          sx={styles.check_in_button}
          variant="outlined"
          size="small"
          fullWidth
          onClick={handleCheckIn}
        >
          Check In
        </Button>

        <TableIconActions icon={<TableActionsIcon />} selectButtonProps={{ sx: styles.actions }}>
          <MenuItem onClick={onEditClick}>Edit</MenuItem>
          <MenuItem onClick={onDeleteClick}>Delete</MenuItem>
        </TableIconActions>
      </Box>
    </CustomCard>
  )
}