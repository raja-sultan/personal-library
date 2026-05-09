import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider } from "@mui/material";
import {
  usePostFieldsGroupListMutation,
  usePutFieldsGroupListMutation,
} from "@services/settings/fields-api/fields-api";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";

export function EditFieldModal(props): JSX.Element {
  const { openModal, setOpenModal, addModal, fieldGroupId, name } = props;
  const [postFieldsGroupList, { isLoading }] = usePostFieldsGroupListMutation();
  const [putFieldsGroupList, { isLoading: updateLoading }] =
    usePutFieldsGroupListMutation();

  const methods = useForm({
    resolver: yupResolver(
      Yup.object({
        name: Yup.string().required("Required"),
      })
    ),
    defaultValues: {
      name: name ? name : "",
    },
  });
  const { handleSubmit }: any = methods;

  const onSubmitHandler = (formData: any): void => {
    console.log("formData", formData);
    if (addModal === "Add Modal") {
      postFieldsGroupList({
        body: formData,
      })
        .unwrap()
        .then(() => {
          setOpenModal(false);
          toast.success("Field Group Add successfully!");
        })
        .catch((error) => {
          toast.error(error ?? "something went wrong!");
        });
    } else if (fieldGroupId) {
      putFieldsGroupList({
        body: formData,
        params: {
          fieldGroupId,
        },
      })
        .unwrap()
        .then(() => {
          setOpenModal(false);
          toast.success("Field Group update successfully!");
        })
        .catch((error) => {
          toast.error(error ?? "something went wrong!");
        });
    } else toast.error("something went wrong!");
  };
  return (
    <CustomModal
      isOpen={openModal}
      onClose={() => {
        setOpenModal(false);
      }}
      rootSx={{ width: 700, maxHeight: "60vh", overflow: "auto" }}
      headerLabel={addModal ? "Add Field Group" : "Edit Field Group"}
      closeButtonProps={{
        onClick: () => {
          setOpenModal(false);
        },
      }}
    >
      <Divider sx={{ mt: 1, mb: 3 }} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitHandler)}>
        <RHFTextField label="Name" name="name" variant="outlined" />
        <Box display="flex" justifyContent="flex-end" gap={1} sx={{ mt: 2 }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading || updateLoading}
            type="submit"
            variant="contained"
          >
            Save and Close
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
