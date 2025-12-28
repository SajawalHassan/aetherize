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
  selectedElementId: "",
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
  },
});

export const { addElement, changeSelectedElementId } = editorSlice.actions;
export default editorSlice.reducer;
