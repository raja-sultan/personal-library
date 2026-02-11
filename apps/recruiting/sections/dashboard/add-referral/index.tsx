import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { NoteIcon } from "@assets/icons/note-icon";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import { ReceiptEditIcon } from "@assets/icons/recepit-edit-icon";
import Link from "next/link";

export function AddReferral(): React.JSX.Element {
  const [age, setAge] = useState("");

  const theme: any = useTheme();

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ pt: 1 }}>
        Add a Referral
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
          backgroundColor:
            theme.palette.mode === "light" ? theme.palette.neutral[50] : "",
          borderRadius: "10px",
          padding: "24px",
          mt: 3,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 1, position: "relative", top: "3px" }}>
            <ReceiptEditIcon />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              How’s your Requirement Analysis doing?
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              Added by David Clark
            </Typography>
          </Box>
        </Box>
        <Box>
          <Link href="/dashboard/add-a-referral">
            <Button
              variant="contained"
              sx={{ borderRadius: "50px", p: 1, minWidth: 0 }}
            >
              <AddIcon />
            </Button>
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
          backgroundColor:
            theme.palette.mode === "light" ? theme.palette.neutral[50] : "",
          borderRadius: "10px",
          padding: "24px",
          mt: 3,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 1, position: "relative", top: "3px" }}>
            <NoteIcon />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              How’s your Requirement Analysis doing?
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              Added by David Clark
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <Select
              size="small"
              value={age}
              onChange={handleChange}
              sx={{
                width: "100%",
                backgroundColor:
                  theme.palette.mode === "light"
                    ? theme.palette.neutral[50]
                    : "",
              }}
              placeholder="select"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Twenty</MenuItem>
              <MenuItem value={21}>Twenty one</MenuItem>
            </Select>
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              sx={{
                backgroundColor:
                  theme.palette.mode === "light" ? "common.white" : "",
              }}
              size="small"
              placeholder="Job Url"
            />
            <Button variant="contained" size="small" sx={{ ml: 1 }}>
              Copy
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
