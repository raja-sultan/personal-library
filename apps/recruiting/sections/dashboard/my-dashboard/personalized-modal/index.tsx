import {
  Box,
  // Button,
  Card,
  CardActions,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { styles } from "./personalized-modal-style";
import { CustomModal } from "common";
import { DragIndicatorIcon } from "@assets/icons/drag-indicator-icon";
import {
  personalizedData,
  personalizedDataRightView,
} from "./personalized-modal-data";
import { usePersonalizedModal } from "./use-personalized-modal";

export function PersonalizedModal(props): JSX.Element {
  const { open, setOpen } = props;

  const { getIconRightRail, getIcon, isLoading } = usePersonalizedModal();

  return (
    <CustomModal
      onClose={() => {
        setOpen(false);
      }}
      rootSx={styles.modalStyling}
      headerLabel="Personalized My Dashboard"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
      isOpen={open}
    >
      <Box sx={{ mt: 1 }}>
        <Grid container spacing={{ xs: "", sm: 2, lg: 5 }}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary", my: 2 }}
            >
              Show in Main View
            </Typography>

            {personalizedData?.map((item: any) => (
              <Card
                key={item.id}
                sx={{
                  p: 1.5,
                  my: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <DragIndicatorIcon
                    sx={{
                      mx: 1,
                      color: "primary.main",
                      cursor: "pointer",
                    }}
                  />
                  <Box>
                    {isLoading ? (
                      <Skeleton variant="rectangular" width={210} height={10} />
                    ) : (
                      <Typography variant="h6" sx={{ color: "text.primary" }}>
                        {item?.title}
                      </Typography>
                    )}
                    {isLoading ? (
                      <Skeleton variant="rectangular" width={210} height={10} />
                    ) : (
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary", mt: 0.3 }}
                      >
                        {item?.description}
                      </Typography>
                    )}
                  </Box>
                </Stack>
                <Box>
                  <CardActions>
                    {isLoading ? (
                      <Skeleton variant="rectangular" width={10} height={10} />
                    ) : (
                      getIcon(item)
                    )}
                  </CardActions>
                </Box>
              </Card>
            ))}

            {/* <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              Hide from Main Menu
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontStyle: "italic" }}
            >
              No tiles Hidden
            </Typography> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary", my: 2 }}
            >
              Show in Right Rail
            </Typography>

            {personalizedDataRightView?.map((item: any) => (
              <Card
                key={item.id}
                sx={{
                  p: 1.5,
                  my: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <DragIndicatorIcon
                    sx={{
                      mx: 1,
                      color: "primary.main",
                      cursor: "pointer",
                    }}
                  />
                  <Box>
                    {isLoading ? (
                      <Skeleton variant="rectangular" width={210} height={10} />
                    ) : (
                      <Typography variant="h6" sx={{ color: "text.primary" }}>
                        {item?.title}
                      </Typography>
                    )}
                    {isLoading ? (
                      <Skeleton variant="rectangular" width={210} height={10} />
                    ) : (
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary", mt: 0.3 }}
                      >
                        {item?.description}
                      </Typography>
                    )}
                  </Box>
                </Stack>
                <Box>
                  <CardActions>{getIconRightRail(item)}</CardActions>
                </Box>
              </Card>
            ))}
            {/* <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              Hide from Main Menu
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontStyle: "italic" }}
            >
              No tiles Hidden
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: 2,
                mt: 1,
              }}
            >
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained">Save</Button>
            </Box> */}
          </Grid>
        </Grid>
      </Box>
    </CustomModal>
  );
}
