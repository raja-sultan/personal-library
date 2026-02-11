import { useForm } from "react-hook-form";
import { Button, Grid, Typography } from "@mui/material";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { useAddEfficiencyReportMutation } from "@services/reports/dashboard/recruiting-efficiency/recruiting-efficiency-api";
import toast from "react-hot-toast";

export function RecruitingEfficiencyModal({
  setOpen,
  params,
  dateWiseCount,
  data,
  open,
}: any): JSX.Element {
  const methods = useForm({
    defaultValues: {
      reportName: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const [postEfficiencyReport] = useAddEfficiencyReportMutation();
  const submitHandler = async (formData: any): Promise<void> => {
    const transformedArrayFn = (list): any => {
      return list?.map((item) => item?.value);
    };

    // Function to convert month name to number
    const monthNameToNumber = (monthName: any) => {
      const months = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12,
      };
      return months[monthName];
    };

    // Convert month names to numbers
    const convertedPayload = dateWiseCount?.data?.map((item) => ({
      month: monthNameToNumber(item.month),
      year: parseInt(item.year, 10), // Parsing string to integer
      candidateCount: parseInt(item.candidateCount, 10), // Parsing string to integer
    }));

    const body = {
      name: formData.reportName,
      reportType: "Recuriting Efficiency",
      averageFillTime: dateWiseCount?.averageFillTime,
      averageStageTime: dateWiseCount?.averageStageTime,
      averageHireTime: dateWiseCount?.averageHireTime,
      datewiseCount: convertedPayload ? convertedPayload : [],
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
      const res: any = await postEfficiencyReport({ body }).unwrap();
      toast.success(res.message ?? "Efficiency report created successfully");
      setOpen(false);
    } catch (error) {
      toast.error(error.data.message);
    }
    reset();
  };
  return (
    <CustomModal
      isOpen={open}
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
      onClose={() => {
        setOpen(false);
      }}
      headerLabel="Save Report"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
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
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" sx={{ ml: 1 }}>
              Save
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </CustomModal>
  );
}
