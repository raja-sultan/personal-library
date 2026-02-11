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
import { useEffect } from "react";
import {
  useAddCustomFieldMutation,
  useUpdateCustomFieldMutation,
} from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";
import toast from "react-hot-toast";
import MultiSelectOption from "../../custom-option-card/multi-select-option";

const validationSchema = yup.object().shape({
  label: yup.string().required("This field is required"),
  options: yup.array().of(
    yup.object().shape({
      label: yup.string().required("This field is required"),
    })
  ),
});

const defaultValues = {
  label: "",
  description: "",
  fieldType: "",
  emailToken: false,
  emailTokenLabel: "",
  placeholder: "",
  candidate: false,
  prospect: false,
  isRequired: false,
  options: [],
};

export function AddFieldModal(props: any): JSX.Element {
  const { resourceType, addField, setAddField, editData, setEditData } = props;
  const [addCustomField] = useAddCustomFieldMutation();
  const [updateCustomField] = useUpdateCustomFieldMutation();

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, watch, control, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  async function onSubmit(formData): Promise<void> {
    const optionsList = formData?.options?.map((item) => {
      return {
        label: item.label,
        value: item.label,
      };
    });
    const typeSection = {
      resourceType,
      section: addField?.section,
    };
    const payloadData = {
      field: {
        ...formData,
        options: optionsList,
      },
    };
    if (addField?.id !== null) {
      return updateFieldHandler(payloadData);
    }
    try {
      const res: any = await addCustomField({
        body: { ...typeSection, ...payloadData },
      }).unwrap();
      toast.success(res?.message ?? `Custom Field Added Successfully!`);
      setAddField(false);
      setEditData([]);
    } catch (error) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  }

  const updateFieldHandler = async (data): Promise<void> => {
    try {
      const res: any = await updateCustomField({
        body: { ...data.field },
        fieldId: editData?._id,
      }).unwrap();
      toast.success(res?.message ?? `Custom Field Updated Successfully!`);
      setAddField(false);
      setEditData([]);
    } catch (error) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  };

  const [emailToken, watchFieldType, listValues] = watch([
    "emailToken",
    "fieldType",
    "fieldTypeMultiple",
  ]);

  useEffect(() => {
    reset({
      label: editData?.label ?? "",
      description: editData?.description ?? "",
      fieldType: editData?.fieldType ?? "",
      emailToken: editData?.emailToken ?? false,
      emailTokenLabel: editData?.emailTokenLabel ?? "",
      placeholder: editData?.placeholder ?? "",
      candidate: editData?.candidate ?? false,
      prospect: editData?.prospect ?? false,
      isRequired: editData?.isRequired ?? false,
      options: editData?.options ?? [],
    });
  }, [editData, reset]);

  return (
    <CustomModal
      isOpen={addField.open}
      closeButtonProps={{
        onClick: () => {
          setAddField(false);
          setEditData([]);
          reset(defaultValues);
        },
      }}
      headerLabel="New Application fields"
      rootSx={{
        width: { md: "40%", xs: "60%" },
        mt: 2,
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          rowGap={2}
          sx={{
            my: 2,
            maxHeight: { xs: 500, sm: 600, lg: 500 },
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: "6px",
            },
          }}
        >
          <Grid item xs={12}>
            <RHFTextField
              name="label"
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
              disabled={addField?.id !== null}
              placeholder="Select"
              options={[
                { id: 1, label: "Short Text", value: "short_text" },
                { id: 2, label: "Long Text", value: "long_text" },
                { id: 3, label: "Single Select", value: "single_select" },
                { id: 4, label: "Multi Select", value: "multi_select" },
                { id: 5, label: "Attachment", value: "attachment" },
                { id: 6, label: "Date Selection", value: "date_selection" },
                { id: 7, label: "URL", value: "url" },
                {
                  id: 8,
                  label: "Searchable Dropdown",
                  value: "searchable_dropdown",
                },
              ]}
            />

            <Typography
              gutterBottom
              variant="subtitle2"
              color="neutral.900"
              marginTop="5px"
            >
              Note: &quot;Type&quot; cannot be changed once field is created
            </Typography>
            <Box>
              {watchFieldType === "multi_select" && (
                <MultiSelectOption
                  fields={fields}
                  append={append}
                  remove={remove}
                  watchFieldType={listValues}
                  listName="options"
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="placeholder"
              outerLabel="Placeholder"
              placeholder="Write placeholder..."
            />
          </Grid>
          <Grid item xs={6}>
            <RHFCheckbox name="candidate" label="Candidate" />
          </Grid>
          <Grid item xs={6}>
            <RHFCheckbox name="prospect" label="Prospect" />
          </Grid>
          <Grid item xs={6}>
            <RHFCheckbox name="isRequired" label="Required" />
          </Grid>
          <Grid item xs={12}>
            <RHFCheckbox
              name="emailToken"
              label="Create new email token (optional)"
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name="emailTokenLabel" disabled={!emailToken} />
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={{ md: "row-reverse", xs: "column" }}
              rowGap={1}
              columnGap={1}
            >
              <LoadingButton type="submit" variant="contained">
                Save
              </LoadingButton>
              <Button
                sx={{ color: "neutral.700", borderColor: "neutral.300" }}
                variant="outlined"
                onClick={() => {
                  setAddField(false);
                  reset();
                  setEditData([]);
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
