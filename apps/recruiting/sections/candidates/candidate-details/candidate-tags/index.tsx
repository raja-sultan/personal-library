import { useState } from "react";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { FormProvider, RHFAutocompleteSync } from "common";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  usePostCandidateDataMutation,
  useUpdateCandidateDataMutation,
} from "@services/candidate/candidate-tags/candidate-tags-api";
import { useSearchParams } from "next/navigation";

export function CandidateTags({ candidateTags, refetch }): JSX.Element {
  const [showTagsField, setShowTagsField] = useState<boolean>(false);
  const [postData] = usePostCandidateDataMutation();
  const [updateData] = useUpdateCandidateDataMutation();
  const params = useSearchParams();
  const candidateId = params.get("candidateID");

  const methods: any = useForm<any>({
    defaultValues: {
      tags: candidateTags ?? [],
    },
  });

  const { handleSubmit, reset } = methods;
  async function addUpdateFunction(apiToHit, formData): Promise<void> {
    try {
      const res: any = await apiToHit({
        body: { tags: formData?.tags },
        candidateId,
      });
      refetch();
      toast.success(res?.message ?? `Update Successfully!`);
      setShowTagsField(false);
    } catch (error) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  }
  const submitHandler = handleSubmit(async (formData: any): Promise<void> => {
    if (candidateTags?.length > 0) {
      await addUpdateFunction(updateData, formData);
    } else {
      await addUpdateFunction(postData, formData);
    }
  });

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={2} mt={2}>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6">Candidate Tags</Typography>
          <Typography
            variant="h6"
            sx={{ color: "primary.main", cursor: "pointer" }}
            onClick={() => {
              reset({ tags: candidateTags });
              setShowTagsField(true);
            }}
          >
            {candidateTags?.length > 0 ? "Edit" : "Add"}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex" }}>
          {candidateTags?.map((tags) => (
            <Chip variant="outlined" key={tags} label={tags} />
          ))}
        </Grid>
        {showTagsField && (
          <>
            <Grid item xs={12}>
              <RHFAutocompleteSync
                disableCloseOnSelect={false}
                name="tags"
                freeSolo
                fullWidth
                multiple
                getOptionLabel={(option: string) => option}
                renderOption={false}
                options={candidateTags ?? []}
                isOptionEqualToValue={(option: any, newValue: any) =>
                  option === newValue
                }
                renderTags={(value: readonly string[], getTagProps) =>
                  value?.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      key={option}
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
            </Grid>
            <Box
              mt={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    setShowTagsField(false);
                    // reset({ candidateTags: [] });
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ ml: 1 }}
                  onClick={submitHandler}
                >
                  Save
                </Button>
              </>
            </Box>
          </>
        )}
      </Grid>
    </FormProvider>
  );
}
