import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ElementType = "text" | "image" | "container" | "link";

export interface ElementData {
  id: string;
  name: string;
  styles: any;
  type: ElementType;
}

export interface CounterState {
  elements: ElementData[];
  selectedElement?: ElementData;
}

const initialState: CounterState = {
  elements: [],
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

// Action creators are generated for each case reducer function
export const { addElement, changeSelectedElement } = editorSlice.actions;

export default editorSlice.reducer;
