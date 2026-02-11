import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { DnDDraggableListItem } from "./dnd-draggable-list-item";
import { DnDDraggableElement } from "./dnd-draggable-element";
import { Box, Button } from "@mui/material";

// USE-CASE ::
//  1:: <DragDropContext> is necessary and should be wrapped around drag and drop components.
// 2:: <DnDDraggableListItem> is basically a container for items needing to be dragged. "getListStyle" prop has a boolean
// argument and changes its state whenever item is being dragged so you can style it accordingly. Basic example is given below.
// 3:: <DnDDraggableElement> is a single element and would be used in a map function. It also comes with its own styling from "getItemStyle" prop and again
// has an boolean argument that changes upon dragging a certain element. Example below.
// 4:: You can make your own component inside DnDDraggableElement and it would automatically be draggable
// 5:: A basic shifting of cards between 2 boxes is expressed as example below. All logic is handled in "dropHandler" function.
// if you want to handle a scenario where you want to copy elements from one container to another just uncomment the commented "dropHandler function"
const data = [
  {
    ind: 0,
    id: "0",
    name: "Button",
    Component: () => <Button variant="contained">Button</Button>,
  },
  {
    ind: 1,
    id: "1",
    name: "Input",
    Component: () => <Button>Button2</Button>,
  },
  {
    ind: 2,
    id: "2",
    name: "Text",
    Component: () => <span>TEXT</span>,
  },
];
// general single item style
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  transition: "all",
  background: isDragging ? "lightgrey" : "transparent",
  rotate: isDragging ? "5deg" : "0deg",
  border: isDragging ? "1px dashed blue" : "none",
  ...draggableStyle.style,
});
//general list container style
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 2,
  width: "250px",
  minHeight: "50px",
  height: "max-content",
  marginTop: 2,
  gap: "5px",
});
//General reordering logic
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   const sortedWRTIdentifier = result.map((item: any, index) => {
//     return { ...item, ind: index };
//   });
//   return sortedWRTIdentifier;
// };
//===============================================/ Use Case Example for shifting cards between 2 containers /===========================

export function UseCase(): JSX.Element {
  //container
  const [items, setItems] = useState<any>(data);
  //box
  const [boxItems, setBoxItems] = useState<any>([
    {
      ind: 11,
      id: "11",
      name: "Input0",
      Component: () => <Button>Button2</Button>,
    },
  ]);
  // copying from container to box
  // const dropHandler = (result) => {
  //   if (!result.destination || result.destination.droppableId === "container") {
  //     return;
  //   }
  //   if (
  //     result.source.droppableId === "box" &&
  //     result.destination.droppableId === "box"
  //   ) {
  //     const reOrdered: any = reorder(
  //       items,
  //       result.source.index,
  //       result.destination.index
  //     );
  //     setItems(reOrdered);
  //   } else {
  //     const draggedItemArr = data.filter((i) => i.name === result.draggableId);
  //     const draggedItem: any = draggedItemArr[0];
  //     const backup: any = [...items];
  //     backup.splice(result.destination.index, 0, draggedItem);
  //     let newArr: any = [];
  //     for (let i = 0; i < backup.length; i++) {
  //       newArr = [...newArr, { ...backup[i], id: i.toString(), ind: i }];
  //     }
  //     setItems(newArr);
  //   }
  // };
  const dropHandler = (result) => {
    if (
      !result.destination ||
      result.destination.droppableId === result.source.droppableId
    ) {
      return;
    }
    if (result.destination.droppableId === "container") {
      //removing from box
      setBoxItems((prev) =>
        [...prev].filter((i) => i.id !== result.draggableId)
      );
      //adding removed item to container
      const draggedItemArr = boxItems.filter(
        (i) => i.id === result.draggableId
      );
      const draggedItem: any = draggedItemArr[0];
      const backup: any = [...items];
      backup.splice(result.destination.index, 0, draggedItem);
      setItems(backup);
    }
    if (result.destination.droppableId === "box") {
      setItems((prev) => [...prev].filter((i) => i.id !== result.draggableId));
      const draggedItemArr = items.filter((i) => i.id === result.draggableId);
      const draggedItem: any = draggedItemArr[0];
      const backup: any = [...boxItems];
      backup.splice(result.destination.index, 0, draggedItem);
      setBoxItems(backup);
    }
  };

  return (
    <DragDropContext onDragEnd={dropHandler}>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Box
          sx={{
            background: "lightgrey",
            width: "max-content",
            height: "100vh",
            border: "1px dashed red",
          }}
        >
          <DnDDraggableElement
            // isDropDisabled
            getListStyle={getListStyle}
            droppableId="container"
          >
            {/* {data.map((item, index) => { */}
            {Boolean(items.length) &&
              items.map((item, index) => {
                const { id, name } = item;
                return (
                  <DnDDraggableListItem
                    // isDraggableContainer
                    getItemStyle={getItemStyle}
                    draggableId={id}
                    index={index}
                    key={id}
                  >
                    <Box
                      sx={{
                        userSelect: "none",
                        padding: "16px",
                        margin: `0 0 ${8}px 0`,
                        borderRadius: "15px",
                        bgcolor: "white",
                      }}
                    >
                      <Box fontSize={10}>{id}</Box>
                      {name}
                    </Box>
                  </DnDDraggableListItem>
                );
              })}
          </DnDDraggableElement>
        </Box>
        <Box
          sx={{
            background: "lightgrey",
            width: "auto",
            // height: "100vh",
            display: "flex",
            border: "1px dashed red",
          }}
        >
          <DnDDraggableElement getListStyle={getListStyle} droppableId="box">
            {/* {items.map((item, index) => { */}
            {Boolean(boxItems.length) &&
              boxItems.map((item, index) => {
                const { id, name } = item;
                return (
                  <DnDDraggableListItem
                    //   isDraggableContainer={true}
                    getItemStyle={getItemStyle}
                    draggableId={id}
                    index={index}
                    key={id}
                  >
                    <Box
                      sx={{
                        userSelect: "none",
                        padding: "16px",
                        margin: `0 0 ${8}px 0`,
                        borderRadius: "15px",
                        bgcolor: "white",
                      }}
                    >
                      <Box fontSize={10}>{id}</Box>
                      {name}
                    </Box>{" "}
                  </DnDDraggableListItem>
                );
              })}
          </DnDDraggableElement>
        </Box>
      </Box>
    </DragDropContext>
  );
}
