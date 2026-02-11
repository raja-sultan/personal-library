import React from "react";
import { ThemeModeColor } from "@root/utils";
import { cardStyles } from "./custom-card.styles";
import { ArrowBackIcon } from "@assets/icons/arrow-back-icon";
import { Box, Divider, Typography, IconButton } from "@mui/material";
import type { Header, SubHeader } from "./custom-card.types";

// card header
export function CardHeader(props: Header): React.JSX.Element {
  const styles = cardStyles();
  const { onBack, title, divider, sx, actions, description, hideBackIcon = false } = props;
  return (
    <>
      <Box className="custom_card_header" sx={{ ...styles.cardHeader, ...sx }}>
        <Box display="flex" alignItems="center" gap="15px">
          {!hideBackIcon && <Box>
            <IconButton size="small" onClick={onBack}>
              <ArrowBackIcon sx={{ color: ThemeModeColor() }} />
            </IconButton>
          </Box>}
          <Box>
            <Typography
              variant="body2"
              fontWeight={400}
              color={ThemeModeColor("neutral.800", "neutral.200")}
            >
              {title}
            </Typography>
            <Typography variant="subtitle2" fontWeight={400} color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap="15px" flexWrap="wrap">
          {actions}
        </Box>
      </Box>

      {divider && <Divider />}
    </>
  );
}
// Card sub header
export function CardSubHeader(props: SubHeader): JSX.Element {
  const { title, description, sx, actions, rootSxCardSubHeader } = props;
  const styles = cardStyles();
  return (
    <Box className="custom_card_sub_header" sx={{ ...styles.cardSubHeader, ...sx }}>
      <Box>
        <Typography fontWeight={600} color="text.primary" variant="h5" sx={rootSxCardSubHeader}>
          {title}
        </Typography>
        {description && (
          <Typography variant="subtitle2" fontWeight={400} color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
      <Box sx={styles.subHeaderChild}>{actions}</Box>
    </Box>
  );
}
