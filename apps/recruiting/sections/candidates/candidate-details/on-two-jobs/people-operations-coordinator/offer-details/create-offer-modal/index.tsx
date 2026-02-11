import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import { useForm } from "react-hook-form";
import { schema, defaultValues } from "./schema";
import { addProspectData } from "./data";
import CachedIcon from "@mui/icons-material/Cached";
import { useSearchParams } from "next/navigation";
import { usePostOfferCandidateMutation } from "@services/candidate/candidate-details/on-two-jobs/offer-details/offer-details-api";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useLazyGetJobOpeningsIdsQuery } from "@services/jobs/job-details/job-setup/job-info/job-info-details-api";
import { useGetJobFieldsListApiQuery } from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";
import { CustomFieldFunction } from "@sections/candidates/add-candidates/job-candidate/job.candidate.data";

export function CreateOfferModal({
  createOffer,
  setShowCreatedOffer,
  setCreateOffer,
}: any): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const candidateId = searchParams.get("candidateID");
  const theme = useTheme();
  const getJobOpeningsIdsQuery = useLazyGetJobOpeningsIdsQuery();
  const [postOffer] = usePostOfferCandidateMutation();
  const { data: textFieldData, isLoading: isTextFieldLoading } =
    useGetJobFieldsListApiQuery({
      resourceType: "offer",
    });
  let offerCustomFields: any;
  if (!isTextFieldLoading) {
    const data = textFieldData?.data.filter(
      (item) => item?.section === "Offer Fields"
    )[0];
    if (data) {
      offerCustomFields = data?.customFields.map((items) => ({
        id: items?._id,
        componentProps: {
          multiple: items?.fieldType === "multi_select",
          name: `nameAndCompany.customFields.[${items?._id}]`,
          label: items?.fieldType === "attachment" ? items?.label : undefined,
          outerLabel: items?.label,
          options: items?.options,
          getOptionLabel: (option: any) => option.label,
          isOptionEqualToValue: (option: any, newValue: any) =>
            option === newValue,
          placeholder: items?.placeholder,
          multiline: items?.fieldType === "long_text",
          rows: items?.fieldType === "long_text" ? 3 : 1,
        },
        component: CustomFieldFunction(items?.fieldType),
        md: items?.fieldType === "long_text" ? 12 : 3,
      }));
    }
  }
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data): Promise<void> => {
    const formData = new FormData();
    formData.append("candidateId", String(candidateId));
    formData.append("jobId", String(jobId));
    formData.append("opening", data?.opening?._id);
    formData.append("employmentType", data?.employmentType);
    formData.append("salary", data?.salary);
    formData.append("startDate", dayjs(data?.startDate).toISOString());
    formData.append("version", "1");
    formData.append("customFields", JSON.stringify(data?.customFields));

    try {
      await postOffer(formData);
      toast.success("Offer Created Successfully!");
    } catch (error) {
      toast.error(error?.data?.message ?? "Error While Creating Offer");
    }
    setShowCreatedOffer(true);
  };

  return (
    <CustomModal
      onClose={() => {
        setCreateOffer(false);
      }}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
      headerLabel="Create Offer"
      closeButtonProps={{
        onClick: () => {
          setCreateOffer(false);
        },
      }}
      isOpen={createOffer}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            {addProspectData(getJobOpeningsIdsQuery, jobId).map((item) => (
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
            {offerCustomFields?.map((item) => (
              <Grid item xs={12} key={item?.id}>
                {item?.component && (
                  <item.component
                    {...item.componentProps}
                    name={`customFields.[${item?.id}]`}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <CachedIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="subtitle2">
              Changing any of these fields will trigger a new offer version
            </Typography>
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
                setCreateOffer(false);
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
