"use client";
import { Box, Card } from "@mui/material";
import { CustomTable } from "@root/../../packages/common";
import { TablePrimaryHeader } from "./table-header/primary-header";
import { TableSecondaryHeader } from "./table-header/secondary-header";
import type { CustomTableWithHeaderProps } from "./custom-table.interface";
import { customTableStyles } from "./custom-table.styles";

export function CustomTableWithHeader(props: CustomTableWithHeaderProps): JSX.Element {
  const {
    primaryHeader,
    primaryHeaderProps,
    secondaryHeader,
    secondaryHeaderProps,
    hideTable,
    children,
    tableWrapperSX,
    tableProps = { data: [], columns: [] },
  } = props;

  const styles = customTableStyles();

  return (
    <Box sx={styles.tableWrapper}>
      {(primaryHeader || secondaryHeader) && (
        <Card sx={styles.tableHeaderWrapper(Boolean(children))} classes={{ root: "_root" }}>
          {primaryHeader && (
            <TablePrimaryHeader {...primaryHeaderProps} removeMargin={secondaryHeader} />
          )}
          {secondaryHeader && <TableSecondaryHeader {...secondaryHeaderProps} />}
          {Boolean(children) && <Box mt="24px">{children}</Box>}
        </Card>
      )}
      {!hideTable && (
        <Box sx={tableWrapperSX}>
          <CustomTable {...tableProps} />
        </Box>
      )}
    </Box>
  );
}
