import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFCheckbox,
  RHFCustomSelect,
  RHFTextField,
} from "common";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MultiSelectOption from "../../custom-option-card/multi-select-option";

const validationSchema = yup.object().shape({
  // other fields...
  applicationMultiList: yup
    .array()
    .of(yup.string().required("This field is required")),
});

export function RejectionQuestionFieldsModal(props: any): JSX.Element {
  const { addField, setAddField } = props;

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fieldName: "",
      description: "",
      fieldType: "",
      required: false,
      placeholderField: "",
      applicationMultiList: [""],
    },
  });

  const { handleSubmit, watch, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicationMultiList",
  });

  function onSubmit(formData): void {
    setAddField(false);
    console.log("my data", formData);
  }

  const [watchFieldType, listValues] = watch([
    "fieldType",
    "applicationMultiList",
  ]);

  return (
    <CustomModal
      isOpen={addField.open}
      onClose={() => {
        setAddField({ open: false, id: null });
      }}
      closeButtonProps={{
        onClick: () => {
          setAddField({ open: false, id: null });
        },
      }}
      headerLabel={`${addField.id ? "Edit" : "Add"} rejection question field`}
      rootSx={{
        width: { md: "40%", xs: "60%" },
        mt: 2,
        maxHeight: { xs: 500, sm: 600, lg: 700 },
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
          borderRadius: "6px",
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowGap={2} sx={{ my: 2 }}>
          <Grid item xs={12}>
            <RHFTextField
              name="fieldName"
              outerLabel="Field name"
              placeholder="Write here..."
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              minRows={3}
              multiline
              name="description"
              outerLabel="Description (optional)"
              placeholder="Enter a description..."
            />
          </Grid>
          <Grid item xs={12}>
            <RHFCustomSelect
              name="fieldType"
              outerLabel="Field Type"
              placeholder="Select"
              options={[
                { id: 0, label: "Select", value: "default" },
                { id: 1, label: "Short Text", value: "shortText" },
                { id: 2, label: "Long Text", value: "longText" },
                { id: 3, label: "Single Select", value: "singleSelect" },
                { id: 4, label: "Multi Select", value: "multiSelect" },
                { id: 5, label: "Attachment", value: "attachment" },
                { id: 6, label: "Date Selection", value: "dateSelection" },
                { id: 7, label: "URL", value: "url" },
              ]}
            />

            <Box>
              {watchFieldType === "multiSelect" && (
                <MultiSelectOption
                  fields={fields}
                  append={append}
                  remove={remove}
                  watchFieldType={listValues}
                  listName="applicationMultiList"
                />
              )}
            </Box>

            <Typography
              gutterBottom
              variant="subtitle2"
              color="neutral.900"
              marginTop="5px"
            >
              Note: &quot;Type&quot; cannot be changed once field is created
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="placeholderField"
              outerLabel="Placeholder"
              placeholder="Write placeholder..."
            />
          </Grid>
          <Grid item xs={12}>
            <RHFCheckbox name="required" label="Required" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="neutral.900">
              When should this field show up?
            </Typography>
            <Typography variant="subtitle2" color="neutral.900" mb={-2} mt={2}>
              They rejected us:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <RHFCheckbox label="In an offer stage" name="offerStage" />
          </Grid>
          <Grid item xs={6}>
            <RHFCheckbox label="In another stage" name="anotherStage" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="neutral.900" mb={-2}>
              We rejected them:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <RHFCheckbox label="In an offer stage" name="offerStage" />
          </Grid>
          <Grid item xs={6}>
            <RHFCheckbox label="In another stage" name="anotherStage" />
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={{ md: "row-reverse", xs: "column" }}
              rowGap={1}
              columnGap={1}
            >
              <LoadingButton type="submit" variant="contained">
                {addField.id ? "Update" : "Save"}
              </LoadingButton>
              <Button
                sx={{ color: "neutral.700", borderColor: "neutral.300" }}
                variant="outlined"
                onClick={() => {
                  setAddField({ open: false, id: null });
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </CustomModal>
  );
}
