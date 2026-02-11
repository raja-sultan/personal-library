import React from "react";
import { EditIcon } from "@assets/icons/edit-icon";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { styles } from "../view-one-ones-styles";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Link from "next/link";
import { CustomChip } from "@root/../../packages/common";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE._1_ON_1S._1_ON_1S

interface Item {
  id: string;
  title: string;
  subTitle: string;
  desc: string;
  isInput: boolean;
  path: string;
}

export function OneOnOneDetails({
  data,
  handleEdit,
  handleOpenDiscussionDrawer,
  actionType,
  disabled,
}): JSX.Element {
  return (
    <>
      <Box mb={2} sx={styles.tipsContent}>
        <Box sx={styles.tipsContentBox}>
          <Typography fontSize="20px" fontWeight={600} color="text.primary">
            1-on-1 Details
          </Typography>
          {!actionType && !disabled && (
            <PermissionProtected permission={PERMISSION.UPDATE} disabled>
              <IconButton onClick={handleEdit}>
                <EditIcon sx={{ color: "#292D32" }} />
              </IconButton>
            </PermissionProtected>
          )}
          {disabled && (
            <CustomChip variant="danger" ChipProps={{ label: "Cancelled" }} />
          )}
        </Box>
        {data?.map((item: Item) => {
          return (
            <React.Fragment key={item?.id}>
              <Box sx={styles.detailsItems}>
                <Box>
                  <Typography
                    sx={styles.detailsItemsTitle}
                    variant="subtitle2"
                    fontWeight={600}
                  >
                    {item?.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight={400}
                    color="text.secondary"
                  >
                    {item?.subTitle}
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={400}
                  color="text.secondary"
                >
                  {item?.desc}
                </Typography>
              </Box>
              {item.isInput && (
                <Box display="flex" gap="10px" flexWrap="wrap">
                  <TextField
                    name="link"
                    variant="outlined"
                    disabled
                    fullWidth
                    value={item?.path}
                    sx={{ flex: 1 }}
                    InputProps={{
                      startAdornment: <InsertLinkIcon sx={{ mr: 1 }} />,
                    }}
                  />
                  {!actionType && (
                    <Box>
                      <Link
                        href={item?.path}
                        target="_blank"
                        style={{ pointerEvents: disabled ? "none" : "auto" }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            height: "53px",
                            "&.Mui-disabled": {
                              background: "#7A5AF8",
                              color: "#FFFFFF",
                              opacity: "0.5",
                            },
                          }}
                          disabled={disabled}
                        >
                          Join Call
                        </Button>
                      </Link>
                    </Box>
                  )}
                </Box>
              )}
            </React.Fragment>
          );
        })}
      </Box>

      <Box sx={styles.tipsContent}>
        <Typography variant="h6" sx={{ fontWeight: 600, pb: "24px" }}>
          1-on-1 Tips
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "5px",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 400, width: "250px" }}
          >
            Not sure where to begins? Browse our suggested discussion points.
          </Typography>
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "#5925DC",
                color: "#fff",
              },
            }}
            variant="outlined"
            onClick={handleOpenDiscussionDrawer}
            disabled={actionType || disabled}
          >
            Browse discussion points
          </Button>
        </Box>
      </Box>
    </>
  );
}
