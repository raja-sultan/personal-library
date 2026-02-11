import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  // RHFAutocompleteAsync,
  RHFTextField,
} from "common";
import { type SetStateAction, type Dispatch } from "react";
import { useForm } from "react-hook-form";
import { schema, defaultValues } from "./tags-modal.schema";
import type { tagsTypes } from "./tags-modal.types";
import { useAddCandidateTagsMutation } from "@services/jobs/job-details/pipeline-api";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
// import { useLazyUsersQuery } from "@services/json-placeholder-api";

export function TagsModal(props): JSX.Element {
  const {
    tags,
    setTags,
  }: {
    tags: boolean;
    setTags: Dispatch<SetStateAction<boolean>>;
  } = props;

  const methods = useForm<tagsTypes>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const [postATag, tagPostingStatus] = useAddCandidateTagsMutation();
  const { handleSubmit } = methods;

  const params = useSearchParams();
  const candidateId = params.get("candidateId");
  const onSubmit = async (data): Promise<any> => {
    const body = { tags: [data.tags] };
    try {
      const { message } = await postATag({
        body,
        candidateId,
      }).unwrap();
      toast.success(message || "Tag Added Successfully");
      methods.reset();
    } catch (error) {
      // toast.error(error.data.message);
      toast.error("Something went wrong!");
    }
  };

  function buttonText(): string {
    if (tagPostingStatus.isSuccess) {
      return "Add more";
    } else if (tagPostingStatus.isError) {
      return "Try Again";
    }
    return "Save";
  }
  function buttonColor():
    | "error"
    | "inherit"
    | "success"
    | "warning"
    | "primary"
    | "secondary"
    | "info" {
    if (tagPostingStatus.isSuccess) {
      return "success";
    } else if (tagPostingStatus.isError) {
      return "error";
    }
    return "primary";
  }
  // const apiQuery = useLazyUsersQuery();

  return (
    <CustomModal
      onClose={setTags}
      rootSx={{
        maxWidth: { xs: 350, sm: 700 },
      }}
      headerLabel="Candidate Tags"
      closeButtonProps={{
        onClick: () => {
          setTags(false);
        },
      }}
      isOpen={tags}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              {/* Auto complete Asynchronous */}
              <RHFTextField
                name="tags"
                outerLabel="Tags"
                placeholder="Enter Tag"
              />
              {/* <RHFAutocompleteAsync
                multiple
                name="tags"
                queryKey="id"
                outerLabel="Tags"
                placeholder="Select"
                apiQuery={apiQuery}
              /> */}
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setTags(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={tagPostingStatus?.isLoading}
              variant="contained"
              type="submit"
              color={buttonColor()}
            >
              {buttonText()}
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
