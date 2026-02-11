import {
  FormProvider,
  RHFCustomSelect,
  RHFDatePicker,
  RHFSwitch,
  RHFTextField,
} from "common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export function EditEventDetail(): JSX.Element {
  // const theme = useTheme();
  const FormSchema = Yup.object().shape({
    name: Yup.array().required("Target Value is required."),
  });

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      // activity: [],
    },
  });

  const { handleSubmit } = methods;
  const onSubmit = (formData: any): any => {
    console.log(formData);
  };

  return (
    <Box sx={{ mt: 2, backgroundColor: "white", p: 2, borderRadius: 1 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: "500" }}>
          <Link href="/dashboard">Dashboard </Link>
          <KeyboardArrowRightIcon
            sx={{ position: "relative", top: "7px" }}
          />{" "}
          <Link href="/dashboard/manage-events">Event </Link>
          <KeyboardArrowRightIcon
            sx={{ position: "relative", top: "7px" }}
          />{" "}
          Edit
        </Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          Edit Event Details
        </Typography>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xl={4} lg={6} xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Event Details
            </Typography>
          </Grid>
          <Grid item xl={4} lg={6} xs={12}>
            <RHFTextField
              name="eventname"
              outerLabel="Urgent Meeting"
              placeholder="Urgent Meeting"
              sx={{ mb: 1.5 }}
            />
            <RHFTextField
              name="description"
              outerLabel="Description"
              placeholder="Lorem Ipsum is a dummy text"
              sx={{ mb: 1.5 }}
              multiline
              rows={4}
            />
            <RHFDatePicker
              name="datePicker"
              label="MM/DD//YYYY"
              outerLabel="Start Date"
              sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
            />
            <RHFTextField
              name="location"
              outerLabel="Location"
              placeholder="Location"
              sx={{ mb: 1.5 }}
            />
            <RHFCustomSelect
              name="addProspectsToThisTool"
              outerLabel="Add Prospects To This Tool"
              placeholder="Select"
              options={[
                { id: 1, label: "Option 1", value: "option1" },
                { id: 1, label: "Option 2", value: "option2" },
              ]}
              sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
            />
            <RHFCustomSelect
              name="prospectStage"
              outerLabel="Prospect Stage"
              placeholder="Select"
              options={[
                { id: 1, label: "Option 1", value: "option1" },
                { id: 1, label: "Option 2", value: "option2" },
              ]}
              sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
            />
            <RHFCustomSelect
              name="source"
              outerLabel="Source"
              placeholder="Select"
              options={[
                { id: 1, label: "Option 1", value: "option1" },
                { id: 1, label: "Option 2", value: "option2" },
              ]}
              sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
            />
            <RHFTextField
              name="eventAdministrator"
              outerLabel="Event Administrator"
              placeholder="Event Administrator"
              sx={{ mb: 1.5 }}
            />
            <RHFTextField
              name="attendingFromYourOrganization"
              outerLabel="Who is attending from your organization?"
              placeholder="Who is attending from your organization"
              sx={{ mb: 1.5 }}
            />
          </Grid>
          <Grid item xl={4} lg={6} xs={12}></Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xl={4} lg={6} xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Prospect Info Form
            </Typography>
            <Typography variant="body1">
              There are the fields a prospect will see when filling out
              information in the app
            </Typography>
          </Grid>
          <Grid item xl={4} lg={6} xs={12}>
            <Button variant="outlined" fullWidth>
              View Example
            </Button>
            <Typography variant="h5" sx={{ my: 2 }}>
              Required Details
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, ml: 1 }}>
              <FiberManualRecordIcon sx={{ fontSize: 10 }} /> First Name
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, ml: 1 }}>
              <FiberManualRecordIcon sx={{ fontSize: 10 }} /> Last Name
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, ml: 1 }}>
              <FiberManualRecordIcon sx={{ fontSize: 10 }} /> E-mail Address
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Additional Information to Capture
            </Typography>
            <Button variant="outlined" fullWidth>
              Add a Question
            </Button>
            <Typography variant="h5" sx={{ my: 2 }}>
              Event Image or Logo
            </Typography>
            <Button variant="outlined" fullWidth>
              Select
            </Button>
          </Grid>
          <Grid item xl={4} lg={6} xs={12}></Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xl={4} lg={6} xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Gathering Feedback
            </Typography>
            <Typography variant="body1">
              There are the fields a prospect will see when filling out
              information in the app
            </Typography>
          </Grid>
          <Grid item xl={4} lg={6} xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Select up to 10 tags that attendees can use leave feedback on
              prospects
            </Typography>
            <RHFTextField
              name="searchTag"
              placeholder="Search for a tag"
              sx={{ mb: 1.5 }}
            />
          </Grid>
          <Grid item xl={4} lg={6} xs={12}></Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xl={4} lg={6} xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Follow - Up Email & Resume Upload
            </Typography>
            <RHFSwitch name="followUpSwitch" />
          </Grid>
          <Grid item xl={4} lg={6} xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Auto-send Follow Up Email
            </Typography>
            <RHFCustomSelect
              name="emailTemplate"
              outerLabel="Email Template"
              placeholder="Email Template"
              options={[
                { id: 1, label: "Option 1", value: "option1" },
                { id: 1, label: "Option 2", value: "option2" },
              ]}
              sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
            />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Resume Upload Page
            </Typography>
            <RHFTextField
              name="textForResumeUploadPage"
              outerLabel="Text For Resume Upload Page"
              placeholder="Text Event Prospect Auto reply"
              sx={{ mb: 1.5 }}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xl={4} lg={6} xs={12}></Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="contained" type="submit">
            Update Event
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
}
