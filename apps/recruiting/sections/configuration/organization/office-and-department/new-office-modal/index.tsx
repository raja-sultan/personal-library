import { type SetStateAction, type Dispatch, useEffect } from "react";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { officeFormSchema } from "./new-office-modal.schema";
import toast from "react-hot-toast";
import { usePostOfficeMutation, usePutOfficeMutation } from "@services/offices-and-departments/offices-api";

export function NewOfficeModal({
  createNewOffice,
  setCreateNewOffice,
}: {
  createNewOffice: any;
  setCreateNewOffice: Dispatch<SetStateAction<any>>;
}): JSX.Element {
  const methods = useForm({
    defaultValues: { officeName: "", location: "" },
    resolver: yupResolver(officeFormSchema),
  });

  const [postOffice] = usePostOfficeMutation();
  const [putOffice] = usePutOfficeMutation();

  const { handleSubmit, reset } = methods;

  const onSubmit = (formData): any => {
    const requestData = {
      body: {
        ...formData,
      },
    };

    const requestFunction = createNewOffice?.item
      ? putOffice
      : postOffice;

    requestFunction(
      createNewOffice?.item?._id
        ? { ...requestData, id: createNewOffice.item._id }
        : requestData
    )
      .unwrap()
      .then(() => {
        toast.success(
          createNewOffice?.item
            ? "Successfully updated"
            : "Successfully created"
        );
        reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });

    setCreateNewOffice(false);
  };

  useEffect(() => {
    reset({
      officeName: createNewOffice?.item?.officeName,
      location: createNewOffice?.item?.location,
    });
  }, [
    createNewOffice?.item?.officeName,
    createNewOffice?.item?.location,
    reset,
  ]);

  return (
    <CustomModal
      onClose={setCreateNewOffice}
      rootSx={{
        maxWidth: { xs: "auto", sm: 550, md: 800 },
        maxHeight: 900,
      }}
      headerLabel={`${createNewOffice?.item ? "Edit" : "Create New"} Office`}
      closeButtonProps={{
        onClick: () => {
          setCreateNewOffice(false);
        },
      }}
      isOpen={createNewOffice}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField sx={{ mt: 2 }} name="officeName" label="Name" required />
        <RHFTextField
          sx={{ mt: 2 }}
          name="location"
          label="Location"
          required
        />
        <Box sx={{ mt: 5, display: "flex", justifyContent: "end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setCreateNewOffice(false);
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
