import type { SetStateAction, Dispatch } from "react";
import { Box, Button, Typography } from "@mui/material";
import { CustomModal } from "common";
import { removeCategory } from "./remove-modal.types";
import { useDeleteCategoryMutation } from "@services/jobs/create-jobs/score-card/score-card-api";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export function RemoveCategoryModal({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}): JSX.Element {
  //API For Delete Category
  const [deleteCategory] = useDeleteCategoryMutation();
  const searchParams = useSearchParams();
  const jobsId = searchParams.get("jobId");

  const deleteDocument = async () => {
    const formData = {
      jobId: jobsId,
      categoryId: id,
    };
    try {
      const { message } = await deleteCategory(formData).unwrap();
      toast.success(message || "Information Deleted Successfully");
      setOpen(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg || "Error occurred");
    }
  };

  return (
    /*Custom Modal*/
    <CustomModal
      onClose={setOpen}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
      headerLabel="Remove Category"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
      isOpen={open}
    >
      <Typography variant="body1" sx={{ mt: 2, mb: 2, color: "text.primary" }}>
        Are you sure you want to remove Skills?
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ mb: 0.5, color: "text.secondary", fontWeight: 400 }}
      >
        The following attributes will also be removed
      </Typography>
      <Box component="ul" sx={styles.unorderedList}>
        {removeCategory.map((item) => (
          <div key={item.id}>
            <li>
              <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                {item.title}
              </Typography>
            </li>
          </div>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mb: 1 }}>
        <Button
          sx={styles.outlinedButton}
          variant="outlined"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button type="button" variant="contained" onClick={deleteDocument}>
          Yes, Remove Category
        </Button>
      </Box>
    </CustomModal>
  );
}

const styles: any = {
  unorderedList: {
    listStyleType: "disc",
    marginLeft: "11px",
    paddingLeft: "11px",
    lineHeight: "30px",
    mb: 2,
    color: "text.secondary",
  },
  outlinedButton: {
    borderColor: `text.disabled`,
    color: "text.primary",
    "&:hover": {
      boxShadow: "none",
      borderColor: `text.disabled`,
    },
  },
};
