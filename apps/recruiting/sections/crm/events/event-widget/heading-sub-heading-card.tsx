import { Typography } from "@mui/material";

export function HeadingSubHeadingCard({
  heading,
  subHeading,
}: {
  heading?: string;
  subHeading?: string;
}): JSX.Element {
  return (
    <>
      <Typography variant="body2" sx={{ color: "neutral.800", mb: "0.6em" }}>
        {heading ?? heading}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        {subHeading ?? subHeading}
      </Typography>
    </>
  );
}
