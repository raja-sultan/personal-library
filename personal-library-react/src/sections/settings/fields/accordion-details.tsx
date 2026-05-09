import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import type { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import { DnDDraggableElement, DnDDraggableListItem } from "common";
import Link from "next/link";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { EditFieldModal } from "./edit-field";
import { usePatchsubFieldsRearrangeListMutation } from "@services/settings/fields-api/fields-api";
import toast from "react-hot-toast";

function Draggables(props): JSX.Element {
  const { fieldGroupName, fieldGroupId, itemsToMap } = props;
  const [patchsubFieldsRearrangeList] =
    usePatchsubFieldsRearrangeListMutation();
  async function dropHandler(result): Promise<void> {
    const resultArray = [result?.source?.index, result?.destination?.index];

    try {
      const res = await patchsubFieldsRearrangeList({
        params: { fieldGroupId },
        body: { fieldsIds: resultArray },
      }).unwrap();
      toast.success(res.message ?? "swapped successfully");
    } catch (err) {
      toast.error(err.message ?? "Something went wrong");
    }
  }

  return (
    <DragDropContext onDragEnd={dropHandler}>
      <DnDDraggableElement droppableId="box">
        {Boolean(itemsToMap.length) &&
          itemsToMap.map((item) => {
            // const { id, name } = item;
            return (
              <DnDDraggableListItem
                draggableId={item._id}
                index={item._id}
                key={item._id}
              >
                <Link
                  href={{
                    pathname: "/settings/fields/add-field",
                    query: {
                      fieldGroupId,
                      fieldId: item._id,
                      fieldGroupName,
                      action: "edit",
                    },
                  }}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Card {...item} />
                </Link>
              </DnDDraggableListItem>
            );
          })}
      </DnDDraggableElement>
    </DragDropContext>
  );
}

function Card(props): JSX.Element {
  const { _id, displayName, fieldType, whoCanEdit, isHeader = false } = props;
  const style = {
    bgcolor: isHeader && "neutral.200",
    border: isHeader ? "0px" : "1px solid",
    borderColor: isHeader ? "transparent" : "neutral.300",
    p: 1,
  };
  return (
    <Grid
      container
      sx={{ cursor: !isHeader ? "pointer" : "" }}
      // onClick={() => {
      //   !isHeader && router.push("/settings/fields/add-field?action=edit");
      // }}
    >
      <Grid item xs={4} container gap={1} sx={style}>
        {!isHeader && <DragIndicatorIcon sx={{ color: "neutral.500" }} />}
        <Typography variant="subtitle2" sx={{ color: "neutral.500" }}>
          {displayName ?? "-"}
        </Typography>
      </Grid>
      <Grid item xs={4} sx={style}>
        <Typography variant="subtitle2" sx={{ color: "neutral.500" }}>
          {fieldType ?? "-"}
        </Typography>
      </Grid>
      <Grid item xs={4} sx={style}>
        <Typography variant="subtitle2" sx={{ color: "neutral.500" }}>
          {whoCanEdit ?? "-"}
        </Typography>
      </Grid>
    </Grid>
  );
}

export function Accordions(props): JSX.Element {
  const { _id, name, fields } = props;
  const [anchorEl, setAnchorEl] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl((p) => !p);
    event.stopPropagation();
  };
  const handleClose = () => {
    setAnchorEl(false);
  };

  return (
    <>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary>
            <ClickAwayListener onClickAway={handleClose}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  position: "relative",
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>{name}</Typography>
                <IconButton onClick={handleClick}>
                  <ArticleOutlinedIcon />
                </IconButton>
                {open && (
                  <Box
                    sx={{
                      // p: 1,
                      borderRadius: 2,
                      position: "absolute",
                      top: 30,
                      zIndex: 990,
                      right: 0,
                      bgcolor: "background.paper",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      boxShadow: 2,
                      a: {
                        textDecoration: "none !important",
                      },
                    }}
                  >
                    <Button sx={{ color: "text.primary" }}>
                      <Link
                        href={{
                          pathname: "/settings/fields/add-field",
                          query: {
                            fieldGroupId: _id,
                            action: "Add",
                          },
                        }}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        Add Field
                      </Link>
                    </Button>
                    <Button
                      sx={{ color: "text.primary" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenModal(true);
                      }}
                    >
                      Edit Field Group
                    </Button>
                  </Box>
                )}
              </Box>
            </ClickAwayListener>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="caption">
              (Fields cannot be moved into or outside of this group)
            </Typography>
            <Card
              displayName="Field Name"
              fieldType="Field Type"
              whoCanEdit="Who Can Edit"
              isHeader
            />
            <Draggables
              fieldGroupName={name}
              fieldGroupId={_id}
              itemsToMap={fields}
            />
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Edit Group Modal */}
      {openModal && (
        <EditFieldModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          fieldGroupId={_id}
          name={name}
        />
      )}
    </>
  );
}

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1.3rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    paddingLeft: theme.spacing(1),
  },
}));
