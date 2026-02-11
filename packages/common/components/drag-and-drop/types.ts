import type { DraggableProvidedDraggableProps } from "react-beautiful-dnd";
import type { SxProps } from "@mui/material";

export interface IDraggableListItem {
  children: React.ReactNode;
  getItemStyle?:
    | ((
        isDraggingOver: boolean,
        provided: DraggableProvidedDraggableProps
      ) => React.CSSProperties | SxProps)
    | undefined;
  draggableId: string;
  index: number;
  applyOffset?:boolean|undefined;
  isDraggableContainer?: boolean | undefined;
}

export interface IDraggableElement {
  getListStyle?:
    | ((isDraggingOver: boolean) => React.CSSProperties | SxProps)
    | undefined;
  children: React.ReactNode;
  droppableId: string;
  isDropDisabled?: boolean | undefined;
  direction?: "horizontal" | "vertical" | undefined;
}
