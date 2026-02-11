import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFUploadSingleFileWithoutPreview,
} from "common";
import { useForm } from "react-hook-form";
import { schema, defaultValues } from "./schema";
import { useEffect } from "react";

export function UploadOfferDocumentModal(props): JSX.Element {
  const { uploadDocument, setUploadDocument } = props;
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    data;
    setUploadDocument(false);
  };
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);

  return (
    <CustomModal
      onClose={() => {
        setUploadDocument(false);
      }}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
      headerLabel="Upload Offer"
      closeButtonProps={{
        onClick: () => {
          setUploadDocument(false);
        },
      }}
      isOpen={uploadDocument}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ my: 2 }}>
          <Box sx={{ border: "1px solid silver", p: 1, borderRadius: "8px" }}>
            <RHFUploadSingleFileWithoutPreview
              // label="Attach Resume"
              name="upload"
              accept=".doc, .docx, .pdf, .rtf"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "start", sm: "end" },
              gap: 2,
              mt: { xs: 1, sm: 2 },
              mb: 0.5,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setUploadDocument(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
