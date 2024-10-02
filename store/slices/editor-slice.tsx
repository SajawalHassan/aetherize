import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export type ElementTypes = "__body" | "container" | "text";
export type DeviceTypes = "laptop" | "tablet" | "mobile";
export type ViewingModesTypes = "production" | "preview" | "development";
export type DevModesTypes = "normal" | "playground";

export interface ElementContent {
  text?: string;
}

export interface EditorElement {
  id: string;
  name: string;
  type: ElementTypes;
  styles: React.CSSProperties;
  containerId: string;
  content: ElementContent;
}

export interface EditorState {
  elements: EditorElement[];
  selectedElements: string[];
  prevEditorState: EditorState | null;
  nextEditorState: EditorState | null;
  device: DeviceTypes;
  viewingMode: ViewingModesTypes;
  devMode: DevModesTypes;
  isDraggingElement: boolean;
}

const initialState: EditorState = {
  elements: [
    {
      id: "__body",
      name: "__body",
      type: "__body",
      containerId: "",
      content: {},
      styles: {},
    },
  ],
  selectedElements: ["__body"],
  prevEditorState: null,
  nextEditorState: null,
  device: "laptop",
  viewingMode: "development",
  devMode: "playground",
  isDraggingElement: false,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addElement: (state: EditorState, action: PayloadAction<EditorElement>) => {
      return {
        ...state,
        elements: [...state.elements, action.payload],
      };
    },
    selectElement: (state: EditorState, action: PayloadAction<string>) => {
      if (state.selectedElements.includes(action.payload)) {
        return {
          ...state,
          selectedElements: state.selectedElements.filter((id) => id !== action.payload),
        };
      }

      return {
        ...state,
        selectedElements: [action.payload],
      };
    },
    setIsDragging: (state: EditorState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isDraggingElement: action.payload,
      };
    },
  },
});

export const editorActions = editorSlice.actions;
export default editorSlice.reducer;
