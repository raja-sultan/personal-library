// import type { SetStateAction, Dispatch } from "react";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Box, Button, Grid, InputLabel, Typography } from "@mui/material";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { CustomModal, FormProvider, RHFTextField } from "common";
// import { defaultValues, FormSchema } from "./leave-modal.schema";
// import { LoadingButton } from "@mui/lab";
// import { useSearchParams } from "next/navigation";
// import toast from "react-hot-toast";
// import { useUpdateLeaveJobNoteMutation } from "@services/jobs/job-details/approvals/job-info-approvals-api";
// import dayjs from "dayjs";

// export function LeaveNoteModal({
//   openLeaveCategory,
//   setOpenLeaveCategory,
//   viewText,
// }: {
//   openLeaveCategory: boolean;
//   setOpenLeaveCategory: Dispatch<SetStateAction<boolean>>;
//   viewText: any;
// }): JSX.Element {
//   const searchParams = useSearchParams();
//   const jobsId = searchParams.get("jobId");

//   const [updateCategory, { isLoading }] = useUpdateLeaveJobNoteMutation();
//   const methods = useForm<any>({
//     resolver: yupResolver(FormSchema),
//     defaultValues,
//   });
//   const { handleSubmit, reset } = methods;

//   //Submit Function
//   const onSubmit = async (data: any) => {
//     const payload = {
//       body: {
//         note: data?.note,
//       },
//       jobId: jobsId,
//     };

//     try {
//       const { message } = await updateCategory(payload).unwrap();
//       setOpenLeaveCategory(false);
//       reset(defaultValues);
//       toast.success(message || "job information edit  successfully");
//     } catch (error) {
//       toast.error(error.data.message || "error occur");
//     }
//   };

//   //Close Modal
//   const handleCancel = (): void => {
//     setOpenLeaveCategory(false);
//   };

//   useEffect(() => {
//     reset({ note: viewText });
//   }, [reset, viewText]);

//   return (
//     /*Custom Modal*/
//     <CustomModal
//       onClose={setOpenLeaveCategory}
//       rootSx={{
//         maxWidth: { xs: 350, sm: 500 },
//       }}
//       headerLabel={viewText ? "View Note" : "Leave a Note"}
//       closeButtonProps={{
//         onClick: () => {
//           setOpenLeaveCategory(false);
//         },
//       }}
//       isOpen={openLeaveCategory}
//     >
//       <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//         <Grid container direction="column">
//           <InputLabel sx={{ my: 1, color: "text.secondary" }}>
//             <Typography variant="subtitle1">Detail</Typography>
//           </InputLabel>

//           <Box>
//             {/* {approvalNameData.map((item) => ( */}
//             <Box
//               sx={{
//                 mb: 1,
//                 border: "1px gray solid",
//                 borderRadius: "8px",
//                 p: 2,
//               }}
//             >
//               <Box>
//                 <Typography variant="subtitle1" sx={{ pb: 3 }}>
//                   {viewText?.text}
//                 </Typography>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     color: "text.secondary",
//                   }}
//                 >
//                   Added by:{" "}
//                   <Typography
//                     variant="subtitle1"
//                     component="span"
//                     sx={{ color: "text.primary" }}
//                   >
//                     {viewText?.addedBy}
//                   </Typography>{" "}
//                   <Typography
//                     variant="caption"
//                     component="span"
//                     sx={{ color: "text.primary" }}
//                   >
//                     ({dayjs(viewText?.createdAt).format("MMMM D") ?? "-"})
//                   </Typography>
//                 </Typography>
//               </Box>
//             </Box>
//             {/* ))} */}
//           </Box>

//           <RHFTextField
//             // disabled={Boolean(viewText)}
//             multiline
//             fullWidth
//             type="text"
//             name="note"
//             placeHolder="Write Something.."
//             // sx={{ mb: 2 }}
//             rows={3}
//           />
//         </Grid>

//         <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
//           <Button variant="outlined" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <LoadingButton loading={isLoading} variant="contained" type="submit">
//             Save
//           </LoadingButton>
//         </Box>
//       </FormProvider>
//     </CustomModal>
//   );
// }



///////////////
import type { SetStateAction, Dispatch } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, InputLabel, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { defaultValues, FormSchema } from "./leave-modal.schema";
import { LoadingButton } from "@mui/lab";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useUpdateLeaveJobNoteMutation } from "@services/jobs/job-details/approvals/job-info-approvals-api";
import dayjs from "dayjs";

export function LeaveNoteModal({
  openLeaveCategory,
  setOpenLeaveCategory,
  viewText,
}: {
  openLeaveCategory: boolean;
  setOpenLeaveCategory: Dispatch<SetStateAction<boolean>>;
  viewText: any;
}): JSX.Element {
  const searchParams = useSearchParams();
  const jobsId = searchParams.get("jobId");

  const [updateCategory, { isLoading }] = useUpdateLeaveJobNoteMutation();
  const methods = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  //Submit Function
  const onSubmit = async (data: any) => {
    const payload = {
      body: {
        note: data?.note,
      },
      jobId: jobsId,
    };

    try {
      const { message } = await updateCategory(payload).unwrap();
      setOpenLeaveCategory(false);
      reset(defaultValues);
      toast.success(message || "job information edit  successfully");
    } catch (error) {
      toast.error(error.data.message || "error occur");
    }
  };

  //Close Modal
  const handleCancel = (): void => {
    setOpenLeaveCategory(false);
  };

  useEffect(() => {
    reset({ note: viewText });
  }, [reset, viewText]);

  return (
    /*Custom Modal*/
    <CustomModal
      onClose={setOpenLeaveCategory}
      rootSx={{
        maxWidth: { xs: 350, sm: 500 },
      }}
      headerLabel={viewText ? "View Note" : "Leave a Note"}
      closeButtonProps={{
        onClick: () => {
          setOpenLeaveCategory(false);
        },
      }}
      isOpen={openLeaveCategory}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column">
          <InputLabel sx={{ my: 1, color: "text.secondary" }}>
            <Typography variant="subtitle1">Detail</Typography>
          </InputLabel>

          {viewText ? (
            <Box>
              {/* {approvalNameData.map((item) => ( */}
              <Box
                sx={{
                  mb: 1,
                  border: "1px gray solid",
                  borderRadius: "8px",
                  p: 2,
                }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ pb: 3 }}>
                    {viewText?.text}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    Added by:{" "}
                    <Typography
                      variant="subtitle1"
                      component="span"
                      sx={{ color: "text.primary" }}
                    >
                      {viewText?.addedBy}
                    </Typography>{" "}
                    <Typography
                      variant="caption"
                      component="span"
                      sx={{ color: "text.primary" }}
                    >
                      ({dayjs(viewText?.createdAt).format("MMMM D") ?? "-"})
                    </Typography>
                  </Typography>
                </Box>
              </Box>
              {/* ))} */}
            </Box>
          ) : (
            <RHFTextField
              disabled={Boolean(viewText)}
              multiline
              fullWidth
              type="text"
              name="note"
              placeHolder="Write Something.."
              // sx={{ mb: 2 }}
              rows={3}
            />
          )}
        </Grid>
        {viewText ? (
          ""
        ) : (
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              type="submit"
            >
              Save
            </LoadingButton>
          </Box>
        )}
      </FormProvider>
    </CustomModal>
  );
}
