"use client";

import { RHFTextField } from "common";
import React, { useMemo, useState, memo } from "react";
import {
  MenuItem,
  Button,
  TextField,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useSelector } from "@store";

interface DynamicDropdownOptionTypes {
  userId: string;
  label: string;
  value: string;
  id: string | number;
  optionTextMaxWidth: string | number;
}

function DynamicDropdown({
  addButtonText = "Add relationship",
  optionTextMaxWidth,
  ...field
}: any): JSX.Element {
  const [showTextField, setShowTextField] = useState<boolean>(false);
  const [fieldOptions, setFieldOptions] = useState<
    DynamicDropdownOptionTypes[]
  >([]);
  const { user } = useSelector((state: any) => state.auth);

  function handleTextField(event: React.MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation();
    setShowTextField(true);
  }

  useMemo(() => {
    if (field?.options) {
      setFieldOptions(field.options);
    }
  }, [field?.options]);

  async function addOption(
    event: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> {
    event.stopPropagation();
    const value = (event.target as HTMLInputElement).value;
    if (event.key === "Enter") {
      event.preventDefault();
      if (value && field.addOption) {
        const data: { name: string; type?: string } = {
          name: value,
        };
        if (field.fieldType) {
          data.type = field.fieldType;
        }
        try {
          const response = await field.addOption(data);
          if (response?.data) {
            setShowTextField(false);
          }
        } catch (error) {
          toast.error(error.data.message);
        }
      }
    }
  }

  async function deleteOption(event, id: string | number): Promise<void> {
    event.stopPropagation();
    try {
      await field.deleteOption(id);
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <RHFTextField
      SelectProps={{
        renderValue: (value) => {
          const selectedOption = fieldOptions.find(
            (option) => option.value === value
          );
          return (
            <Typography
              variant="subtitle2"
              sx={{
                maxWidth: optionTextMaxWidth,
                wordBreak: "break-word",
                whiteSpace: "wrap",
              }}
            >
              {selectedOption ? selectedOption.label : value}
            </Typography>
          );
        },
      }}
      select
      name={field?.name}
      outerLabel={field.outerLabel}
      {...field}
    >
      {fieldOptions.map((option) => (
        <MenuItem
          key={option.value}
          sx={{ py: 1, justifyContent: "space-between" }}
          value={option.value}
        >
          <Typography
            variant="subtitle2"
            sx={{
              maxWidth: optionTextMaxWidth,
              wordBreak: "break-word",
              whiteSpace: "wrap",
            }}
          >
            {option.label}
          </Typography>
          {option?.userId === user?.userId && (
            <Box
              onClick={(event) => {
                void deleteOption(event, option.id);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                pl: 1,
              }}
            >
              <CloseOutlinedIcon />
            </Box>
          )}
        </MenuItem>
      ))}
      <Stack gap={1} px={2} pt={1} pb={2}>
        <Button
          sx={{
            width: "fit-content",
            p: 0,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={handleTextField}
          fullWidth={false}
        >
          {addButtonText}
        </Button>
        {showTextField && (
          <TextField
            variant="outlined"
            size="small"
            sx={{
              mt: 1,
            }}
            placeholder="Add"
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              void addOption(event);
            }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
        )}
      </Stack>
    </RHFTextField>
  );
}

export default memo(DynamicDropdown);
