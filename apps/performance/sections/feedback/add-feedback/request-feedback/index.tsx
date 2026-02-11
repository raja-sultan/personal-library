import React, { useEffect, useState } from "react";
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import {
  FormProvider,
  RHFAutocompleteSync,
  RHFRadioGroup,
  RHFTextField,
} from "common";
import { useRequestFeedback } from "@sections/feedback/add-feedback/request-feedback/use-request-feedback";
import DynamicDropdown from "@components/dynamic-dropdown";
import {
  useAddResourceMutation,
  useDeleteResourceMutation,
  useGetResourcesListQuery,
} from "@services/resources/resources-api";
import { styles } from "@sections/feedback/add-feedback/add-feedback-styles";
import { LoadingButton } from "@mui/lab";

export function RequestFeedback({ backPath }: { backPath?: string | null }): JSX.Element {

  const {
    onSubmit,
    router,
    methods,
    handleSubmit,
    employeeData,
    transformedOptions,
    watch,
    isLoading
  } = useRequestFeedback({ backPath });
  const [relationshipOptions, setRelationshipOptions] = useState([]);
  const [deleteResourceMutation] = useDeleteResourceMutation();
  const [addResourceMutation] = useAddResourceMutation();
  const { data: getRelationshipList } = useGetResourcesListQuery({
    type: "question",
  });
  async function addResource({
    name,
    type,
  }: {
    name: string;
    type: string;
  }): Promise<void> {
    const data = {
      name,
      type,
    };
    const response = await addResourceMutation(data).unwrap();
    return response;
  }

  async function deleteResource(id: string): Promise<any> {
    const response = await deleteResourceMutation({ id }).unwrap();
    return response;
  }

  useEffect(() => {
    if (getRelationshipList?.data?.length) {
      const options = getRelationshipList.data.map((item) => ({
        label: item.name,
        value: item.name.toLowerCase(),
        id: item._id,
        userId: item.userId,
      }));
      setRelationshipOptions(options);
    }
  }, [getRelationshipList?.data]);

  return (
    <Card sx={{ p: 4 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3.8}>
            <Typography fontWeight={600} variant="h6" color="text.primary">
              Ask Feedback
            </Typography>
            <Typography
              variant="body2"
              fontSize="1.4rem"
              mt="0.2rem"
              color="text.secondary"
            >
              Select the name of the person from the list you want to ask for
              feedback
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={600}>Who do you want to ask for feedback?</Typography>
            <RHFAutocompleteSync
              name="askFeedback"
              // outerLabel="Sync autocomplete"
              placeholder="Select"
              options={employeeData?.data?.length
                ? employeeData.data.map((item) => {
                  return {
                    id: item.value,
                    name: item.text,
                    value: item.value,
                  };
                })
                : []}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={3.8}>
            <Typography fontWeight={600} variant="h6" color="text.primary">
              Feedback about
            </Typography>
            <Typography
              variant="body2"
              fontSize="1.4rem"
              mt="0.2rem"
              color="text.secondary"
            >
              Select the name of the person from the list you want to share your
              feedback about.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={600}>Who’s the feedback about?</Typography>
            <RHFAutocompleteSync
              name="aboutFeedback"
              placeholder="Select"
              options={employeeData?.data?.length
                ? employeeData.data.map((item) => {
                  return {
                    id: item.value,
                    name: item.text,
                    value: item.value,
                  };
                })
                : []}
            />
          </Grid>
          {transformedOptions.length > 0 && <Grid item xs={12} md={12}>
            <Divider sx={{ my: 3 }} />
            <RHFRadioGroup name="addType" options={transformedOptions} sx={{ "& .MuiFormControlLabel-root": { alignItems: "flex-start" }, "&.MuiFormGroup-root": { gap: "48px" } }} />
          </Grid>}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={3.8}>
            <Typography fontWeight={600} variant="h6" color="text.primary">
              Feedback Prompt
            </Typography>
            <Typography
              variant="body2"
              fontSize="1.4rem"
              mt="0.2rem"
              color="text.secondary"
            >
              Select an existing feedback from the given prompt.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <DynamicDropdown
              name="feedbackPrompt"
              outerLabel={<Typography variant="subtitle1" fontWeight={600}>Choose a question</Typography>}
              addButtonText="Add question"
              fieldType="question"
              addOption={addResource}
              deleteOption={deleteResource}
              options={relationshipOptions}
              optionTextMaxWidth={470}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={3.8}>
            <Typography fontWeight={600} variant="h6" color="text.primary">
              Your Feedback
            </Typography>
            <Typography
              variant="body2"
              fontSize="1.4rem"
              mt="0.2rem"
              color="text.secondary"
            >
              Write your feedback text here.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField
              name="yourFeedback"
              outerLabel={<Typography variant="subtitle1" fontWeight={600}>What do you want feedback on?</Typography>}
              placeholder="Write something.."
              maxRows={7}
              minRows={3}
              multiline
            />
            <Typography mt={0.5} color="text.secondary" variant="subtitle2" textAlign="end">{watch()?.yourFeedback?.length}/500</Typography>

          </Grid>
        </Grid>

        <Box sx={styles.buttonsBox}>
          <Button
            type="button"
            onClick={() => {
              router.push(backPath ?? '/feedback');
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <LoadingButton loading={isLoading} type="submit" variant="contained">
            Send Request
          </LoadingButton>
        </Box>
      </FormProvider>
    </Card>
  );
}
