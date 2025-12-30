import { BODY_TAG_ID } from "@/lib/constants";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ElementType = "text" | "image" | "container" | "link" | "body";

export interface ElementData {
  id: string;
  name: string;
  styles: any;
  type: ElementType;
  parentId: string;
  canContain: boolean;
}

export interface CounterState {
  elements: ElementData[];
  selectedElementId: string;
  draggedElement?: ElementData;
  prevDraggedElement?: ElementData;
}

const initialState: CounterState = {
  elements: [
    {
      id: BODY_TAG_ID,
      name: "Body",
      styles: {},
      type: "body",
      parentId: "",
      canContain: true,
    },
  ],
  selectedElementId: BODY_TAG_ID,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<ElementData>) => {
      state.elements = [...state.elements, action.payload];
    },
    changeSelectedElementId: (state, action: PayloadAction<string>) => {
      state.selectedElementId = action.payload;
    },
    changeDraggedElement: (state, action: PayloadAction<ElementData>) => {
      state.draggedElement = action.payload;
    },
    changePrevDraggedElement: (state, action: PayloadAction<ElementData>) => {
      state.prevDraggedElement = action.payload;
    },
    editElementData: (state, action: PayloadAction<ElementData>) => {
      console.log("editing element data...");
      state.elements = state.elements.map((e) => {
        if (e.id === action.payload.id) return action.payload;
        return e;
      });
    },
  },
});

export const {
  addElement,
  changeSelectedElementId,
  changeDraggedElement,
  editElementData,
  changePrevDraggedElement,
} = editorSlice.actions;
export default editorSlice.reducer;
