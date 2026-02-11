import React, { Fragment, useState, useEffect } from "react";

import { Box, Button, ButtonGroup, Divider, Grid, TextField, Typography } from "@mui/material";
import CustomCard from "@components/custom-card";
import { Stack } from "@mui/system";
import EmojiList from "@components/emoji-reactions/emoji-list";
import { LockIcon } from "@assets/icons/lock-icon";
import { useCurrent } from "./use-current";
import { NoContent } from "common";
import { NoDataFound } from "@components/no-data";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.UPDATES.UPDATES


function PrivateCurrentUpdates(): JSX.Element {
  const { selectedEmoji,
    selectedVisibility,
    handleReaction,
    handleVisibility,
    onSubmit,
    errors,
    register,
    handleSubmit,
    singleUpdateData,
    queryMode,
  } = useCurrent()


  return (

    <>

      {
        !singleUpdateData ?
          <NoDataFound icon={<NoContent />} />
          :
          <CustomCard
            subHeader
            cardSubHeader={{
              title: "Past Update",
              description: "May 22 - May 26",
              actions: (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack direction="row" spacing={1.5}>
                    <ButtonGroup aria-label="small button group">
                      <Button
                        sx={{ padding: "0px 25px" }}
                        key="public"
                        variant={selectedVisibility === "Public" ? "contained" : "outlined"}
                        onClick={() => handleVisibility("Public")}
                      >
                        Public
                      </Button>
                      <Button
                        sx={{ padding: "0px 12px" }}
                        startIcon={<LockIcon />}
                        key="private"
                        variant={selectedVisibility === "Private" ? "contained" : "outlined"}
                        onClick={() => handleVisibility("Private")}
                      >
                        Private
                      </Button>
                    </ButtonGroup>
                    <PermissionProtected permission={queryMode ? PERMISSION.UPDATE : PERMISSION.SHARE}>
                      <Button sx={{ padding: "7px 12px" }} variant="contained" type="submit">
                        {queryMode ? "Edit Update" : "Share Update"}
                      </Button>
                    </PermissionProtected>
                  </Stack>
                </form>
              ),
            }}
          >
            <Stack direction="column" justifyContent="center" alignContent="center" spacing={3}>
              {singleUpdateData?.points.map((item, idx) => {
                return (
                  <Fragment key={item._id}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignContent="center"
                      spacing={2}
                      width={{ xxl: "40%", xl: "50%", lg: "70%" }}
                    >
                      <Stack direction="row" spacing={2} width="100%">
                        <Grid item>
                          <Typography fontWeight={600} variant="subtitle1">
                            Q{idx + 1}
                          </Typography>
                        </Grid>
                        <Stack spacing={1} width="100%">
                          <Typography fontWeight={600} variant="subtitle1">
                            {item.question}
                          </Typography>
                          <Box sx={{ flex: 1 }}>
                            {item.answerType !== "text" ? (
                              <TextField
                                placeholder="Write answer"
                                size="small"
                                multiline
                                rows={4}
                                fullWidth
                                {...register(`answer_${item._id}`, { required: true })}
                                error={Boolean(errors[`answer_${item._id}`])}
                                helperText={errors[`answer_${item._id}`] && "This field is required"}
                              />
                            ) : (
                              <EmojiList onEmojiClick={handleReaction} selectedEmoji={selectedEmoji} />
                            )}
                          </Box>
                        </Stack>
                      </Stack>
                    </Stack>
                    {item.answerType === "text" ? <Divider /> : null}
                  </Fragment>
                );
              })}
              {singleUpdateData?.sentimentScoreEnabled && (
                <>
                  <Box sx={{ pl: "0px" }}>
                    <Box display="flex" gap="20px">
                      <Typography variant="subtitle1" fontWeight={600}>
                        Q{singleUpdateData?.points.length + 1}: Challenges you faced during this month?
                      </Typography>
                    </Box>
                    <EmojiList
                      key="emoji"
                      onEmojiClick={handleReaction}
                      selectedEmoji={selectedEmoji || singleUpdateData?.sentimentScore}
                      rootSx={{
                        mt: "24px",
                        ml: "35px",
                        flexWrap: "wrap",
                      }}
                    />
                  </Box>
                </>
              )}
            </Stack>
          </CustomCard>
      }
    </>

  );
}

export default PrivateCurrentUpdates;
