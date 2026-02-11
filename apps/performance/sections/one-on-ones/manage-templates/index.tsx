"use client";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import {
  Button,
  DialogActions,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useManageTemplate } from "./use-manage-templates";
import CustomCard from "@components/custom-card";
import CustomModal from "@components/custom-modal";
import { FormProvider, RHFRadioGroup, RHFTextField } from "common";
import { useRouter } from "next/navigation";
import { CustomDrawer } from "@components/custom-drawer";
import { SearchIcon } from "@assets/icons";
import { CloseBlueIcon } from "@assets/icons/close-blue-icon";
import { CustomLoader } from "@components/loader";
import { CustomAlert } from "@components/alert";
import { LoadingButton } from "@mui/lab";
import { ComponentLoader } from "@components/component-loader";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE._1_ON_1S.TEMPLATES;

export function ManageTemplatesSection(): JSX.Element {
  const router = useRouter();

  const {
    deleteUser,
    handleDeleteModal,
    isAppliedHistoryOpen,
    handleAppliedHistoryModal,
    handleDeleteUser,
    isApply,
    templateApplyHandler,
    onSubmit,
    handleSubmit,
    methods,
    oneOnOneWith,
    tableData,
    isApplyTemplateLoading,
    isDeleteLoading,
    handleSearch,
    appliedTemplateData,
    isAppliedHistoryLoading
  } = useManageTemplate();

  return (
    <>
      <CustomCard
        header
        cardProps={{ sx: { mb: '10px' } }}
        cardHeader={{
          title: "1-on-1s Templates",
          description:
            "Use a template or build your own to help bring structure to your meetings",
          onBack: () => {
            router.push('/one-on-ones');
          },
          actions: (
            <PermissionProtected permission={PERMISSION.CREATE}>
              <Button
                variant="contained"
                onClick={() => {
                  router.push("/one-on-ones/manage-templates/create");
                }}
              >
                Create Template
              </Button>
            </PermissionProtected>
          ),
        }}
      />
      {tableData.isLoading && <CustomLoader />}
      <CustomTableWithHeader tableProps={tableData} />

      {/* delete modal call below */}
      {deleteUser && <CustomModal
        isLoading={isDeleteLoading}
        title="Are you sure?"
        open={deleteUser}
        onClose={handleDeleteModal}
        acceptButtonProps={{ onClick: handleDeleteUser }}
      />}

      {/* apply modal call below */}
      {isApply && <CustomModal
        maxWidth="md"
        open={isApply}
        onClose={() => {
          templateApplyHandler(null);
        }}
        message={false}
        title='Weekly 1:1 Template'
        titleProps={{
          marginBottom: "2rem",
          variant: "h6",
          color: "neutral.800",
          fontWeight: "600"
        }}
        headerIcon={false}
        hideFooter
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <CustomCard>
            {/* Radio group  */}
            <RHFRadioGroup
              size="small"
              variant="subtitle1"
              color="neutral.800"
              fontWeight="400"
              outerLabel={
                <Typography
                  marginBottom="2rem"
                  variant="body2"
                  color="neutral.900"
                  fontWeight="600"
                >
                  Apply Template to
                </Typography>
              }
              row={false}
              name="applyTo"
              options={[
                { label: "Next 1:1", value: "Upcoming" },
                { label: "Next and all upcoming 1:1s", value: "all_Upcoming" },
                { label: "Current 1:1", value: "Current" },
              ]}
            />
            <Box marginTop="2.4rem" marginBottom="2.4rem">
              <RHFTextField
                name="userId"
                outerLabel={
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    color="neutral.700"
                  >
                    For 1:1s with
                  </Typography>
                }
                select
                size="small"
                placeholder="Select a 1:1 relationship"
              >
                {oneOnOneWith?.data?.map((data: { user: { _id: string, firstName: string, lastName: string } }) => {
                  return (
                    <MenuItem
                      key={data?.user?._id}
                      value={data.user?._id}
                    >{`${data?.user?.firstName} ${data?.user?.lastName}`}</MenuItem>
                  );
                })}
              </RHFTextField>
            </Box>
            <CustomAlert
              sx={{ width: '100%' }}
              message="Applying this template won' t remove any existing content from your 1:1s"
            />
          </CustomCard>
          <DialogActions
            sx={{ marginTop: "2.4rem", gap: "1rem" }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                templateApplyHandler(null);
              }}
            >
              Cancel
            </Button>
            <LoadingButton loading={isApplyTemplateLoading} variant="contained" type="submit">
              Save
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </CustomModal>}

      {isAppliedHistoryOpen && <CustomDrawer
        isOpen={isAppliedHistoryOpen}
        maxWidth="550px"
        title="Template Applied History"
        onClose={handleAppliedHistoryModal}
      >
        {isAppliedHistoryLoading ? <ComponentLoader height='100vh' /> :
          <Stack
            display="flex"
            flexDirection="column"
            spacing={4}
            sx={{ marginTop: 4 }}
          >
            <TextField
              variant="outlined"
              name="table_search_bar"
              placeholder="Search"
              onChange={({ target }) => { handleSearch(target.value) }}
              sx={{
                minWidth: "100%",
                ".MuiInputBase-input": { fontSize: "16px", fontWeight: 400 },
              }}
              InputProps={{
                sx: { height: "44px" },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            {appliedTemplateData?.data?.length ? appliedTemplateData?.data?.map((obj) => {
              return (
                <Stack
                  key={obj?._id}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    sx={{
                      border: "1px solid #e2e2e2",
                      borderRadius: 1,
                      padding: "7px 15px",
                    }}
                  >
                    <Stack
                      display="flex"
                      flexDirection="row"
                      alignContent="center"
                    >
                      <Typography
                        variant="subtitle1"
                        color="#667085"
                        sx={{ marginRight: 1 }}
                      >
                        1:1 with:{" "}
                      </Typography>
                      <Typography variant="subtitle1">John Doe</Typography>
                    </Stack>
                    <Stack flexDirection="row">
                      <Typography
                        variant="subtitle1"
                        color="#667085"
                        sx={{ marginRight: 1 }}
                      >
                        Applied Template To:{" "}
                      </Typography>
                      <Typography variant="subtitle1">
                        Next and all upcoming 1-on-1s
                      </Typography>
                    </Stack>
                    <Stack flexDirection="row">
                      <Typography
                        variant="subtitle1"
                        color="#667085"
                        sx={{ marginRight: 1 }}
                      >
                        Applied Date:{" "}
                      </Typography>
                      <Typography variant="subtitle1">01/12/2023</Typography>
                    </Stack>
                  </Box>
                  <CloseBlueIcon width="52px" height="52px" />
                </Stack>
              );
            }) : <Typography>No history available right now</Typography>}
          </Stack>}
      </CustomDrawer>}
    </>
  );
}
