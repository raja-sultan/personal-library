import { IconMessageEdit } from "@assets/icons/icon-message-edit";
import { DragIndicatorIcon } from "@assets/icons/drag-indicator-icon";
import { Box, Button, Card, CardActions, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Stack } from "@mui/system";
import { DnDDraggableElement, DnDDraggableListItem } from "common";
import { DragDropContext } from "react-beautiful-dnd";
import {
  useGetJobFieldsListApiQuery,
  usePrivateCustomFieldMutation,
  useSwapFieldsMutation,
} from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";
import DeleteModal from "./delete-modal";
import toast from "react-hot-toast";

export function CustomOptionsCard(props: any): React.JSX.Element {
  const { params, setAddField, onEditHandler } = props;
  const { data: customOptionsArray } = useGetJobFieldsListApiQuery(params);
  const [privateCustomField] = usePrivateCustomFieldMutation();
  const [swapFields] = useSwapFieldsMutation();

  async function dropHandler(result): Promise<void> {
    const resultArray = result?.destination?.droppableId?.map(
      (item) => item?._id
    );

    [
      resultArray[result?.destination?.index],
      resultArray[result?.source?.index],
    ] = [
      resultArray?.[result?.source?.index],
      resultArray?.[result?.destination?.index],
    ];

    try {
      const res = await swapFields({
        body: { fieldIds: resultArray },
      }).unwrap();
      toast.success(res.message ?? "swapped successfully");
    } catch (err) {
      toast.error(err.message ?? "Something went wrong");
    }
  }

  const privateCustomFieldHandler = async (fieldId, isLocked, isPrivate) => {
    try {
      const res = await privateCustomField({
        fieldId,
        body: {
          isLocked,
          isPrivate,
        },
      }).unwrap();
      toast.success(res?.message ?? "Status Updated successfully");
    } catch (err) {
      toast.error(err?.message ?? "Something went wrong");
    }
  };
  return (
    <>
      {customOptionsArray?.data?.map((customOptionData: any) => {
        return (
          <Card key={customOptionData?.section} sx={{ p: 1.5, my: 1.5 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              my={1}
            >
              <Typography gutterBottom variant="h6">
                {customOptionData?.section}
              </Typography>
              <Button
                onClick={() => {
                  setAddField({
                    open: true,
                    id: null,
                    section: customOptionData?.section,
                  });
                }}
                variant="outlined"
                sx={{ color: "neutral.700", borderColor: "neutral.300" }}
              >
                Add field
              </Button>
            </Stack>
            <DragDropContext onDragEnd={dropHandler}>
              <DnDDraggableElement
                droppableId={customOptionData?.customFields}
                getListStyle={(isDraggingOver: boolean) => ({
                  backgroundColor: isDraggingOver
                    ? "neutral.200"
                    : "transparent",
                  // height: "100%",
                  width: "100%",
                  borderRadius: 2,
                })}
              >
                {customOptionData?.customFields?.map(
                  (item: any, index: number) => {
                    return (
                      <DnDDraggableListItem
                        draggableId={String(item?._id)}
                        index={index}
                        key={item?._id}
                        getItemStyle={(
                          isDragging: boolean,
                          draggableStyle: any
                        ) => {
                          return {
                            transition: "all",
                            backdropFilter: "none",
                            background: isDragging ? "white" : "transparent",
                            border: isDragging ? "1px dashed blue" : "none",

                            ...draggableStyle.style,
                          };
                        }}
                      >
                        <Card
                          sx={{
                            p: 1.5,
                            my: 1.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Stack
                            sx={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <DragIndicatorIcon
                              sx={{
                                mx: 1,
                                color: "primary.main",
                                cursor: "pointer",
                              }}
                            />
                            <Box>
                              <Typography
                                gutterBottom
                                variant="h6"
                                color="primary.900"
                                m={0}
                              >
                                {item?.label}
                              </Typography>
                              <Typography variant="body2" color="primary.500">
                                {item?.description}
                              </Typography>
                            </Box>
                          </Stack>
                          <Box>
                            <CardActions>
                              {item?.isLocked ? (
                                <LockIcon
                                  sx={{
                                    color: "primary.main",
                                    cursor: "pointer",
                                  }}
                                  onClick={async () => {
                                    await privateCustomFieldHandler(
                                      item?._id,
                                      false,
                                      item?.isPrivate
                                    );
                                  }}
                                />
                              ) : (
                                <LockOpenIcon
                                  sx={{
                                    color: "primary.main",
                                    cursor: "pointer",
                                  }}
                                  onClick={async () => {
                                    await privateCustomFieldHandler(
                                      item?._id,
                                      true,
                                      item?.isPrivate
                                    );
                                  }}
                                />
                              )}
                              {item?.isPrivate ? (
                                <VisibilityOffIcon
                                  sx={{
                                    color: "warning.main",
                                    cursor: "pointer",
                                  }}
                                  onClick={async () => {
                                    await privateCustomFieldHandler(
                                      item?._id,
                                      item?.isLocked,
                                      false
                                    );
                                  }}
                                />
                              ) : (
                                <VisibilityIcon
                                  sx={{
                                    color: "primary.main",
                                    cursor: "pointer",
                                  }}
                                  onClick={async () => {
                                    await privateCustomFieldHandler(
                                      item?._id,
                                      item?.isLocked,
                                      true
                                    );
                                  }}
                                />
                              )}
                              <IconMessageEdit
                                sx={{
                                  color: "primary.main",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  onEditHandler(item?._id);
                                }}
                              />
                              <DeleteModal cardItems={item} />
                            </CardActions>
                          </Box>
                        </Card>
                      </DnDDraggableListItem>
                    );
                  }
                )}
              </DnDDraggableElement>
            </DragDropContext>
          </Card>
        );
      })}
    </>
  );
}
