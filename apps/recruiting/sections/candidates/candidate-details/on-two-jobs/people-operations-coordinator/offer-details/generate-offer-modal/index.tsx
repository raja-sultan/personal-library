import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import { useForm } from "react-hook-form";
import { schema, defaultValues } from "./schema";
import { useEffect } from "react";
import { emailTeam } from "./data";

export function GenerateOfferDocumentModal(props): JSX.Element {
  const { generateDocument, setUpGenerateDocument } = props;
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    data;
    // console.log("data", data);
    setUpGenerateDocument(false);
  };
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);

  return (
    <CustomModal
      onClose={() => {
        setUpGenerateDocument(false);
      }}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
      headerLabel="Generate Offer Document for: John Doe"
      closeButtonProps={{
        onClick: () => {
          setUpGenerateDocument(false);
        },
      }}
      isOpen={generateDocument}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            {emailTeam()?.emailTeamDetails?.map((item) => (
              <Grid item xs={12} md={item?.md} key={item.id}>
                <item.component
                  {...item.componentProps}
                  fullWidth
                  sx={{ py: 0 }}
                >
                  {item?.componentProps?.options?.map((option: any) => (
                    <option key={option?.id} value={option?.value}>
                      {option?.name}
                    </option>
                  ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "start", sm: "end" },
              gap: 2,
              mt: { xs: 1, sm: 2 },
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setUpGenerateDocument(false);
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
