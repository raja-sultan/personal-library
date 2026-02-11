import React from "react";
import { ThemeModeColor } from "@root/utils";
import { cardStyles } from "./custom-card.styles";
import { Box, Divider, Typography, IconButton } from "@mui/material";
import type { Header, SubHeader } from "./custom-card.types";
import { ArrowBackIcon } from "@assets/icons/arrow-back-icon";

// card header
export function CardHeader(props: Header): React.JSX.Element {
  const styles = cardStyles();
  const { onBack, title, divider, sx, actions, description } = props;
  return (
    <>
      <Box className="custom_card_header" sx={{ ...styles.cardHeader, ...sx }}>
        <Box display="flex" alignItems="center" gap="15px">
          <Box>
            <IconButton size="small" onClick={onBack}>
              <ArrowBackIcon sx={{ color: ThemeModeColor() }} />
            </IconButton>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={400} color="neutral.800">
              {title}
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={400}
              color="text.secondary"
            >
              {description}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap="15px">
          {actions}
        </Box>
      </Box>

      {divider && <Divider />}
    </>
  );
}
// Card sub header
export function CardSubHeader(props: SubHeader): JSX.Element {
  const { title, description, sx, actions } = props;
  const styles = cardStyles();
  return (
    <Box
      className="custom_card_sub_header"
      sx={{ ...styles.cardSubHeader, ...sx }}
    >
      <Box>
        <Typography fontWeight={600} color="text.primary" variant="h5">
          {title}
        </Typography>
        <Typography variant="subtitle2" fontWeight={400} color="text.secondary">
          {description}
        </Typography>
      </Box>
      <Box sx={styles.subHeaderChild}>{actions}</Box>
    </Box>
  );
}
