import { type SetStateAction, type Dispatch } from "react";
import {
  CustomModal,
  FormProvider,
  RHFCustomSelect,
  RHFTextField,
} from "common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";

export function FormSendModal({
  formSend,
  setFormSend,
}: {
  formSend: boolean;
  setFormSend: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  // const theme = useTheme();
  const FormSchema = Yup.object().shape({
    selectForm: Yup.array().required("Form is required."),
    form: Yup.array().required("Form is required."),
    to: Yup.array().required("To is required."),
    subject: Yup.array().required("Subject is required."),
    body: Yup.array().required("Body is required."),
  });

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      selectForm: ["select"],
    },
  });

  const { handleSubmit } = methods;
  const onSubmit = (formData: any): any => {
    console.log(formData);
  };

  return (
    <CustomModal
      onClose={setFormSend}
      rootSx={{
        maxWidth: { xs: 350, sm: 500, lg: 750, xl: 1000 },
      }}
      headerLabel="Send forms to Candidates"
      closeButtonProps={{
        onClick: () => {
          setFormSend(false);
        },
      }}
      isOpen={formSend}
    >
      <Box sx={{ mt: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFCustomSelect
            name="selectForm"
            outerLabel="Select Form"
            placeholder="Select Form"
            options={[{ id: 1, label: "Select", value: "select" }]}
            sx={{ mb: 2 }}
          />
          <RHFCustomSelect
            name="form"
            outerLabel="Form"
            placeholder="Form"
            options={[{ id: 1, label: "Select", value: "select" }]}
            sx={{ mb: 2 }}
          />
          <RHFTextField
            name="to"
            outerLabel="To"
            placeholder="Number of Candidates Selected"
          />
          <RHFTextField
            name="body"
            outerLabel="Subject"
            placeholder="Please complete the following application from"
          />
          <RHFTextField
            multiline
            rows={4}
            name="body"
            outerLabel="Body"
            placeholder="Please complete the following application from:{{FORM_LINK}}"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={() => {
                setFormSend(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Send Form
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}
