import {
  EditorElementTypes,
  defaultBodyStyles,
  deviceTypes,
  editorContainerId,
  viewingModes,
} from "@/lib/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addElementAction,
  deleteElementAction,
  updateElementAction,
} from "./actions/editor-actions";
import React from "react";

// Editor Element
export interface EditorElement {
  id: string;
  type: EditorElementTypes;
  containerStyles: React.CSSProperties;
  elementStyles: React.CSSProperties;
  name: string;
  content:
    | EditorElement[]
    | { text?: string; href?: string; videoSrc?: string; imageSrc?: string };
}

// Editor
export interface Editor {
  elements: EditorElement[];
  selectedElement: EditorElement | null;
  prevEditorState: Editor | null;
  nextEditorState: Editor | null;
  device: deviceTypes;
  viewingMode: viewingModes;
}

const initialEditor: Editor = {
  elements: [
    {
      id: editorContainerId,
      name: "body",
      containerStyles: defaultBodyStyles,
      elementStyles: {},
      type: editorContainerId,
      content: [],
    },
  ],
  selectedElement: null,
  nextEditorState: null,
  prevEditorState: null,
  device: "laptop",
  viewingMode: "development",
};

interface addElementPayload {
  containerId: string;
  elementsArray: EditorElement[];
  newElement: EditorElement;
}

interface updateElementPayload {
  elementId: string;
  elementsArray: EditorElement[];
  elementData: EditorElement;
}

interface deleteElementPayload {
  elementId: string;
  elementsArray: EditorElement[];
}

const editorSlice = createSlice({
  name: "editor",
  initialState: initialEditor,
  reducers: {
    changeViewingMode: (state: Editor, action: PayloadAction<viewingModes>) => {
      return {
        ...state,
        viewingMode: action.payload,
        prevEditorState: state,
        nextEditorState: null,
      };
    },
    changeDevice: (state: Editor, action: PayloadAction<deviceTypes>) => {
      return {
        ...state,
        device: action.payload,
        prevEditorState: state,
        nextEditorState: null,
      };
    },
    undoEditorState: (state: Editor, action: PayloadAction<Editor>) => {
      return {
        ...action.payload,
        nextEditorState: state,
      };
    },
    redoEditorState: (state: Editor, action: PayloadAction<Editor>) => {
      return {
        ...action.payload,
        prevEditorState: state,
      };
    },
    selectElement: (
      state: Editor,
      action: PayloadAction<EditorElement | null>,
    ) => {
      return {
        ...state,
        selectedElement: action.payload,
        prevEditorState: state,
        nextEditorState: null,
      };
    },
    addElement: (state: Editor, action: PayloadAction<addElementPayload>) => {
      const newElementsArray = addElementAction(
        action.payload.containerId,
        action.payload.elementsArray,
        action.payload.newElement,
      );

      return {
        ...state,
        prevEditorState: state,
        nextEditorState: null,
        elements: newElementsArray,
      };
    },
    updateElement: (
      state: Editor,
      action: PayloadAction<updateElementPayload>,
    ) => {
      const newElementsArray = updateElementAction(
        action.payload.elementId,
        action.payload.elementsArray,
        action.payload.elementData,
      );

      if (action.payload.elementId === state.selectedElement?.id) {
        return {
          ...state,
          prevEditorState: state,
          nextEditorState: null,
          elements: newElementsArray,
          selectedElement: action.payload.elementData,
        };
      }

      return {
        ...state,
        prevEditorState: state,
        nextEditorState: null,
        elements: newElementsArray,
      };
    },
    deleteElement: (
      state: Editor,
      action: PayloadAction<deleteElementPayload>,
    ) => {
      const updatedElementsArray = deleteElementAction(
        action.payload.elementsArray,
        action.payload.elementId,
      );

      return {
        ...state,
        prevEditorState: state,
        nextEditorState: null,
        elements: updatedElementsArray,
        selectedElement: null,
      };
    },
  },
});

export const editorActions = editorSlice.actions;
export default editorSlice.reducer;
