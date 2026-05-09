import { type SetStateAction, type Dispatch } from "react";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export function SettingModal({
  setting,
  setSetting,
}: {
  setting: boolean;
  setSetting: Dispatch<SetStateAction<boolean>>;
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
    router.push(
      `/settings/permissions/custom-access/?roleName=${formData.roleName}`
    );
    setSetting(false);
  };

  return (
    <CustomModal
      onClose={setSetting}
      rootSx={{
        maxWidth: { xs: "auto", sm: 550, md: 800 },
        maxHeight: 900,
      }}
      headerLabel="Setting"
      closeButtonProps={{
        onClick: () => {
          setSetting(false);
        },
      }}
      isOpen={setting}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField sx={{ mt: 2 }} name="roleName" label="Name" required />
        <Box sx={{ mt: 5, display: "flex", justifyContent: "end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setSetting(false);
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
