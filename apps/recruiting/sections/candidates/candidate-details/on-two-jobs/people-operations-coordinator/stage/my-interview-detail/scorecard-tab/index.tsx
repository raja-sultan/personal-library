import React from "react";
import { Box, Button, Grid, Rating, Typography, useTheme } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
  RHFCustomSelect,
  // RatingIcon,
  RHFRadioGroup,
} from "common";
import { scorecardModalData } from "./data";
// import Rating from "@mui/material/Rating";

export function ScoreCardInterview(): JSX.Element {
  // const { edit = false } = props;
  const theme = useTheme();
  const defaultValues = {};
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  function onSubmit(): void {}

  return (
    <Grid container px={2} pb={1}>
      {/* {!edit && (
        <>
          <Grid item xs={12} mb={1}>
            <Typography variant="body1" fontWeight={600}>
              Interview By
            </Typography>
            <Typography variant="subtitle2" fontWeight={400} my={1}>
              Usman Saeed
            </Typography>
            <Typography variant="caption" color={theme.palette.grey[500]}>
              No Decision
            </Typography>
          </Grid>
          {scorecardModalData?.map((ele) => (
            <Grid container direction="column" key={ele?.id} item xs={12}>
              {" "}
              <Typography variant="subtitle1" my={1.2} fontWeight={600}>
                {ele?.heading}
              </Typography>
              {ele?.attribute?.length > 0 &&
                ele?.attribute?.map((attr) => (
                  <Grid container justifyContent="space-between" key={nanoid()}>
                    <Grid item sm={6} xs={12} my={0.8}>
                      <Typography
                        variant="subtitle1"
                        color={theme.palette.grey[500]}
                      >
                        {attr?.name}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      alignItems="center"
                      item
                      md={2}
                      sm={3}
                      xs={12}
                    >
                      <Typography variant="subtitle1">
                        {Array.from({ length: attr.rating }, (_, index) => (
                          <RatingIcon key={index} />
                        ))}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          ))}
        </>
      )} */}
      {/* {edit && ( */}
      <Grid container direction="column">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="body1" pb={2} fontWeight={600}>
              Interview Questions
            </Typography>{" "}
            <Box sx={{ mb: 2 }}>
              <RHFEditor
                outerLabel="Briefly describe your experience "
                name="experience"
              />
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <RHFEditor
              outerLabel="What are some ways that you’ve learned about?"
              name="learned"
            />
          </Box>
          <Grid
            container
            direction="column"
            py={2.5}
            px={1.5}
            borderRadius={1}
            my={2}
            bgcolor={theme.palette.background.default}
          >
            <Typography variant="body1">Attributes</Typography>
            <Typography variant="subtitle2" my={1}>
              Does the candidate show clear competence in the following areas?
            </Typography>
            <Typography
              variant="caption"
              mb={1}
              color={theme.palette.grey[400]}
            >
              *Remember, all fields are optional! Only rate attributes you have
              clear opinion on.
            </Typography>

            {scorecardModalData?.map((ele) => (
              <Grid container direction="column" key={ele?.id} item xs={12}>
                {" "}
                <Typography variant="subtitle1" my={1.2} fontWeight={600}>
                  {ele?.heading}
                </Typography>
                {ele?.attribute?.length > 0 &&
                  ele?.attribute?.map((attr) => (
                    <Grid
                      container
                      justifyContent="space-between"
                      key={nanoid()}
                    >
                      <Grid item sm={6} xs={12} my={0.8}>
                        <Typography
                          variant="subtitle1"
                          color={theme.palette.grey[500]}
                        >
                          {attr?.name}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        alignItems="center"
                        item
                        md={2}
                        sm={3}
                        xs={12}
                      >
                        <Rating
                          name="customized-10"
                          defaultValue={attr.rating}
                          sx={{
                            fontSize: 30,
                            color: theme.palette.warning.light,
                          }}
                        />
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            ))}
          </Grid>
          <Grid container gap={3} py={2} alignItems="start">
            <Grid container direction="column" gap={1}>
              <Typography variant="body2" fontWeight={600}>
                Overall Recommendation
              </Typography>
              <Box sx={{ mb: 2 }}>
                <RHFEditor
                  outerLabel=" Key Take-Away (Conclusions, pros, cons and things to follow up on) "
                  name="conclusion"
                />
                <Box>
                  <Button sx={{ p: "2px 7px" }} onClick={() => {}}>
                    Private Notes
                  </Button>{" "}
                  |
                  <Button sx={{ p: "2px 7px" }} onClick={() => {}}>
                    Add: Note for Other interviewers
                  </Button>
                </Box>
              </Box>

              <Typography variant="subtitle2" color={theme.palette.grey[500]}>
                Did the candidate pass the interview ?
              </Typography>
              <Box>
                <RHFRadioGroup
                  name="candidatePass"
                  headerLabel=""
                  sx={{
                    gap: 3,
                  }}
                  options={[
                    { label: "Definitely Not", value: "definitelyNot" },
                    { label: "Not", value: "not" },
                    { label: "Yes", value: "yes" },
                    { label: "Strong Yes", value: "strongYes" },
                  ]}
                />
              </Box>
            </Grid>

            {/* <Grid container gap={2.5}>
              <Button variant="outlined" sx={{ width: 220 }}>
                Definitely Not
              </Button>
              <Button variant="outlined" sx={{ width: 220 }}>
                No
              </Button>
              <Button variant="outlined" sx={{ width: 220 }}>
                Yes
              </Button>
              <Button variant="outlined" sx={{ width: 220 }}>
                Strong Yes
              </Button>
            </Grid>
             */}
            <RHFCustomSelect
              outerLabel="Interview By"
              sx={{ width: { md: 330, xs: 250 } }}
              fullWidth={false}
              placeholder="Select Options"
              name="interviewBy"
              options={[
                { id: 1, value: "", label: "" },
                { id: 2, value: "", label: "" },
              ]}
            />
            <RHFTextField
              name="date"
              sx={{ width: { md: 330, xs: 250 } }}
              outerLabel="On"
            />
            <Grid container>
              <Button variant="contained" type="submit" size="small">
                Submit Scorecard
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </Grid>
      {/* )} */}
    </Grid>
  );
}
