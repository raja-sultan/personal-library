import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { LocationsModal } from "./locations-modal";
import { WarningPrompt } from "common";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDeleteLocationListMutation,
  useGetLocationListQuery,
} from "@services/settings/location/location-api";
import toast from "react-hot-toast";

export function LocationsSection(): JSX.Element {
  const [addField, setAddField] = useState<any>({ open: false, id: null });

  const [deleteLocationList] = useDeleteLocationListMutation({});

  const { data: getLocationList } = useGetLocationListQuery({
    limit: 10,
    offset: 0,
  });
  const locationData = getLocationList?.data?.office;
  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom variant="h5" component="h5">
          Locations
        </Typography>
        <Button
          onClick={() => {
            setAddField({ open: true, id: null });
          }}
          variant="contained"
          sx={{ color: "neutral.200", borderColor: "neutral.300" }}
        >
          Add a Locations
        </Button>
      </Box>

      {locationData?.map((cardItems) => (
        <Box
          key={cardItems._id}
          sx={{
            mb: "20px",
            py: 1,
            px: 2,
            backgroundColor: "background.default",
            borderRadius: "8px",
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "text.primary", fontWeight: 600 }}
                m={0}
              >
                {cardItems.officeName}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {cardItems.member} Members
              </Typography>
            </Box>
            <Stack
              sx={{
                flexDirection: "row",
              }}
            >
              <ModeEditIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setAddField({ open: true, id: cardItems._id });
                }}
              />
              <WarningPrompt
                mainColor="error.main"
                heading="Alert"
                subTitle="Are you sure you want to delete this Location?"
                modelOpenLabel={
                  <DeleteIcon sx={{ cursor: "pointer", color: "error.main" }} />
                }
                acceptButtonLabel="Delete"
                acceptButtonProps={{
                  onClick: () => {
                    setAddField({ id: cardItems._id });
                    deleteLocationList({ id: cardItems._id })
                      .unwrap()
                      .then((response) => {
                        toast.success(response.message);
                      })
                      .catch((error) => {
                        toast.error(error.message);
                      });
                  },
                  variant: "contained",
                  color: "error",
                  sx: {
                    bgcolor: "error.main",
                    color: "primary.contrastText",
                  },
                }}
              />
            </Stack>
          </Stack>
        </Box>
      ))}
      {addField && (
        <LocationsModal addField={addField} setAddField={setAddField} />
      )}
    </Box>
  );
}
