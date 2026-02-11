import { type SetStateAction, type Dispatch } from "react";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export function CreateNewRoleModal({
  createRole,
  setCreateRole,
}: {
  createRole: boolean;
  setCreateRole: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const methods = useForm({
    defaultValues: {
      roleName: null,
    },
    // resolver: yupResolver(EditFormSchemaModel),
  });
  const router = useRouter();

  const { handleSubmit } = methods;

  const onSubmit = (formData): any => {
    console.log(formData);
    router.push(`/settings/permissions/custom-access/?roleName=${formData.roleName}`);
    setCreateRole(false);
  };

  return (
    <CustomModal
      onClose={setCreateRole}
      rootSx={{
        maxWidth: { xs: "auto", sm: 550, md: 800 },
        maxHeight: 900,
      }}
      headerLabel="Create Role"
      closeButtonProps={{
        onClick: () => {
          setCreateRole(false);
        },
      }}
      isOpen={createRole}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField sx={{ mt: 2 }} name="roleName" label="Name" required />
        <Box sx={{ mt: 5, display: "flex", justifyContent: "end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setCreateRole(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save and Close
          </Button>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
