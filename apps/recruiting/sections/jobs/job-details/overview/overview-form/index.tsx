import { Card, CardContent } from "@mui/material";
import { ViewForm } from "@sections/jobs/view-jobs";

export function OverviewForm(): JSX.Element {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <ViewForm route={false} />
      </CardContent>
    </Card>
  );
}
