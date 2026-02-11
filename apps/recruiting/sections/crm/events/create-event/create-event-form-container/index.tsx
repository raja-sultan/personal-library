import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Switch, Typography } from "@mui/material";
import {
  FormSchema,
  defaultValues,
} from "./event-detail-fields/event-details-form-data";
import { FormProvider } from "common";
import { useForm } from "react-hook-form";
import { EventDetailsFields } from "./event-detail-fields/event-details-fields";
import { ProspectInfo } from "./propect-info";
import { GatheringFeedback } from "./gathering-feedback";
import { FollowUpAndResume } from "./follow-up-email-resume/follow-up-email-resume";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  useAddCreateEventMutation,
  useUpdateEventMutation,
} from "@services/crm/events/crm-events-api";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

export function CreateEventFormContainer({ singleDetails }): JSX.Element {
  const searchParams = useSearchParams();
  const isDisabled = searchParams.get("action") === "view";

  const [showEmailResumeSection, setShowEmailResumeSection] = useState(false);
  const [addEvent] = useAddCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();

  const authdata = useSelector((state: any) => state.auth);
  const [show, setShow] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const router = useRouter();
  const methods = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues: defaultValues(singleDetails),
  });
  const { handleSubmit, reset, watch, control } = methods;

  function FormSubmitHandler(submitData: any): any {
    const updateData: any = {
      eventDetails: {},
      eventEmail: {},
      prospectInfoForm: {},
      gatheringFeedback: {},
    };
    for (const keys in submitData) {
      if (keys === "eventAdministrator") {
        updateData.eventDetails[keys] = submitData[keys].map(
          (list) => list._id
        );
      } else if (keys === "attendees") {
        updateData.eventDetails[keys] = submitData[keys].map(
          (list) => list._id
        );
      } else if (keys === "prospectPool") {
        updateData.eventDetails[keys] = submitData[keys]._id;
      } else if (keys === "prospectStage") {
        updateData.eventDetails[keys] = submitData[keys]._id;
      } else if (keys === "tags") {
        updateData.gatheringFeedback[keys] = submitData[keys].map(
          (list) => list._id
        );
      } else if (keys === "questions") {
        updateData.prospectInfoForm[keys] = submitData[keys];
      } else if (
        keys === "emailTemplate" ||
        keys === "emailTemplate" ||
        keys === "textResumeUpload" ||
        keys === "textResumeConfirmation" ||
        keys === "isResumeUpload" ||
        keys === "availableToken"
      ) {
        updateData.eventEmail[keys] = submitData[keys];
      } else {
        updateData.eventDetails[keys] = submitData[keys];
      }
    }

    const formData = new FormData();
    formData.append("eventDetails", JSON.stringify(updateData.eventDetails));
    formData.append("eventEmail", JSON.stringify(updateData.eventEmail));
    formData.append("createdBy", authdata.user._id);
    formData.append(
      "gatheringFeedback",
      JSON.stringify(updateData.gatheringFeedback)
    );
    formData.append(
      "prospectInfoForm",
      JSON.stringify(updateData.prospectInfoForm)
    );
    if (submitData.eventImage) {
      formData.append("eventImage", JSON.stringify(submitData.eventImage));
    }

    if (searchParams.get("event_id")) {
      updateHandler(formData);
      return;
    }
    addEvent({
      body: formData,
    })
      .unwrap()
      .then(() => {
        toast.success("Event Created Successfully");
        reset();
        setShowUpload(false);
        setShow(false);
        router.back();
      })
      .catch((error) => {
        toast.error(error.data.message ?? "SomeThing went Wrong");
      });
  }

  const updateHandler = (formData) => {
    updateEvent({
      body: formData,
      eventId: searchParams.get("event_id"),
    })
      .unwrap()
      .then(() => {
        toast.success("Event Updated Successfully");
        reset();
        setShowUpload(false);
        setShow(false);
        router.back();
      })
      .catch((error) => {
        toast.error(error.data.message ?? "SomeThing went Wrong");
      });
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(FormSubmitHandler)}>
      <Grid item sm={12} container>
        <Grid item sm={12}>
          <Typography variant="h5">Create Event</Typography>
        </Grid>
        <Grid item sm={12} container>
          <Grid item sm={4}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Event Details
            </Typography>
          </Grid>
          <Grid item sm={8} sx={{ my: 2 }}>
            <EventDetailsFields
              watch={watch}
              reset={reset}
              isDisabled={isDisabled}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={12}
          container
          sx={{ borderTop: 1, borderColor: "neutral.200", pt: 1 }}
        >
          <Grid item sm={4}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Prospect Info Form
            </Typography>
            <Typography variant="subtitle2">
              There are the fields a prospect will see when filling out
              information in the app
            </Typography>
          </Grid>
          <Grid item sm={8} sx={{ my: 2 }}>
            <ProspectInfo
              show={show}
              setShow={setShow}
              showUpload={showUpload}
              setShowUpload={setShowUpload}
              control={control}
              isDisabled={isDisabled}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={12}
          container
          sx={{ borderTop: 1, borderColor: "neutral.200", pt: 1 }}
        >
          <Grid item sm={4}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Gathering Feedback
            </Typography>
            <Typography variant="subtitle2">
              There are the fields a prospect will see when filling out
              information in the app
            </Typography>
          </Grid>
          <Grid item sm={8} sx={{ my: 2 }}>
            <GatheringFeedback isDisabled={isDisabled} />
          </Grid>
        </Grid>
        <Grid
          item
          sm={12}
          container
          sx={{ borderTop: 1, borderColor: "neutral.200", pt: 1 }}
        >
          <Grid item sm={4}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Follow - Up Email & Resume Upload
            </Typography>
            <Switch
              checked={showEmailResumeSection}
              onChange={(e) => {
                setShowEmailResumeSection(e.target.checked);
              }}
            />
          </Grid>
          {showEmailResumeSection && (
            <Grid item sm={8} sx={{ my: 2 }}>
              <FollowUpAndResume isDisabled={isDisabled} />
            </Grid>
          )}
        </Grid>
        <Grid
          item
          sm={12}
          container
          justifyContent="flex-end"
          sx={{ mb: "0.5em" }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={isDisabled}
            //  loading={isLoading}
          >
            {searchParams.get("action") !== "edit" ? "Create" : "Update"} Event
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
