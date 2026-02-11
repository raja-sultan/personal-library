"use client";
import React from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Box,
  Grid,
  Pagination,
  PaginationItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { styles } from "./employee-pay-table-styles";
import { NoContentFound, TableSkeleton } from "common";

export function EmployeePayTable(props: any): JSX.Element {
  const {
    isLoading,
    isError = false,
    data,
    columns,
    isPagination = true,
    totalPages,
    currentPage,
    onPageChange,
  } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <TableSkeleton />;
  return (
    <>
      <Box sx={{ overflowX: "auto" }}>
        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table sx={styles.tableWrapper} stickyHeader>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody className="table_body">
              {table
                ?.getRowModel()
                .rows?.map((row) => (
                  <TableRow key={row?.id}>
                    {row
                      ?.getVisibleCells()
                      .map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {(isError || table.getRowModel().rows.length === 0) && (
            <Grid container sx={styles.error}>
              <Grid item width={200}>
                <NoContentFound />
              </Grid>
            </Grid>
          )}
        </TableContainer>
      </Box>

      {isPagination && (
        <Box display="flex" alignItems="center" sx={styles.currentPageBox}>
          <Box>
            {isPagination && (
              <Typography sx={styles.currentPage} variant="subtitle1">
                Showing {currentPage} of {totalPages}
              </Typography>
            )}
          </Box>
          <Box ml="auto">
            <Pagination
              sx={styles.pagination}
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: () => <>Previous</>,
                    next: () => <>Next</>,
                  }}
                  {...item}
                />
              )}
              size="small"
              variant="outlined"
              shape="rounded"
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => {
                onPageChange(page);
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
