import React from "react";
import { Avatar, Box, Button, Chip, Grid, Typography } from "@mui/material";
import { CustomModal } from "common";

const employeesDetails = [
  {
    id: 1,
    title: "David Miller",
    designation: "Senior BA",
    date: "19 march 2023",
    location: "London",
  },
  {
    id: 2,
    title: "David Miller",
    designation: "Senior BA",
    date: "19 march 2023",
    location: "London",
  },
  {
    id: 2,
    title: "David Miller",
    designation: "Senior BA",
    date: "19 march 2023",
    location: "London",
  },
];
export function PreviewModal(props): JSX.Element {
  const { preview, setPreview } = props;

  return (
    <CustomModal
      onClose={() => {
        setPreview(false);
      }}
      rootSx={styles.modalStyling}
      headerLabel="New Employees"
      headerSubLabel="Welcome These New Employees To The Team"
      closeButtonProps={{
        onClick: () => {
          setPreview(false);
        },
      }}
      isOpen={preview}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box sx={{ width: "100%" }}>
          {employeesDetails.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: { xs: "start", sm: "end" },
                mt: 2,
                backgroundColor: "background.default",
                p: 1,
                borderRadius: "8px",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Avatar
                  alt="avatar"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 70, height: 70 }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "text.primary", mb: 0.2 }}
                  >
                    {item.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Chip label={item.designation} color="primary" />
                    <Typography
                      variant="caption"
                      sx={{ color: "text.primary", mb: 0.2 }}
                    >
                      {item.date}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.primary", mb: 0.2 }}
                    >
                      {item.location}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Button
                variant="contained"
                sx={{ p: 1, fontSize: "10px", mt: { xs: 1, sm: 0 } }}
              >
                View Profile
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </CustomModal>
  );
}

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
