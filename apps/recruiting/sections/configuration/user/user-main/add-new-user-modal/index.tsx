import { Button, Grid, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomModal, FormProvider, RHFCheckbox } from "common";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddFormData,
  AddFormDataValue,
  formSchemaModel,
} from "./add-new-user.data";
import Link from "next/link";
import { useCreateConfigurationUserMutation } from "@services/configuration/user-api";
import { useLazyGetInterviewerTagsListQuery } from "@services/configuration/interviewer-tags-api/interviewer-tags-api";
import toast from "react-hot-toast";

function AddNewUserModel(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [permission, setPermission] = useState<null | string>(null);
  const tagQuery = useLazyGetInterviewerTagsListQuery();
  const [createConfigurationUser, { isLoading }] =
    useCreateConfigurationUserMutation();
  const methods = useForm({
    defaultValues: AddFormDataValue,
    resolver: yupResolver(formSchemaModel),
  });
  const { control, handleSubmit, reset } = methods;
  const onSubmit = async (data) => {
    const updateData: any = {};
    for (const key in AddFormDataValue) {
      updateData[key] = data[key];
    }
    updateData.interviewerTags = data.interviewerTags?.map((tag) => tag?._id);
    updateData.role = permission;
    updateData.customFields = {};
    if (!updateData.role) {
      throw new Error("permission is not defined");
    }

    const formData = new FormData();
    for (const key in updateData) {
      if (updateData[key] === null || updateData[key] === undefined) {
        continue;
      }
      formData.append(key, JSON.stringify(updateData[key]));
    }

    try {
      await createConfigurationUser({ body: formData }).unwrap();
      toast.success("New user created successfully");
      setOpenModal(false);
      reset();
      setPermission(null);
    } catch (error) {
      const errorMessage = error?.data?.message || "error occur";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Button
        size="medium"
        endIcon={<AddCircleOutlineRoundedIcon />}
        variant="contained"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Add Users
      </Button>
      <CustomModal
        onClose={() => {
          setOpenModal(false);
        }}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Add New User"
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
            reset();
            setPermission(null);
          },
        }}
        isOpen={openModal}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            sx={{
              overflowY: "auto",
              height: 600,
              "&::-webkit-scrollbar": {
                width: "5px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "primary.main",
                borderRadius: "6px",
              },
            }}
          >
            {AddFormData(tagQuery).map((form: any) => (
              <Grid key={form.id} xs={form.grid} sx={{ py: 1, px: 1 }} item>
                <form.component control={control} {...form.RhfValue} />
              </Grid>
            ))}
            <Grid xs={12} display="flex" item>
              <Box ml="auto">
                <Link href="/configuration/custom-options/interviewer-tags">
                  <Button variant="text" color="primary">
                    Configure Interviewer Tags
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid xs={12} sx={{ py: 1, px: 1 }} item>
              <Typography variant="body2" fontWeight={700} color="neutral.900">
                Set Permissions
              </Typography>
              <Typography variant="subtitle2" color="neutral.700">
                every user must be assigned to a permission level - basic , job
                admin or site admin. then, within each user edit the specific
                permissions to control what they’ll be able to view what actions
                they can take.
              </Typography>
            </Grid>

            {renderPermission(
              permission,
              setPermission,
              setOpenModal,
              reset,
              isLoading
            )}
          </Grid>
        </FormProvider>
      </CustomModal>
    </>
  );
}
const renderPermission = (
  permissionText: string | null,
  setPermission: any,
  setOpenModal,
  reset,
  isLoading
): JSX.Element => {
  switch (permissionText) {
    case "RCT_JOB_ADMIN_BASIC":
      return (
        <>
          <Grid xs={12} sx={{ py: 1, px: 1 }} item>
            <Box display="flex" alignItems="center">
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color="neutral.900"
                >
                  Basic
                </Typography>
                <Typography variant="subtitle2" color="neutral.700">
                  add referrals and share public job posts
                </Typography>
              </Box>
              <Box ml="auto">
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    setPermission(null);
                  }}
                >
                  reassign permission
                </Button>
              </Box>
            </Box>
            <Box display="flex" mt={1} flexDirection="column" gap={0}>
              <RHFCheckbox
                name="manageJob"
                label="manage job board related APi credentials"
              />
              <RHFCheckbox
                name="manageAll"
                label="manage all organization’s APi credentials"
              />
              <RHFCheckbox
                name="manageAnd"
                label="manage and configure web hooks"
              />
              <RHFCheckbox
                name="manageconfigrations"
                label="configure workday integrations"
              />
              <RHFCheckbox
                name="manageSco"
                label="manage and  configure SSO and SCIM"
              />
            </Box>
          </Grid>
          <Grid xs={12} item>
            <Box mt={1} display="flex">
              <RHFCheckbox name="sendEmail" label="send invitation email" />
              <Box
                ml="auto"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
                px={1}
              >
                <Button
                  onClick={() => {
                    setOpenModal(false);
                    setPermission(null);
                    reset();
                  }}
                  size="small"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <LoadingButton
                  loading={isLoading}
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
              </Box>
            </Box>
          </Grid>
        </>
      );
    case "RCT_JOB_ADMIN_STANDARD":
      return (
        <>
          <Grid xs={12} sx={{ py: 1, px: 1 }} item>
            <Box display="flex" alignItems="center">
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color="neutral.900"
                >
                  Job Admin
                </Typography>
                <Typography variant="subtitle2" color="neutral.700">
                  View and manage assigned jobs
                </Typography>
              </Box>
              <Box ml="auto">
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    setPermission(null);
                  }}
                >
                  reassign permission
                </Button>
              </Box>
            </Box>
            <Box display="flex" mt={1} flexDirection="column" gap={0}>
              <RHFCheckbox name="manageEdit" label="manage edit job info" />
              <RHFCheckbox name="manageDelete" label="manage delete jobs" />
              <RHFCheckbox
                name="manageCreateEdit"
                label="manage create, edit, and delete job posts"
              />
              <RHFCheckbox
                name="manageconfigrations"
                label="manage change job posts status"
              />
              <RHFCheckbox name="manageSco" label="manage edit forms" />
            </Box>
          </Grid>
          <Grid xs={12} item>
            <Box mt={1} display="flex">
              <RHFCheckbox name="sendEmail" label="send invitation email" />
              <Box
                ml="auto"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
                px={1}
              >
                <Button
                  onClick={() => {
                    setOpenModal(false);
                    setPermission(null);
                    reset();
                  }}
                  size="small"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <LoadingButton
                  loading={isLoading}
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
              </Box>
            </Box>
          </Grid>
        </>
      );
    case "RCT_SITE_ADMIN":
      return (
        <>
          <Grid xs={12} sx={{ py: 1, px: 1 }} item>
            <Box display="flex" alignItems="center">
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color="neutral.900"
                >
                  site admin
                </Typography>
                <Typography variant="subtitle2" color="neutral.700">
                  manage all jobs and user permission
                </Typography>
              </Box>
              <Box ml="auto">
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    setPermission(null);
                  }}
                >
                  reassign permission
                </Button>
              </Box>
            </Box>
            <Box display="flex" mt={1} flexDirection="column" gap={0}>
              <RHFCheckbox name="manageEdit" label="manage edit job info" />
              <RHFCheckbox name="manageDelete" label="manage delete jobs" />
              <RHFCheckbox
                name="manageCreateEdit"
                label="manage create, edit, and delete job posts"
              />
              <RHFCheckbox
                name="manageconfigrations"
                label="manage change job posts status"
              />
              <RHFCheckbox name="manageSco" label="manage edit forms" />
            </Box>
          </Grid>
          <Grid xs={12} item>
            <Box mt={1} display="flex">
              <RHFCheckbox name="sendEmail" label="send invitation email" />
              <Box
                ml="auto"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
                px={1}
              >
                <Button
                  onClick={() => {
                    setOpenModal(false);
                    setPermission(null);
                    reset();
                  }}
                  size="small"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <LoadingButton
                  loading={isLoading}
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
              </Box>
            </Box>
          </Grid>
        </>
      );
    default:
      return (
        <Grid
          xs={12}
          sx={{ py: 1, px: 1 }}
          display="flex"
          flexDirection="column"
          gap={3}
          item
        >
          <Box display="flex" alignItems="center">
            <Box>
              <Typography variant="body2" fontWeight={700} color="neutral.900">
                Basic
              </Typography>
              <Typography variant="subtitle2" color="neutral.700">
                add referrals and share public job posts
              </Typography>
            </Box>
            <Box ml="auto">
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  setPermission("RCT_JOB_ADMIN_BASIC");
                }}
              >
                Assign
              </Button>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box>
              <Typography variant="body2" fontWeight={700} color="neutral.900">
                Job Admin
              </Typography>
              <Typography variant="subtitle2" color="neutral.700">
                View and manage assigned jobs
              </Typography>
            </Box>
            <Box ml="auto">
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  setPermission("RCT_JOB_ADMIN_STANDARD");
                }}
              >
                Assign
              </Button>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box>
              <Typography variant="body2" fontWeight={700} color="neutral.900">
                site admin
              </Typography>
              <Typography variant="subtitle2" color="neutral.700">
                manage all jobs and user permission
              </Typography>
            </Box>
            <Box ml="auto">
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  setPermission("RCT_SITE_ADMIN");
                }}
              >
                Assign
              </Button>
            </Box>
          </Box>
        </Grid>
      );
  }
};
export default AddNewUserModel;
