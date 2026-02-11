import { type SetStateAction, type Dispatch } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFCustomSelect,
} from "common";
import {
  // defaultValues,
  ApprovalModalFormSchema,
} from "./approvals-step.schema";
import type { ApprovalModalInterface } from "./approvals-step.schema";
import {
  useLazyGetApprovalsJobOfferUsersQuery,
  useUpdateApprovalsJobOfferUsersMutation,
} from "@services/jobs/job-details/approvals/opening-approvals-api";
import React from "react";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { useSearchParams } from "next/navigation";

export function AddApprovalStepModal({
  openCategory,
  setOpenCategory,
  // addApprovalData,
  approvals,
  refetch,
}: {
  openCategory: boolean;
  setOpenCategory: Dispatch<SetStateAction<boolean>>;
  addApprovalData: any;
  approvals: any;
  refetch: any;
}): JSX.Element {
  const searchParams = useSearchParams();
  const jobsId = searchParams.get("jobId");
  const getApprovalsJobOfferUsers = useLazyGetApprovalsJobOfferUsersQuery();

  const [updateCategory, { isLoading }] =
    useUpdateApprovalsJobOfferUsersMutation();
  const Apidata = approvals?.map(({ fullName, ...reset }) => ({
    ...reset,
    userName: fullName,
  }));

  const methods = useForm<ApprovalModalInterface>({
    resolver: yupResolver(ApprovalModalFormSchema),
    defaultValues: {
      user: Apidata ? Apidata : [],
      approvers: "",
    },
  });

  const { handleSubmit, watch } = methods;
  const approvalLength = watch("user");

  //Submit Function
  const onSubmit = async (data: any) => {
    const updatedApproval = data?.user.map(({ userName, ...reset }) => {
      return {
        status: reset.status ? reset.status : "Pending",
        fullName: userName,
        ...reset,
      };
    });

    try {
      const { message } = await updateCategory({
        body: {
          approvers: updatedApproval,
          order: "in_order",
          requestedDate: new Date(),
          numOfApprovalRequired: Number(data?.approvers),
          approverType: "extend_offer",
        },
        jobId: jobsId,
      }).unwrap();
      setOpenCategory(false);
      toast.success(message || "job information edit  successfully");
      refetch();
    } catch (error) {
      toast.error(error.data.message || "error occur");
    }
  };
  //Close Modal
  const handleCancel = (): void => {
    setOpenCategory(false);
  };

  return (
    /*Custom Modal*/
    <CustomModal
      onClose={setOpenCategory}
      rootSx={{
        maxWidth: { xs: 350, sm: 500 },
      }}
      headerLabel="Add Approval Step"
      closeButtonProps={{
        onClick: () => {
          setOpenCategory(false);
        },
      }}
      isOpen={openCategory}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column">
          <Grid sx={{ mb: 1 }} item xs={12} sm={6}>
            <RHFAutocompleteAsync
              multiple
              name="user"
              placeholder="Select Option"
              outerLabel="User"
              apiQuery={getApprovalsJobOfferUsers}
              getOptionLabel={(option: any) => option?.userName}
              limitTags={2}
            />
          </Grid>
          <Grid sx={{ mb: 1 }} item xs={12} sm={6}>
            <RHFCustomSelect
              fullWidth
              name="approvers"
              placeholder="Select Option"
              outerLabel="Approvers"
              options={approvalLength?.map((i, index) => ({
                id: index,
                label: `${index + 1} of ${approvalLength?.length}`,
                value: index + 1,
              }))}
            />
          </Grid>
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
