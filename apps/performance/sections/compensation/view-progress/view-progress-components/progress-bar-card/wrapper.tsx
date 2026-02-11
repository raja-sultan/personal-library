import { Box, Button, Grid } from "@mui/material";
import ProgressBarCard from ".";
import DoneIcon from "@mui/icons-material/Done";

export interface Card {
  progressName: string;
  achievedProgress: string | number;
  totalProgress: string | number;
  barValue: string | number;
  infoMessage?: string
}
interface Props {
  data: Card[];
  handleConfirmApprove?: () => void;
  isApproved:any
}

export function CardWrapper({ data, handleConfirmApprove, isApproved }: Props): JSX.Element {
  return (
    <Grid container sx={{ mb: "2.4rem" }}>
      <Grid item xxs={12} md={9} lg={7.136}>
        <Box
          display="flex"
          sx={{ flexDirection: { xxs: "column", md: "row" } }}
          gap={2.5}
        >
          {data?.map((card: Card) => (
            <ProgressBarCard key={card.progressName} {...card} />
          ))}
        </Box>
      </Grid>
      {isApproved && (
        <Grid xxs={12} md={3} lg={4.85} sx={styles.card}>
          <Button
            variant="contained"
            startIcon={<DoneIcon />}
            disabled={isApproved?.length === 0}
            onClick={handleConfirmApprove}
          >
            Approve ({isApproved?.length})
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

const styles = {
  card: {
    display: "flex",
    alignItems: "end",
    justifyContent: "end",
    py: { xxs: 1, md: 0 },
  }
}