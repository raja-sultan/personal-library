import { Grid } from "@mui/material";
import { useLazyGetCandidateTagDropDownListQuery } from "@services/crm/events/crm-events-api";
import { RHFAutocompleteAsync } from "common";

export function GatheringFeedback({ isDisabled }): JSX.Element {
  const apiQuery = useLazyGetCandidateTagDropDownListQuery();
  return (
    <Grid container item sm={12} md={6} sx={{ p: "0.5em" }}>
      <RHFAutocompleteAsync
        multiple
        name="tags"
        queryKey="search"
        fullWidth
        label="Select the tags"
        getOptionLabel={(option) => option.candidateTag}
        apiQuery={apiQuery}
        transformResponse={(res) => res?.data?.candidateTags}
        disabled={isDisabled}
      />
    </Grid>
  );
}
