import CustomCard from "@components/custom-card";
import CustomModal from "@components/custom-modal";
import { Box, Button, ButtonGroup, LinearProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { keyResultsStyles } from "./key-results-styles";

export function CheckInModal({
  title,
  open,
  onClose,
  value,
  start,
  target,
  type,
  handleDecrease,
  handleIncrease,
  handleSave,
  handleBinaryChange,
  currentValue,
  isLoading
}): JSX.Element {

  const [btn, setBtn] = useState<number | null>(0);

  function handleBtnChange(val: number): void {
    setBtn(val)
  }
  const styles = keyResultsStyles();

  return (
    <CustomModal open={open} onClose={onClose}
      isLoading={isLoading}
      message={false}
      title='Key Result Details'
      titleProps={{
        marginBottom: "2rem",
        variant: "h6",
        color: "text.primary",
        fontWeight: "600",
      }}
      headerIcon={false}
      acceptText="Save"
      onAccept={handleSave}
      acceptButtonProps={{ color: 'primary' }}
    >
      <CustomCard subHeader cardSubHeader={{
        title,
        actions: currentValue
      }} cardProps={{ sx: styles.custom_card_style }}>
        <LinearProgress
          value={value}
          variant="determinate"
          classes={{ bar: "_bar" }}
          sx={styles.wrap_progress_bar}
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap="16px"
          marginBottom="0.5rem"
        >
          <Typography
            variant="subtitle2"
            fontWeight={400}
            color="text.secondary"
          >
            {start}
            
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight={400}
            color="text.secondary"
          >
            {target}
          </Typography>
        </Box>
      </CustomCard>
      <Box>
        <Box mb={1.6}>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            size="small"
            sx={styles.btn_group}
          >
            <Button
              disableRipple
              size="small"
              onClick={() => {
                handleBtnChange(0);
                handleDecrease(1);
                type === 'Binary' && handleBinaryChange(false)
              }}
              sx={{ ...styles.btn_group_section(btn === 0) }}
            >
              {type === 'Binary' ? 'In Progress' : 'Increase'}
            </Button>
            <Button
              disableRipple
              size="small"
              onClick={() => {
                handleBtnChange(1);
                handleIncrease(1);
                type === 'Binary' && handleBinaryChange(true)
              }}
              sx={{ ...styles.btn_group_section(btn === 1) }}
            >
              {type === 'Binary' ? 'Complete' : 'Decrease'}
            </Button>
          </ButtonGroup>
        </Box>

        {(btn === 0 && type !== 'Binary') && <TextField
          name='input1'
          variant='outlined'
          size='small'
          type='number'
          fullWidth
          inputProps={{ min: 0}} 
          onChange={({ target: targetValue }) => {
            handleIncrease(Number(targetValue.value));
            type !== 'Binary' && handleBinaryChange(true)
          }}
        />}
        {(btn === 1 && type !== 'Binary') && <TextField
          name='input2'
          variant='outlined'
          size='small'
          type='number'
          fullWidth
          inputProps={{ min: 0}} 
          onChange={({ target: targetValue }) => {
            handleDecrease(Number(targetValue.value));
            type !== 'Binary' && handleBinaryChange(false)
          }}
        />}
      </Box>
    </CustomModal>
  )
}