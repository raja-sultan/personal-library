import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { RHFTextField } from "common";
import React, { memo, useRef, useState } from "react";
import Papa from "papaparse";

export const MultiSelectOption = memo(function MultiSelectOption({
  fields,
  append,
  remove,
  watchFieldType,
  listName,
}: any): JSX.Element {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentlyEdited, setCurrentlyEdited] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditQuestion = (index: number, id): void => {
    setCurrentlyEdited(index);
    setIsEditing(isEditing === id ? null : id);
  };

  const handleSaveQuestion = (): void => {
    setCurrentlyEdited(null);
    setIsEditing(false);
  };

  const handleFileUpload = async (files): Promise<void> => {
    if (files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    const content = await new Promise((resolve) => {
      reader.onload = (e: any) => {
        resolve(e.target.result);
      };
      reader.readAsText(file);
    });

    try {
      // Parse CSV content and update fieldTypeMultiple
      const parsedData = parseCSV(content);
      updateFieldTypeMultiple(parsedData);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const parseCSV = (content) => {
    const { data } = Papa.parse(content, { header: false });
    return data;
  };

  const updateFieldTypeMultiple = (data) => {
    const updatedFieldTypes = data.map((item) => {
      return { label: item[0] };
    });
    append(updatedFieldTypes);
  };

  const openFileInput = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.click();
    }
  };

  const downloadCSV = () => {
    const csvContent = generateCSVContent(watchFieldType);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "fieldTypeMultiple.csv");
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const generateCSVContent = (data) => {
    const csvRows = data?.map((row) => {
      return row.label;
    });
    return csvRows.join("\n");
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography>Selection Options</Typography>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={(e) => handleFileUpload(e.target.files)}
        style={{ display: "none" }}
      />
      <Box
        sx={{
          mb: 2,
          height: "100%",
          maxHeight: "300px",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: "6px",
          },
        }}
      >
        {fields?.map((val: any, index) => {
          return (
            <Grid key={val?.id} container rowGap={2} mb={2}>
              <Grid item xs={6}>
                <RHFTextField
                  name={`${listName}[${index}].label`}
                  placeholder="Write here..."
                  disabled={
                    (currentlyEdited !== null && currentlyEdited !== index) ||
                    !isEditing
                  }
                />
              </Grid>
              <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    if (!isEditing) {
                      handleEditQuestion(index, val?.id);
                    } else {
                      handleSaveQuestion();
                    }
                  }}
                >
                  {isEditing === val?.id ? (
                    <CheckCircleOutlineOutlinedIcon
                      sx={{
                        color: "success.main",
                        width: "3rem",
                      }}
                    />
                  ) : (
                    <EditOutlinedIcon
                      sx={{
                        color: "primary.main",
                      }}
                    />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </Box>
      <Box>
        <Button
          sx={{ minWidth: "auto", padding: "5px 10px" }}
          onClick={() => append({})}
        >
          Add another
        </Button>
        <Button
          sx={{ minWidth: "auto", padding: "5px 10px" }}
          onClick={openFileInput}
        >
          Upload File
        </Button>

        <Button
          sx={{ minWidth: "auto", padding: "5px 10px" }}
          onClick={downloadCSV}
        >
          Download as CSV sample
        </Button>
      </Box>
    </Box>
  );
});

export default MultiSelectOption;
