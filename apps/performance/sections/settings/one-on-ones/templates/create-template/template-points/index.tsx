import {
  Box,
  Button,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropIcon } from "@assets/icons/drag-and-drop-icon";
import { EditIcon } from "@assets/icons/edit-icon";
import { DeleteIconCurrentColor } from "@assets/icons/delete-icon-current-color";
import CustomModal from "@components/custom-modal";
import { useTemplatePoints } from "./use-template-points";

// interface Points {
//   id: string | undefined, point: string | undefined
// }

interface Props {
  disabled?: boolean;
  btnTitle?: string;
  pointsData: any;
  getPoints: (points: any) => void;
  type: string;
}

export function TemplatePoints({
  disabled,
  btnTitle,
  pointsData = [],
  getPoints,
  type,
}: Props): JSX.Element {
  const {
    handleAction,
    pointsDataArr,
    openModal,
    pointId,
    handleToggleModal,
    pointValue,
    handleAddPoint,
    handleEditPoint,
    handleDeletePoint,
    handleToggleDeleteModal,
    deleteModal,
    handlePointChange,
  } = useTemplatePoints({ pointsData, getPoints, type });

  return (
    <Box>
      <FormLabel sx={styles.title}>{btnTitle}</FormLabel>

      {!disabled && (
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => {
            handleAction({ action: "add" });
          }}
        >
          {`Add ${btnTitle}`}
        </Button>
      )}

      <Box sx={{ opacity: disabled ? 0.5 : 1 }}>
        {pointsDataArr?.map((item: { id: string; point: string }) => (
          <Box key={item?.id} sx={styles.pointWrapper}>
            <Box p="2.4rem 1.6rem" pr={0}>
              <DragDropIcon />
            </Box>
            <Typography
              variant="subtitle1"
              pr={disabled ? "0.7rem" : "0"}
              sx={styles.pointText}
            >
              {item?.point}
            </Typography>
            {!disabled && (
              <Box pr="1.6rem" display="flex" gap="1.5rem">
                <IconButton
                  onClick={() => {
                    handleAction({ ...item, action: "edit" });
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    handleAction({ ...item, action: "delete" });
                  }}
                >
                  <DeleteIconCurrentColor />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {openModal && (
        <CustomModal
          open={openModal}
          onClose={handleToggleModal}
          message={false}
          title={`${pointId ? "Edit" : "Add"} ${btnTitle}`}
          headerIcon={false}
          acceptText={pointId ? "Save" : "Add"}
          onAccept={pointId ? handleEditPoint : handleAddPoint}
          acceptButtonProps={{ color: "primary", disabled: !pointValue }}
        >
          <Typography variant="body2" mb="0.6rem">
            {btnTitle}
          </Typography>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            placeholder={`Enter ${btnTitle}`}
            value={pointValue}
            onChange={({ target }) => {
              handlePointChange(target.value);
            }}
          />
        </CustomModal>
      )}

      {deleteModal && (
        <CustomModal
          message="Are you sure you want to delete"
          open={deleteModal}
          onClose={handleToggleDeleteModal}
          onAccept={handleDeletePoint}
        />
      )}
    </Box>
  );
}

const styles = {
  title: { mb: "10px", display: "block" },
  pointWrapper: ({ palette: { neutral } }) => ({
    border: `1px solid ${neutral[200]}`,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: 2,
    mt: "1.6rem",
  }),
  pointText: ({ palette: { neutral } }) => ({
    wordWrap: "break-word",
    flex: 1,
    minHeight: "80px",
    borderLeft: `1px solid ${neutral[200]}`,
    py: "2.4rem",
    pl: "1.6rem",
    fontWeight: 400,
  }),
};
