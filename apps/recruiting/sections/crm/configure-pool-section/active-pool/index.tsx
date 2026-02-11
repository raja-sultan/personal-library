import {
  Box,
  Button,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  CustomModal,
  CustomTable,
  FormProvider,
  RHFAutocompleteSync,
  RHFTextField,
  TableIconActions,
  WarningPrompt,
  DnDDraggableElement,
  DnDDraggableListItem,
} from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import {
  useDeleteProspectPoolMutation,
  useGetPoolTableDataApiQuery,
  usePutPoolArchiveRestoredMutation,
} from "@services/crm/configure-crm/configure-crm-api";
import { useState } from "react";
import toast from "react-hot-toast";
import { EditKickOffQuestion, TickSquareQuestion } from "@assets/jobs";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { useConfigurePool } from "../use-configure-pool";
import Image from "next/image";
import { RearrangeIcon } from "@assets/images";
import { DragDropContext } from "react-beautiful-dnd";
import { configurePoolDefaultValues } from "../configure-pool.data";

export function ActivePools({
  setProspectPoolModal,
  prospectPoolModal,
}: any): JSX.Element {
  const [currentlyEdited, setCurrentlyEdited] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
    limit: 10,
    poolType: "active",
  });

  const {
    fields,
    prepend,
    remove,
    methods,
    handleSubmit,
    onSubmit,
    // isError,
    // isSuccess,
    isLoading,
    setRowData,
    reset,
    swap,
  } = useConfigurePool({ setProspectPoolModal });

  const { data } = useGetPoolTableDataApiQuery(params);
  const [putData] = usePutPoolArchiveRestoredMutation();
  const [deleteProspectPool] = useDeleteProspectPoolMutation();

  async function onStatusChange({ body, poolId }: any): Promise<void> {
    try {
      const res: any = await putData({
        body,
        poolId,
      }).unwrap();
      toast.success(res?.message ?? `Update Successfully!`);
    } finally {
      setProspectPoolModal(false);
      // nextStepHandler();
    }
  }
  async function onProspectPoolDelete(poolId): Promise<void> {
    try {
      const res: any = await deleteProspectPool(poolId).unwrap();
      toast.success(res?.message ?? `Deleted Successfully!`);
    } finally {
      setProspectPoolModal(false);
    }
  }
  const handleEditQuestion = (index: number): void => {
    setCurrentlyEdited(index);
    setIsEditing(true);
  };

  const handleSaveQuestion = (): void => {
    setCurrentlyEdited(null);
    setIsEditing(false);
  };

  const handleCancel = (): void => {
    setRowData(null);
    reset(configurePoolDefaultValues);
    setProspectPoolModal(false);
  };
  const columns = [
    {
      accessorFn: (row: any) => row.name ?? "-",
      id: "name",
      cell: (info: any) => {
        return (
          <>
            <Typography variant="body1" fontWeight="bold">
              {info.row.original?.name ?? "-"}
            </Typography>
            <Typography variant="body2">
              {info.row.original?.description ?? "-"}
            </Typography>
          </>
        );
      },
      header: () => <span>Prospect Pools</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.stages ?? "-",
      id: "stage",
      cell: (info: any) => {
        return info.row.original.stages.map((item) => (
          <Box key={item._id}>{item.stage ?? "-"}</Box>
        ));
      },
      header: () => <span>Prospect Stages</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.poolAdmins ?? "-",
      id: "poolAdmins",
      cell: (info: any) => {
        return info.row.original.poolAdmins.map((item) => (
          <Box key={item._id}>{item.adminName ?? "-"}</Box>
        ));
      },
      header: () => <span>Pool Admins</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.status ?? "-",
      id: "status",
      cell: (info: any) => (
        <TableIconActions icon={<TableActionsIcon />}>
          <MenuItem
            onClick={() => {
              setProspectPoolModal(true);
              setRowData(info.row.original);
            }}
          >
            <Typography variant="subtitle2">Edit</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              void onStatusChange({
                body: { status: "archived" },
                poolId: info.row.original._id,
              });
            }}
          >
            <Typography variant="subtitle2">Archive</Typography>
          </MenuItem>

          <WarningPrompt
            mainColor="error.main"
            heading="Delete Prospect Pool"
            subTitle="You are about to remove the college Recruitment prospect pool.
            Are You sure you to do that?"
            modelOpenLabel={
              <MenuItem>
                <Typography variant="subtitle2">Delete</Typography>
              </MenuItem>
            }
            acceptButtonLabel="Delete"
            acceptButtonProps={{
              onClick: () => {
                void onProspectPoolDelete(info.row.original._id);
              },
              variant: "contained",
              color: "error",
              sx: {
                bgcolor: "error.main",
                color: "primary.contrastText",
              },
            }}
          />
        </TableIconActions>
      ),
      header: () => <span>Action</span>,
    },
  ];

  function dropHandler(result): void {
    swap(result.source.index, result.destination.index);
  }
  return (
    <>
      <Stack direction="row-reverse">
        <Button
          variant="contained"
          onClick={() => {
            setProspectPoolModal(true);
          }}
        >
          Create a Prospect pool
        </Button>
      </Stack>
      <Box
        sx={{
          height: "50vh",
          overflow: "scroll",
          "::-webkit-scrollbar": {
            display: "none",
          },
          mt: 1,
        }}
      >
        <CustomTable
          data={data?.data?.prospectPool}
          columns={columns}
          isLoading={false}
          isFetching={false}
          isError={false}
          isSuccess
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
          onPageChange={(onPageData: any) => {
            setParams({
              page: onPageData,
              offset: (onPageData - 1) * 10,
            });
          }}
        />
      </Box>
      <CustomModal
        headerLabel="Creating Pool"
        closeButtonProps={{
          onClick: () => {
            handleCancel();
          },
        }}
        isOpen={prospectPoolModal}
        rootSx={{
          maxWidth: { xs: 350, sm: 500, md: 750, lg: 1000, xl: 1200 },
          px: "4rem",
          height: "50vh",
          overflow: "scroll",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
        onClose={handleCancel}
      >
        <Divider sx={{ my: 2 }} />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2} rowGap={2}>
            <Grid item md={4} xs={12} container rowGap={3}>
              <Grid item xs={12}>
                <RHFTextField outerLabel="Pool Name" name="name" />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  outerLabel="Pool Description"
                  name="description"
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
            <Grid item md={4} xs={12}>
              <Grid md={4} xs={12}>
                <FormLabel>Stage</FormLabel>
              </Grid>
              <DragDropContext onDragEnd={dropHandler}>
                <Grid item xs={10}>
                  <DnDDraggableElement
                    droppableId="droppable"
                    getListStyle={(isDraggingOver: boolean) => ({
                      backgroundColor: isDraggingOver
                        ? "neutral.200"
                        : "transparent",
                      height: "100%",
                      width: "100%",
                      borderRadius: 2,
                      top: "100px !important",
                    })}
                  >
                    {fields.map((item: any, index: number) => {
                      return (
                        <DnDDraggableListItem
                          draggableId={String(item?.id)}
                          index={index}
                          key={item?.id}
                          getItemStyle={(
                            isDragging: boolean,
                            draggableStyle: any
                          ) => ({
                            transition: "all",
                            backdropFilter: "none",
                            background: isDragging ? "white" : "transparent",
                            border: isDragging ? "1px dashed blue" : "none",

                            ...draggableStyle.style,
                          })}
                        >
                          <Stack
                            sx={{
                              left: "auto !important",
                              top: "auto !important",
                              position: "relative",
                              mt: 1,
                            }}
                            gap={1}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                left: "-1.5rem",
                                top: 10,
                              }}
                            >
                              <Image src={RearrangeIcon} alt="RA" />
                            </Box>
                            <RHFTextField
                              type="text"
                              name={`stages.${index}.stage`}
                              disabled={
                                (currentlyEdited !== null &&
                                  currentlyEdited !== index) ||
                                !isEditing
                              }
                              sx={{
                                "&.MuiBox-root": {
                                  position: "absolute",
                                  width: "100%",
                                },
                                "&.MuiOutlinedInput-input": {
                                  paddingLeft: "10rem",
                                },
                                ml: "1rem",
                              }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                right: "-9rem",
                                top: 0,
                              }}
                            >
                              <IconButton
                                onClick={() => {
                                  if (!isEditing) {
                                    handleEditQuestion(index);
                                  } else {
                                    handleSaveQuestion();
                                  }
                                }}
                              >
                                {isEditing && currentlyEdited === index ? (
                                  <TickSquareQuestion
                                    width="3rem"
                                    sx={{ color: "color.primary" }}
                                  />
                                ) : (
                                  <EditKickOffQuestion width="3rem" />
                                )}
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  remove(index);
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                            </Box>
                          </Stack>
                        </DnDDraggableListItem>
                      );
                    })}{" "}
                  </DnDDraggableElement>
                </Grid>
              </DragDropContext>
              <Grid md={4} xs={12}>
                <Button
                  onClick={() => {
                    prepend({ stage: "" });
                  }}
                >
                  Add Stage
                </Button>
              </Grid>
            </Grid>
            <Grid item md={4} xs={12} container rowGap={3}>
              <Grid item xs={12}>
                <RHFAutocompleteSync
                  outerLabel="Pool admins"
                  name="poolAdmins"
                  placeholder="Choose a pool admin"
                  isOptionEqualToValue={(option: any, newValue: any) =>
                    option.name === newValue.name
                  }
                  options={[
                    {
                      id: 1,
                      name: "Admin1",
                      value: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    },
                    {
                      id: 2,
                      name: "Admin2",
                      value: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    },
                  ]}
                  multiple
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Stack
                direction={{ md: "row-reverse", xs: "column" }}
                columnGap={3}
                rowGap={2}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                >
                  Save
                </LoadingButton>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </FormProvider>
      </CustomModal>
    </>
  );
}
