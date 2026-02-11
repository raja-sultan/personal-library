import { Button, Stack } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { useLazyGetUserListForJobApprovalsQuery } from "@services/json-placeholder-api";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RHFAutocompleteAsync, FormProvider, RHFCustomSelect } from "common";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchema } from "./form-data";
import { JobApprovalContext } from "@sections/jobs/job-approvals/use-job-approval-context";

export function ApprovalStepForm({ closeModel }): JSX.Element {
  const { addUsersTodNdUsersForJobsApproval, dNdUsersForJobsApproval } =
    useContext(JobApprovalContext);
  const [approvalStepFormInfoHol, setApprovalStepFormInfoHol] = useState<{
    listOfPermission: { id: number; label: string; value: string }[];
  }>({
    listOfPermission: [],
  });

  const userListForApprovalsDefValues = dNdUsersForJobsApproval.map((user) => ({
    userName: user.fullName,
    ...user,
  }));
  const methods: any = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      userListForApprovals: userListForApprovalsDefValues,
      approvers: "",
    },
  });

  const apiQuery = useLazyGetUserListForJobApprovalsQuery();

  const { handleSubmit, watch } = methods;

  const { userListForApprovals }: any = watch({
    name: "userListForApprovals",
  });

  const onSubmit = (formData): any => {
    // transforming data for api payload
    const transFormData = formData.userListForApprovals.map(
      ({ email, userName, _id }) => ({
        email,
        _id,
        fullName: userName,
        status: "Pending",
        rejectionReason: "",
      })
    );
    const numOfApprovalRequired = Number(formData.approvers[0]);
    addUsersTodNdUsersForJobsApproval(numOfApprovalRequired, transFormData);
    closeModel();
  };

  useEffect(() => {
    const lengthOfUsers = userListForApprovals.length;
    const randomlyGeneratedOptionsForApprovals: {
      id: number;
      label: string;
      value: string;
    }[] = [];
    let i = 0;
    while (i < lengthOfUsers) {
      const valLabel = `${i + 1} of ${lengthOfUsers} required`;
      randomlyGeneratedOptionsForApprovals.push({
        id: uuidv4(),
        label: valLabel,
        value: valLabel,
      });
      i++;
    }

    setApprovalStepFormInfoHol((pre) => ({
      ...pre,
      listOfPermission: randomlyGeneratedOptionsForApprovals,
    }));
  }, [userListForApprovals]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 2, mt: 2, mx: "auto" }}>
        <RHFAutocompleteAsync
          multiple
          name="userListForApprovals"
          queryKey="search"
          label="User"
          getOptionLabel={(option) => option.userName}
          apiQuery={apiQuery}
        />
        <RHFCustomSelect
          fullWidth
          name="approvers"
          placeholder="Select Option"
          options={approvalStepFormInfoHol?.listOfPermission}
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </FormProvider>
  );
}
