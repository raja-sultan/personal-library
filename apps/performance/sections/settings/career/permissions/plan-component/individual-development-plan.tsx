"use client";
import { Box, Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropIcon } from "@assets/icons/drag-and-drop-icon";
import { EditIcon } from "@assets/icons/edit-icon";

export function IndividualDevelopmentPlan({
  handleCareerModal,
  handleEditCareerModal,
  data,
  isLoading,
}): JSX.Element {
  return (
    <>
      <Box display="flex" alignItems="center" flexWrap="wrap" gap="10px">
        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            Career Vision Template
          </Typography>
          <Typography variant="caption" color="neutral.500">
            Individual development plan will help tp capture employee&apos;s
            career goals and share with respective Managers
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCareerModal}
        >
          Add Career Vision
        </Button>
      </Box>
      {data?.map((item: any) => (
        <RenderListComponent
          key={item._id}
          title={item.name}
          description={item.description}
          handleEdit={() => {
            handleEditCareerModal(item._id);
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
}

function RenderListComponent({
  title,
  description,
  handleEdit,
  isLoading,
}): JSX.Element {
  return (
    <Box sx={isLoading ? styles.loaderStyle : styles.pointWrapper}>
      <Box sx={styles.IconWrapper}>
        <DragDropIcon />
      </Box>
      <Box flex={1} p="1.6rem">
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="subtitle2" sx={{ wordWrap: "break-word" }}>
          {description}
        </Typography>
      </Box>
      <IconButton onClick={handleEdit} sx={{ mr: "1.6rem", flexShrink: 0 }}>
        <EditIcon />
      </IconButton>
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
  IconWrapper: ({ palette: { neutral } }) => ({
    borderRight: `1px solid ${neutral[200]}`,
    height: "100%",
    p: "2.4rem 1.6rem",
  }),
  loaderStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
};
