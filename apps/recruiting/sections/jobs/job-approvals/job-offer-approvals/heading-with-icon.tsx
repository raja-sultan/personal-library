import { Typography } from "@mui/material";

export function HeadingWithIcon(props: {
  children: string | JSX.Element | JSX.Element[];
  label: string;
}): JSX.Element {
  return (
    <Typography
      variant="body2"
      sx={{
        color: "#344054",
        display: "flex",
        fontWeight: "600",
        alignItems: "center",
      }}
    >
      {props.label}
      {props.children}
    </Typography>
  );
}
