import { Typography } from "@mui/material";
import React from "react";
import { customApplicationData } from "./custom-question.data";

export function CustomQuestion(): JSX.Element {
  return (
    <>
      {customApplicationData.map((item) => (
        <>
          <Typography variant="subtitle1" key={item.id} sx={styles.title}>
            How many years of experience do you have?
          </Typography>
          <Typography sx={styles.descriptions} variant="subtitle1">
            {item.experience}
          </Typography>
          <Typography variant="subtitle1" sx={styles.title}>
            How many years of experience do you have?
          </Typography>
          <Typography sx={styles.descriptions} variant="subtitle1">
            {item.profile}
          </Typography>
          <Typography variant="subtitle1" sx={styles.title}>
            How many years of experience do you have?
          </Typography>
          <Typography sx={styles.descriptions} variant="subtitle1">
            {item.otherChecks}
          </Typography>
        </>
      ))}
    </>
  );
}

const styles = {
  title: { color: "text.secondary", mt: 1 },
  descriptions: { color: "primary.main", fontWeight: 600 },
};
