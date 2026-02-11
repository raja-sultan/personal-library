import React from "react";
import {
  Box,
  Rating,
  type RatingProps,
  TextField,
  Typography,
  type TextFieldProps,
} from "@mui/material";
import { LockOutlinedIcon } from "@assets/icons/lock-outlined-icon";

interface Props {
  title: string;
  description: string;
  fieldTitle?: string;
  subTitle1?: string;
  subTitle2?: string;
  inputProps?: TextFieldProps;
  requireRating?: boolean;
  ratingProps?: RatingProps;
  icon?: boolean;
  actionType?: boolean;
  disabled?: boolean;
}

function SharedNotes({
  title,
  description,
  fieldTitle,
  subTitle1,
  subTitle2,
  requireRating,
  inputProps,
  ratingProps,
  icon,
  actionType,
  disabled,
}: Props): JSX.Element {
  return (
    <Box sx={{ py: "24px" }}>
      <Typography fontWeight={600} variant="h6" display="flex" gap="7px">
        {title}
        {icon && <LockOutlinedIcon />}
      </Typography>
      <Typography variant="subtitle2" sx={styles.heading}>
        {description}
      </Typography>
      <Box>
        <Typography variant="subtitle2" sx={styles.label}>
          {fieldTitle}
        </Typography>
        <TextField
          variant="outlined"
          multiline
          minRows={4}
          disabled={actionType || disabled}
          sx={{ width: "100%" }}
          {...inputProps}
        />
      </Box>
      {subTitle1 && (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, pt: 2 }}>
          {subTitle1}
        </Typography>
      )}
      {subTitle2 && (
        <Typography variant="subtitle2" sx={styles.heading}>
          {subTitle2}
        </Typography>
      )}

      {requireRating && (
        <>
          <Typography variant="subtitle2" sx={styles.ratingHeading}>
            How would you rate this 1-on-1?
          </Typography>
          <Rating {...ratingProps} disabled={actionType || disabled} />
        </>
      )}
    </Box>
  );
}
export default SharedNotes;
const styles = {
  heading: (theme) => ({
    fontWeight: 400,
    color: theme.palette.neutral[500],
    pt: 1,
  }),
  label: (theme) => ({
    fontWeight: 600,
    color: theme.palette.neutral[700],
    pt: 2.4,
    pb: 0.5,
  }),
  ratingHeading: (theme) => ({
    fontWeight: 600,
    pt: 2,
    color:
      theme.palette.mode === "dark"
        ? theme.palette.neutral[500]
        : theme.palette.neutral[900],
    pb: 1,
  }),
};
