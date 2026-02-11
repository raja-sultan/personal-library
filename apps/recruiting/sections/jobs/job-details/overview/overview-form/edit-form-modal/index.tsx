import { type SetStateAction, type Dispatch } from "react";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFTextField,
} from "common";
// import { defaultValues } from "./edit-form-modal.schema";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLazyUsersQuery } from "@services/json-placeholder-api";
import { style } from "./style";


export function EditFormModal({
  editForm,
  setEditForm,
}: {
  editForm: boolean;
  setEditForm: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const methods = useForm({
    defaultValues: {
      formName: "Edit Basic Application Form",
      subject: "Subject",
      body: "Please fill out the following form: {{Form_Link}}",
      availableTokens: "{{Form_Link}}",
    },
  });

  const apiQuery = useLazyUsersQuery();

  const { handleSubmit } = methods;

  const onSubmit = (formData): any => {
    console.log(formData);
  };

  return (
    /*Custom Modal*/
    <CustomModal
      onClose={setEditForm}
      rootSx={{
        maxWidth: { xs: 350, sm: 500, md: 750 },
      }}
      headerLabel=""
      closeButtonProps={{
        onClick: () => {
          setEditForm(false);
        },
      }}
      isOpen={editForm}
    >
      <Box sx={{ maxHeight: 400, overflow: "auto", pb: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              p: 1,
              border: "1px solid #f2f4f7",
              borderRadius: "8px",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ borderBottom: "1px solid #f2f4f7", pb: 1 }}
            >
              Edit Form
            </Typography>
            <RHFTextField
              sx={{ mt: 2 }}
              name="formName"
              label="Form Name (candidate-facing)"
            />
            <Typography variant="body2" sx={{ pt: 1 }}>
              Custom Question
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              border: "1px solid #f2f4f7",
              borderRadius: "8px",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ borderBottom: "1px solid #f2f4f7", pb: 1 }}
            >
              Email to Candidate
            </Typography>
            <RHFAutocompleteAsync
              name="form"
              queryKey="id"
              label="Form"
              apiQuery={apiQuery}
            />
            <RHFTextField sx={{ mt: 2 }} name="subject" label="Subject" />
            <RHFTextField
              sx={{ mt: 2 }}
              name="body"
              label="Body"
              multiline
              minRows={3}
            />
            <RHFTextField
              sx={{ mt: 2 }}
              name="availableTokens"
              label="Available Tokens"
              multiline
              minRows={3}
            />
          </Box>
          <Box
            sx={{
              p: 1,
              border: "1px solid #f2f4f7",
              borderRadius: "8px",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ borderBottom: "1px solid #f2f4f7", pb: 1 }}
            >
              Form
            </Typography>
            <Typography
              variant="body2"
              sx={{ borderBottom: "1px solid #f2f4f7", pb: 1 }}
            >
              Form_LINK will link to this form
            </Typography>
            <RHFTextField
              sx={{ mt: 2 }}
              name="formName"
              label="Form Name (candidate-facing)"
            />
            <Typography variant="body2" sx={{ pt: 1 }}>
              Custom Question
            </Typography>
          </Box>

          <Box
            sx={{
              p: 1,
              border: "1px solid #f2f4f7",
              borderRadius: "8px",
              mb: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ pb: 1 }}>
              No questions have been added yet
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "start", alignItems:"center", gap: 2 }}>
            <Typography
              variant="body2">
              Add:
            </Typography>
            <Button variant="outlined" sx={style.formButton}>
            Question
            </Button>
            <Button variant="outlined" sx={style.formButton}>Section Header</Button>
            <Button variant="outlined" sx={style.formButton}>Statement</Button>
          </Box>
          </Box>

          <Box
            sx={{
              p: 1,
              border: "1px solid #f2f4f7",
              borderRadius: "8px",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ borderBottom: "1px solid #f2f4f7", pb: 1 }}
            >
              Form
            </Typography>
            <Typography
              variant="h6"
              sx={{ pb: 1 }}
            >
              Stage
            </Typography>
            <Typography
              variant="body2"
              sx={{ pb: 1 }}
            >
             Forms to send&quot; will appear as a task when candidates reach the following stage:
            </Typography>
            <RHFAutocompleteAsync
              name="form"
              queryKey="id"
              // label="Form"
              apiQuery={apiQuery}
              options={[
                { id: 1, name: "test", value: "test" },
                { id: 2, name: "pest", value: "pest" },
              ]}
            />
            <Typography variant="body2" sx={{ pt: 1 }}>
            Where do tasks appear?
            </Typography>
          </Box>

          <Box
            sx={{
              p: 1,
              border: "1px solid #f2f4f7",
              borderRadius: "8px",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ borderBottom: "1px solid #f2f4f7", pb: 1 }}
            >
              Notification
            </Typography>
            <Typography
              variant="body2"
              sx={{ pb: 1 }}
            >
             Notify the following users when a form is submitted by a candidate:
            </Typography>
            <Box sx={{display:"flex", flexDirection:"column"}}>            
              <RHFCheckbox label="Candidate's recruiter" name="applicationReview" />
              <RHFCheckbox label="Candidate's coordinator" name="backgroundCheck" />
              <RHFCheckbox label="Other:" name="documentSubmission" />
            </Box>
            <RHFAutocompleteAsync
              name="form"
              queryKey="id"
              label="Select Users"
              apiQuery={apiQuery}
            />
          </Box>


          <Box sx={{ mt: 5, display: "flex", justifyContent: "end", gap: 2 }}>
            <Button variant="contained" color="error">
              Cancel
            </Button>
            <Button variant="outlined">Preview</Button>
            <Button variant="contained">Update</Button>
          </Box>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}
