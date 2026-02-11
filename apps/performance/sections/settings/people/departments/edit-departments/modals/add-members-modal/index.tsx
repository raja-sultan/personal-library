"use client";

import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  Autocomplete,
  Checkbox,
  Chip,
} from "@mui/material";
import CustomModal from "@components/custom-modal";
import { TableDeleteIcon } from "@assets/icons/table-delete-icon";
import { membersModalStyles } from "./add-members-modal.styles";
import { useAddMembersModal } from "./use-add-members-modal";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


export function AddMembersModal(): JSX.Element {
  const {
    isOpenAddModal,
    setIsOpenAddModal,
    handleMemberSubmit,
    deleteSelectedTextHandler,
    membersOptions,
    setUser,
    user,
    setShowUser,changeFilterHandler
  } = useAddMembersModal();

  const styles = membersModalStyles();
  const theme = useTheme();
  return (
    <>
      <Box gap={2} sx={styles.buttonWrap}>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            setIsOpenAddModal(!isOpenAddModal);
            setShowUser(false);
          }}
        >
          Add a member
        </Button>
      </Box>
      <CustomModal
        open={isOpenAddModal}
        title="Add Members"
        headerIcon=""
        acceptText="Save Changes"
        acceptButtonProps={{
          color: "primary",
          disabled: !user,
          onClick: handleMemberSubmit,
        }}
        message=""
        onClose={() => {
          setIsOpenAddModal(!isOpenAddModal);
        }}
      >

        <Autocomplete
          fullWidth
          multiple
          value={user?.map(({ value, label }) => ({ value, label }))}
          onChange={(_, newValue) => {
            setUser(newValue);
            changeFilterHandler(newValue)
          }}
         
          options={membersOptions}
          disableCloseOnSelect
          filterOptions={(options, { inputValue }) => {
            changeFilterHandler( inputValue );
            return options.filter((option) =>
                option?.label?.toLowerCase().includes(inputValue.toLowerCase())
            );
        }}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          isOptionEqualToValue={(option, value) => option?.value === value?.value}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
          renderTags={(value, getTagProps) =>
            value?.map((option, index) => {
              return (
                <Chip label={option?.label} {...getTagProps({ index })} />
              )
            })
          }
          
        />
        {user?.length > 0 &&
          user?.map(({ _id, label }) => (
            <Box sx={styles.userData} key={_id}>
              <Box sx={styles.userContent}>
                <Typography>{label}</Typography>
                <TableDeleteIcon sx={{ cursor: 'pointer', color: theme.palette.primary.main, textAlign: "end" }}
                  onClick={() => { deleteSelectedTextHandler(_id) }}
                />
              </Box>
            </Box>
          ))
        }
        <Typography
          variant="subtitle2"
          fontWeight={400}
          color="color.secondary"
          sx={{ color: theme.palette.neutral[500], pt: "15px" }}
        >
          These users will be able to create department goals
        </Typography>
      </CustomModal>
    </>
  );
}
