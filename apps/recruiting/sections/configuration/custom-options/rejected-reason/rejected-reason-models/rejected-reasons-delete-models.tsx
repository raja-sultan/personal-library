import {  Grid, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomModal, FormProvider, RHFCheckbox } from "common";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// mui icons
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDeleteRejectedReasonsMutation } from "@services/configuration/rejected-reasons/rejected-reasons-api";

interface IRejectedReasonsDeleteModelProps {
  apiData?: any;
  modelTrigger: any;
}
function RejectedReasonsDeleteModel(
  props: IRejectedReasonsDeleteModelProps
): JSX.Element {
  const { apiData, modelTrigger } = props;
  const [openModal, setOpenModal] = useState(false);
  const methods = useForm({
    defaultValues: {
      labelOne: undefined,
      labelTwo: undefined,
    },
    resolver: yupResolver(
      Yup.object().shape({
        labelOne: Yup.boolean().required("Required"),
        labelTwo: Yup.boolean().required("Required"),
      })
    ),
  });
  const { handleSubmit, reset } = methods;
  //api Handlers
  const [DeleteRejectedReasons, { isLoading }] =
    useDeleteRejectedReasonsMutation();
  const onSubmit = () => {
    DeleteRejectedReasons({
      params: {
        id: apiData._id,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("Rejected Reasons delete Successfully");
        setOpenModal(false);
        reset();
      })
      .catch((error) => {
        toast.error(error ?? "someThing went wrong! ");
      });
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
          <Box display="flex" alignItems="center" gap={0.5}>
            <CancelOutlinedIcon
              sx={{
                color: "error.main",
              }}
            />
            Remove Tag
          </Box>
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
            <Grid xs={12} item>
              <RHFCheckbox
                label="I want any entity using this Rejection Reason to use this instead:"
                name="labelOne"
              />
            </Grid>
            <Grid xs={12} item>
              <RHFCheckbox
                label="I want to permanently delete this Rejection Reason without re-assigning."
                name="labelTwo"
              />
            </Grid>
            <Grid xs={12} item>
              <Box mt={1} display="flex">
                <Box
                  ml="auto"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{
                      height: 35,
                    }}
                    type="submit"
                  >
                    Delete Rejection Reason
                  </LoadingButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </CustomModal>
    </>
  );
}

export default RejectedReasonsDeleteModel;
