import React from "react";
import { Box, Typography, Button, type SxProps } from "@mui/material";
import CustomCard from "@components/custom-card";

interface NoDataFoundProps {
  icon?: React.ReactNode;
  buttonText?: string;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  onButtonClick?: () => void;
  sx?: React.CSSProperties | SxProps;
  isCustomCard?: boolean;
}

export function NoDataFound({
  icon,
  buttonText,
  heading,
  description,
  onButtonClick,
  isCustomCard,
  sx,
}: NoDataFoundProps): JSX.Element {
  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        textAlign: "center",
        ...sx,
      }}
    >
      {icon}
      {heading && <Typography variant="h5" fontWeight={600} color="text.primary" marginBottom="2rem">
        {heading}
      </Typography>}
      {description && <Typography variant="body2" color="text.primary" marginBottom="4.8rem">
        {description}
      </Typography>}
      {buttonText && <Button onClick={onButtonClick}>{buttonText}</Button>}
    </Box>
  );

  return isCustomCard ? <CustomCard>{content}</CustomCard> : <Box>{content}</Box>;
}
