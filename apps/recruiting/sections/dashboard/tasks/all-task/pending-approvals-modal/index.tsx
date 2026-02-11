import { type SetStateAction, type Dispatch } from "react";
import { CustomModal, FormProvider, RHFMultiCheckbox } from "common";
import { Box, Typography } from "@mui/material";
import { ApprovalsAccordion } from "./approvals-accordion";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const FormSchema = Yup.object().shape({
  checkboxMulti: Yup.array()
    .min(1, "Select at least one option")
    .of(Yup.string().required("This test async multi is required."))
    .required("This test async multi is required."),
});

export function PendingApprovalsModal({
  pendingApprovals,
  setPendingApprovals,
}: {
  pendingApprovals: boolean;
  setPendingApprovals: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  // const theme = useTheme();
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      checkboxMulti: [],
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (formData: any): any => {
    console.log(formData);
  };

  return (
    <CustomModal
      onClose={setPendingApprovals}
      rootSx={{
        maxWidth: { xs: 350, sm: 500, lg: 750, xl: 1000 },
        maxHeight: 500,
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
      headerLabel="Approvals"
      closeButtonProps={{
        onClick: () => {
          setPendingApprovals(false);
        },
      }}
      isOpen={pendingApprovals}
    >
      <Box sx={{ mt: 2 }}>
        <Box sx={{ backgroundColor: "#F9FAFB", p: 1.5, mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Pending Offer Approvals(2)
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFMultiCheckbox
              name="checkboxMulti"
              options={[
                { label: "Approvals to start recruiting", value: "test" },
                { label: "Official job approval", value: "test-2" },
              ]}
            />
          </FormProvider>
        </Box>
        <ApprovalsAccordion />
      </Box>
    </CustomModal>
  );
}
