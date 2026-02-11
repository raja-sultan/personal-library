"use client";

import { AddFilledCircleIcon } from "@assets/icons/add-filled-circle-icon";
import { EmailIcon } from "@assets/icons/email-icon";
import { CustomDrawer } from "@components/custom-drawer";
import {
  Box,
  Card,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CustomChip } from "common";
import React, { useState } from "react";

export function BrowseDiscussionPoints({
  openDrawer,
  setOpenDrawer,
  oneOneOneCategoryList,
  handleDiscussionPointFilter,
  suggestedPointsList,
  handleAddDiscussionPoint,
}): JSX.Element {
  const theme = useTheme();
  const [filterValue, setFilterValue] = useState<string>("everything");

  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setFilterValue(value);
    handleDiscussionPointFilter(value);
  }

  return (
    <>
      {openDrawer && (
        <CustomDrawer
          maxWidth="548px"
          isOpen={openDrawer}
          title="Suggested Discussion Points"
          onClose={setOpenDrawer}
        >
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                sx={{
                  "&::placeholder": {
                    fontWeight: 400,
                    fontSize: "16px",
                    color: "#98A2B3",
                  },
                }}
                fullWidth
                variant="outlined"
                select
                size="small"
                value={filterValue}
                onChange={onChange}
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1 }} />,
                }}
              >
                <MenuItem value="everything">Everything</MenuItem>
                {oneOneOneCategoryList?.map(
                  (obj: { _id: string; name: string }) => (
                    <MenuItem key={obj?._id} value={obj?.name}>
                      {obj?.name}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              {suggestedPointsList?.length > 0 ? (
                suggestedPointsList?.map(
                  (item: { _id: string; category: string; text: string, status: string }) => (
                    <Box
                      key={item?._id}
                      display="flex"
                      alignItems="center"
                      gap="1.4rem"
                      mb={1}
                    >
                      <Card
                        sx={{
                          p: "10px 14px",
                          boxShadow: "0px 1px 2px 0px #1018280D",
                          minWidth: "calc(100% - 54px)",
                        }}
                      >
                        <Box
                          minHeight="90px"
                          flex={1}
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          mb={1}
                        >
                          <Typography
                            sx={{ wordBreak: "break-all" }}
                            variant="body2"
                            color="#98A2B3"
                          >
                            {item?.text}
                          </Typography>
                        </Box>
                        {item?.status && <CustomChip
                          rootSx={{ width: "fitContent" }}
                          variant="started"
                          ChipProps={{ label: item?.status }}
                        />}
                      </Card>
                      <IconButton
                        sx={{ width: "4rem", height: "4rem" }}
                        onClick={() => {
                          handleAddDiscussionPoint(item, "discussion_point");
                        }}
                      >
                        <AddFilledCircleIcon
                          sx={{ color: theme.palette.primary.main }}
                        />
                      </IconButton>
                    </Box>
                  )
                )
              ) : (
                <Typography variant="subtitle2" textAlign="center">
                  No Data Found!
                </Typography>
              )}
            </Grid>
          </Grid>
        </CustomDrawer>
      )}
    </>
  );
}
