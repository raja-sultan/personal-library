import dayjs from "dayjs";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { Box, Stack } from "@mui/system";
import { useSearchParams } from "next/navigation";
import { Button, Typography } from "@mui/material";
import { FormDeleteModal } from "@sections/jobs/job-details/forms/modals/delete-modal";
import { useDeletePrivateNoteMutation } from "@services/candidate/private-note/private-note-api";

export function GetPrivateNote(props: any): JSX.Element {
  const params = useSearchParams();
  const candidateId = params.get("candidateID");
  const { editPrivateNoteHandler, getPrivateNote } = props;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const [deletePrivateNote] = useDeletePrivateNoteMutation();

  const deletePrivateNoteHandler = async ({ id, createdBy }): Promise<void> => {
    const payload = {
      candidateId,
      id,
      createdBy,
    };

    try {
      await deletePrivateNote({ payload }).unwrap();
      toast.success("Private Note Deleted Successfully");
      setOpenDeleteModal(false);
    } catch (error) {
      toast.error(error?.data?.message);
      setOpenDeleteModal(false);
    }
  };

  const EditHandler = (privateNoteObject: any): void => {
    const data = { isEdit: "true", editData: privateNoteObject };
    editPrivateNoteHandler(data);
  };

  return (
    <Box sx={{ height: "100%", maxHeight: "260px" }}>
      {getPrivateNote?.data?.privateNote?.map((item: any) => (
        <Box key={item?._id}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography
              variant="h6"
              component="div"
              color="primary"
              marginY="15px"
            >
              Note:
              <Typography
                variant="h6"
                component="span"
                color="text.secondary"
                ml={1}
              >
                {item?.name}
              </Typography>
            </Typography>
            <Typography color="text.secondary" marginY="15px">
              {dayjs(item?.createdAt).format("YYYY-MM-DD h:mm A")}
            </Typography>
          </Stack>
          <Typography
            variant="subtitle2"
            fontSize="20px"
            color="text.secondary"
          >
            {item?.privateNote}
          </Typography>
          <Button
            variant="text"
            sx={{ px: 0, minWidth: "0" }}
            onClick={() => {
              EditHandler(item);
            }}
          >
            Edit
          </Button>
          <Button
            color="error"
            sx={{ px: 0 }}
            onClick={() => {
              setOpenDeleteModal(true);
            }}
          >
            Delete
          </Button>
          <FormDeleteModal
            open={openDeleteModal}
            onClose={() => {
              setOpenDeleteModal(false);
            }}
            deleteClickHandler={() =>
              deletePrivateNoteHandler({
                id: item?._id,
                createdBy: item?.createdBy,
              })
            }
          />
        </Box>
      ))}
    </Box>
  );
}
