import { Box, Button, Typography } from "@mui/material";
import { CustomModal, FormProvider, RHFTextField } from "common";
import React from "react";
import { useForm } from "react-hook-form";
import { useAddHealthAndHiringMutation } from "@services/reports/dashboard/offers-hiring/offers-hiring-api";
import toast from "react-hot-toast";
//import toast from "react-hot-toast";

export function AddReportModal(props): JSX.Element {
  const { open, setOpen, dateWiseCount, params, data } = props;

  const [addOffers] = useAddHealthAndHiringMutation();

  const methods = useForm({
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (formData) => {
    const transformedArrayFn = (list) => {
      return list?.map((item) => item?.value);
    };
    const body = {
      name: formData.name,
      reportType: "Offfers & Hiring",
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
      const res: any = await addOffers({ body }).unwrap();
      toast.success(res.message ?? "Report has been Saved");
      setOpen(false);
    } catch (err) {
      toast.error(err.message ?? "Something went wrong");
    }
  };

  return (
    <CustomModal
      rootSx={{ maxWidth: { xs: 450, sm: 600, md: 650 } }}
      onClose={() => {
        setOpen(false);
      }}
      headerLabel="Save Report"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
      isOpen={open}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 1 }}>
          <RHFTextField name="name" outerLabel="Name of Report" />
          <Typography
            variant="caption"
            sx={{ color: "text.secondary" }}
          >{`Only you can see what you've saved`}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: 2,
            mt: { xs: 2, sm: 3 },
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
