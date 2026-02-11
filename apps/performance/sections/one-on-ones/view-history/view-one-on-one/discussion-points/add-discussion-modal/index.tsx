import React, { useState } from "react";
import CustomModal from "@components/custom-modal";
import { Box, TextField } from "@mui/material";

export function AddDiscussionModal({
  placeholder,
  onOpen,
  onClose,
  title,
  handleAddNewPoint,
  isLoading,
}): JSX.Element {
  const [value, setValue] = useState("");

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value: pointValue } = event.target;
    setValue(pointValue);
  }

  function onAccept(): void {
    handleAddNewPoint(value);
    onClose();
  }

  return (
    <CustomModal
      title={title}
      headerIcon={false}
      isLoading={isLoading}
      message={false}
      open={onOpen}
      onClose={onClose}
      onAccept={onAccept}
      acceptButtonProps={{ color: "primary", disabled: !value }}
      acceptText="Add"
    >
      <Box>
        <Box sx={{ fontSize: "14px", fontWeight: "600", color: "#344054" }}>
          {title}
        </Box>
        <TextField
          name="discussion"
          value={value}
          onChange={handleValueChange}
          variant="outlined"
          fullWidth
          placeholder={placeholder}
        />
      </Box>
    </CustomModal>
  );
}
