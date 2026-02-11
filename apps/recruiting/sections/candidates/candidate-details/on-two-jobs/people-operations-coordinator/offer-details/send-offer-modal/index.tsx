import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import { useForm } from "react-hook-form";
import { emailTeam } from "./data";
import { schema, defaultValues } from "./schema";
import { useEffect } from "react";
// import { useSendEmailMutation } from "@services/send-email-api";
// import toast from "react-hot-toast";
// import dayjs from "dayjs";

export function SendOfferDocumentModal(props): JSX.Element {
  const { candidate, setCandidate } = props;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  //   const [sendEmailHandler] = useSendEmailMutation();

  const { handleSubmit, reset } = methods;
  const onSubmit = (data) => {
    data;
    // console.log("data", data);
    setCandidate(true);
  };

  //   const onSubmit = async (data) => {
  //     const extendedCC = data.ccMe
  //       ? [...data.ccRecipients, data.from]
  //       : [...data.ccRecipients];
  //     const body = {
  //       recipients: data.recipients,
  //       ccRecipients: extendedCC,
  //       subject: data.subject,
  //       text: "",
  //       html: data.html,
  //       attachments: [],
  //     };
  //     try {
  //       const res = await sendEmailHandler({
  //         body,
  //         emailSendAt: dayjs(data.emailSendAt),
  //       }).unwrap();
  //       toast.success(res.data ?? "Email Sent");
  //       setCandidate(false);
  //     } catch (error) {
  //       toast.error("Something went wrong!");
  //     }
  //   };

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);

  return (
    <CustomModal
      onClose={setCandidate}
      rootSx={styles.modalStyling}
      headerLabel="Send Offer Document"
      closeButtonProps={{
        onClick: () => {
          setCandidate(false);
        },
      }}
      isOpen={candidate}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.innerCardWrapper}>
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
              my: { xs: 1, sm: 1 },
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setCandidate(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Send Email
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 700 },
  },
  innerCardWrapper: {
    mt: 2,
    maxHeight: { xs: 500, sm: 600, lg: 700 },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
    pr: 2,
  },
};
