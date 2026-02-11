import { Box, Button, Typography, Stack} from "@mui/material";
import CustomModal from "@components/custom-modal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { styles } from "@sections/reviews/select-peers-modal/select-peers-style";
import { FormProvider, RHFAutocompleteSync } from "common";
import useSelectPeersModal from "@sections/reviews/select-peers-modal/use-select-peers-modal";

export default function SelectPeersModal(props): React.JSX.Element {
  const { open, setOpen, tableId  } = props;
  const { methods, handleSubmit, onSubmit, peerSelectionData } =
    useSelectPeersModal({tableId,open, setOpen,});
  return (
    <CustomModal
      // maxWidth="lg"
      headerIcon=""
      message={false}
      open={open}
      onClose={() => {
        setOpen(!open);
      }}
      title={<Typography variant="h6" fontWeight="600" color="text.primary">Select Peers</Typography>}
      hideFooter
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <RHFAutocompleteSync
            multiple
            name="selectPeers"
            outerLabel={<Typography variant="subtitle2" fontWeight={600}>Peers</Typography>}
            placeholder="Select"
            options={
              peerSelectionData?.length
                ? peerSelectionData?.map((item) => {
                    return {
                      id: item?.id,
                      name:`${item?.name}`,
                    };
                  })
                : []
            }
          />
          <Box sx={styles.alertWrapper}>
            <ErrorOutlineIcon />
            <Typography variant="subtitle2" fontWeight={600}>
              By submitting, Your reviewers request wil be send to your manager for approval. You can make changes to your selections until your manager confirms them.
              </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              variant="outlined"
              size="medium"
              onClick={() => {
                setOpen(!open);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="medium"
              type="submit" >
              Nominate
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
