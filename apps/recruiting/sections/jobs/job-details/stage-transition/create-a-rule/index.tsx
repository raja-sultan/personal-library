import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  RHFEditor,
  RHFTextField,
} from "common";
import {
  useAddStageTransitionRuleMutation,
  useLazyGetStagesTransitionRuleQuery,
} from "@services/jobs/job-details/stage-transition/stage-transition-api";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { defaultValues, FormSchema } from "./create-a-rule-form-data";
import { useLazyGetUsersEmailListQuery } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import { useLazyGetAllUsersQuery } from "@services/jobs/job-details/forms/forms-api";
import { useEffect } from "react";

export function CreateARule({
  openCreateRule,
  setOpenCreateRule,
}): JSX.Element {
  const getStagesTransitionRuleQuery = useLazyGetStagesTransitionRuleQuery();
  const getAllUsersQuery = useLazyGetAllUsersQuery();
  const getUsersEmailListQuery = useLazyGetUsersEmailListQuery({});
  const [addStageTransitionRule] = useAddStageTransitionRuleMutation();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const methods = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;

  const submitHandler = async (data: any) => {
    const filteredListFn = (obj) => obj?.value;
    try {
      const jsonPayload = {
        jobId,
        stage: data?.stage?._id,
        action: filteredListFn(data?.actions),
        whenToSend: filteredListFn(data?.whenToSend),
        templateId: data?.template?._id,
        from: data?.emailFrom?.email,
        to: data?.emailTo,
        subject: data?.emailSubject,
        body: data?.emailBody,
      };

      const res = await addStageTransitionRule({
        payload: jsonPayload,
      }).unwrap();
      toast.success(res.message);
      setOpenCreateRule(!openCreateRule);
    } catch (error) {
      toast.error(error);
    }
  };

  const dataWatch = watch("template");
  useEffect(() => {
    if (dataWatch !== null) {
      setValue("emailBody", dataWatch.email_body);
      setValue("emailSubject", dataWatch.email_subject);
      setValue("emailTo", dataWatch.cc[0]);
    } else {
      setValue("emailBody", "");
      setValue("emailSubject", "");
      setValue("emailTo", "");
    }
  }, [dataWatch, setValue]);

  return (
    <Box sx={{ mt: 3, p: 2, backgroundColor: "white" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
        <Typography variant="h6">Create Rule</Typography>
        <Typography variant="body2">
          When a candidate moves to a stage
        </Typography>
        <Grid container item lg={8} xl={6}>
          <Grid item xs={12} mt={1}>
            <RHFAutocompleteAsync
              name="stage"
              outerLabel="Stage"
              placeholder="Stage"
              apiQuery={getStagesTransitionRuleQuery}
              externalParams={{ jobId }}
              getOptionLabel={(option: any) => option?.stageName}
            />
          </Grid>
          <Grid item xs={12} mt={1}>
            <Typography variant="caption">Then</Typography>
            <RHFAutocompleteSync
              name="actions"
              outerLabel="Actions"
              placeholder="Select..."
              options={[
                { id: 1, name: "Email Candidate", value: "EMAIL_TEMPLATE" },
                {
                  id: 2,
                  name: "Send Availability Request",
                  value: "SEND_AVAILABILITY_REQUEST",
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} mt={1}>
            <RHFAutocompleteSync
              name="whenToSend"
              outerLabel="When To Send"
              placeholder="Select..."
              options={[
                { id: 1, name: "Immediate", value: "IMMEDIATE" },
                {
                  id: 2,
                  name: "After One Hour",
                  value: "AFTER_ONE_HOUR",
                },
                {
                  id: 3,
                  name: "After Two Hours",
                  value: "AFTER_TWO_HOUR",
                },
                {
                  id: 4,
                  name: "After Three Hours",
                  value: "AFTER_THREE_HOUR",
                },
                {
                  id: 5,
                  name: "At Day End",
                  value: "AT_DAY_END",
                },
                {
                  id: 6,
                  name: "After 1 Days At Time 24 hours show with AM & PM",
                  value: "AFTER_ONE_DAY",
                },
                {
                  id: 7,
                  name: "After 2 Days At Time 24 hours show with AM & PM",
                  value: "AFTER_TWO_DAYS",
                },
                {
                  id: 8,
                  name: "Skip Saturday Sunday",
                  value: "SKIP_SATURDAY_SUNDAY",
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} mt={1}>
            <RHFAutocompleteAsync
              name="template"
              outerLabel="Template"
              placeholder="Select..."
              apiQuery={getUsersEmailListQuery}
              getOptionLabel={(option: any) => option?.template_name}
              transformResponse={(res) => {
                return res?.data;
              }}
            />
          </Grid>
          <Grid item xs={12} mt={1}>
            <RHFAutocompleteAsync
              name="emailFrom"
              outerLabel="From"
              placeholder="{{MY_EMAIL_ADDRESS}}"
              apiQuery={getAllUsersQuery}
              getOptionLabel={(option: any) => option?.userName}
            />
          </Grid>
          <Grid item xs={12} mt={1}>
            <RHFTextField outerLabel="To" fullWidth name="emailTo" />
          </Grid>
          <Grid item xs={12} mt={1}>
            <RHFTextField outerLabel="Subject" fullWidth name="emailSubject" />
          </Grid>
          <Grid item xs={12} mt={1}>
            <RHFEditor name="emailBody" outerLabel="Body" />
          </Grid>

          <Grid item xs={12} mt={2} display="flex" justifyContent="flex-end">
            <Button
              onClick={() => {
                setOpenCreateRule(!openCreateRule);
              }}
              variant="outlined"
              type="button"
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" sx={{ ml: 1 }}>
              Save
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
}
