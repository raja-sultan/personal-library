import { Grid } from "@mui/material";
import FormField from "./form-field";

export function GenFormField({
  item: {
    type,
    name,
    label,
    fieldHeader,
    options,
    outerLabel,
    disable,
    queryKey,
    apiQuery,
    multiple,
    getOptionLabel,
    placeholder,
    ...itemRest
  },
  isSubmitting,
  disabled,
  ...rest
}: any): JSX.Element {
  return (
    <Grid item {...rest} container direction="column">
      <Grid item>
        {fieldHeader && fieldHeader}
        <FormField
          fieldType={type}
          name={name}
          label={label}
          outerLabel={outerLabel}
          disabled={isSubmitting || disabled || disable}
          options={options}
          multiple={multiple}
          queryKey={queryKey}
          getOptionLabel={getOptionLabel}
          apiQuery={apiQuery}
          placeholder={placeholder}
          {...itemRest}
        />
      </Grid>
    </Grid>
  );
}
