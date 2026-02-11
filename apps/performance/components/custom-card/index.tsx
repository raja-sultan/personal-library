"use client";
import React from "react";
import { Box, Card } from "@mui/material";
import { cardStyles } from "./custom-card.styles";
import type { CardWrapper } from "./custom-card.types";
import { CardHeader, CardSubHeader } from "./custom-card-header";

function CustomCard(props: CardWrapper): React.JSX.Element {
  const styles = cardStyles();
  const {
    header = false,
    subHeader = false,
    cardHeader,
    cardSubHeader,
    cardProps = {},
    cardContentProps = {},
    children,
  } = props;

  return (
    <Card
      className="custom_card"
      sx={{ ...styles.card, ...cardProps.sx }}
      {...cardProps}
    >
      {header && <CardHeader {...cardHeader} />}
      {subHeader && <CardSubHeader {...cardSubHeader} />}
      {children && (
        <Box
          className='content_wrapper'
          sx={{
            py: 1.6,
            px: { xs: 1.6, md: 2.4 },
            ...cardContentProps,
          }}
        >
          {children}
        </Box>
      )}
    </Card>
  );
}
export default CustomCard;