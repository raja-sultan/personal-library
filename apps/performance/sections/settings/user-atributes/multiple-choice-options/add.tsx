import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { DeleteIconCurrentColor } from "@assets/icons/delete-icon-current-color";
import { EditIcon } from "@assets/icons/edit-icon";
import { CheckedIcon } from "@assets/icons/checked-curcle-icon";

interface InputItem {
  id: number;
  value: string;
}

export function AddMultipleChoiceOptions({
  setValue,
  errors,
}: any): JSX.Element {
  const [inputArray, setInputArray] = useState<InputItem[]>([]);
  const [newInputValue, setNewInputValue] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [inputId, setInputId] = useState<number>();

  const addInputField = (): void => {
    const newInput: InputItem = { id: Date.now(), value: newInputValue };
    setInputArray([...inputArray, newInput]);
    setValue("options", [...inputArray, newInput]);
    setNewInputValue("");
    setShowInput(false);
  };

  const deleteInputField = (id: number): void => {
    const updatedArray = inputArray.filter((input) => input.id !== id);
    setInputArray(updatedArray);
  };

  const handleInputChange = (id: number, newValue: string): void => {
    const updatedArray = inputArray.map((item) =>
      item.id === id ? { ...item, value: newValue } : item
    );
    setInputArray(updatedArray);
    setInputId(id);
  };

  if (inputArray?.length) {
    setValue("options", inputArray?.map((item) => item?.value));
  }

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const trimmedValue = inputValue.startsWith(" ")
      ? inputValue.trimStart()
      : inputValue;
    setNewInputValue(trimmedValue);
  };

  return (
    <>
      {inputArray?.map((input) => (
        <Box key={input.id} display="flex" gap={2} mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a value"
            value={input.value}
            onChange={(e) => {
              handleInputChange(input.id, e.target.value);
            }}
            disabled={input.id !== inputId}
          />
          {input.value && input.id === inputId ? (
            <Button
              variant="outlined"
              color="inherit"
              sx={{ minWidth: "50px", px: "10px" }}
              onClick={() => {
                setInputId(0);
              }}
            >
              <CheckedIcon sx={{ color: "currentcolor" }} />
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              sx={{ minWidth: "50px", px: "10px" }}
              onClick={() => {
                setInputId(input?.id);
              }}
            >
              <EditIcon />
            </Button>
          )}
          <Button
            onClick={() => {
              deleteInputField(input.id);
            }}
            variant="outlined"
            color="inherit"
            sx={{ minWidth: "50px", px: "10px" }}
          >
            <DeleteIconCurrentColor />
          </Button>
        </Box>
      ))}
      {showInput && (
        <Box display="flex" gap={2} mb={2}>
          <TextField
            value={newInputValue}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Add new value"
          />
          {newInputValue && (
            <Button
              onClick={addInputField}
              variant="outlined"
              color="inherit"
              sx={{ minWidth: "50px", px: "10px" }}
            >
              <CheckedIcon sx={{ color: "currentcolor" }} />
            </Button>
          )}
          <Button
            onClick={() => {
              setShowInput(false);
            }}
            variant="outlined"
            color="inherit"
            sx={{ minWidth: "50px", px: "10px" }}
          >
            <DeleteIconCurrentColor />
          </Button>
        </Box>
      )}
      <Button
        onClick={() => {
          // addInputField();
          // setNewInputValue('');
          setShowInput(true);
        }}
        sx={{ mt: "0.5rem" }}
        variant="outlined"
        color="inherit"
      >
        <Add sx={{ fontSize: "18px", mr: 1 }} />
        Add Options
      </Button>
      {!inputArray?.length && errors?.options && (
        <Typography color="red" variant="subtitle2" mt={1}>
          {errors.options.message}
        </Typography>
      )}
    </>
  );
}
