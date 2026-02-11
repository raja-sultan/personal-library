import { useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import { CustomModal, FormProvider, RHFAutocompleteAsync } from "common";
import { UseManageModal } from "./use-manage-modal";
import { LoadingButton } from "@mui/lab";
import { FormSchema, defaultValues, fieldsInfo } from "./manage-modal.schema";
import { GenFormField } from "@components/form-fields-generator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  useLazyDepartmentListQuery,
  useLazyGetJobOfficeListQuery,
} from "@services/jobs/job-details/approvals/job-info-approvals-api";

export function ManageJobsModal({
  openCategory,
  setOpenCategory,
  manageJobData,
  departmentList,
  officeListApiData,
}: any): JSX.Element {
  const departmentName = useLazyDepartmentListQuery();
  const officeList = useLazyGetJobOfficeListQuery();
  const {
    onSubmit,
    handleCancel,
    isLoading,
    // manageModalFormData,
  } = UseManageModal({
    setOpenCategory,
    manageJobData,
  });

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;
  useEffect(() => {
    if (manageJobData) {
      const filterDepartment = departmentList?.data.filter(
        (res) => res._id === manageJobData.department._id
      );

      const filterOffice = officeListApiData?.data.filter(
        (res) => res._id === manageJobData.office._id
      );
      const newData = {
        ...manageJobData,
        department: filterDepartment !== undefined ? filterDepartment[0] : {},
        office: filterOffice !== undefined ? filterOffice[0] : {},
      };
      reset(newData);
    }
  }, [departmentList?.data, manageJobData, officeListApiData?.data, reset]);

  return (
    /*Custom Modal*/
    <CustomModal
      onClose={setOpenCategory}
      rootSx={{
        maxWidth: { xs: 350, sm: 500 },
      }}
      headerLabel="Job Information"
      closeButtonProps={{
        onClick: () => {
          setOpenCategory(false);
        },
      }}
      isOpen={openCategory}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column">
          {fieldsInfo.map((item: any, index: number) => {
            const props = item?.OuterConProps ? item?.OuterConProps : {};
            if (item.name === "department") {
              return (
                <Box key={index} my={2}>
                  <RHFAutocompleteAsync
                    name="department"
                    getOptionLabel={(option: any) => option?.departmentName}
                    disableCloseOnSelect={false}
                    apiQuery={departmentName}
                    placeholder="Select department"
                    transformResponse={(res: any) => res?.data}
                    outerLabel={"Department"}
                  />
                </Box>
              );
            } else if (item.name === "office") {
              return (
                <Box key={index} mb={2}>
                  <RHFAutocompleteAsync
                    name="office"
                    getOptionLabel={(option: any) =>
                      option?.officeName + option?.location
                    }
                    disableCloseOnSelect={false}
                    apiQuery={officeList}
                    placeholder="Select office"
                    transformResponse={(res: any) => res?.data}
                    outerLabel="office"
                  />
                </Box>
              );
            }
            return (
              <GenFormField
                key={index}
                fullWidth
                item={item}
                disabled={item.disabled}
                {...props}
              />
            );
          })}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <LoadingButton loading={isLoading} variant="contained" type="submit">
            Save
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
