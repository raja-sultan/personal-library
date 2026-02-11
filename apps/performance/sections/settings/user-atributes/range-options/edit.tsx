import React, { useEffect, useState } from "react";
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
import {
  useDeleteAttributeOptionMutation,
  useUpdateAttributeOptionMutation,
} from "@services/settings/people/user-attribute-api";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

interface InputItem {
  id: string;
  value: string;
}

export function EditRangeOptions({ options }): JSX.Element {
  const [deleteAttributeOption] = useDeleteAttributeOptionMutation();
  const [updateAttributeOption] = useUpdateAttributeOptionMutation();

  const attributeId = useSearchParams().get("id");

  const [inputArray, setInputArray] = useState<InputItem[]>(options ?? []);
  const [rangeMinValue, setRangeMinValue] = useState<string>("");
  const [rangeMaxValue, setRangeMaxValue] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [inputId, setInputId] = useState<string>();
  const [invalidRange, setInvalidRange] = useState<boolean>(false);

  const addInputField = async (): Promise<void> => {
    const updatedValue = inputArray?.find((item) => item?.id === inputId);

    const isDuplicateValue =
      options &&
      !inputId &&
      Array.from(options || []).some(
        (item: InputItem) =>
          item?.value === updatedValue?.value ||
          item?.value === `${rangeMinValue}-${rangeMaxValue}`
      );

    if (isDuplicateValue) {
      toast.error("This option already exists.");
    } else {
      const payload = {
        value: updatedValue?.value ?? `${rangeMinValue}-${rangeMaxValue}`,
      };
      try {
        await updateAttributeOption({
          userAttributeId: attributeId,
          payload,
          optionId: inputId,
        }).unwrap();
        setRangeMinValue("");
        setRangeMaxValue("");
        setShowInput(false);
        setInputId("");
        toast.success("Attribute updated successfully.");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  const handleInputChange = (
    id: string,
    newMinValue: string,
    newMaxValue: string
  ): void => {
    if (Number(newMinValue) > Number(newMaxValue)) setInvalidRange(true);
    else setInvalidRange(false);
    const updatedArray = inputArray?.map((item) =>
      item?.id === id
        ? { ...item, value: `${newMinValue}-${newMaxValue}` }
        : item
    );
    setInputArray(updatedArray);
    setInputId(id);
  };

  const deleteInputField = async (id: string): Promise<void> => {
    try {
      await deleteAttributeOption(id).unwrap();
      toast.success("Attribute option deleted successfully.");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    setInputArray(options);
  }, [options]);
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
                onClick={addInputField}
                disabled={
                  Number(rangeMinValue) > Number(rangeMaxValue) || invalidRange
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
                  setInputId(input?.id);
                }}
              >
                <EditIcon />
              </Button>
            )}
            <Button
              onClick={() => deleteInputField(input?.id)}
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="subtitle2">min</Typography>
                </InputAdornment>
              ),
            }}
            value={rangeMinValue}
            onChange={(e) => {
              setRangeMinValue(e.target.value);
            }}
            fullWidth
            variant="outlined"
          />
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="subtitle2">max</Typography>
                </InputAdornment>
              ),
            }}
            value={rangeMaxValue}
            onChange={(e) => {
              setRangeMaxValue(e.target.value);
            }}
            fullWidth
            variant="outlined"
          />
          {rangeMinValue && rangeMaxValue && (
            <Button
              onClick={addInputField}
              variant="outlined"
              color="inherit"
              sx={{ minWidth: "50px", px: "10px" }}
              disabled={
                Number(rangeMinValue) > Number(rangeMaxValue) || invalidRange
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
          setInputId("");
          setRangeMinValue("");
          setRangeMaxValue("");
        }}
        sx={{ mt: "0.5rem" }}
        variant="outlined"
        color="inherit"
        
      >
        <Add sx={{ fontSize: "18px", mr: 1 }} />
        Edit A Range
      </Button>
      {/* {!inputArray?.length && (
        <Typography color="red" variant="subtitle2" mt={1}>
          Options are required!
        </Typography>
      )} */}
      {((Number(rangeMinValue) > Number(rangeMaxValue) &&
        rangeMinValue &&
        rangeMaxValue) ||
        invalidRange) && (
        <Typography color="red" variant="subtitle2" mt={1}>
          Minimum value should be less than or equal to the maximum value.
        </Typography>
      )}
    </>
  );
}
