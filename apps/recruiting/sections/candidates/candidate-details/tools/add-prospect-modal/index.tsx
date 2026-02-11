import { Box, Button, Grid, Typography } from "@mui/material";
import { CustomModal, FormProvider, RHFAutocompleteAsync } from "common";
import { useAddProspectModal } from "./use-add-prospect";
import { styles } from "./add-prospect.styles";

export function AddProspectModal(props): JSX.Element {
  const { prospect, setProspect } = props;
  const {
    apiQuery,
    handleSubmit,
    onSubmit,
    methods,
    departmentList,
    officeList,
    poolList,
    prospectOwners,
    reset,
    poolDetails,
    prospectStageList,
  } = useAddProspectModal(setProspect);

  const transformData = (res) => {
    if (poolDetails) {
      const filterData = res?.data?.filter(
        (list) => list?._id === poolDetails?._id
      );
      return filterData ? filterData[0]?.stages : [];
    }
    return [];
  };

  return (
    <CustomModal
      onClose={() => {
        setProspect(false);
      }}
      rootSx={styles.modalStyling}
      headerLabel="Add as Prospect to"
      headerSubLabel="Consider Candidate as a prospect for:"
      closeButtonProps={{
        onClick: () => {
          setProspect(false);
        },
      }}
      isOpen={prospect}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.innerCardWrapper}>
          <Grid container spacing={{ xs: 2, sm: 2 }}>
            <Grid item xs={12}>
              <RHFAutocompleteAsync
                multiple
                name="specificJobs"
                outerLabel="Specific Job(s)"
                getOptionLabel={(option: any) => option?.jobName}
                disableCloseOnSelect={false}
                apiQuery={apiQuery}
                placeholder="select one or more jobs"
                limitTags={3}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                sx={{
                  ...styles.typoStyling,
                  color: "primary.main",
                  fontWeight: 700,
                }}
              >
                And / or:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <RHFAutocompleteAsync
                name="department"
                outerLabel="Department"
                getOptionLabel={(option: any) => option?.departmentName}
                disableCloseOnSelect={false}
                apiQuery={departmentList}
                placeholder="Department name"
              />
            </Grid>
            <Grid item xs={12}>
              <RHFAutocompleteAsync
                name="office"
                outerLabel="Office"
                getOptionLabel={(option: any) => option?.officeName}
                disableCloseOnSelect={false}
                apiQuery={officeList}
                placeholder="Office name"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                sx={{
                  ...styles.typoStyling,
                  color: "text.secondary",
                }}
              >
                Add Candidate to a specific pool, stage and assign an owner:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <RHFAutocompleteAsync
                name="pool"
                outerLabel="Pool"
                getOptionLabel={(option: any) => option?.name}
                disableCloseOnSelect={false}
                apiQuery={poolList}
                placeholder="Pool name"
              />
            </Grid>
            <Grid item xs={12}>
              <RHFAutocompleteAsync
                name="prospectStage"
                outerLabel="Prospect Stage"
                getOptionLabel={(option: any) => option?.stage}
                disableCloseOnSelect={false}
                apiQuery={prospectStageList}
                placeholder="Prospect Pool Stage"
                transformResponse={transformData}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFAutocompleteAsync
                name="prospectOwner"
                outerLabel="Prospect Owner"
                getOptionLabel={(option: any) => option?.userName}
                disableCloseOnSelect={false}
                apiQuery={prospectOwners}
                placeholder="Prospect Owner"
              />
            </Grid>
          </Grid>
          <Box sx={styles.buttonWrapper}>
            <Button
              variant="outlined"
              onClick={() => {
                setProspect(false);
                reset("");
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Add as Prospect
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
