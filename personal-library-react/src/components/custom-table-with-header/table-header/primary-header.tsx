import { Box, Typography } from "@mui/material";
import type { TablePrimaryHeaderProps } from "../custom-table.interface";
import { customTableStyles } from "../custom-table.styles";

export function TablePrimaryHeader(
  props: TablePrimaryHeaderProps
): JSX.Element {
  const { removeMargin, title, description, actions } = props;

  const styles = customTableStyles();
  return (
    <Box
      sx={{ ...styles.tablePrimaryHeader, mb: removeMargin ? "20px" : "0px" }}
      className="custom_table_header"
    >
      <Box>
        <Typography fontWeight={600} variant="h5">
          {title}
        </Typography>
        <Typography variant="subtitle2" fontWeight={400} color="text.secondary">
          {description}
        </Typography>
      </Box>
      <Box sx={styles.headerChildren}>{actions}</Box>
    </Box>
  );
}
