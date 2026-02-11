import CustomModal from "@components/custom-modal";
import { Box, Button, DialogActions, Grid, MenuItem, Typography } from "@mui/material";
import type { Theme } from "@mui/material";
import React from "react";
import { FormProvider } from "common";
import { usePromotionNominationModal } from "./use-nomination-modal";
import { useNominationModalData } from "./nomination-modal.data";
import { renderUserImage } from "@root/utils/render-user-image";
import { ThemeModeColor } from "@root/utils";
import { LoadingButton } from "@mui/lab";

interface PromotionNominationProps {
  open: boolean;
  onClose: () => void;
  promotedUser: any;
  nominationUserDetail: any;
  viewDetailId: string | undefined;
}

function PromotionNominationModal(props: PromotionNominationProps): JSX.Element {
  const { open, onClose, promotedUser, nominationUserDetail, viewDetailId } = props;
  const { methods, handleSubmit, onSubmit, isLoading } = usePromotionNominationModal({ promotedUser, nominationUserDetail, viewDetailId, onClose });

  const fullName = `${nominationUserDetail?.firstName} ${nominationUserDetail?.lastName}`

  return (
    <CustomModal
      title="Promotion Nomination"
      headerIcon={false}
      message={false}
      open={open}
      onClose={onClose}
      maxWidth="md"
      hideFooter
      titleProps={{ sx: { color: ThemeModeColor('neutral.800', 'neutral.300'), fontWeight: 600 } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px', mb: 2 }}>
        {renderUserImage({
          profileImage: nominationUserDetail?.profileImage,
          firstName: nominationUserDetail?.firstName,
          lastName: nominationUserDetail?.lastName,
          height: 40,
          width: 40,
        })}
        <Box>
          <Typography variant="body1" sx={styles.name}>{fullName}</Typography>
          <Typography variant="subtitle2" sx={styles.desc}>Add a promotion for {fullName} in this compensation cycle.</Typography>
        </Box>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {useNominationModalData().map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <item.component fullWidth size='small' {...item.componentProps}>
                {item?.componentProps?.options?.map((option: any) => (
                  <MenuItem key={option?.id} value={option?.value}>
                    {option?.label?.trim()}
                  </MenuItem>
                ))}
              </item.component>
            </Grid>
          ))}
        </Grid>
        <DialogActions sx={{ mt: '40px' }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton loading={isLoading} variant="contained" type="submit">
            {promotedUser?.isPromoted ? 'Edit' : 'Add'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </CustomModal>
  );
};

export default PromotionNominationModal;

const styles = {
  name: (theme: Theme) => ({
    fontSize: '20px',
    color: theme.palette.mode === 'dark' ? theme.palette.neutral[200] : theme.palette.neutral[700]
  }),
  desc: (theme: Theme) => ({
    fontWeight: 400,
    color: theme.palette.mode === 'dark' ? theme.palette.neutral[100] : theme.palette.neutral[500]
  }),
}
