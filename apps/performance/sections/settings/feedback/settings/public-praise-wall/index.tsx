"use client";
import { Box, Button, Card, Grid, MenuItem, Typography } from "@mui/material";
import { feedBackSettingPraiseWall } from "@assets/images";
import { FormProvider, RHFTextField } from "common";
import { usePublicPraiseWall } from "./use-public-praise-wall";
import Image from "next/image";
import Slider from "@mui/material/Slider";

import { marks, options } from "./public-praise-wall-data";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.FEEDBACK.SETTINGS;

export function PublicPraiseWall(): JSX.Element {
  const { handleSubmit, progressValue, methods, onSubmit, handleChange } =
    usePublicPraiseWall();
  // const router = useRouter();

  return (
    <Card sx={{ mt: 2, pt: 1 }}>
      <Grid container>
        <Grid item lg={8} xxl={9}>
          <Box sx={{ padding: "24px" }}>
            <Typography variant="h5" fontWeight={600} color="text-secondary">
              Public praise wall
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
              Show Recent Public Praise as a slideshow in increments of{" "}
              {progressValue} seconds
            </Typography>
            <Box mt={2}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <PermissionProtected permission={PERMISSION.LAUNCH_PUBLICLY} disabled>
                  <RHFTextField
                    sx={{ width: "150px" }}
                    name="startDate"
                    select
                    placeholder="Last 7 days"
                  >
                    {options?.map(
                      (option: { value?: number; label?: string }) => (
                        <MenuItem value={option.value} key={option.value}>
                          {option.label}
                        </MenuItem>
                      )
                    )}
                  </RHFTextField>
                  <Box sx={{ width: { xxs: 300, sm: 500 }, mt: 3 }}>
                    <Slider
                      sx={{
                        "& .MuiSlider-rail": {
                          height: "8px",
                        },
                        "& .MuiSlider-track": {
                          height: "8px",
                        },
                        "& .MuiSlider-mark": {
                          display: "none",
                        },
                      }}
                      name="slidesCount"
                      defaultValue={5}
                      onChange={(e: any) => {
                        handleChange(e.target.value);
                      }}
                      step={5}
                      marks={marks}
                      min={0}
                      max={60}
                      valueLabelDisplay="on"
                    />
                  </Box>

                  <Button
                    size="small"
                    variant="contained"
                    type="submit"
                    sx={{ mt: 3 }}
                  >
                    Launch Praise Wall
                  </Button>
                </PermissionProtected>
              </FormProvider>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4} xxl={3}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Image src={feedBackSettingPraiseWall} alt="images" />
          </Box>
        </Grid>
      </Grid>
    </Card >
  );
}
