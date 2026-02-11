"use client";
import { Box, Typography } from "@mui/material";
import type { Theme } from "@mui/material";
import { useState, useEffect } from "react";
import { ThemeModeColor } from "@root/utils";
import { TickIcon } from "@assets/icons/tick-icon";

const dot = new RegExp(/[.]/);
const smallLetter = new RegExp(/[a-z]/);
const capitalLetter = new RegExp(/[A-Z]/);
const number = new RegExp(/\d/);
const specialChar = new RegExp(/[*/@!#%&()$`',?";:-=+_|><^~{}\]]/);

export function PasswordValidation({ value }): JSX.Element {
  const [minLength, setMinLength] = useState(false);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasDot, setHasDot] = useState(false);
  interface stateArrayType {
    state: boolean;
    error: string;
  }

  const stateArray: stateArrayType[] = [
    {
      state: minLength,
      error: "at least 8 characters",
    },
    {
      state: hasUpper,
      error: "one upper case letter",
    },
    {
      state: hasLower,
      error: "one lower case letter",
    },
    {
      state: hasSpecial,
      error: " one special character",
    },
    {
      state: hasNumber,
      error: "one number",
    },
    {
      state: hasDot,
      error: "cannot include a period",
    },
  ];

  useEffect(() => {
    setMinLength(value.length >= 8);
    setHasDot(value && !dot.test(value));
    setHasUpper(capitalLetter.test(value));
    setHasLower(smallLetter.test(value));
    setHasSpecial(specialChar.test(value));
    setHasNumber(number.test(value));
  }, [value]);

  return (
    <Box>
      <Typography
        variant="subtitle1"
        sx={({ palette: { neutral } }: Theme) => ({
          color: ThemeModeColor(neutral[600], neutral[400]),
          pb: 1,
        })}
      >
        Password must have
      </Typography>

      {stateArray.map((item: stateArrayType) => {
        return (
          <Box key={item.error} sx={{ display: "flex", alignItems: "center" }}>
            {!item.state && <TickIcon />}

            {item.state && <TickIcon valid />}
            <Typography
              variant="body2"
              sx={({ palette: { neutral } }: Theme) => ({
                color: neutral[600],
                pl: 1,
                py: 0.3,
              })}
            >
              {item.error}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
