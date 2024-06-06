import { EDITOR_ELEMENT_TYPE } from "@/lib/constants";
import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import React from "react";
import {
  addElementAction,
  AddElementAction,
  updateElementAction,
  UpdateElementAction,
} from "@/actions/editor-actions";

export interface EditorElement {
  id: string;
  name: string;
  styles: React.CSSProperties;
  type: EDITOR_ELEMENT_TYPE;
  content: EditorElement[] | { innerText?: string };
}

export interface Editor {
  elements: EditorElement[];
  selectedElement: EditorElement | null;
}

const initialEditor: Editor = {
  elements: [
    {
      id: "__body",
      name: "Body",
      styles: {},
      type: "container",
      content: [],
    },
  ],
  selectedElement: null,
};

const initialEditorElement: EditorElement = {
  id: "",
  name: "",
  styles: {},
  type: "container",
  content: [],
};

export const editorElementSlice = createSlice({
  name: "editorElement",
  initialState: initialEditorElement,
  reducers: {
    changeEditorElement: (
      state: EditorElement,
      action: PayloadAction<EditorElement>,
    ) => {
      state = action.payload;
    },
  },
});

export const editorSlice = createSlice({
  name: "editor",
  initialState: initialEditor,
  reducers: {
    selectElement: (
      state: Editor,
      action: PayloadAction<EditorElement | null>,
    ) => {
      state.selectedElement = action.payload;
    },
    addElement: (state: Editor, action: PayloadAction<AddElementAction>) => {
      const updatedEditorArray: any = addElementAction(action.payload);

      return {
        ...state,
        elements: updatedEditorArray,
      };
    },
    updateElement: (
      state: Editor,
      action: PayloadAction<UpdateElementAction>,
    ) => {
      console.log("UpdateElement");
      const updatedEditorArray: any = updateElementAction(action.payload);
      console.log(updatedEditorArray);

      return {
        ...state,
        elements: updatedEditorArray,
      };
    },
  },
});

export const { changeEditorElement } = editorElementSlice.actions;
export const { addElement, selectElement, updateElement } = editorSlice.actions;
export default editorSlice.reducer;
