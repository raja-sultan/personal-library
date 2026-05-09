import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Stack } from "@mui/material";
import { CustomModal, FormProvider, RHFTextField } from "common";
import toast from "react-hot-toast";
import {
  useGetDepartmentsListQuery,
  usePutDepartmentMutation,
  usePostDepartmentMutation,
} from "@services/settings/department/department-api";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
  departmentName: yup.string().required("This field is required"),
});

export function DepartmentModal(props: any): JSX.Element {
  const { addField, setAddField } = props;

  const { data: getDepartmentList } = useGetDepartmentsListQuery({
    limit: 10,
    offset: 0,
  });
  const departmentData = getDepartmentList?.data?.departments;

  const matchedObject = departmentData?.find((obj) => obj._id === addField.id);

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema), 
    defaultValues: {
      departmentName: "",
      description: "",
    },
  });

  const [postDepartment] = usePostDepartmentMutation();
  const [updateDepartment] = usePutDepartmentMutation();
  const { handleSubmit, reset } = methods;

  async function onSubmit(formData): Promise<void> {
    setAddField(false);
    const body = {
      departmentName: formData.departmentName,
      description: formData.description,
    };
    if (addField.id) {
      await updateDepartment({ id: addField.id, body })
        .unwrap()
        .then(() => {
          toast.success("Department update Successfully");
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    } else {
      await postDepartment({ body })
        .unwrap()
        .then(() => {
          toast.success("Department Added Successfully");
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    }
    reset();
  }

  useEffect(() => {
    reset({
      departmentName: matchedObject?.departmentName,
      description: matchedObject?.description,
    });
  }, [matchedObject?.departmentName, matchedObject?.description, reset]);

  return (
    <CustomModal
      isOpen={addField.open}
      onClose={() => {
        setAddField({ open: false, id: null });
      }}
      closeButtonProps={{
        onClick: () => {
          setAddField({ open: false, id: null });
        },
      }}
      headerLabel={`${addField.id ? "Edit" : "Add"} Department`}
      rootSx={{
        width: { md: "40%", xs: "60%" },
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
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowGap={2} sx={{ my: 2 }}>
          <Grid item xs={12}>
            <RHFTextField
              name="departmentName"
              size="small"
              outerLabel="Name"
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              size="small"
              name="description"
              outerLabel="External ID"
            />
          </Grid>

          <Grid item xs={12}>
            <Stack
              direction={{ sm: "row", xs: "column-reverse" }}
              justifyContent="space-between"
            >
              <Button
                sx={{
                  color: "neutral.700",
                  borderColor: "neutral.300",
                  mt: "10px",
                }}
                variant="outlined"
                onClick={() => {
                  setAddField({ open: false, id: null });
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                sx={{
                  mt: "10px",
                }}
              >
                {addField.id ? "Update" : "Save and Close"}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </CustomModal>
  );
}
