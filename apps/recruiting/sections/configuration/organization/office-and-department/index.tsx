import React, { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { WarningPrompt } from "common";

export function OfficeAndDepartmentComp(props: any): React.JSX.Element {
  const {
    addHandler,
    updateHandler,
    deleteHandler,
    name,
    description,
    btnName,
    itemList,
  } = props;

  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const theme: any = useTheme();

  return (
    <Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body1">{description}</Typography>
        <Button variant="outlined" sx={{ my: 2 }} onClick={addHandler}>
          <AddIcon sx={{ mr: 1 }} />
          {btnName}
        </Button>
        {itemList.map((item: any) => {
          const isHovered = hoveredItemId === item._id;
          return (
            <Box
              key={item._id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "background.default",
                px: 1.5,
                mb: 1,
                borderRadius: 0.5,
                py: 0.5,
              }}
              onMouseEnter={() => {
                setHoveredItemId(item._id);
              }}
              onMouseLeave={() => {
                setHoveredItemId(null);
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  mr: 1,
                  py: 1,
                  color:
                    theme.palette.mode === "dark"
                      ? "text.secondary"
                      : "text.primary",
                }}
              >
                {item?.officeName ? item?.officeName : item?.departmentName}
              </Typography>
              {isHovered && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    onClick={() => {
                      updateHandler(item);
                    }}
                  >
                    <BorderColorIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                    />
                  </IconButton>
                  <WarningPrompt
                    mainColor="error.main"
                    heading="Alert"
                    subTitle="Are you sure you want to delete?"
                    modelOpenLabel={
                      <DeleteIcon
                        sx={{
                          cursor: "pointer",
                          color: "error.main",
                          position: "relative",
                          top: "4px",
                        }}
                      />
                    }
                    acceptButtonLabel="Delete"
                    acceptButtonProps={{
                      onClick: () => {
                        deleteHandler(item._id);
                      },
                      variant: "contained",
                      color: "error",
                      sx: {
                        bgcolor: "error.main",
                        color: "primary.contrastText",
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
