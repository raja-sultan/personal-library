import React from "react";
import { StrictModeDroppable as Droppable } from "./strict-mode-droppable";
import type { IDraggableElement } from "./types";
import { Box } from "@mui/material";

export function DnDDraggableElement(props: IDraggableElement): JSX.Element {
  const {
    getListStyle = () => {},
    children,
    droppableId,
    isDropDisabled,
    direction,
  } = props;
  return (
    <Droppable
      droppableId={droppableId || "droppable"}
      isDropDisabled={isDropDisabled || false}
      direction={direction || "vertical"}
    >
      {(provided, snapshot) => {
        return (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={getListStyle(snapshot.isDraggingOver) || {}}
          >
            {children}
            {provided.placeholder}
          </Box>
        );
      }}
    </Droppable>
  );
}
