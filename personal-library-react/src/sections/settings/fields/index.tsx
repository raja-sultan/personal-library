import { Box, Button, Grid, Typography } from "@mui/material";
import { useGetFieldsGroupListQuery } from "@services/settings/fields-api/fields-api";
import { IsFetching, NoContent } from "common";
import { useState } from "react";
import { Accordions } from "./accordion-details";
import { EditFieldModal } from "./edit-field";

export function FieldsSection(): JSX.Element {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data, isLoading, isError, isFetching } = useGetFieldsGroupListQuery(
    {}
  );
  if (isLoading || isFetching) {
    return (
      <Box position="relative" height="50vh">
        <IsFetching isFetching />
      </Box>
    );
  }
  if (isError) {
    return (
      <>
        <Grid
          sx={{
            borderRadius: "10px",
            bgcolor: "background.paper",
            rowGap: 3,
          }}
          container
        >
          <Box
            sx={{
              width: "100%",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">Fields</Typography>
            <Button
              variant="contained"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Add Field Group
            </Button>
          </Box>
          <Box display="flex" width="100%" justifyContent="center" mt={2}>
            <NoContent />
          </Box>
        </Grid>
        {/* Edit Group Modal */}
        {openModal && (
          <EditFieldModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            addModal="Add Modal"
          />
        )}
      </>
    );
  }
  return (
    <>
      <Grid
        sx={{
          borderRadius: "10px",
          bgcolor: "background.paper",
          rowGap: 3,
        }}
        container
      >
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Fields</Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Add Field Group
          </Button>
        </Box>

        {data?.data.length > 0 ? (
          <>
            {data?.data
              .slice()
              .reverse()
              .map((accordionData) => {
                return (
                  <Accordions {...accordionData} key={accordionData._id} />
                );
              })}
          </>
        ) : (
          <Box display="flex" width="100%" justifyContent="center" mt={2}>
            <NoContent />
          </Box>
        )}
      </Grid>
      {/* Edit Group Modal */}
      {openModal && (
        <EditFieldModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          addModal="Add Modal"
        />
      )}
    </>
  );
}
