import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import { useForm } from "react-hook-form";
import { schema, defaultValues } from "./schema";
import { useEffect } from "react";
import { EmailTeam } from "./data";
import { usePutMarkCandidateAsHiredMutation } from "@services/candidate/candidate-details/on-two-jobs/offer-details/offer-details-api";
import toast from "react-hot-toast";

export function MarkCandidateHiredModal(props): JSX.Element {
  const {
    markCandidateHired,
    setMarkCandidateHired,
    setShowCandidateAsHired,
    offerId,
  } = props;

  const [putMarkCandidateAsHired] = usePutMarkCandidateAsHiredMutation();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const emails = data?.emailCandidate.map((item) => {
      return item._id;
    });

    try {
      const res = await putMarkCandidateAsHired({
        offerId,
        closeReason: data?.closeReason?._id,
        markCandidateAsPrivate: data?.makeCandidatePrivate,
        summaryEmailTo: emails,
      }).unwrap();
      toast.success("Offer Accepted");
      setMarkCandidateHired(false);
      setShowCandidateAsHired(true);
    } catch (error) {
      toast.error("Something went wrong");
    }

    setMarkCandidateHired(false);
    setShowCandidateAsHired(true);
  };
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);

  return (
    <CustomModal
      onClose={() => {
        setMarkCandidateHired(false);
      }}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
      headerLabel="Accept Offer"
      closeButtonProps={{
        onClick: () => {
          setMarkCandidateHired(false);
        },
      }}
      isOpen={markCandidateHired}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            {EmailTeam()?.emailTeamDetails?.map((item) => (
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
                setMarkCandidateHired(false);
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
