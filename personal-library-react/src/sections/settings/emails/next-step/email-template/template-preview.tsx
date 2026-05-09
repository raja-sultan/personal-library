import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import React from "react";
import { hireInformation, list } from "./email-template.data";

const TemplatePreview = () => {
  return (
    <Box sx={styles.modalStyling}>
      <Box sx={styles.innerCardWrapper}>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Subject: Your Next Step at Personnel Library
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.primary", my: 2 }}>
          Welcome
        </Typography>
        <Button variant="contained">Get Started</Button>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ color: "text.primary", my: 2 }}>
          Upcoming Tasks to Complete
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1" sx={{ color: "text.primary", my: 1 }}>
            Add new hire to HR systems
          </Typography>
          <Button variant="contained">Save and Close</Button>
        </Box>
        <Typography variant="subtitle2" sx={{ color: "text.secondary", my: 2 }}>
          Please add Candidate to our HR systems:
        </Typography>
        <ul style={{ paddingLeft: "20px" }}>
          {list.map((item) => (
            <li key={item.id} style={{ fontSize: "14px", marginTop: "10px" }}>
              {item.title}
            </li>
          ))}
        </ul>
        <Typography variant="subtitle2" sx={{ color: "text.secondary", my: 1 }}>
          New Hire Information:
        </Typography>
        <ul style={{ paddingLeft: "20px" }}>
          {hireInformation.map((item) => (
            <Box
              key={item.id}
              sx={{ display: "flex", alignItems: "end", gap: "20px" }}
            >
              <li
                style={{
                  fontSize: "14px",
                  marginTop: "10px",
                  fontWeight: "600",
                }}
              >
                {item.label}:
              </li>
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                {item.title}
              </Typography>
            </Box>
          ))}
        </ul>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ color: "text.primary", my: 1 }}>
          Your Manager
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
          Faisal Naeem
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          Business Analyst
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "text.primary", my: 1 }}>
          Faisal is a member of:
        </Typography>
        <Chip label="Business Analysis" variant="outlined" />
      </Box>
    </Box>
  );
};

export default TemplatePreview;

const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 600 },
  },
  innerCardWrapper: {
    maxHeight: { xs: 500, sm: 600, xxl: 700 },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
    pr: 2,
  },
};
