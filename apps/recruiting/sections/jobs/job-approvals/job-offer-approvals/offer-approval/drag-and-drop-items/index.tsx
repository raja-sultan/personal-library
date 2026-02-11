import React, { useContext, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Box } from "@mui/material";
import { DnDDraggableElement, DnDDraggableListItem } from "common";
import { DragAndDropSingleItemNew } from "./drag-and-drop-single-item";
import { JobApprovalContext } from "../../../use-job-approval-context";

// const data = [
//   {
//     id: "0",
//     userId: "727bb63f-ee95-48e3-9256-41ba8f6f9c03",
//     fullName: "Adam Carrol",
//     status: "Pending",
//     email: "haseeb.rehman@carelibrary.co.uk",
//     rejectionReason: "",
//   },
//   {
//     id: "1",
//     userId: "727bb63f-ee95-48e3-9256-41ba8f6f9c03",
//     fullName: "Arsal Khan",
//     status: "Pending",
//     email: "haseeb.rehman@carelibrary.co.uk",
//     rejectionReason: "",
//   },
//   {
//     id: "2",
//     userId: "727bb63f-ee95-48e3-9256-41ba8f6f9c03",
//     fullName: "Haseeb Khan",
//     status: "Pending",
//     email: "haseeb.rehman@carelibrary.co.uk",
//     rejectionReason: "",
//   },
// ];
// general single item style
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  transition: "all",

  ...draggableStyle.style,
});
//general list container style
const getListStyle = (isDraggingOver: boolean) => ({
  width: "250px",
  minHeight: "50px",
  height: "max-content",
  gap: "5px",
});
//General reordering logic
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  const sortedWRTIdentifier = result.map((item: any, index) => {
    return { ...item, ind: index };
  });
  return sortedWRTIdentifier;
};
//===============================================/ Use Case Example for shifting cards between 2 containers /===========================

export function DragAndDropItems({ items, setItems, removeUser }): JSX.Element {
  const dropHandler = (result) => {
    if (!result.destination) {
      return;
    }
    const reOrdered: any = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(reOrdered);
  };

  return (
    <DragDropContext onDragEnd={dropHandler}>
      <Box
        sx={{
          width: "max-content",
        }}
      >
        <DnDDraggableElement
          getListStyle={getListStyle}
          droppableId="container"
        >
          {Boolean(items.length) &&
            items.map((item, index) => {
              const { _id, fullName } = item;
              return (
                <DnDDraggableListItem
                  getItemStyle={getItemStyle}
                  draggableId={_id}
                  index={index}
                  key={_id}
                >
                  <DragAndDropSingleItemNew
                    removeUser={() => removeUser(index)}
                    name={fullName}
                  />
                </DnDDraggableListItem>
              );
            })}
        </DnDDraggableElement>
      </Box>
    </DragDropContext>
  );
}
