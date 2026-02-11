import React from "react";
import Paper from "@mui/material/Paper";
// import { useTheme } from "@mui/material/styles";

interface CardProps {
  children: React.ReactNode;
}

export function HomeCard(props: CardProps): JSX.Element {
  const { children } = props;

  const cardStyle = {
    p: 1.5,
    mb: 2,
    borderRadius: "16px",
    boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
  };

  return (
    <Paper elevation={3} sx={cardStyle}>
      {children}
    </Paper>
  );
}
