import React, { useState } from "react";
import { Box, Button, FormLabel, Grid, TextField, Typography, Slider } from "@mui/material";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import CustomCard from "@components/custom-card";
import CustomModal from "@components/custom-modal";
import { renderUserImage } from "@root/utils/render-user-image";

function RecommendedUsersCard({ _id, userDetails, userTable, salaryTable, bandData, handleAddNote }): React.JSX.Element {

  const [noteModal, setNoteModal] = useState(false);
  const [val, setVal] = useState('');

  function handleNoteModal(): void {
    setNoteModal(!noteModal);
    setVal('');
  }

  function noteAdd(): void {
    handleAddNote(val, _id);
    setVal('');
    handleNoteModal();
  }

  const titleSX = {
    fontSize: '16px', textTransform: 'capitalize'
  }

  return (
    <>
      <CustomCard
        subHeader
        cardSubHeader={{
          title: <Box display='flex' alignItems='center' gap='12px'>
            {renderUserImage({
              firstName: userDetails?.firstName,
              lastName: userDetails?.lastName,
              profileImage: userDetails?.profileImage,
              height: 48, width: 48
            })}
            <Typography>{userDetails?.firstName} {userDetails?.lastName}</Typography>
          </Box>,
          actions: <Button variant="outlined" onClick={handleNoteModal}>Note</Button>
        }}
      >
        <Grid container spacing={2}>

          <Grid item md={9} xs={12}>
            <CustomTableWithHeader
              primaryHeader
              primaryHeaderProps={{ title: userTable?.employeeTitle, titleSX }}
              tableProps={userTable}
            />
          </Grid>

          <Grid item md={3} xs={12}>
            <CustomCard
              header
              cardHeader={{ title: 'Compensation Band', hideBackIcon: true }}
              subHeader
              cardSubHeader={{
                title: `Current Salary $${bandData?.currentSalary}`,
                rootSxCardSubHeader: { fontSize: "16px", fontWeight: 400 }
              }}
            >
              <Slider
                sx={styles.slider}
                name="currentSalary"
                defaultValue={bandData?.bandDefaultValue}
                disabled
                step={1}
                marks={bandData?.marks}
                max={bandData?.max}
                min={bandData?.min}
              />
            </CustomCard>
          </Grid>

          <Grid item xs={12}>
            <CustomTableWithHeader
              primaryHeader
              primaryHeaderProps={{ title: salaryTable?.employeeTitle, titleSX }}
              tableProps={salaryTable}
            />
          </Grid>

        </Grid>
      </CustomCard>

      {noteModal && <CustomModal
        open={noteModal}
        onClose={handleNoteModal}
        headerIcon={false}
        title='Note'
        message={<Typography variant="body2" fontWeight={400} color='neutral.500' mt='-10px'>
          This note will only be visible to managers above you in your
          reporting chain and compensation admins once you submit your
          recommendations.
        </Typography>}
        acceptText="Save"
        acceptButtonProps={{
          color: "primary",
          disabled: !val
        }}
        onAccept={noteAdd}
      >
        <FormLabel>Description</FormLabel>
        <TextField
          name='description'
          value={val}
          onChange={({ target }) => { setVal(target.value) }}
          fullWidth
          variant="outlined"
          minRows={3}
          multiline
        />
      </CustomModal>}
    </>
  );
}

export default RecommendedUsersCard;
const styles = {
  slider: {
    width: "100%",
    // marginX: 2,
    "& .MuiSlider-rail": {
      height: "8px",
    },
    "& .MuiSlider-track": {
      height: "8px",
    },
    "& .MuiSlider-mark": {
      display: "none",
    },
    '& .MuiSlider-markLabel': {
      fontSize: '12px',
      color: 'neutral.500',
      transform: 'translateX(-100%)',
      '&[data-index="0"]': {
        transform: 'none'
      },
    }
  },
}