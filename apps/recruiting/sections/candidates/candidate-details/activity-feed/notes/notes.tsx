import { Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";

function Notes(props: any): JSX.Element {
  const theme = useTheme();
  const { dateAndTime, createdBy, note } = props;
  return (
    <Stack
      bgcolor={theme?.palette?.background?.default}
      px={1.3}
      py={2}
      my={1.5}
      borderRadius={1}
      flexDirection="row"
      width="100%"
    >
      <Stack>
        <Typography variant="body1" fontWeight={600}>
          Notes
        </Typography>

        <Typography variant="subtitle2" mt={1} color={theme.palette.grey[600]}>
          {note}
        </Typography>
      </Stack>

      <Stack ml="auto" justifyContent="space-between" alignItems="flex-Start">
        <Typography variant="caption" color={theme.palette.grey[400]}>
          {dayjs(dateAndTime).format("MMM DD,YYYY hh:mm A")}
        </Typography>
        <Typography variant="caption" color={theme.palette.grey[400]}>
          created By:{createdBy}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Notes;
