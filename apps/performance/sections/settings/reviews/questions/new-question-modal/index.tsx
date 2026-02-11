import CustomModal from "@components/custom-modal";
import {
  Typography,
  InputLabel,
  Switch,
  FormControlLabel,
  Box,
  MenuItem,
  Select,
  DialogActions,
  Button,
} from "@mui/material";
import { useNewQuestionModal } from "./use-new-question-modal";
import { styles } from "./new-question.styles";
import { AddOptions } from "./add-options";
import { EmojiHappyIcon } from "@assets/icons/emoji-happy";
import { TickSquareIcon } from "@assets/icons/tick-square";
import { CircleIcon } from "@assets/icons/circle-icon";
import { FormProvider, RHFTextField } from "common";

interface Props {
  open?: boolean;
  onClose?: () => void;
  handleClose?: () => void;
  isEdit?: boolean;
  tableId?: string;
  data: [];
}

export function NewQuestionModal(props: Props): JSX.Element {
  const { open, onClose, handleClose, isEdit, tableId, data } = props;
  const {
    response = "",
    handleResponseChange = () => {},
    onSubmit,
    handleSubmit,
    methods,
    options,
    setOptions,
    rating,
    handleRatingChange,
    // handleRatingNumberChange,
    questionRequired,
    handleQuestionRequiredChange,
    allowComment,
    handleAllowCommentChange,selectedNumber
  } = useNewQuestionModal(handleClose, isEdit, tableId, data);

  const renderResponseIcon = {
    RATING: <EmojiHappyIcon sx={{ mr: 1 }} />,
    MULTI_SELECT: <TickSquareIcon sx={{ mr: 1 }} />,
    MULTIPLE_CHOICE: <CircleIcon sx={{ mr: 1 }} />,
  };

  return (
    <>
    {open && (
    <CustomModal
      open={open}
      onClose={onClose}
      headerIcon={false}
      title={isEdit ? `Edit Question` : `New Question`}
      message={
        <Typography mt="-20px" variant="subtitle2" color="neutral.400">
          {`${
            isEdit ? `Edit` : `Create`
          } your review audit questionnaire to get feedback.`}
        </Typography>
      }
      acceptText=""
      hideFooter
    >
      <Box sx={styles.modalInnerContentWrap}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="description"
            outerLabel="Question"
            placeholder="Enter a description..."
            multiline
            fullWidth
            minRows={3}
          />
          <Box textAlign="end" mt={2}>
            <FormControlLabel
              control={
                <Switch
                  name="questionRequired"
                  checked={questionRequired}
                  onChange={handleQuestionRequiredChange}
                />
              }
              label="&nbsp; Required"
            />
          </Box>

          <Typography variant="subtitle1">Response</Typography>
          <Typography variant="subtitle2" color="neutral.400" mb="16px">
            Rating, multiple choice or multi-select
          </Typography>

          <InputLabel sx={{ mb: "6px", fontWeight: 600 }}>Type</InputLabel>

          <Select
            fullWidth
            size="small"
            name="type"
            value={response}
            onChange={handleResponseChange}
            // startAdornment={renderResponseIcon[response]}
          >
            <MenuItem value="RATING" sx={styles.menuItem}>
              {renderResponseIcon.RATING}
              Rating
            </MenuItem>
            <MenuItem value="MULTI_SELECT" sx={styles.menuItem}>
              {renderResponseIcon.MULTI_SELECT}
              Multi Select
            </MenuItem>
            <MenuItem value="MULTIPLE_CHOICE" sx={styles.menuItem}>
              {renderResponseIcon.MULTIPLE_CHOICE}
              Multiple Choice
            </MenuItem>
          </Select>

          {response === "RATING" && (
            <Box mt="42px">
              <InputLabel sx={{ mb: "6px", fontWeight: 600 }}>
                Display
              </InputLabel>
              <Select
                fullWidth
                size="small"
                value={rating}
                onChange={handleRatingChange}
                sx={{ mb: "20px" }}
              >
                <MenuItem value="NUMBER" sx={styles.menuItem}>
                  Display rating scale as numbers
                </MenuItem>
                <MenuItem value="TEXT" sx={styles.menuItem}>
                  Display rating scale as text options
                </MenuItem>
              </Select>
              <br />
              {rating === "TEXT" && (
                <AddOptions number options={options} setOptions={setOptions} />
              )}
              {rating === "NUMBER" && (
                <Box sx={styles.ratingNumberWrapper}>
                  {selectedNumber.map((num) => (
                    <Box
                      // sx={styles.ratingNumber}
                      sx={{
                        ...styles.ratingNumber(selectedNumber, num),
                        background: selectedNumber.includes(num) ? '#CACACA' : '#F2F4F7',
                      }}
                      key={num}
                      // onClick={() => {
                      //   handleRatingNumberChange(num);
                      // }}
                    >
                      {num}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}

          {response === "MULTI_SELECT" && (
            <Box mt="10px">
              <AddOptions
                checkboxProps={{
                  onChange: (event) => {
                    event;
                  },
                }}
                options={options}
                setOptions={setOptions}
              />
            </Box>
          )}

          {response === "MULTIPLE_CHOICE" && (
            <Box mt="10px">
              <AddOptions
                icon={<CircleIcon />}
                options={options}
                setOptions={setOptions}
              />
            </Box>
          )}

          <Box sx={styles.commentWrapper}>
            <Box>
              <Typography variant="subtitle1">Comment</Typography>
              <Typography variant="subtitle2" color="neutral.400">
                Allow people to add comments in their review.
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  name="allowComment"
                  checked={allowComment}
                  onChange={handleAllowCommentChange}
                />
              }
              label="&nbsp; Required"
            />
          </Box>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </FormProvider>
      </Box>
    </CustomModal>
  )}
  </>
  );
}
