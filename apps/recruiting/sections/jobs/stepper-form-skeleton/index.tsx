import { Skeleton } from "@mui/material";

export default function StepperFormSkeleton() {
  return (
    <Skeleton
      width="100%"
      variant="rectangular"
      sx={{ borderRadius: 2, height: "100%" }}
    />
  );
}
