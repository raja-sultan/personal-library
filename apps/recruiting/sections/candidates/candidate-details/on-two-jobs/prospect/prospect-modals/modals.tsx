import { useEffect } from "react";
import { editProspectFormData, modalsData } from "./modals-data";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  RHFTextField,
} from "common";
import {
  schema,
  defaultValues,
  convertCandidateSchema,
  convertCandidateDefaultValues,
  editProspectSchema,
} from "./schema";
import {
  useLazyGetDepartmentsDropdownQuery,
  useLazyGetOfficeDropdownQuery,
  useLazyGetJobsDropdownQuery,
  useTransferCandidateToOtherJobMutation,
} from "@services/jobs/job-details/pipeline-api";
import {
  useEditProspectMutation,
  useLazyGetPoolStagesDropdownQuery,
  useLazyGetProspectOwnersDropdownQuery,
  useStopConsideringProspectMutation,
} from "@services/candidate/candidate-details/on-two-jobs/prospect/prospect-api";
import { useLazyGetRejectionReasonListQuery } from "@services/candidate/add-candidate/add-candidate-api";

export function EditProspectModal(props): JSX.Element {
  const { open, isOpen, initialData, candidateName, prospectOwner, refetch } =
    props;

  const jobDropdownApi = useLazyGetJobsDropdownQuery();
  const departmentApiQuery = useLazyGetDepartmentsDropdownQuery();
  const officeApiQuery = useLazyGetOfficeDropdownQuery();
  const poolStagesQuery = useLazyGetPoolStagesDropdownQuery();
  const prospectOwnersQuery = useLazyGetProspectOwnersDropdownQuery();
  const [updateProspectHandler, updatingStatus] = useEditProspectMutation();

  const params = useSearchParams();

  const methods = useForm({
    resolver: yupResolver(editProspectSchema),
    defaultValues: {
      specificJob: [],
      department: null,
      office: null,
      pool: null,
      prospectStage: null,
      prospectOwner: prospectOwner
        ? { _id: prospectOwner, userName: prospectOwner, email: prospectOwner }
        : null,
    },
  });

  const { handleSubmit, watch, reset }: any = methods;
  const onSubmit = async (data) => {
    const specificJobs = data.specificJob.map((job) => job._id);

    const modifiedData = {
      specificJobs,
      department: data.department.departmentName,
      office: data.office.officeName,
      prospectPool: { poolId: data.pool._id, poolName: data.pool.name },
      prospectStage: {
        stageId: data.prospectStage.id,
        stageName: data.prospectStage.value,
      },
      prospectOwner: {
        ownerId: data.prospectOwner._id,
        ownerName: data.prospectOwner.userName,
      },
    };

    try {
      const res = await updateProspectHandler({
        body: modifiedData,
        prospectId: params.get("candidateID"),
      }).unwrap();
      refetch();
      toast.success(res.data?.message ?? "Prospect Updated");
      isOpen(false);
    } catch (error) {
      toast.error(error?.data?.message ?? "Something went wrong!");
    }
  };

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...initialData,
    }));
  }, [initialData, reset]);

  const selectedValue = watch("pool");

  const stages = selectedValue?.stages?.map((stage) => {
    return { id: stage._id, name: stage.stage, value: stage.stage };
  });
  return (
    <CustomModal
      rootSx={styles.modalStyling}
      isOpen={open}
      onClose={() => {
        isOpen(false);
      }}
      closeButtonProps={{
        onClick: () => {
          isOpen(false);
        },
      }}
      headerLabel="Edit Prospect"
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.innerCardWrapper}>
          <Grid container spacing={1}>
            {editProspectFormData({
              name: candidateName || "",
              prospectOwner,
              jobDropdownApi,
              departmentApiQuery,
              officeApiQuery,
              poolStagesQuery,
              prospectOwnersQuery,
              stages,
            })?.data?.map((item) => (
              <Grid item xs={12} md={item?.md} key={item.id}>
                <item.component {...item.componentProps} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, my: 1 }}>
            <Button
              variant="outlined"
              sx={{ color: "text.primary", borderColor: "text.disabled" }}
              onClick={() => {
                isOpen(false);
              }}
            >
              Cancel
            </Button>

            <LoadingButton
              loading={updatingStatus?.isLoading}
              variant="contained"
              type="submit"
            >
              Update Prospect
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
export function StopConsideringProspectModal(props): JSX.Element {
  const { open, isOpen, candidateName, initialData, candidateEmail, refetch } =
    props;
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...defaultValues, recipients: candidateEmail },
  });
  const params = useSearchParams();
  const getRejectionReasonList = useLazyGetRejectionReasonListQuery();
  const [stopConsideringHandler, stopConsideringStatus] =
    useStopConsideringProspectMutation();

  const { handleSubmit, reset, setValue, clearErrors }: any = methods;

  const onSubmit = async (data, shouldSendEmail: boolean): Promise<any> => {
    const body = shouldSendEmail
      ? {
          shouldSendEmail: data.shouldSendEmail,
          rejectionReason: data.rejectionReason.rejectionReason,
          rejectionNotes: data.notes,
          rejectedEmail: {
            template: "",
            to: data.recipients,
            subject: data.subject,
            body: data.html,
            ccRecipients: data.ccRecipients,
          },
        }
      : {
          rejectionReason: data.rejectionReason.value,
          rejectionNotes: data.notes,
          shouldSendEmail: data.shouldSendEmail,
        };
    try {
      const res = await stopConsideringHandler({
        body,
        candidateId: params.get("candidateID"),
      }).unwrap();
      toast.success(res.data?.message ?? "Candidate Rejected");
      refetch();
      isOpen(false);
    } catch (error) {
      toast.error(error?.data?.message ?? "Something went wrong!");
    }
  };
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...initialData,
    }));
  }, [initialData, reset]);

  return (
    <CustomModal
      rootSx={styles.modalStyling}
      isOpen={open}
      onClose={() => {
        isOpen(false);
      }}
      closeButtonProps={{
        onClick: () => {
          isOpen(false);
        },
      }}
      headerLabel={`Stop Considering ${candidateName || ""} as a Prospect`}
    >
      <FormProvider methods={methods}>
        <Box sx={styles.innerCardWrapper}>
          <RHFAutocompleteAsync
            externalParams={{ fetchList: true }}
            apiQuery={getRejectionReasonList}
            getOptionLabel={(option: any) => option?.rejectionReason}
            {...rejectionReasonProps}
            name="rejectionReason"
            sx={{ my: 1 }}
          />

          <RHFTextField name="notes" multiline minRows={3} outerLabel="Notes" />
          <Typography variant="h6" py={1}>
            Rejection Email
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            {modalsData()?.jobCandidateInitialDetails?.map((item) => (
              <Grid item xs={12} md={item?.md} key={item.id}>
                <item.component {...item.componentProps} fullWidth>
                  {item?.componentProps?.options?.map((option: any) => (
                    <option key={option?.id} value={option?.value}>
                      {option?.name}
                    </option>
                  ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
            <Button
              variant="outlined"
              sx={{ color: "text.primary", borderColor: "text.disabled" }}
              onClick={() => {
                isOpen(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={stopConsideringStatus?.isLoading}
              variant="outlined"
              onClick={() => {
                setValue("shouldSendEmail", false);
                clearErrors(["recipients", "subject"]);
                handleSubmit((data) => {
                  onSubmit(data, false).catch(() => {});
                })();
              }}
            >
              Stop Considering{" "}
            </LoadingButton>
            <LoadingButton
              loading={stopConsideringStatus?.isLoading}
              variant="contained"
              onClick={() => {
                setValue("shouldSendEmail", true);
                handleSubmit((data) => {
                  onSubmit(data, true).catch(() => {});
                })();
              }}
            >
              Reject and Send Email
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

export function ConvertCandidateModal(props): JSX.Element {
  const { open, isOpen, headerLabel, headerSubLabel } = props;
  const params = useSearchParams();

  const apiQuery = useLazyGetJobsDropdownQuery();
  const [moveCandidateToAnotherJob, movingJobStatus] =
    useTransferCandidateToOtherJobMutation();

  const methods = useForm<any>({
    resolver: yupResolver(convertCandidateSchema),
    defaultValues: convertCandidateDefaultValues,
  });

  const { handleSubmit, watch } = methods;

  const onSubmit = async (data): Promise<any> => {
    const formData = {
      jobId: data.jobName._id,
      stage: data.jobStage.value,
    };

    try {
      await moveCandidateToAnotherJob({
        body: formData,
        candidateId: params.get("candidateID"),
      }).unwrap();
      toast.success("Candidate Moved Successfully");
      isOpen(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const selectedValue = watch("jobName");

  const stages = selectedValue?.stages?.map((stage: string) => {
    return { id: stage, name: stage, value: stage };
  });
  return (
    <CustomModal
      isOpen={open}
      onClose={() => {
        isOpen(false);
      }}
      closeButtonProps={{
        onClick: () => {
          isOpen(false);
        },
      }}
      rootSx={{ maxWidth: "50vw", minWidth: "30vw" }}
      headerLabel={headerLabel || "Convert To Candidate"}
      headerSubLabel={headerSubLabel || ""}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <RHFAutocompleteAsync
              name="jobName"
              outerLabel="Job Name"
              placeholder="Select Job"
              getOptionLabel={(option: any) => option.jobName}
              disableCloseOnSelect={false}
              apiQuery={apiQuery}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFAutocompleteSync
              options={
                stages ?? [{ id: 1, name: "No Stages Found", value: undefined }]
              }
              disabled={!stages?.length}
              getOptionLabel={(option: any) => option.name}
              outerLabel="Job Stage"
              placeholder="Select Stage"
              fullWidth
              name="jobStage"
              disableCloseOnSelect={false}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              isOpen(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={movingJobStatus?.isLoading}
          >
            Convert
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 700 },
  },
  innerCardWrapper: {
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
    pr: 2,
  },
};

const rejectionReasonProps = {
  outerLabel: "Rejection Reason",
  disableCloseOnSelect: false,

  renderOption: false,
  groupBy: (option) => option.group,

  renderTags: (value: readonly string[], getTagProps) =>
    value?.map((option: string, index: number) => (
      <Chip
        variant="outlined"
        key={option}
        label={option}
        {...getTagProps({ index })}
      />
    )),
};
