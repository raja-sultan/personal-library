"use client";
import React, { useState } from "react";
import { Box, Card, Grid } from "@mui/material";

interface CardTypes {
  id: number;
  title: string;
  value: string;
  cardData: { id: string; comp: React.ReactNode }[];
}

interface CardWidgetProps {
  cards: CardTypes[];
}

export default function CardWidget({ cards = [] }: CardWidgetProps): JSX.Element {
  const [selectedCard, setSelectedCard] = useState(1);

  function handleCardClick(cardNumber: any): void {
    setSelectedCard(cardNumber === selectedCard ? cardNumber : cardNumber);
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {cards.map((item: CardTypes, index: number) => (
          <Grid key={item.id} item lg={3} xs={12}>
            <Card
              onClick={() => {
                handleCardClick(index + 1);
              }}
              sx={{
                padding: "24px",
                cursor: "pointer",
                border: selectedCard === index + 1 ? "1px solid transparent" : "1px solid #EAECF0",
                color: selectedCard === index + 1 ? "white" : "#101828",
                background: selectedCard === index + 1 ? "#7A5AF8" : "#FFF",
                "&:hover": {
                  border:
                    selectedCard === index + 1 ? "1px solid transparent" : "1px solid #7A5AF8",
                },
              }}
            >
              <Box sx={{ fontSize: "20px", fontWeight: 600, mb: "16px" }}>{item.title}</Box>
              <Box sx={{ fontSize: "48px", fontWeight: 600 }}>{item.value}</Box>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          {selectedCard !== null && (
            <div style={{ marginTop: "20px" }}>
              <Box>
                {cards[selectedCard - 1]?.cardData.map((data) => (
                  <Box key={data.id}>{data.comp}</Box>
                ))}
              </Box>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
