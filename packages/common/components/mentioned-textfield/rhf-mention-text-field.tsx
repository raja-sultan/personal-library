// @mui
import { Box, Stack, Typography } from "@mui/material";
import { Mention } from "react-mentions";

// form
import { Controller, useFormContext } from "react-hook-form";
import { StyledMentionedField } from "./default-style";

export function RHFMentionTextField({
  name = "",
  outerLabel,
  mentionList,
}: any): JSX.Element {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">{outerLabel}</Typography>
            <Typography variant="body1">@mentions</Typography>
          </Box>
          <StyledMentionedField
            placeholder="Note"
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            a11ySuggestionsListLabel="Suggested mentions"
          >
            <Mention
              data={mentionList}
              displayTransform={(id, display = "") => {
                return `@${display}`;
              }}
              markup="@[__display__](__id__)"
            />
          </StyledMentionedField>
          {error && <div style={{ color: "red" }}>{error.message}</div>}
        </Stack>
      )}
    />
  );
}
