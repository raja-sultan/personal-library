import { Button, Grid, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomModal, FormProvider } from "common";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormData,
  FormDataValue,
  formSchemaModel,
} from "../rejected-reason.data";
import {
  usePostRejectedReasonsMutation,
  useUpdateRejectedReasonsMutation,
} from "@services/configuration/rejected-reasons/rejected-reasons-api";

interface IRejectedReasonModelProps {
  apiData?: any;
  modelTrigger: any;
}

function RejectedReasonModel(props: IRejectedReasonModelProps): JSX.Element {
  const { apiData, modelTrigger } = props;
  const [openModal, setOpenModal] = useState(false);
  //UPDATE APIDATA FOR READABLE TO AUTOCOMPLETE
  const UpdateApiData: any = {};
  for (const keys in apiData) {
    if (keys === "rejectionType") {
      UpdateApiData.rejectionType = {
        id: 1,
        name: apiData[keys],
        value: apiData[keys],
      };
    }
    if (keys === "rejectionReason") {
      UpdateApiData.rejectionReason = apiData[keys];
    }
  }
  const methods = useForm({
    defaultValues: apiData ? UpdateApiData : FormDataValue,
    resolver: yupResolver(formSchemaModel),
  });
  const { control, handleSubmit, reset } = methods;
  //api Handlers
  const [PostRejectedReasons, { isLoading: postLoading }] =
    usePostRejectedReasonsMutation();
  // UPDATE API DATA HANDLERS
  const [UpdateRejectedReasons, { isLoading: updateLoading }] =
    useUpdateRejectedReasonsMutation();
  //ONSUMBIT FOR FORM HANDLE ALL FORM(EDIT OR CREATED)
  const onSubmit = (data): void => {
    const updateData = {
      rejectionType: data.rejectionType.value,
      rejectionReason: data.rejectionReason,
    };

    if (apiData) {
      UpdateRejectedReasons({
        params: {
          id: apiData._id,
        },
        body: updateData,
      })
        .unwrap()
        .then(() => {
          toast.success("Rejected Reasons update Successfully");
          setOpenModal(false);
          reset();
        })
        .catch((error) => {
          toast.error(error ?? "someThing went wrong! ");
        });
    } else if (!apiData) {
      PostRejectedReasons({
        body: updateData,
      })
        .unwrap()
        .then(() => {
          toast.success("Rejected Reasons Add Successfully");
          setOpenModal(false);
          reset();
        })
        .catch((error) => {
          toast.error(error ?? "someThing went wrong! ");
        });
    } else null;
  };
  return (
    <>
      <Box
        onClick={() => {
          setOpenModal(true);
        }}
      >
        {modelTrigger}
      </Box>
      <CustomModal
        onClose={() => {
          setOpenModal(false);
        }}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel={
          apiData ? "Edit Rejection Reason" : "Create New Rejection Reason"
        }
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            {FormData.map((form: any) => (
              <Grid key={form.id} xs={form.grid} sx={{ py: 1, px: 1 }} item>
                <form.component control={control} {...form.RhfValue} />
              </Grid>
            ))}
            <Grid xs={12} item>
              <Box mt={1} display="flex">
                <Box
                  ml="auto"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <Button
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  {apiData ? (
                    <LoadingButton
                      loading={updateLoading}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        height: 35,
                      }}
                      type="submit"
                    >
                      Update
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      loading={postLoading}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        height: 35,
                      }}
                      type="submit"
                    >
                      Save
                    </LoadingButton>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </CustomModal>
    </>
  );
}

export default RejectedReasonModel;
