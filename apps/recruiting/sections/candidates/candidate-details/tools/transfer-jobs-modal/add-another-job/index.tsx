import { Box, Button, Grid } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  // RHFCheckbox,
} from "common";
import React from "react";
import { useLazyGetJobsDropdownQuery } from "@services/jobs/job-details/pipeline-api";
import {
  schema,
  defaultValues,
  //detailSchema,
  //detailDefaultValues,
} from "./transfer-jobs.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useAddAnotherJobMutation } from "@services/candidate/candidate-details/tools/add-another-job-api";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
//import { useGetJobsQuery } from "@services/candidate/candidate-details/tools/remove-job-api";
//import { awsBaseUrl } from "@root/config";

export function AddToAnotherJobModal(props): JSX.Element {
  const { anotherJob, setAnotherJob } = props;
  const params = useSearchParams();
  const candidateId = params.get("candidateID");

  // const [jobDetails, setJobDetails] = useState<boolean>(false);
  //GET to get Jobs Dropdown
  const apiQuery = useLazyGetJobsDropdownQuery();
  //POST API to post Another Job
  const [postAnotherJob] = useAddAnotherJobMutation();
  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { watch, handleSubmit, reset } = methods;
  const selectedValue = watch("jobName");

  const onSubmit = async (data): Promise<any> => {
    const param = {
      candidateId,
    };
    const body = {
      jobId: data.jobName._id,
      stage: data.jobStage.value,
    };
    try {
      const { message } = await postAnotherJob({ body, param }).unwrap();
      toast.success(message ?? "Job Added Successfully");
      setAnotherJob(false);
    } catch (error) {
      toast.error("Something went wrong!");
      setAnotherJob(false);
    }
  };

  const stages = selectedValue?.stages?.map((stage: string) => {
    return { id: stage, name: stage, value: stage };
  });

  return (
    <>
      <CustomModal
        onClose={() => {
          setAnotherJob(false);
        }}
        rootSx={{ maxWidth: { xs: 350, sm: 600 } }}
        headerLabel="Add to Another Job"
        closeButtonProps={{
          onClick: () => {
            setAnotherJob(false);
          },
        }}
        isOpen={anotherJob}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              {/* <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", textAlign: "end", mt: 0.5 }}
              >
                Step 1 of 2
              </Typography> */}
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
                  stages ?? [
                    { id: 1, name: "No Stages Found", value: undefined },
                  ]
                }
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
              variant="outlined"
              onClick={() => {
                setAnotherJob(false);
                reset(defaultValues);
              }}
            >
              Cancel
            </Button>
            <LoadingButton variant="contained" type="submit">
              Next
            </LoadingButton>
          </Box>
        </FormProvider>
      </CustomModal>
      {/* <AddToAnotherJobDetailsModal
        jobDetails={jobDetails}
        setJobDetails={setJobDetails}
        candidateId={candidateId}
      /> */}
    </>
  );
}

// export function AddToAnotherJobDetailsModal(props): JSX.Element {
//   const { jobDetails, setJobDetails, candidateId } = props;

//   //GET API For Candidates
//   const { data: candidateDetails } = useGetJobsQuery({
//     candidateId,
//   });

//   const candidates = candidateDetails?.data;

//   const methods = useForm<any>({
//     resolver: yupResolver(detailSchema),
//     defaultValues: detailDefaultValues,
//   });

//   const { handleSubmit, reset } = methods;

//   const onSubmit = (data) => {
//     console.log("data", data);
//   };

//   return (
//     <CustomModal
//       onClose={setJobDetails}
//       rootSx={{
//         maxWidth: { xs: 350, sm: 700 },
//         height: "min(70vh, 60rem)",
//         overflowY: "auto",
//         "&::-webkit-scrollbar": {
//           width: "8px",
//         },
//         "&::-webkit-scrollbar-thumb": {
//           backgroundColor: "primary.main",
//           borderRadius: "6px",
//         },
//       }}
//       headerLabel="Add to Another Job"
//       headerSubLabel="Select Attachments"
//       closeButtonProps={{
//         onClick: () => {
//           setJobDetails(false);
//         },
//       }}
//       isOpen={jobDetails}
//     >
//       <Typography
//         variant="subtitle2"
//         sx={{ color: "text.secondary", textAlign: "end", mt: 0.5 }}
//       >
//         Step 2 of 2
//       </Typography>
//       <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             backgroundColor: "background.default",
//             alignItems: { xs: "start", sm: "center" },
//             p: 1,
//             borderRadius: "8px",
//             mt: 2,
//             flexDirection: { xs: "column", sm: "row" },
//           }}
//         >
//           <Box>
//             <Typography variant="body1" sx={{ fontWeight: 600 }}>
//               {candidates?.nameAndCompany?.currentTitle ?? "-"}
//             </Typography>
//           </Box>
//           <RHFCheckbox name="jobs" label="Select all from this job" />
//         </Box>
//         <Box sx={{ my: 1 }}>
//           <RHFCheckbox name="resume" label="Resume (Public)" />
//         </Box>
//         <iframe
//           scrolling="no"
//           frameBorder="0"
//           title="Resume"
//           src={`${awsBaseUrl + candidates?.resume}?#toolbar=0&navpanes=0`}
//           style={{ minHeight: "300px" }}
//         />
//         <Typography variant="subtitle2" sx={{ color: "text.secondary", mt: 2 }}>
//           Please note: You can only add 1 resume and 1 cover letter
//         </Typography>
//         <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
//           <Button
//             variant="outlined"
//             onClick={() => {
//               setJobDetails(false);
//               reset(defaultValues);
//             }}
//           >
//             Cancel
//           </Button>
//           <LoadingButton variant="contained" type="submit">
//             Add to Job
//           </LoadingButton>
//         </Box>
//       </FormProvider>
//     </CustomModal>
//   );
// }
