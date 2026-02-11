"use client";

import { CloseIcon } from "@assets/icons/close-icon";
import { GlobalAvatar } from "@components/global-avatar";
import { KeyboardArrowRight } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import { FormProvider, RHFTextField } from "common";
import React from "react";
import { drawerData, marks } from "./drawer-data";
import { styles } from "./drawer.styles";
import { useDrawer } from "./use-drawer";

export function ApproveDrawer({ open, toggleDrawer, data, handleApprove }): JSX.Element {
  const {
    handleButtonClick,
    currencySymbol,
    onSubmit,
    handleSubmit,
    methods,
  } = useDrawer({ data });

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      PaperProps={{
        sx: styles.drawerStyle,
      }}
    >
      <IconButton sx={styles.customCloseIcon} onClick={toggleDrawer}>
        <KeyboardArrowRight />
      </IconButton>
      <Box sx={styles.profileWrapper}>
        <IconButton sx={styles.closeIcon} onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
        <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
          <GlobalAvatar
            width={48}
            height={48}
            imgUrl={data?.user?.profileImage}
            firstName={data?.user?.firstName}
            lastName={data?.user?.lastName}
          />
          <Typography variant="h6" fontWeight={600}>{data?.user?.firstName} {data?.user?.lastName}</Typography>
        </Box>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Button
          fullWidth
          sx={{ mt: 1.2 }}
          variant="contained"
          startIcon={<DoneIcon />}
          disabled={data?.isApproved}
          type='submit'
          onClick={() => { handleApprove(data?.user?._id) }}
        >
          {data?.isApproved ? 'Approved' : 'Approve'}
        </Button>
        <Box sx={styles.scroll}>
          {drawerData(data).map((item) => (
            <React.Fragment key={item.id}>
              <Box pt={2.4}>
                <Typography variant="body2" fontWeight="600" color="text.primary" textTransform='capitalize'>
                  {item.title}
                </Typography>
                <Box pt={1}>
                  <Grid container spacing={2}>
                    {item.content.map((subItem) => (
                      <Grid item xs={6} key={subItem.id}>
                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight="600"
                            color="text.primary"
                          >
                            {subItem.subTitle}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {subItem.subContent}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
              <Divider sx={{ mt: 2 }} />
            </React.Fragment>
          ))}
          <Typography variant="body2" fontWeight="600" color="text.primary">
            Recommendation
          </Typography>
          <Box gap={2} display="flex" alignItems="baseline" sx={{ '& > div:nth-child(2)': { flex: 1 } }}>
            <ButtonGroup
              sx={{ width: "7rem", mt: 0.8, height: "5.3rem" }}
              variant="contained"
              aria-label="Currency Buttons"
            >
              <Button
                sx={styles.currencyBtn1(currencySymbol)}
                onClick={() => {
                  handleButtonClick("£");
                }}
              >
                £
              </Button>
              <Button
                sx={styles.currencyBtn2(currencySymbol)}
                onClick={() => {
                  handleButtonClick("%");
                }}
              >
                %
              </Button>
            </ButtonGroup>

            <RHFTextField
              size="medium"
              fullWidth
              type='number'
              // defaultValue={currencySymbol === '%' ? data?.user?.guidance ?? 0 : data?.user?.currentSalary}
              name={currencySymbol === '%' ? 'percentage' : 'currentSalary'}
              InputProps={{
                startAdornment: <Typography mr={0.5} variant="subtitle2">{currencySymbol}</Typography>,
                inputProps: currencySymbol === '%' ? {
                  min: 0,
                  max: 100
                } : {
                  min: 0
                }
              }}
            />
          </Box>
          <Typography
            mt={1}
            mb={0.5}
            variant="body2"
            fontWeight="600"
            color="text.primary"
          >
            New Pay
          </Typography>
          <RHFTextField
            variant='outlined'
            size="medium"
            fullWidth
            name="newPay"
            disabled
            StartIcon={<Typography mr={1} variant="subtitle2">£</Typography>}
          />
          <Divider sx={{ mt: 1.6 }} />
          <Typography variant="body2" fontWeight="600" color="text.primary">
            Compensation band
          </Typography>
          <Typography
            mt={2}
            variant="body2"
            fontWeight="600"
            color="text.secondary"
          >
            Current Salary £ {data?.user?.currentSalary ?? '--'}
          </Typography>
          <Box px={1}>
            <Slider
              disabled
              sx={styles.slider}
              name="currentSalary"
              defaultValue={30}
              // onChange={handleChange}
              step={1}
              marks={marks}
              max={20000}
              min={5000}
            />
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Typography
            my={1}
            variant="body2"
            fontWeight="600"
            color="text.primary"
          >
            Notes
          </Typography>
          <Box sx={styles.noteWrapper}>
            <Box sx={styles.noteBox}>
              <GlobalAvatar
                width={48}
                height={48}
                imgUrl={data?.user?.profileImage}
                firstName={data?.user?.firstName}
                lastName={data?.user?.lastName}
              />
              <Typography variant="subtitle1" fontWeight={600}>
                {data?.user?.firstName} {data?.user?.lastName}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              22 days ago
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary">
            The employee has met expectations about their career growth and have
            performed very well in the field
          </Typography>
        </Box>
      </FormProvider>
    </Drawer>
  );
}
