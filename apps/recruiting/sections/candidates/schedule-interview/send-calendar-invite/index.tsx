import { Button, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFTextField,
} from "common";
import { useForm } from "react-hook-form";
import { useLazyGetUsersListQuery } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSendCalendarInviteMutation } from "@services/candidate/stages/interview-stage";
import toast from "react-hot-toast";

export function SendCalendarInviteSection(): JSX.Element {
  const theme = useTheme();
  const getUsersListQuery = useLazyGetUsersListQuery();
  const [sendCalendarInvite] = useSendCalendarInviteMutation();

  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        meetingLink: Yup.string()
          .url("Meeting link must be a valid URL")
          .required("Meeting link is required"),
        from: Yup.object().required("From field is required"),
        to: Yup.object().test(
          "notSameAsFrom",
          "To field cannot be the same as From field",
          function isUnique(value) {
            const { from } = this.parent;
            return !from || value !== from;
          }
        ),
        subjectLine: Yup.string().required("Subject is required"),
        description: Yup.string().required("Description is required"),
      })
    ),
    defaultValues: {
      meetingLink: "",
      from: null,
      to: null,
      subjectLine: "",
      description: "",
    },
  });
  const { handleSubmit } = methods;

  const onSubmitHandler = handleSubmit(async (formData): Promise<void> => {
    try {
      const res = await sendCalendarInvite({
        body: {
          ...formData,
          from: formData?.from?.email,
          to: formData?.to?.email,
        },
      }).unwrap();
      toast.success(res?.message ?? "Assigned Successfully");
    } catch (error) {
      toast.error(error?.data?.message ?? "Some");
    }
  });
  const summaryData = [
    { id: 1, heading: "Date", data: "04/12/2023" },
    { id: 2, heading: "Time", data: "9:00am - 9:30am (GMT + 05:00)" },
    { id: 3, heading: "Resource", data: "None" },
    { id: 4, heading: "Preliminary Screening Call 20 Mins", data: "Faisal" },
  ];

  return (
    <Grid
      py={4}
      container
      justifyContent="center"
      borderRadius={1}
      bgcolor={theme.palette.background.paper}
    >
      <Grid
        item
        md={9}
        xs={12}
        borderRadius={1}
        px={2.5}
        py={1}
        bgcolor={theme.palette.background.default}
      >
        <Grid mb={1}>
          <Typography variant="h5" mt={1} mb={3}>
            Send Calendar Invite to Interviewers
          </Typography>
          <Typography variant="h6" my={1}>
            Preliminary Screening Call
          </Typography>
          <Typography variant="body1" color={theme.palette.grey[500]} mb={2}>
            David Miller
          </Typography>
        </Grid>
        <FormProvider methods={methods}>
          <RHFTextField
            outerLabel="Meeting Link"
            fullWidth
            name="meetingLink"
            placeholder="meetingLink"
          />
          <RHFAutocompleteAsync
            outerLabel="From"
            placeholder="From"
            name="from"
            apiQuery={getUsersListQuery}
            getOptionLabel={(option: any) => option.email}
          />
          <RHFAutocompleteAsync
            outerLabel="To"
            placeholder="To"
            name="to"
            apiQuery={getUsersListQuery}
            getOptionLabel={(option: any) => option.email}
          />
          <RHFTextField
            outerLabel="Subject"
            fullWidth
            name="subjectLine"
            placeholder="Subject"
          />
          <RHFTextField
            outerLabel="Body"
            fullWidth
            name="description"
            placeholder="description"
            rows={4}
            multiline
          />
          <Grid container justifyContent="end" py={2}>
            <Button variant="contained" onClick={onSubmitHandler}>
              Send Invite
            </Button>
          </Grid>
        </FormProvider>
        <Grid>
          {summaryData?.map((ele) => (
            <Grid key={ele?.id} container mb={3} direction="column">
              <Typography variant="body1" mb={1}>
                {ele?.heading}
              </Typography>
              <Typography variant="body2">{ele?.data}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
