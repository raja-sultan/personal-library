import { ProductSalesChart } from "@components/dashboard/product-sales";
import { Grid } from "@mui/material";
import { useGetProductSalesQuery } from "@services/sso-admin-dashboard-api";
import React from "react";

export function ProductSalesChartSection(): React.JSX.Element {
  const { data: productSalesData } = useGetProductSalesQuery({});

  return (
    <Grid
      item
      container
      p={2}
      sx={{
        boxShadow: "0px 5px 25px 0px rgba(105, 105, 105, 0.10)",
        bgcolor: "white",
        borderRadius: "8px",
      }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: 600,
          padding: "5px 20px 10px 20px",
          color: "#565666",
        }}
      >
        Product Sales
      </span>
      <Grid container item xs={12} justifyContent="center">
        <ProductSalesChart chartData={productSalesData?.data} />
        <span
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: 600,
            color: "#565666",
          }}
        >
          Personnel Library
        </span>
      </Grid>
    </Grid>
  );
}
