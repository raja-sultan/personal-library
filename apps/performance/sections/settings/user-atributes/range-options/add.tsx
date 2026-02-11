import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import { DeleteIconCurrentColor } from "@assets/icons/delete-icon-current-color";
import { EditIcon } from "@assets/icons/edit-icon";
import { CheckedIcon } from "@assets/icons/checked-curcle-icon";

interface InputItem {
  id: number;
  value: string;
}

export function AddRangeOptions({ setValue, errors }): JSX.Element {
  const [inputArray, setInputArray] = useState<InputItem[]>([]);
  const [rangesValue, setRangesValue] = useState({
    minValue: "",
    maxValue: "",
  });
  // const [?.minValue, setRangeMinValue] = useState<string>("");
  // const [rangeMaxValue, setRangeMaxValue] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [inputId, setInputId] = useState<number>();

  const [invalidRange, setInvalidRange] = useState<boolean>(false);

  const addInputField = (): void => {
    const newInput: InputItem = {
      id: Date.now(),
      value: `${rangesValue.minValue}-${rangesValue.maxValue}`,
    };
    setInputArray([...inputArray, newInput]);
    setValue("options", [...inputArray, newInput]);
    setRangesValue({ minValue: "", maxValue: "" });
    setShowInput(false);
  };

  const deleteInputField = (id: number): void => {
    const updatedArray = inputArray.filter((input) => input.id !== id);
    setInputArray(updatedArray);
  };

  const handleInputChange = (
    id: number,
    newMinValue: string,
    newMaxValue: string
  ): void => {
    if (Number(newMinValue) > Number(newMaxValue)) setInvalidRange(true);
    else setInvalidRange(false);
    const updatedArray = inputArray.map((item) =>
      item.id === id
        ? { ...item, value: `${newMinValue}-${newMaxValue}` }
        : item
    );
    setInputArray(updatedArray);
    setInputId(id);
  };

  if (inputArray?.length) {
    setValue("options", inputArray?.map((item) => item?.value));
  }

  const handleRangesChange = (e) => {
    const { name, value } = e.target;
    setRangesValue((prevValues) => ({
      ...prevValues,
      [name]: value.trimStart(),
    }));
  };

  return (
    <>
      {inputArray?.map((input) => {
        const [minValue, maxValue] = (
          input?.value ? input.value.split("-") : ["", ""]
        ) as [string, string];
        return (
          <Box key={input.id} display="flex" gap={2} mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a min value"
              value={minValue}
              onChange={(e) => {
                handleInputChange(input?.id, e.target.value, maxValue);
              }}
              disabled={input.id !== inputId}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="subtitle2">min</Typography>
                  </InputAdornment>
                ),
              }}
            />
            {/* Display Max Value */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a max value"
              value={maxValue || ""}
              onChange={(e) => {
                handleInputChange(input.id, minValue, e.target.value);
              }}
              disabled={input.id !== inputId}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="subtitle2">max</Typography>
                  </InputAdornment>
                ),
              }}
            />
            {minValue && input.id === inputId ? (
              <Button
                variant="outlined"
                color="inherit"
                sx={{ minWidth: "50px", px: "10px" }}
                onClick={() => {
                  setInputId(0);
                }}
                disabled={
                  Number(rangesValue?.minValue) >
                    Number(rangesValue.maxValue) || invalidRange
                }
              >
                <CheckedIcon sx={{ color: "currentcolor" }} />
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                sx={{ minWidth: "50px", px: "10px" }}
                onClick={() => {
                  setInputId(input.id);
                }}
              >
                <EditIcon />
              </Button>
            )}
            <Button
              onClick={() => {
                deleteInputField(input?.id);
              }}
              variant="outlined"
              color="inherit"
              sx={{ minWidth: "50px", px: "10px" }}
            >
              <DeleteIconCurrentColor />
            </Button>
          </Box>
        );
      })}
      {showInput && (
        <Box display="flex" gap={2} mb={2}>
          <TextField
            name="minValue"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="subtitle2">min</Typography>
                </InputAdornment>
              ),
            }}
            value={rangesValue?.minValue}
            onChange={handleRangesChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="maxValue"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="subtitle2">max</Typography>
                </InputAdornment>
              ),
            }}
            value={rangesValue.maxValue}
            onChange={handleRangesChange}
            fullWidth
            variant="outlined"
          />
          {rangesValue?.minValue && rangesValue.maxValue && (
            <Button
              onClick={addInputField}
              variant="outlined"
              color="inherit"
              sx={{ minWidth: "50px", px: "10px" }}
              disabled={
                Number(rangesValue?.minValue) > Number(rangesValue.maxValue) ||
                invalidRange
              }
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
          setShowInput(true);
        }}
        sx={{ mt: "0.5rem" }}
        variant="outlined"
        color="inherit"
      >
        <Add sx={{ fontSize: "18px", mr: 1 }} />
        Add A Range
      </Button>
      {!inputArray?.length && errors?.options && (
        <Typography color="red" variant="subtitle2" mt={1}>
          {errors.options.message}
        </Typography>
      )}
      {((Number(rangesValue?.minValue) > Number(rangesValue.maxValue) &&
        rangesValue?.minValue &&
        rangesValue.maxValue) ||
        invalidRange) && (
        <Typography color="red" variant="subtitle2" mt={1}>
          Minimum value should be less than or equal to the maximum value.
        </Typography>
      )}
    </>
  );
}
