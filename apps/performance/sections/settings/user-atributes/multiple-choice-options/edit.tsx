import React, { useEffect, useState } from "react";
import { Box, Button, TextField} from "@mui/material";
import Add from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import { DeleteIconCurrentColor } from "@assets/icons/delete-icon-current-color";
import { EditIcon } from "@assets/icons/edit-icon";
import {
  useDeleteAttributeOptionMutation,
  useUpdateAttributeOptionMutation,
} from "@services/settings/people/user-attribute-api";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { CheckedIcon } from "@assets/icons/checked-curcle-icon";

interface InputItem {
  id: string;
  value: string;
}

export function EditMultipleChoiceOptions({ options }): JSX.Element {
  const attributeId = useSearchParams().get("id");

  const [deleteAttributeOption, { isLoading: deleteOptionLoading }] =
    useDeleteAttributeOptionMutation();

  const [updateAttributeOption] = useUpdateAttributeOptionMutation();

  const [inputArray, setInputArray] = useState<InputItem[]>(options ?? []);
  const [newInputValue, setNewInputValue] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [inputId, setInputId] = useState<string>();

  const addInputField = async (): Promise<void> => {
    const updatedValue = inputArray?.find((item) => item?.id === inputId);

    const isDuplicateValue = options && Array.from(options || []).some(
      (item: InputItem) => (item?.value === updatedValue?.value) || (item?.value === newInputValue)
    );

    if (isDuplicateValue) {
      toast.error("This option already exists.");
    } else {
      const payload = { value: updatedValue?.value ?? newInputValue };
      try {
        await updateAttributeOption({
          userAttributeId: attributeId,
          payload,
          optionId: inputId,
        }).unwrap();
        toast.success("Attribute updated successfully.");
      } catch (error) {
        toast.error(error?.data?.message);
      } finally {
        setNewInputValue("");
        setShowInput(false);
        setInputId("");
      }
    }
  };

  const deleteInputField = async (id: string): Promise<void> => {
    try {
      await deleteAttributeOption(id).unwrap();
      toast.success("Attribute option deleted successfully.");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleInputChange = (id: string, newValue: string): void => {
    const updatedArray = inputArray?.map((item) =>
      item?.id === id ? { ...item, value: newValue } : item
    );
    setInputArray(updatedArray);
    setInputId(id);
  };

  useEffect(() => {
    setInputArray(options);
  }, [options]);

  return (
    <>
      {inputArray?.map((input) => (
        <Box key={input?.id} display="flex" gap={2} mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add new value"
            value={input?.value}
            onChange={(e) => {
              handleInputChange(input?.id, e.target.value);
            }}
            disabled={input?.id !== inputId}
          />
          {input?.value && input?.id === inputId ? (
            <Button
              variant="outlined"
              color="inherit"
              sx={{ minWidth: "50px", px: "10px" }}
              onClick={addInputField}
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
      ))}
      {showInput && (
        <Box display="flex" gap={2} mb={2}>
          <TextField
            value={newInputValue}
            onChange={(e) => {
              setNewInputValue(e.target.value);
            }}
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
            {deleteOptionLoading ? <CircularProgress /> : <DeleteIconCurrentColor />}
          </Button>
        </Box>
      )}
      <Button
        onClick={() => {
          setInputId("");
          setNewInputValue("");
          setShowInput(true);
        }}
        sx={{ mt: "0.5rem" }}
        variant="outlined"
        color="inherit"
      >
        <Add sx={{ fontSize: "18px", mr: 1 }} />
        Add Options
      </Button>
      {/* {!inputArray?.length && (
        <Typography color="red" variant="subtitle2" mt={1}>
          Options are required!
        </Typography>
      )} */}
    </>
  );
}
