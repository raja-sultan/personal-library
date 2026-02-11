import { EditIcon } from "@assets/icons/edit-icon";
import { CustomDrawer } from "@components/custom-drawer";
import { GlobalAvatar } from "@components/global-avatar";
import { FormProvider, RHFTextField } from "common";
import { TableDeleteIcon } from "@assets/icons/table-delete-icon";
import CustomModal from "@components/custom-modal";
import { AddGrowthAreas } from "../add-growth-area";
import { useViewDetails } from "./use-view-details";
import { ComponentLoader } from "@components/component-loader";
import { LoadingButton } from "@mui/lab";
import dayjs, { extend } from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { Checkbox, Divider, FormControlLabel, FormGroup, type Theme, Typography, Box } from "@mui/material";

extend(relativeTime)

export function ViewDetails({ isDrawerOpen, handleDrawerClose, id }: any): JSX.Element {
  const {
    handleStatusChange,
    handleDeleteModal,
    handleOpenAddGrowthModal,
    openDeleteModal,
    viewComment,
    onSubmit,
    handleSubmit,
    methods,
    openAddGrowthModal,
    growthData,
    isLoading,
    isStatusLoading,
    handleDeleteGrowth,
    isDeleteLoading,
    handleActionChange,
    isActionLoading,
    isCommentLoading,
    currentUser
  } = useViewDetails({ id, handleDrawerClose });

  return (
    <>
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        title={growthData?.title}
        maxWidth="38rem"
        showCustomCloseIcon
      >
        {isLoading ? <ComponentLoader height='100vh' /> :
          <>
            <Box
              marginTop="2.4rem"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap="0.5rem"
            >
              <LoadingButton
                loading={isStatusLoading}
                variant="contained"
                disabled={growthData?.isCompleted}
                onClick={handleStatusChange}
                sx={{ flex: 1 }}
              >
                {growthData?.isCompleted ? 'Completed' : 'Mark as Completed'}
              </LoadingButton>
              <Box
                sx={styles.actionBtn}
                onClick={handleOpenAddGrowthModal}
              >
                <EditIcon />
              </Box>
              <Box
                sx={styles.actionBtn}
                onClick={handleDeleteModal}
              >
                <TableDeleteIcon />
              </Box>
            </Box>
            <Box marginTop="2.4rem">
              <Typography variant="body2" fontWeight="600" color="text.primary" marginBottom="0.4rem">
                {growthData?.levelName ?? '--'}
              </Typography>
              {growthData?.skillLevel?.map((viewDetail) => (
                <Box key={viewDetail.id}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {viewDetail.text}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="2.4rem"
            >
              <Box>
                <Typography
                  variant="body2"
                  fontWeight="600"
                  color="text.primary"
                  marginBottom="0.8rem"
                >
                  Growth Period
                </Typography>
                <Typography variant="body2" fontWeight="600" color="text.secondary">
                  {growthData?.growthPeriod}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  fontWeight="600"
                  color="text.primary"
                  marginBottom="0.8rem"
                >
                  Due Date
                </Typography>
                <Typography variant="body2" fontWeight="600" color="text.secondary">
                  {growthData?.dueDate ? dayjs(growthData?.dueDate).format('D MMM YYYY') : '--'}
                </Typography>
              </Box>
            </Box>

            <Box margin="2rem 0px">
              <Box display="flex" gap="10px">
                <Typography variant="body2" fontWeight="600" color="text.primary">
                  Actions
                </Typography>
                <Box onClick={handleOpenAddGrowthModal}>
                  <AddCircleOutlineOutlinedIcon sx={{ color: "#98A2B3", cursor: "pointer", fontSize: "22px" }} />
                </Box>
              </Box>
              {isActionLoading ? <ComponentLoader height='auto' /> :
                <Box sx={styles.scrollStyleActions}>
                  <FormGroup>
                    {growthData?.actions?.length === 0 ? (
                      <Typography variant="subtitle2" color="text.secondary">No actions added yet.</Typography>
                    ) : (
                      growthData?.actions?.map((item) => (
                        <FormControlLabel
                          key={item._id}
                          control={
                            <Checkbox
                              onChange={({ target }) => { handleActionChange(item?._id, target.checked); }}
                              checked={item?.completed}
                            />
                          }
                          label={item.actions}
                        />
                      ))
                    )}
                  </FormGroup>
                </Box>}
            </Box>
            <Divider />
            <Box margin="2.4rem 0rem">
              <Typography variant="body2" fontWeight="600" color="text.primary" marginBottom="0.4rem">
                Align on expectations
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" marginBottom="2.4rem">
                {growthData?.description}
              </Typography>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" alignItems="center" justifyContent="space-between" gap="1rem">
                  <GlobalAvatar imgUrl={currentUser.img} firstName={currentUser.firstName} lastName={currentUser.lastName} />
                  <RHFTextField name="comment" placeholder="Comments" />
                  <LoadingButton loading={isCommentLoading} variant="contained" type="submit">
                    Send
                  </LoadingButton>
                </Box>
              </FormProvider>
            </Box>

            <Box sx={styles.scrollStyle}>
              {viewComment?.data?.map((item) => (
                <Box key={item?._id} my='15px' pr='2px'>
                  <Box display="flex" alignItems="center">
                    <GlobalAvatar
                      sx={{ marginRight: "1.6rem" }}
                      imgUrl={item?.user?.profileImage ?? ""}
                      firstName={item?.user?.firstName ?? ""}
                      lastName={item?.user?.lastName ?? ""}
                    />
                    <Typography
                      flex={2}
                      variant="body2"
                      fontWeight="600"
                      color="text.primary"
                    >
                      {`${item?.user?.firstName} ${item?.user?.lastName}`}
                    </Typography>
                    <Typography variant="caption" fontWeight="400" color="text.secondary">
                      {dayjs(item?.createdAt).fromNow()}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" color="text.secondary" my='5px'>
                    {item?.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>}
      </CustomDrawer>

      <CustomModal
        open={openDeleteModal}
        onClose={handleDeleteModal}
        onAccept={handleDeleteGrowth}
        isLoading={isDeleteLoading}
      />

      <AddGrowthAreas
        id={id}
        data={growthData}
        openAddGrowthModal={openAddGrowthModal}
        handleOpenAddGrowthModal={handleOpenAddGrowthModal}
      />

    </>
  );
}

const generateScrollStyle = (maxHeight) => ({
  maxHeight: `${maxHeight}px`,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
});

const styles = {
  actionBtn: ({ palette: { neutral } }: Theme) => ({
    border: `1px solid ${neutral[300]}`,
    padding: "0.7rem",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  }),
  scrollStyle: generateScrollStyle(220),
  scrollStyleActions: generateScrollStyle(130),
}