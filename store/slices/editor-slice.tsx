import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ElementTypes = "__body" | "container" | "text";
export type DeviceTypes = "laptop" | "tablet" | "mobile";
export type ViewingModesTypes = "production" | "preview" | "development";

export interface ElementContent {
  text?: string;
}

export interface Element {
  name: string;
  type: ElementTypes;
  styles: React.CSSProperties;
  path: string;
  content: ElementContent;
}

export interface EditorState {
  elements: Element[];
  selectedElements: Element[];
  prevEditorState: EditorState | null;
  nextEditorState: EditorState | null;
  device: DeviceTypes;
  viewingMode: ViewingModesTypes;
}

const initialState: EditorState = {
  elements: [
    {
      name: "__body",
      type: "__body",
      path: "/",
      content: {},
      styles: {},
    },
  ],
  selectedElements: [],
  prevEditorState: null,
  nextEditorState: null,
  device: "laptop",
  viewingMode: "development",
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {},
});

export const editorActions = editorSlice.actions;
export default editorSlice.reducer;
