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
}

export interface CounterState {
  elements: ElementData[];
  selectedElement?: ElementData;
}

const initialState: CounterState = {
  elements: [
    {
      id: BODY_TAG_ID,
      name: "Body",
      styles: {},
      type: "body",
      parentId: "",
    },
  ],
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<ElementData>) => {
      state.elements = [...state.elements, action.payload];
    },
    changeSelectedElement: (state, action: PayloadAction<ElementData>) => {
      state.selectedElement = action.payload;
    },
  },
});

export const { addElement, changeSelectedElement } = editorSlice.actions;
export default editorSlice.reducer;
