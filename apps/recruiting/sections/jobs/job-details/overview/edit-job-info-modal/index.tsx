import { GenFormField } from "@components/form-fields-generator";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@mui/material";
import { usePutJobInfoMutation } from "@services/jobs/job-details/job-setup/job-overview/job-info/job-info-api";
import { useLazyDropdownDepartmentsListQuery } from "@services/offices-and-departments/departments-api";
import { useLazyDropdownOfficeListQuery } from "@services/offices-and-departments/offices-api";
import { CustomModal, FormProvider, IsFetching } from "common";
import { useSearchParams } from "next/navigation";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import {
  FormSchema,
  defaultValues,
  fieldsInfoFun,
} from "./edit-jobinfo-modal.schema";
import { displayErrorMessage } from "@sections/jobs/job-info/utils";
import toast from "react-hot-toast";

export function EditJobInfoModal({
  jobInfo,
  setJobInfo,
  dataOfJobInfo,
}: {
  jobInfo: boolean;
  setJobInfo: Dispatch<SetStateAction<boolean>>;
  dataOfJobInfo: any;
}): JSX.Element {
  const [updateJobInfo, { isLoading }] = usePutJobInfoMutation();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const handleCancel = (): void => {
    setJobInfo(false);
  };

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      const jsonPayload = {
        jobStatus: data?.jobStatus,
        department: data?.department._id,
        office: data?.officeName._id,
      };
      const res = await updateJobInfo({ ...jsonPayload, jobId });

      const {
        data: {
          data: { _id },
        },
      }: any = res;
      toast.success("Job info updated successfully");
      setJobInfo(false);
    } catch (error: any) {
      displayErrorMessage(error);
    }
  };

  useEffect(() => {
    reset({
      jobStatus: dataOfJobInfo?.data?.jobStatus,
      department: dataOfJobInfo?.data?.department,
      officeName: dataOfJobInfo?.data?.office,
      openDate: new Date(
        dataOfJobInfo?.data?.openDates[
          dataOfJobInfo?.data?.openDates.length - 1
        ]
      ),
      noOfOpenings: dataOfJobInfo?.data?.noOfOpenings,
      requisitionID: dataOfJobInfo?.data?.requisitionId,
      openingId:
        dataOfJobInfo?.data?.openingIds[
          dataOfJobInfo?.data?.openingIds.length - 1
        ],
    });
  }, [reset, dataOfJobInfo]);

  return (
    <CustomModal
      onClose={setJobInfo}
      rootSx={{
        maxWidth: { xs: 350, sm: 500, md: 750 },
        maxHeight: "80vh",
        overflow: "auto",
      }}
      headerLabel="Edit Job Info"
      closeButtonProps={{
        onClick: () => {
          setJobInfo(false);
        },
      }}
      isOpen={jobInfo}
    >
      <IsFetching isFetching={isLoading} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {/* Dynamically Generated Fields  */}
        <Grid container>
          {fieldsInfoFun(
            useLazyDropdownOfficeListQuery,
            useLazyDropdownDepartmentsListQuery
          ).map((item: any, index: number) => {
            const props = item?.OuterConProps ? item?.OuterConProps : {};

            return (
              <GenFormField
                key={index}
                fullWidth
                item={item}
                isSubmitting={isSubmitting}
                // disabled={disabled}
                px={1}
                py={1}
                {...props}
              />
            );
          })}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={handleCancel}>
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
