import { type SetStateAction, type Dispatch, useEffect } from "react";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { departmentFormSchema } from "./new-department-modal.data";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import {
  usePostDepartmentMutation,
  usePutDepartmentMutation,
} from "@services/offices-and-departments/departments-api";

export function NewDepartmentModal({
  createNewDepartment,
  setCreateNewDepartment,
}: {
  createNewDepartment: any;
  setCreateNewDepartment: Dispatch<SetStateAction<any>>;
}): JSX.Element {
  const methods = useForm({
    defaultValues: {
      departmentName: "",
    },
    resolver: yupResolver(departmentFormSchema),
  });

  const [postDepartment] = usePostDepartmentMutation();
  const [putDepartment] = usePutDepartmentMutation();
  const { handleSubmit, reset } = methods;

  const onSubmit = (formData): any => {
    const requestData = {
      body: {
        ...formData,
      },
    };

    const requestFunction = createNewDepartment?.item
      ? putDepartment
      : postDepartment;

    requestFunction(
      createNewDepartment?.item?._id
        ? { ...requestData, id: createNewDepartment.item._id }
        : requestData
    )
      .unwrap()
      .then(() => {
        toast.success(
          createNewDepartment?.item
            ? "Successfully updated"
            : "Successfully created"
        );
        reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });

    setCreateNewDepartment(false);
  };

  useEffect(() => {
    reset({ departmentName: createNewDepartment?.item?.departmentName });
  }, [createNewDepartment?.item?.departmentName, reset]);

  return (
    <CustomModal
      onClose={setCreateNewDepartment}
      rootSx={{
        maxWidth: { xs: "auto", sm: 550, md: 800 },
        maxHeight: 900,
      }}
      headerLabel={`${
        createNewDepartment?.item ? "Edit" : "Create New"
      } Department`}
      closeButtonProps={{
        onClick: () => {
          setCreateNewDepartment(false);
          reset();
        },
      }}
      isOpen={createNewDepartment}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
          sx={{ mt: 2 }}
          name="departmentName"
          label="Name"
          required
        />
        <Box sx={{ mt: 5, display: "flex", justifyContent: "end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setCreateNewDepartment(false);
            }}
          >
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
