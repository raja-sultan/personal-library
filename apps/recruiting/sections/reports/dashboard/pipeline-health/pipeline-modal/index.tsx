import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import { useAddPipelineReportMutation } from "@services/reports/dashboard/pipeline-health/pipeline-health-api";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function PipelineHistoryModal({
  isOpen,
  closeModel,
  params,
  dateWiseCount,
  setPipelineModals,
  data,
}: any): JSX.Element {
  const [addPipeLine] = useAddPipelineReportMutation();
  const methods = useForm({
    defaultValues: {
      reportName: "",
    },
  });

  const { handleSubmit } = methods;

  const submitHandler = async (formData: any): Promise<void> => {
    const transformedArrayFn = (list) => {
      return list?.map((item) => item?.value);
    };

    const body = {
      name: formData.reportName,
      reportType: "Pipeline Health",
      averageFillTime: dateWiseCount?.averageFillTime,
      averageStageTime: dateWiseCount?.averageStageTime,
      averageHireTime: dateWiseCount?.averageHireTime,
      datewiseCount: dateWiseCount?.data ? dateWiseCount?.data : [],
      offersCreated: data?.data?.offersCreated ? data?.data?.offersCreated : [],
      offersAccepted: data?.data?.offersAccepted
        ? data?.data?.offersAccepted
        : [],
      FilterCount: {
        department: transformedArrayFn(params?.department),
        office: transformedArrayFn(params?.office),
        startDate: params?.startDate,
        endDate: params?.endDate,
        recruiters: transformedArrayFn(params?.recruiters),
        managers: transformedArrayFn(params?.managers),
      },
    };
    try {
      const res: any = await addPipeLine({ body }).unwrap();
      toast.success(res.message ?? "Report has been Saved");
      setPipelineModals(false);
    } catch (err) {
      toast.success(err.message ?? "Something went wrong");
    }
  };
  return (
    <CustomModal
      isOpen={isOpen}
      rootSx={{
        maxWidth: { xs: 450, sm: 600, md: 650 },
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
        pr: 2,
      }}
      onClose={closeModel}
      headerLabel="Save Report"
      closeButtonProps={{ onClick: closeModel }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
        <Grid container>
          <Grid item xs={12} mt={1}>
            <RHFTextField name="reportName" placeholder="Report Name" />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Only you can see what you have saved.
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                setPipelineModals(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton variant="contained" type="submit" sx={{ ml: 1 }}>
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </CustomModal>
  );
}
