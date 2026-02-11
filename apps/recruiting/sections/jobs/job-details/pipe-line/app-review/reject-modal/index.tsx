import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, InputLabel } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFCheckbox,
  RHFCustomSelect,
  RHFTextField,
} from "common";
import { type SetStateAction, type Dispatch, useState } from "react";
import { useForm } from "react-hook-form";
import { schema, defaultValues } from "./reject-modal.schema";
import { rejectReason } from "./reject-modal.data";
import { useRejectCandidateMutation } from "@services/jobs/job-details/pipeline-api";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

export function RejectModal(props): JSX.Element {
  const {
    reject,
    setReject,
    setSubmitData, // setToggleProspect,
  }: {
    reject: boolean;
    setReject: Dispatch<SetStateAction<boolean>>;
    setSubmitData: Dispatch<SetStateAction<boolean>>;
    setToggleProspect: any;
  } = props;

  const [toggle, setToggle] = useState<boolean>(false);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const [rejectionHandler, rejectionStatus] = useRejectCandidateMutation();

  const params = useSearchParams();
  const candidateId = params.get("candidateId");
  const onSubmit = async (data): Promise<any> => {
    const body = {
      rejectionReason: `${data.rejectionReason} ${data.otherReasons}`,
      rejected: true,
      rejectionNote: data.rejectionNote,
      sendEmail: data.sendEmail,
      prospect: data.prospect,
    };
    try {
      await rejectionHandler({
        body,
        candidateId,
      }).unwrap();
      toast.success("Candidate Rejected");
      reset();
      setReject(false);
      setSubmitData(true);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <CustomModal
      onClose={setReject}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
      headerLabel="Reject this Candidate"
      closeButtonProps={{
        onClick: () => {
          setReject(false);
        },
      }}
      isOpen={reject}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 3 }}>
          <RHFCustomSelect
            name="rejectionReason"
            outerLabel="Reject Reason"
            options={rejectReason}
          />
          <Button
            sx={{ color: "primary.main", p: 0, my: 2 }}
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            Add new reason
          </Button>
          {toggle && (
            <RHFTextField
              multiline
              fullWidth
              type="text"
              name="otherReasons"
              sx={{ mb: 2 }}
              rows={1}
            />
          )}
          <InputLabel sx={{ color: "text.secondary" }}>
            Leave Feedback
          </InputLabel>
          <RHFTextField
            multiline
            fullWidth
            type="text"
            name="rejectionNote"
            sx={{ mb: 1 }}
            rows={2}
          />
          <RHFCheckbox
            label="Start new prospect process after rejection"
            name="prospect"
          />
          <br />
          <RHFCheckbox label="Send Email" name="sendEmail" />
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setReject(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={rejectionStatus?.isLoading}
              color={rejectionStatus?.isError ? "error" : "primary"}
            >
              {rejectionStatus?.isError ? "Try Again" : "Save"}
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
