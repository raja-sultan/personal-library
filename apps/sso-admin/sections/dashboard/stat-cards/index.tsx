import React from "react";

import { Grid } from "@mui/material";
import { CardComponent } from "@components/dashboard";
import { cardsData } from "./stat-cards.data";
import { useGetTotalUserCountQuery } from "@services/sso-admin-dashboard-api";

export function StatCardsSection(): JSX.Element {
  const { data: totalUsers } = useGetTotalUserCountQuery({});
  const numericData = {
    active: [totalUsers?.data?.ActiveUsers, totalUsers?.data?.NewRequest],
    inActive: [
      totalUsers?.data?.InActiveUsers,
      totalUsers?.data?.Registeredcompany,
    ],
  };
  return (
    <Grid
      container
      bgcolor="#FCFCFC"
      borderRadius="13px"
      sx={{
        boxShadow: "0px 5px 25px 0px rgba(105, 105, 105, 0.10)",
        justifyContent: "space-between",
        rowGap: { xs: 4, sm: 0 },
        p: 1,
        maxHeight: "auto",
      }}
    >
      {cardsData?.map((card, index) => {
        const {
          id,
          heading,
          // activeUsers,
          // inActiveUsers,
          HeadingIcon,
          BgIcon,
          navigationLink,
          isCompanyCard,
        } = card;
        return (
          <Grid key={id} item xl={5.9} sm={5.9} xs={12}>
            <CardComponent
              heading={heading}
              activeUsers={numericData.active[index] || "-"}
              inActiveUsers={numericData.inActive[index] || "-"}
              // activeUsers={activeUsers}
              // inActiveUsers={inActiveUsers}
              HeadingIcon={HeadingIcon}
              BgIcon={BgIcon}
              navigationLink={navigationLink}
              isCompanyCard={isCompanyCard}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
